// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "vite";

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
				/node_modules\/lit/,
				/node_modules\/@lit/,
				/node_modules\/react/,
				/node_modules\/classnames/,
				/node_modules\/shiki/,
				/node_modules\/lucide/,
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
		},
		cssCodeSplit: true,
	},
});
