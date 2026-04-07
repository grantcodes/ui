import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import galleryStyles from "./gallery.css" with { type: "css" };

export class GrantCodesGallery extends LitElement {
	static styles = [galleryStyles];

	static properties = {
		filmstrip: { type: Boolean, reflect: true },
		marquee: { type: Boolean, reflect: true },
	};

	/** @type {any[]} */
	images = [];

	constructor() {
		super();
		this.filmstrip = false;
		this.marquee = false;
	}

	firstUpdated() {
		const slot = this.renderRoot.querySelector(".gallery__slot");
		if (slot) {
			slot.addEventListener("slotchange", () => this._updateChildren());
			this._updateChildren();
		}
	}

	updated(changedProperties) {
		if (changedProperties.has("filmstrip")) {
			this._updateChildren();
		}
	}

	_updateChildren() {
		const slot = this.renderRoot.querySelector(".gallery__slot");
		if (!slot) return;
		const assigned = slot.assignedElements({ flatten: true });
		for (const el of assigned) {
			if (this.filmstrip) {
				el.setAttribute("filmstrip", "");
			} else {
				el.removeAttribute("filmstrip");
			}
		}
	}

	render() {
		return html`
      <div class="gallery">
        <slot class="gallery__slot"></slot>
      </div>
    `;
	}
}
