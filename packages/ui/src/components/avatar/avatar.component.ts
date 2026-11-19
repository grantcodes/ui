import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import avatarStyles from './avatar.css' with { type: 'css' };

const graphemes = new Intl.Segmenter();

export class GrantCodesAvatar extends LitElement {
  declare alt: string;
  declare initials: string;
  declare name: string;
  declare size: string;
  declare src: string;

  static properties = {
    src: { type: String },
    name: { type: String },
    alt: { type: String },
    initials: { type: String },
    size: { type: String },
  };

  static styles = [avatarStyles];

  constructor() {
    super();

    /**
     * Image source for the avatar
     */
    this.src = '';
    /**
     * The full name of the person
     */
    this.name = '';
    /**
     * Alt attribute text
     */
    this.alt = '';
    /**
     * Optional initials, shown when there is no src or the image has not loaded
     */
    this.initials = '';
    /**
     * Size variant: 'small', 'medium', or 'large'
     */
    this.size = 'medium';
  }

  /**
   * Helper function to get initials from the name (if not already provided)
   *
   * @return {String}  First 2 initials of the passed name
   */
  getInitials() {
    if (this.initials) return this.initials;
    // Skip words that start with an emoji or symbol, and take whole graphemes (e.g. 'É', not half a flag).
    return this.name
      .split(/\s+/)
      .filter((word) => /^\p{L}/u.test(word))
      .slice(0, 2)
      .map((word) => graphemes.segment(word)[Symbol.iterator]().next().value?.segment ?? '')
      .join('');
  }

  getAlt() {
    if (this.alt) return this.alt;
    return this.name || this.initials || '';
  }

  /** @returns {import('lit').TemplateResult} */
  getImg() {
    if (this.src) {
      // A background image that fails to load paints nothing in every engine (an <img> or SVG
      // <image> paints a broken-image icon), so the initials underneath show through without JS.
      const url = this.src.replace(
        /["\\\n\r\f]/g,
        (char) => `\\${char.charCodeAt(0).toString(16)} `,
      );
      return html`<span class="avatar__image" style=${`background-image: url("${url}")`}></span>`;
    }
    return html``;
  }

  /** @returns {import('lit').TemplateResult} */
  render() {
    const label = this.getAlt();
    const sizeClass = this.size ? `avatar--${this.size}` : '';
    return html`<div
      class="avatar ${sizeClass}"
      role=${label ? 'img' : nothing}
      aria-label=${label || nothing}
    >
      <span class="avatar__initials" aria-hidden="true">${this.getInitials()}</span>
      ${this.getImg()}
    </div>`;
  }
}
