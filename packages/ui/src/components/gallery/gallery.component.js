import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import galleryStyles from './gallery.css' with { type: 'css' };

export class GrantCodesGallery extends LitElement {
  static styles = [galleryStyles];

  static properties = {
    variant: { type: String, reflect: true },
  };

  /** @type {any[]} */
  images = [];

  constructor() {
    super();
    this.variant = 'default';
  }

  render() {
    // Only the filmstrip scrolls, so only it becomes a named, focusable region.
    const scrollable = this.variant === 'filmstrip';
    return html`
      <div class="gallery">
        <slot
          class="gallery__slot"
          tabindex=${scrollable ? '0' : nothing}
          role=${scrollable ? 'region' : nothing}
          aria-label=${scrollable ? 'Gallery' : nothing}
        ></slot>
      </div>
    `;
  }
}
