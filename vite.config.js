// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "vite";

const fixFontUrls = () => ({
	name: "fix-font-urls",
	generateBundle(options, bundle) {
		for (const [fileName, file] of Object.entries(bundle)) {
			if (fileName.endsWith(".css")) {
				const cssDepth = fileName.split("/").length - 1;
				const pathPrefix = "../".repeat(cssDepth);

				// Replace url(/fonts/ with url(../fonts/
				file.source = file.source.replace(
					/url\(\/fonts\//g,
					`url(${pathPrefix}fonts/`,
				);
			}
		}
	},
});

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "src/main.ts"),
				react: resolve(__dirname, "src/react.ts"),
				"css/base": resolve(__dirname, "src/scss/base.scss"),
				"css/themes/grantcodes": resolve(
					__dirname,
					"src/scss/themes/grantcodes.scss",
				),
			},
			external: [
				"lit",
				/lit\/.*.js/,
				"lit/decorators.js",
				/lit\/directives\/.*/,
				"@lit/react",
				"classnames",
				"shiki/bundle/web",
				"lucide-static",
			],
			output: {
				assetFileNames: (assetInfo) => {
					if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
						return "fonts/[name].[ext]";
					}
					return "[name].[ext]";
				},
				entryFileNames: "[name].js",
				inlineDynamicImports: false,
				preserveModules: true,
				preserveModulesRoot: "src",
				format: "es",
				interop: "esModule",
				globals: {
					react: "React",
				},
			},
			treeshake: false,
			preserveEntrySignatures: "allow-extension",
			plugins: [fixFontUrls()],
		},
		cssCodeSplit: true,
	},
});
