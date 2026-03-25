import { readFile } from "node:fs/promises";

/**
 * Vite plugin that handles CSS import attributes (`with { type: 'css' }`).
 *
 * When a JS/TS file imports a CSS file with `with { type: 'css' }`,
 * this plugin transforms it into a module that exports a CSSStyleSheet
 * (client) or a Lit CSSResult (SSR), compatible with Lit's `static styles`.
 *
 * The virtual module ID uses a `.js` suffix to prevent Vite's built-in
 * CSS plugin from intercepting and transforming the output.
 */
export function cssImportAttributes() {
	const virtualPrefix = "\0css-sheet:";
	const ssrPrefix = "\0css-sheet-ssr:";
	// Suffix prevents Vite's CSS plugin from treating this as a CSS module
	const virtualSuffix = ".js";

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

			// Encode SSR flag into virtual ID prefix so load() can detect it
			const prefix = options.ssr ? ssrPrefix : virtualPrefix;
			return prefix + resolved + virtualSuffix;
		},

		async load(id) {
			const isSsr = id.startsWith(ssrPrefix);
			const isClient = id.startsWith(virtualPrefix);
			if (!isSsr && !isClient) return;

			// Strip prefix and suffix to get real CSS path
			const prefix = isSsr ? ssrPrefix : virtualPrefix;
			const realPath = id.slice(prefix.length, -virtualSuffix.length);

			const css = await readFile(realPath, "utf-8");
			this.addWatchFile(realPath);

			// Escape backticks, backslashes, and dollar signs for template literal
			const escaped = css
				.replace(/\\/g, "\\\\")
				.replace(/`/g, "\\`")
				.replace(/\$/g, "\\$");

			if (isSsr) {
				// SSR: return a Lit CSSResult for proper Lit SSR integration
				return (
					`import { css } from "lit";\n` +
					`export default css\`${escaped}\`;\n`
				);
			}

			// Client: return a native CSSStyleSheet
			return (
				`const sheet = new CSSStyleSheet();\n` +
				`sheet.replaceSync(\`${escaped}\`);\n` +
				`export default sheet;\n`
			);
		},
	};
}
