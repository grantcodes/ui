import { GrantCodesGalleryImage } from "./gallery-image.component.js";

export * from "./gallery-image.component.js";
export default GrantCodesGalleryImage;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-gallery-image": GrantCodesGalleryImage;
	}
}
