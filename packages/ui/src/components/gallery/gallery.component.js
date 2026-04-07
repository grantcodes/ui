import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import galleryStyles from "./gallery.css" with { type: "css" };

export class GrantCodesGallery extends LitElement {
	static styles = [galleryStyles];

	static properties = {
		variant: { type: String, reflect: true },
	};

	/** @type {any[]} */
	images = [];

	constructor() {
		super();
		this.variant = "default";
	}

	render() {
		return html`
      <div class="gallery">
        <slot class="gallery__slot"></slot>
      </div>
    `;
	}
}
