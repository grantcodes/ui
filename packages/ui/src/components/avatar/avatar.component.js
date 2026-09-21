import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import avatarStyles from './avatar.css' with { type: 'css' };

// Mirrors the 3rem square in avatar.css (--g-spacing-2xl); the image fills that box.
const AVATAR_SIZE = 48;

export class GrantCodesAvatar extends LitElement {
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
     * Optional initials, used when there is no src set
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
    if (this.name) {
      const [first = '', second = ''] = this.name.trim().split(' ');
      const firstInitial = first ? first[0] : '';
      const secondInitial = second ? second[0] : '';
      return `${firstInitial}${secondInitial}`;
    }
    return '';
  }

  getAlt() {
    if (this.alt) return this.alt;
    return this.name || this.initials || '';
  }

  /** @returns {import('lit').TemplateResult} */
  getImg() {
    if (this.src) {
      return html`<img
        src=${this.src}
        alt=${this.getAlt()}
        width=${AVATAR_SIZE}
        height=${AVATAR_SIZE}
        loading="lazy"
        decoding="async"
      />`;
    }
    return html``;
  }

  /** @returns {import('lit').TemplateResult} */
  render() {
    const content = this.src
      ? this.getImg()
      : html`<span class="avatar__initials">${this.getInitials()}</span>`;
    const sizeClass = this.size ? `avatar--${this.size}` : '';
    return html` <div class="avatar ${sizeClass}">${content}</div> `;
  }
}
