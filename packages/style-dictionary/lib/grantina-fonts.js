import { fileURLToPath } from 'node:url'

function resolveFontPath(importPath) {
	try {
		const resolved = import.meta.resolve(importPath)
		return resolved.startsWith('file:') ? fileURLToPath(resolved) : resolved
	} catch {
		return fileURLToPath(new URL(`../node_modules/${importPath}`, import.meta.url))
	}
}

export const grantinaTitleFontPath = resolveFontPath(
	'@fontsource/vidaloka/files/vidaloka-latin-400-normal.woff',
)

export const grantinaBodyFontPath = resolveFontPath(
	'@fontsource/albert-sans/files/albert-sans-latin-500-normal.woff',
)
