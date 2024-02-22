import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import galleryStyles from './gallery.scss?inline'

@customElement('grantcodes-gallery-image')
export class GrantCodesGalleryImage extends LitElement {
  static styles = [unsafeCSS(galleryStyles)]

  @property({ type: Number })
  width: number = 0

  @property({ type: Number })
  height: number = 0

  @property({ type: String })
  src: string = ''

  @property({ type: String })
  alt: string = ''

  @property({ type: String })
  caption: string = ''

  @property({ type: String })
  thumbnail: string = ''

  captionTemplate() {
    if (!this.caption) {
      return
    }

    return html`
      <figcaption class="gallery__image__caption">${this.caption}</figcaption>
    `
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
    `
  }
}
