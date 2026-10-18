import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import galleryStyles from './gallery.css' with { type: 'css' };

export class GrantCodesGalleryImage extends LitElement {
  declare alt: string;
  declare caption: string;
  declare height: number;
  declare src: string;
  declare thumbnail: string;
  declare width: number;

  static styles = [galleryStyles];

  static properties = {
    width: { type: Number },
    height: { type: Number },
    src: { type: String },
    alt: { type: String },
    caption: { type: String },
    thumbnail: { type: String },
  };

  constructor() {
    super();

    this.width = 0;
    this.height = 0;
    this.src = '';
    this.alt = '';
    this.caption = '';
    this.thumbnail = '';
  }

  captionTemplate() {
    if (!this.caption) {
      return html``;
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
