import type { AstroIntegration } from "astro";
import { readFileSync } from "node:fs";
import { getViteConfig } from "./vite-config.js";

export interface AstroUiOptions {
	blocks?: boolean;
}

export default function integration(options: AstroUiOptions = {}): AstroIntegration {
	return {
		name: "@grantcodes/astro",
		hooks: {
			"astro:config:setup": ({ addRenderer, updateConfig, injectScript, config }) => {
				injectScript(
					"head-inline",
					readFileSync(new URL("../shims/client-shim.ts", import.meta.url), "utf-8")
				);
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
					(noExternal.includes("@grantcodes/ui") || noExternal.includes("@grantcodes/astro-blocks"))
				) {
					console.warn(
						"[@grantcodes/astro] WARNING: Your astro.config.mjs has `resolve.noExternal` which duplicates `ssr.noExternal`. This is a known config bug. Remove `resolve.noExternal` to avoid unexpected behavior."
					);
				}
			},
		},
	};
}
