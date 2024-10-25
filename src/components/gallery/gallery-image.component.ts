import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import galleryStyles from "./gallery.scss?inline";

@customElement("grantcodes-gallery-image")
export class GrantCodesGalleryImage extends LitElement {
	static styles = [unsafeCSS(galleryStyles)];

	@property({ type: Number })
	width = 0;

	@property({ type: Number })
	height = 0;

	@property({ type: String })
	src = "";

	@property({ type: String })
	alt = "";

	@property({ type: String })
	caption = "";

	@property({ type: String })
	thumbnail = "";

	captionTemplate() {
		if (!this.caption) {
			return;
		}

		return html`
      <figcaption class="gallery__image__caption">${this.caption}</figcaption>
    `;
	}

	render() {
		return html`
      <figure class="gallery__image">
        <img
          width=${this.width}
          height=${this.height}
          src=${this.src}
          alt=${this.alt}
          loading="lazy"
        />
        ${this.captionTemplate()}
      </figure>
    `;
	}
}
