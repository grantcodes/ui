import StyleDictionary from "style-dictionary";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import minimist from "minimist";
import { generateOklchScale } from "./lib/color-generator.js";

/**
 * Auto-palette preprocessor
 * Walks the token tree looking for nodes with autoPalette: true and a base value.
 * Replaces them with a generated 100-900 oklch scale.
 */
StyleDictionary.registerPreprocessor({
	name: "auto-palette",
	preprocessor: (dictionary) => {
		const walkTokens = (obj) => {
			if (!obj || typeof obj !== "object") return;

			for (const [key, child] of Object.entries(obj)) {
				if (key === "value" || key === "autoPalette") continue;

				// Check if this child node has autoPalette: true and a base value
				if (
					child &&
					typeof child === "object" &&
					child.autoPalette === true &&
					child.base &&
					child.base.value
				) {
					const baseValue = child.base.value;
					const scale = generateOklchScale(baseValue);

					// Remove autoPalette flag and base token
					delete child.autoPalette;
					delete child.base;

					// Add generated shade tokens
					for (const [shade, value] of Object.entries(scale)) {
						child[shade] = { value };
					}
				}

				walkTokens(child);
			}
		};

		walkTokens(dictionary);
		return dictionary;
	},
});

/**
 * List of themes to build
 * 1) Add your new theme here in order to have it show up in the dropdown
 */
const AVAILABLE_THEMES = ["wireframe", "grantcodes", "todomap", "grantina"];

/**
 * Look for args passed on the command line
 * 1) Used to build a single theme if needed
 * 2) Pass in the theme name as an argument
 * 3) If no argument is passed, build all themes
 */
const args = minimist(process.argv.slice(2));
const theme = args.theme;

/**
 * Helper function to check if token is from tier-2 or tier-3
 * 1) Used to determine if the token should be included in the theme tokens to apply `theme` prefix
 */
const isHigherTierToken = (filePath) => {
	if (!filePath) return false;
	const isHigherTier =
		filePath.includes("tier-2-usage") || filePath.includes("tier-3-components");
	return isHigherTier;
};

/**
 * Transform shadow tokens
 * 1) Used to transform the individual shadow tokens into a single box-shadow-sm, box-shadow-md, etc. with x, y, blur, spread, and color concatenated
 */
const transformTypographyTokens = (dictionary, themeTokens) => {
  const typographyGroups = dictionary.allTokens.filter(
    (p) =>
      isHigherTierToken(p.filePath) &&
      p.path[0] === 'typography'
  ).reduce((groups, token) => {
    const style = token.path[1]; // extract typography.{style}
    if (!groups[style]) groups[style] = {};
    groups[style][token.path[2]] = token.value;
    return groups;
  }, {});

  Object.keys(typographyGroups).forEach((style) => {
    const group = typographyGroups[style];
    if (group['font-family'] && group['font-weight'] && group['font-size'] && group['line-height']) {
      const shorthand = `${group['font-weight']} ${group['font-size']}/${group['line-height']} ${group['font-family']}`;
      themeTokens.push(`  --g-theme-typography-${style}: ${shorthand};`);
    }
  });
};

const transformShadowTokens = (dictionary, size, themeTokens) => {
	const shadowProps = dictionary.allTokens.filter(
		(p) =>
			isHigherTierToken(p.filePath) &&
			p.path[0] === "box-shadow" &&
			p.path[1] === size,
	);

	const x = shadowProps.find((p) => p.path[2] === "x")?.value || "0px";
	const y = shadowProps.find((p) => p.path[2] === "y")?.value || "0px";
	const blur = shadowProps.find((p) => p.path[2] === "blur")?.value || "0px";
	const spread =
		shadowProps.find((p) => p.path[2] === "spread")?.value || "0px";
	const color =
		shadowProps.find((p) => p.path[2] === "color")?.value || "transparent";

	/* 1 */
	themeTokens.push(
		`  --g-theme-box-shadow-${size}: ${x} ${y} ${blur} ${spread} ${color};`,
	);
};

/**
 * Transform line height tokens
 * 1) Used to transform the line height tokens to a unitless value for CSS by dividing the line height by the font size
 */
const transformLineHeight = (
	dictionary,
	prop,
	outputArray,
	formatTokenName,
) => {
	const cleanPath = prop.path
		.map((segment) =>
			segment.startsWith("@") ? segment.substring(1) : segment,
		)
		.filter((segment) => segment !== "")
		.join("-");

	// For tier-1 tokens (typography.line-height.16), find matching font-size (typography.font-size.16)
	// For tier-2/3 tokens (typography.headline-lg.line-height), find matching font-size (typography.headline-lg.font-size)
	const isTier1 =
		prop.path.length === 3 &&
		prop.path[0] === "typography" &&
		prop.path[1] === "line-height";
	let fontSizePath;
	if (isTier1) {
		// Tier-1: typography.line-height.16 -> typography.font-size.16
		fontSizePath = ["typography", "font-size", prop.path[2]];
	} else {
		// Tier-2/3: typography.headline-lg.line-height -> typography.headline-lg.font-size
		fontSizePath = [...prop.path.slice(0, -1), "font-size"];
	}

	const fontSizeProp = dictionary.allTokens.find(
		(p) => p.path.join(".") === fontSizePath.join("."),
	);

	const hasUnit = prop.value.endsWith("px") || prop.value.endsWith("rem");
	const numericValue = parseFloat(prop.value);

	// If already unitless (no px/rem suffix), pass through as-is — it's already the intended ratio
	if (!hasUnit && !isNaN(numericValue)) {
		outputArray.push(`  ${formatTokenName(cleanPath, prop)}: ${prop.value};`);
		return;
	}

	// Parse line-height value to pixels for ratio calculation
	let lineHeightPx;
	if (prop.value.endsWith("px")) {
		lineHeightPx = parseFloat(prop.value.replace("px", ""));
	} else if (prop.value.endsWith("rem")) {
		lineHeightPx = parseFloat(prop.value.replace("rem", "")) * 16;
	} else {
		lineHeightPx = parseFloat(prop.value);
	}

	if (fontSizeProp) {
		// Found matching font-size - use it for calculation
		let fontSizePx;
		if (fontSizeProp.value.endsWith("px")) {
			fontSizePx = parseFloat(fontSizeProp.value.replace("px", ""));
		} else if (fontSizeProp.value.endsWith("rem")) {
			fontSizePx = parseFloat(fontSizeProp.value.replace("rem", "")) * 16;
		} else {
			fontSizePx = parseFloat(fontSizeProp.value);
		}

		if (fontSizePx > 0) {
			const unitlessValue = (lineHeightPx / fontSizePx).toFixed(2);
			outputArray.push(
				`  ${formatTokenName(cleanPath, prop)}: ${unitlessValue};`,
			);
			return;
		}
	} else if (isTier1 && lineHeightPx > 0) {
		// For tier-1 tokens without matching font-size, use 16px as base font-size
		const BASE_FONT_SIZE = 16;
		const unitlessValue = (lineHeightPx / BASE_FONT_SIZE).toFixed(2);
		outputArray.push(
			`  ${formatTokenName(cleanPath, prop)}: ${unitlessValue};`,
		);
		return;
	}

	// Fallback: output as-is if we can't calculate
	outputArray.push(`  ${formatTokenName(cleanPath, prop)}: ${prop.value};`);
};

/**
 * Format variables
 * 1) Used to format the inner contents of the :root or .[theme-name] ruleset
 */
const formatVariables = (dictionary) => {
	const processedShadows = new Set();
	const tier1Tokens = [];
	const themeTokens = [];

	/**
	 * Format token global prefix and tier 2/3 identifier
	 * 1) If the token is from tier-2 or tier-3, prefix it with `g-theme-`
	 * 2) Otherwise, prefix it with `g-`
	 */
	const formatTokenName = (cleanPath, prop) => {
		if (isHigherTierToken(prop.filePath)) {
			return `--g-theme-${cleanPath}`;
		}
		return `--g-${cleanPath}`;
	};

	/**
	 * Get all box-shadow values from tier 2/3
	 * 1) Used to determine which box-shadow values to transform into a single box-shadow-sm, box-shadow-md, etc.
	 */
	const shadowSizes = dictionary.tokens.shadow
		? Object.keys(dictionary.tokens.shadow)
				.map((key) => key.split("-")[0])
				.filter((value, index, self) => self.indexOf(value) === index) // Get unique sizes
		: [];

	/**
	 * Iterate over all tokens and format them
	 *
	 */

    transformTypographyTokens(dictionary, themeTokens);

    dictionary.allTokens.forEach((prop) => {
		/**
		 * 1) Always include z-index and size tokens from core
		 */
		if (prop.path[0] === "z-index") {
			const cleanPath = prop.path
				.map((segment) =>
					segment.startsWith("@") ? segment.substring(1) : segment,
				)
				.filter((segment) => segment !== "")
				.join("-");
			tier1Tokens.push(`  ${formatTokenName(cleanPath, prop)}: ${prop.value};`);
			return;
		}

		/**
		 * Handle box-shadow token transformations
		 * If the token is from tier-2 or tier-3 and is a box-shadow, transform it into a single box-shadow-sm, box-shadow-md, etc.
		 */
		if (
			isHigherTierToken(prop.filePath) &&
			prop.path[0] === "box-shadow" &&
			shadowSizes.includes(prop.path[1])
		) {
			const size = prop.path[1];
			if (processedShadows.has(size)) return;
			processedShadows.add(size);
			transformShadowTokens(dictionary, size, themeTokens);
		} else if (
			prop.path[0] === "typography" &&
			prop.path.includes("line-height")
		) {
			/**
			 * Handle line heights in typography (both tier-1 and tier-2/3)
			 * 1) Transform line-height tokens to unitless values by dividing by font-size
			 */
			const outputArray = isHigherTierToken(prop.filePath)
				? themeTokens
				: tier1Tokens;
			transformLineHeight(dictionary, prop, outputArray, formatTokenName);
		} else if (!prop.path.includes("box-shadow") || prop.path.length > 3) {
			/**
			 * Handle all other properties
			 * 1) If the token is not a box-shadow or typography token, format it as a normal token
			 */
			const cleanPath = prop.path
				.map((segment) =>
					segment.startsWith("@") ? segment.substring(1) : segment,
				)
				.filter((segment) => segment !== "")
				.join("-");

			const token = `  ${formatTokenName(cleanPath, prop)}: ${prop.value};`;
			if (isHigherTierToken(prop.filePath)) {
				themeTokens.push(token);
			} else {
				tier1Tokens.push(token);
			}
		}
	});

	return [...new Set([...tier1Tokens, ...themeTokens])].join("\n");
};

/**
 * Transform shadow tokens for JSON format
 * Combines individual shadow properties into a single value
 */
const transformShadowTokensJSON = (dictionary, size) => {
	const shadowProps = dictionary.allTokens.filter(
		(p) =>
			isHigherTierToken(p.filePath) &&
			p.path[0] === "box-shadow" &&
			p.path[1] === size,
	);

	const x = shadowProps.find((p) => p.path[2] === "x")?.value || "0px";
	const y = shadowProps.find((p) => p.path[2] === "y")?.value || "0px";
	const blur = shadowProps.find((p) => p.path[2] === "blur")?.value || "0px";
	const spread =
		shadowProps.find((p) => p.path[2] === "spread")?.value || "0px";
	const color =
		shadowProps.find((p) => p.path[2] === "color")?.value || "transparent";

	return `${x} ${y} ${blur} ${spread} ${color}`;
};

/**
 * Generate a Theme-Specific Config
 * This accepts a theme parameter, which is used to control which set of
 * tokens to compile, and to define theme-specific compiled output.
 * @param {string} theme
 */
const getStyleDictionaryConfig = (theme) => {
	// Register the JSON formatter
	StyleDictionary.registerFormat({
		name: "json/flat/custom",
		format: function (dictionary) {
			const transformedTokens = {};

			/**
			 * Get all box-shadow values from tier 2/3
			 * 1) Used to determine which box-shadow values to transform into a single box-shadow-sm, box-shadow-md, etc.
			 */
			const shadowSizes = dictionary.tokens.shadow
				? Object.keys(dictionary.tokens.shadow)
						.map((key) => key.split("-")[0])
						.filter((value, index, self) => self.indexOf(value) === index) // Get unique sizes
				: [];

			// Process regular tokens
			dictionary.allTokens.forEach((token) => {
				// Remove the isHigherTierToken check to include all tokens
				if (token.path[0] === "box-shadow" && token.path.length > 2) return;
				const prefix = isHigherTierToken(token.filePath) ? "g-theme-" : "g-";
				transformedTokens[`${prefix}${token.path.join("-")}`] = token.value;
			});

			// Process shadow tokens
			shadowSizes.forEach((size) => {
				transformedTokens[`g-theme-box-shadow-${size}`] =
					transformShadowTokensJSON(dictionary, size);
			});

			return JSON.stringify(transformedTokens, null, 2);
		},
	});

	/**
	 * Register the CSS formatter
	 * 1) Used to format the inner contents of the .[theme-name] ruleset for Storybook only or if you want to define tokens using a theme name
	 */
	StyleDictionary.registerFormat({
		name: "css/variables-themed",
		format: function (dictionary) {
			return `.${theme} {\n${formatVariables(dictionary)}\n}\n`;
		},
	});

	/**
	 * Define the base pixel value for rem conversion
	 */
	const BASE_FONT_SIZE = 16; // Typically 16px = 1rem

	/**
	 * Register the size/px-to-rem transform
	 * 1) Used to convert px values to rem values
	 * 2) Match only properties with px values
	 * 3) Only transform if it's a valid px value
	 */
	StyleDictionary.registerTransform({
		name: "size/px-to-rem",
		type: "value",
		matcher: function (prop) {
			/* 2 */
			return (
				prop &&
				prop.value &&
				typeof prop.value === "string" &&
				prop.value.endsWith("px")
			);
		},
		transform: function (prop) {
			if (!prop || !prop.value) return prop.value;
			/* 3 */
			const pxValue = prop.value.trim();
			if (!pxValue.endsWith("px")) return prop.value;

			const pixels = parseFloat(pxValue);
			if (isNaN(pixels)) return prop.value;

			const remValue = Number((pixels / BASE_FONT_SIZE).toFixed(4)).toString();
			return `${remValue}rem`;
		},
	});

	/**
	 * Register the CSS formatter
	 * 1) Used to format the inner contents of the :root ruleset for Storybook only or if you want to define tokens with theme prefix
	 */
	StyleDictionary.registerFormat({
		name: "css/custom-variables",
		format: function (dictionary) {
			return `:root {\n${formatVariables(dictionary)}\n}`;
		},
	});

	/**
	 * Register the name/theme-prefix transform
	 * 1) Used to prefix the token name with the theme name
	 * 2) If the token is from tier-2 or tier-3, prefix it with `GTheme` for JS
	 * 3) Otherwise, prefix it with `G` for JS
	 */
	StyleDictionary.registerTransform({
		name: "name/theme-prefix",
		type: "name",
		transform: function (token) {
			const cleanPath = token.path
				.map((segment) =>
					segment.startsWith("@") ? segment.substring(1) : segment,
				)
				.filter((segment) => segment !== "")
				.join("-");

			/* 2 */
			if (isHigherTierToken(token.filePath)) {
				return `GTheme${cleanPath
					.split("-")
					.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
					.join("")}`;
			}

			/* 3 */
			return `G${cleanPath
				.split("-")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join("")}`;
		},
	});

	/**
	 * Register the custom/css transform group
	 */
	StyleDictionary.registerTransformGroup({
		name: "custom/css",
		transforms: ["attribute/cti", "name/kebab", "size/px-to-rem"],
	});

	/**
	 * Register the custom/js transform group
	 */
	StyleDictionary.registerTransformGroup({
		name: "custom/js",
		transforms: ["attribute/cti", "name/theme-prefix", "size/px-to-rem"],
	});

	/**
	 * Define the config
	 * 1) Used to define the platforms, prefixes, etc. to build the tokens with/for
	 */
	const config = {
		preprocessors: ["auto-palette"],
		source: [
			`./tokens/core/**/*.json`,
			`./tokens/${theme}/tier-1-definitions/**/*.json`,
			`./tokens/${theme}/tier-2-usage/**/*.json`,
			`./tokens/${theme}/tier-3-components/**/*.json`,
		],
		log: {
			// Set the log level to show errors, warnings, and info messages
			verbosity: "verbose",
		},
		platforms: {
			ts: {
				transformGroup: "custom/js",
				prefix: "G",
				buildPath: `./dist/js/${theme}/`,
				filter: {
					attributes: {
						category: "theme",
					},
				},
				files: [
					{
						destination: "style-dictionary.js",
						format: "javascript/es6",
					},
					{
						destination: "style-dictionary.d.ts",
						format: "typescript/es6-declarations",
					},
				],
			},
			css: {
				transformGroup: "custom/css",
				prefix: "g",
				buildPath: `./dist/css/${theme}/`,
				files: [
					{
						destination: "tokens.css",
						format: "css/custom-variables",
					},
					{
						destination: `${theme}.css`,
						format: "css/variables-themed",
					},
				],
			},
			json: {
				transformGroup: "custom/css",
				prefix: "g",
				buildPath: `./dist/json/${theme}/`,
				files: [
					{
						destination: "tokens.json",
						format: "json/flat/custom",
					},
				],
			},
		},
	};

	return config;
};

/**
 * Parse a built tokens.css file to extract a map of CSS variable name -> value.
 * Works on both :root {} and .theme {} rulesets.
 * @param {string} cssPath - Path to the built CSS file
 * @returns {Map<string, string>}
 */
const parseLightTokenMap = (cssPath) => {
	const map = new Map();
	const css = readFileSync(cssPath, "utf-8");
	const re = /\s*(--[\w-]+):\s*(.+?);/g;
	for (const match of css.matchAll(re)) {
		map.set(match[1], match[2]);
	}
	return map;
};

/**
 * Format only the tier-2/tier-3 (theme-prefixed) variables from a dark dictionary.
 * Only outputs tokens whose resolved value differs from the light build.
 * @param {object} dictionary - Dark StyleDictionary dictionary
 * @param {Map<string, string>} lightTokenMap - Light token values for comparison
 */
const formatDarkVariables = (dictionary, lightTokenMap) => {
	const processedShadows = new Set();
	const darkTokens = [];

	const formatTokenName = (cleanPath, prop) => {
		if (isHigherTierToken(prop.filePath)) {
			return `--g-theme-${cleanPath}`;
		}
		return `--g-${cleanPath}`;
	};

	const shadowSizes = dictionary.tokens.shadow
		? Object.keys(dictionary.tokens.shadow)
				.map((key) => key.split("-")[0])
				.filter((value, index, self) => self.indexOf(value) === index)
		: [];

	dictionary.allTokens.forEach((prop) => {
		/* Only include tier-2/tier-3 tokens — dark mode only overrides theme-level tokens */
		if (!isHigherTierToken(prop.filePath)) return;

		if (
			prop.path[0] === "box-shadow" &&
			shadowSizes.includes(prop.path[1])
		) {
			const size = prop.path[1];
			if (processedShadows.has(size)) return;
			processedShadows.add(size);

			/* Build the composed shadow value and compare to light */
			const shadowProps = dictionary.allTokens.filter(
				(p) =>
					isHigherTierToken(p.filePath) &&
					p.path[0] === "box-shadow" &&
					p.path[1] === size,
			);
			const x = shadowProps.find((p) => p.path[2] === "x")?.value || "0px";
			const y = shadowProps.find((p) => p.path[2] === "y")?.value || "0px";
			const blur = shadowProps.find((p) => p.path[2] === "blur")?.value || "0px";
			const spread = shadowProps.find((p) => p.path[2] === "spread")?.value || "0px";
			const color = shadowProps.find((p) => p.path[2] === "color")?.value || "transparent";
			const darkValue = `${x} ${y} ${blur} ${spread} ${color}`;
			const lightValue = lightTokenMap.get(`--g-theme-box-shadow-${size}`);

			if (darkValue !== lightValue) {
				transformShadowTokens(dictionary, size, darkTokens);
			}
		} else if (
			prop.path[0] === "typography" &&
			prop.path.includes("line-height")
		) {
			const cleanPath = prop.path
				.map((s) => (s.startsWith("@") ? s.substring(1) : s))
				.filter((s) => s !== "")
				.join("-");
			const varName = formatTokenName(cleanPath, prop);
			if (prop.value !== lightTokenMap.get(varName)) {
				transformLineHeight(dictionary, prop, darkTokens, formatTokenName);
			}
		} else if (!prop.path.includes("box-shadow") || prop.path.length > 3) {
			const cleanPath = prop.path
				.map((segment) =>
					segment.startsWith("@") ? segment.substring(1) : segment,
				)
				.filter((segment) => segment !== "")
				.join("-");

			const varName = formatTokenName(cleanPath, prop);
			/* Only emit if the dark value differs from the light value */
			if (prop.value !== lightTokenMap.get(varName)) {
				darkTokens.push(`  ${varName}: ${prop.value};`);
			}
		}
	});

	return [...new Set(darkTokens)].join("\n");
};

/**
 * Generate a Dark Theme Config
 * Sources the light tokens + dark overlay tokens (dark overrides light via file order).
 * Only outputs a dark.css file with media query and class-based selectors.
 * @param {string} theme
 * @param {Map<string, string>} lightTokenMap - Light token values for diff comparison
 */
const getDarkStyleDictionaryConfig = (theme, lightTokenMap) => {
	/**
	 * Register the dark CSS formatter
	 * Wraps dark overrides in @media (prefers-color-scheme: dark) and .dark class
	 */
	StyleDictionary.registerFormat({
		name: "css/variables-dark",
		format: function (dictionary) {
			const vars = formatDarkVariables(dictionary, lightTokenMap);
			return [
				`/* Dark mode overrides for ${theme} theme */`,
				`/* Auto-detect: respects OS/browser preference unless .light is set */`,
				`@media (prefers-color-scheme: dark) {`,
				`  :root:not(.light) {`,
				vars.split("\n").map((line) => `  ${line}`).join("\n"),
				`  }`,
				`}`,
				``,
				`/* Manual override: force dark mode on any element or subtree */`,
				`.dark {`,
				vars,
				`}`,
				``,
			].join("\n");
		},
	});

	const BASE_FONT_SIZE = 16;

	StyleDictionary.registerTransform({
		name: "size/px-to-rem",
		type: "value",
		matcher: function (prop) {
			return (
				prop &&
				prop.value &&
				typeof prop.value === "string" &&
				prop.value.endsWith("px")
			);
		},
		transform: function (prop) {
			if (!prop || !prop.value) return prop.value;
			const pxValue = prop.value.trim();
			if (!pxValue.endsWith("px")) return prop.value;
			const pixels = parseFloat(pxValue);
			if (isNaN(pixels)) return prop.value;
			const remValue = Number((pixels / BASE_FONT_SIZE).toFixed(4)).toString();
			return `${remValue}rem`;
		},
	});

	StyleDictionary.registerTransformGroup({
		name: "custom/css",
		transforms: ["attribute/cti", "name/kebab", "size/px-to-rem"],
	});

	return {
		preprocessors: ["auto-palette"],
		source: [
			`./tokens/core/**/*.json`,
			`./tokens/${theme}/tier-1-definitions/**/*.json`,
			`./tokens/${theme}/tier-2-usage/**/*.json`,
			`./tokens/${theme}/tier-3-components/**/*.json`,
			/* Dark overlay tokens override light values via Style Dictionary merge */
			`./tokens/${theme}/dark/**/*.json`,
		],
		log: {
			verbosity: "verbose",
		},
		platforms: {
			css: {
				transformGroup: "custom/css",
				prefix: "g",
				buildPath: `./dist/css/${theme}/`,
				files: [
					{
						destination: "dark.css",
						format: "css/variables-dark",
					},
				],
			},
		},
	};
};

/**
 * Check if a theme has dark tokens
 * @param {string} themeName
 * @returns {boolean}
 */
const hasDarkTokens = (themeName) => {
	return existsSync(`./tokens/${themeName}/dark`);
};

/**
 * Build light.css for a theme — outputs all --g-theme-* variables scoped to .light { }.
 * This enables forcing light mode on any element or subtree within a .dark parent.
 * Reads the already-built tokens.css to extract theme-scoped variables.
 * @param {string} themeName
 */
const buildLightCSS = (themeName) => {
	const tokensCssPath = `./dist/css/${themeName}/tokens.css`;
	const css = readFileSync(tokensCssPath, "utf-8");

	/* Extract only --g-theme-* variables (tier-2/tier-3) — those are what dark mode overrides */
	const lines = [];
	const re = /\s*(--g-theme-[\w-]+):\s*(.+?);/g;
	for (const match of css.matchAll(re)) {
		lines.push(`  ${match[1]}: ${match[2]};`);
	}

	const output = [
		`/* Light mode override for ${themeName} theme */`,
		`/* Force light mode on any element or subtree within a .dark parent */`,
		`.light {`,
		[...new Set(lines)].join("\n"),
		`}`,
		``,
	].join("\n");

	const outDir = `./dist/css/${themeName}/`;
	mkdirSync(outDir, { recursive: true });
	writeFileSync(`${outDir}light.css`, output, "utf-8");
	console.log(`✔︎ dist/css/${themeName}/light.css`);
};

/**
 * Build the tokens
 * 1) If no theme is specified, build all themes
 * 2) Otherwise, build the specified theme
 * 3) For each theme, also build dark mode CSS if dark tokens exist
 */
const buildTheme = async (themeName) => {
	console.log(`\n🏗️ Building ${themeName.toUpperCase()} theme`);
	const themeConfig = getStyleDictionaryConfig(themeName);
	const StyleDictionaryExtended = new StyleDictionary(themeConfig);
	await StyleDictionaryExtended.buildAllPlatforms();

	console.log(`☀️ Building ${themeName.toUpperCase()} light override`);
	buildLightCSS(themeName);

	if (hasDarkTokens(themeName)) {
		console.log(`🌙 Building ${themeName.toUpperCase()} dark theme`);
		const lightTokenMap = parseLightTokenMap(`./dist/css/${themeName}/tokens.css`);
		const darkConfig = getDarkStyleDictionaryConfig(themeName, lightTokenMap);
		const DarkStyleDictionary = new StyleDictionary(darkConfig);
		await DarkStyleDictionary.buildAllPlatforms();
	}
};

if (!theme) {
	console.log("🚧 No theme specified, building all themes...");
	for (const themeName of AVAILABLE_THEMES) {
		await buildTheme(themeName);
	}
} else {
	await buildTheme(theme);
}
