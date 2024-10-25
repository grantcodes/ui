import { GrantCodesGallery } from "./gallery.component.js";

export * from "./gallery.component.js";
export default GrantCodesGallery;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-gallery": GrantCodesGallery;
	}
}
