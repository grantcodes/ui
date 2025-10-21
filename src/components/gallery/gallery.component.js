import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { galleryStyles } from "./gallery.styles.js";

export class GrantCodesGallery extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [galleryStyles];

	/** @type {any[]} */
	images = [];

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

customElements.define("grantcodes-gallery", GrantCodesGallery);
