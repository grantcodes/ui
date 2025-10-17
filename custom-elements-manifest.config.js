import { cemValidatorPlugin } from "@wc-toolkit/cem-validator";
import { cemSorterPlugin } from "@wc-toolkit/cem-sorter";
import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance";
import { modulePathResolverPlugin } from "@wc-toolkit/module-path-resolver";

/** @type {import('@custom-elements-manifest/analyzer').AnalyzerConfig} */
export default {
	outdir: "dist",
	globs: ["src/components/**/*.component.ts", "src/components/**/*.ts"],
	exclude: [
		"**/*.stories.ts",
		"**/*.stories.tsx",
		"**/*.test.ts",
		"**/*.test.tsx",
		"**/*.react.ts",
		"**/*.css",
		"**/*.scss",
		"**/*.styles.ts",
	],
	litelement: true,
	plugins: [
		cemInheritancePlugin(),
		modulePathResolverPlugin({
			modulePathTemplate: (modulePath, name, tagName) =>
				modulePath.replace("src", "dist").replace(".ts", ".js"),
			definitionPathTemplate: (modulePath, name, tagName) =>
				`./dist/${tagName}/index.js`,
		}),
		cemSorterPlugin({
			deprecatedLast: true,
		}),
		cemValidatorPlugin({
			rules: {
				packageJson: {
					// NOTE: Not sure why, but throws an error if missing.
					customElementsProperty: "off",
				},
			},
		}),
	],
};
