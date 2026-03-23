import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";

/**
 * Vite plugin that handles CSS import attributes (`with { type: 'css' }`).
 *
 * When a JS/TS file imports a CSS file with `with { type: 'css' }`,
 * this plugin transforms it into a module that exports a CSSStyleSheet,
 * which is what Lit's `static styles` expects.
 *
 * Unlike @arcmantle/vite-plugin-import-css-sheet, this uses resolved
 * absolute paths for virtual module IDs, avoiding URL issues with
 * relative paths like `../../` or subpath imports like `#styles/`.
 */
function cssImportAttributes() {
	const virtualPrefix = "\0css-sheet:";
	const virtualModules = new Map();

	const jsExts = new Set(["js", "mjs", "jsx", "ts", "mts", "tsx"]);

	return {
		enforce: "pre",
		name: "css-import-attributes",

		async resolveId(source, importer, options) {
			if (!source.endsWith(".css") || !importer) return;

			// Strip query strings from importer
			const cleanImporter = importer.split("?")[0];
			const ext = cleanImporter.split(".").pop();
			if (!jsExts.has(ext)) return;

			// Read the importer to check for `with { type: 'css' }`
			let importerContent;
			try {
				importerContent = await readFile(cleanImporter, "utf-8");
			} catch {
				return;
			}

			// Check if the import uses CSS import attributes
			const escapedSource = source.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const regex = new RegExp(
				escapedSource +
					`['"] *(?:with|assert) *{ *type: *['"]css['"]`,
			);
			if (!regex.test(importerContent)) return;

			// Resolve to absolute path
			const resolved = (await this.resolve(source, importer, options))
				?.id;
			if (!resolved) return;

			// Use absolute path as virtual module ID — URL-safe
			const virtualId = virtualPrefix + resolved;
			virtualModules.set(virtualId, resolved);
			return virtualId;
		},

		async load(id) {
			if (!id.startsWith(virtualPrefix)) return;

			const realPath = virtualModules.get(id);
			if (!realPath) return;

			const css = await readFile(realPath, "utf-8");
			this.addWatchFile(realPath);

			// Escape backticks, backslashes, and dollar signs for template literal
			const escaped = css
				.replace(/\\/g, "\\\\")
				.replace(/`/g, "\\`")
				.replace(/\$/g, "\\$");

			return (
				`const css = \`${escaped}\`;\n` +
				"const sheet = new CSSStyleSheet();\n" +
				"sheet.replaceSync(css);\n" +
				"export default sheet;\n"
			);
		},
	};
}

export default defineConfig({
	plugins: [cssImportAttributes()],
	build: {
		lib: {
			entry: "src/main.js",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["lit", "@grantcodes/style-dictionary"],
		},
	},
});
