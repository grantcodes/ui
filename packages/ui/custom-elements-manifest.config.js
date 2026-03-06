import { cemValidatorPlugin } from "@wc-toolkit/cem-validator";
import { cemSorterPlugin } from "@wc-toolkit/cem-sorter";
import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance";

/** @type {import('@custom-elements-manifest/analyzer').AnalyzerConfig} */
export default {
	globs: ["src/components/**/*.component.js", "src/components/**/*.js"],
	exclude: [
		"**/*.stories.js",
		"**/*.stories.jsx",
		"**/*.test.js",
		"**/*.test.jsx",
		"**/*.react.js",
		"**/*.css",
		"**/*.scss",
		"**/*.styles.js",
	],
	litelement: true,
	plugins: [
		cemInheritancePlugin(),
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
