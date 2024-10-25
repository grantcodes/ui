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
				"react",
				"lit",
				"@lit/react",
				"lit/decorators.js",
				"lit/static-html.js",
			],
			output: {
				assetFileNames: "[name].[ext]",
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
