import { setCustomElementsManifest } from "@storybook/web-components-vite";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import { withThemeByClassName } from "@storybook/addon-themes";
import manifest from "../custom-elements.json" with { type: "json" };

setCustomElementsManifest(manifest);

setStorybookHelpersConfig({});

// Available themes
const THEMES = {
	grantcodes: "grantcodes",
	grantina: "grantina",
	todomap: "todomap",
	wireframe: "wireframe",
};

// Enable/disable theme CSS files
const toggleThemeCSS = (theme) => {
	if (typeof document === "undefined") return;

	Object.keys(THEMES).forEach((themeName) => {
		const link = document.getElementById(`theme-${themeName}`);
		if (link) {
			link.disabled = themeName !== theme;
		}
	});

	// Update the theme attribute
	document.documentElement.setAttribute("data-theme", theme);
};

// Apply color scheme class to <html>
const applyColorScheme = (scheme) => {
	if (typeof document === "undefined") return;
	const html = document.documentElement;
	html.classList.remove("dark", "light");
	if (scheme === "dark" || scheme === "light") {
		html.classList.add(scheme);
	}
	// "auto" = no class, lets @media (prefers-color-scheme) take effect
};

const preview = {
	parameters: {
		layout: "padded",
		controls: {
			expanded: true,
		},
	},
	globalTypes: {
		colorScheme: {
			description: "Color scheme (light/dark mode)",
			toolbar: {
				title: "Color Scheme",
				icon: "mirror",
				items: [
					{ value: "auto", title: "Auto (System)" },
					{ value: "light", title: "Light" },
					{ value: "dark", title: "Dark" },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		colorScheme: "auto",
	},
	tags: ["autodocs"],
	decorators: [
		withThemeByClassName({
			themes: THEMES,
			defaultTheme: "grantcodes",
			parentSelector: "html",
		}),
		(Story, context) => {
			const theme = context.globals?.theme || "grantcodes";
			const colorScheme = context.globals?.colorScheme || "auto";

			if (typeof window !== "undefined") {
				requestAnimationFrame(() => {
					toggleThemeCSS(theme);
					applyColorScheme(colorScheme);
				});
			}

			return Story();
		},
	],
};

export default preview;
