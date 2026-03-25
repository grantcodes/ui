/**
 * Type declarations for CSS files imported with `{ type: "css" }`.
 *
 * Usage: Add to your tsconfig.json compilerOptions.types or reference directly:
 *   /// <reference types="@grantcodes/ui/css-import-attributes" />
 *
 * At build time, the Vite plugin returns a CSSStyleSheet (client) or
 * a Lit CSSResult (SSR). Both are accepted by Lit's `static styles`.
 */
declare module "*.css" {
	const styles: CSSStyleSheet;
	export default styles;
}
