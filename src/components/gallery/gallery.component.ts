import { LitElement, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import galleryStyles from "./gallery.scss?inline";

@customElement("grantcodes-gallery")
export class GrantCodesGallery extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(galleryStyles)];

	@queryAssignedElements({ selector: "grantcodes-gallery-image" })
	images!: HTMLElement[];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'

	render() {
		return html`
      <div class="gallery">
        <slot class="gallery__slot"></slot>
      </div>
    `;
	}
}
