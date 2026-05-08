import type { AstroIntegration } from "astro";
import { getViteConfig } from "./vite-config.js";
import type { AstroOgImagesOptions } from "./og-images.js";
import { getOgHooks, resolveOgOptions } from "./og-images.js";
import { resolveTheme, type UiColorScheme, type UiThemeName } from "./themes.js";

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
			"astro:config:done": ({ config }) => {
				const noExternal = config.vite?.resolve?.noExternal;
				if (
					Array.isArray(noExternal) &&
					noExternal.includes("@grantcodes/ui")
				) {
					console.warn(
						"[@grantcodes/astro] WARNING: Your astro.config.mjs has `resolve.noExternal` including `@grantcodes/ui`, which duplicates integration-managed `ssr.noExternal`. Remove `resolve.noExternal` to avoid unexpected behavior."
					);
				}
			},
			...ogHooks,
		},
	};
}

export type { AstroOgImagesOptions } from "./og-images.js";
export type { UiThemeName, UiColorScheme } from "./themes.js";
