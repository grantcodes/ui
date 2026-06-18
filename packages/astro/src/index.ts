import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { getViteConfig } from "./vite-config.js";
import type { AstroOgImagesOptions } from "./og-images.js";
import { getOgHooks, resolveOgOptions } from "./og-images.js";
import { resolveTheme, type UiColorScheme, type UiThemeName } from "./themes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TYPES_PATH = resolve(__dirname, "generated", "ui-component-props.d.ts");

export interface UiOptions {
	theme?: UiThemeName;
	colorScheme?: UiColorScheme;
	ogImages?: boolean | AstroOgImagesOptions;
}

export default function integration(options?: UiOptions): AstroIntegration {
	const theme = resolveTheme(options?.theme ?? "grantcodes", options?.colorScheme ?? "dark");
	const resolved = resolveOgOptions({
		ogImages: options?.ogImages,
		colorScheme: options?.colorScheme,
		themeDefaults: theme,
	});
	const ogHooks = resolved.enabled ? getOgHooks(resolved.options) : {};

	return {
		name: "@grantcodes/astro",
			hooks: {
			"astro:config:setup": ({ addRenderer, updateConfig, injectScript, config }) => {
				if (options?.theme) {
					injectScript("page-ssr", `import '${theme.stylesheetImport}';`);
				}
				injectScript("before-hydration", "import '@grantcodes/astro/hydration-support';");
				addRenderer({
					name: "@grantcodes/astro",
					serverEntrypoint: "@grantcodes/astro/server",
					clientEntrypoint: "@grantcodes/astro/client",
				});
				updateConfig({ vite: getViteConfig() });
			},
			"astro:config:done": ({ config, injectTypes }) => {
				const noExternal = config.vite?.resolve?.noExternal;
				if (
					Array.isArray(noExternal) &&
					noExternal.includes("@grantcodes/ui")
				) {
					console.warn(
						"[@grantcodes/astro] WARNING: Your astro.config.mjs has `resolve.noExternal` including `@grantcodes/ui`, which duplicates integration-managed `ssr.noExternal`. Remove `resolve.noExternal` to avoid unexpected behavior."
					);
				}
				// Inject generated type declarations for UI component SSR constructor imports
				try {
					const typesContent = readFileSync(TYPES_PATH, "utf-8");
					injectTypes({
						filename: "grantcodes-ui-component-props.d.ts",
						content: typesContent,
					});
				} catch (err) {
					console.warn(
						"[@grantcodes/astro] WARNING: Could not load generated UI component types; SSR constructor imports may lack prop checking.",
						err,
					);
				}
			},
			...ogHooks,
		},
	};
}

export type { AstroOgImagesOptions } from "./og-images.js";
export type { UiThemeName, UiColorScheme } from "./themes.js";
