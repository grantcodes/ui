import { html, LitElement } from 'lit';
import cardStyles from './card.css' with { type: 'css' };

/**
 * @cssprop --g-card-padding - Content padding; slotted full-bleed content reads it to cancel the padding.
 */
export class GrantCodesCard extends LitElement {
  declare flat: boolean;
  declare hasFooter: boolean;
  declare hasHeader: boolean;

  static properties = {
    /** Drops the background, border, radius and shadow so the card sits flush on a surface that already frames it. */
    flat: { type: Boolean, reflect: true },
    hasHeader: { type: Boolean, reflect: true },
    hasFooter: { type: Boolean, reflect: true },
  };

  static styles = [cardStyles];

  constructor() {
    super();
    this.flat = false;
    this.hasHeader = false;
    this.hasFooter = false;
  }

  firstUpdated() {
    this._checkSlots();
  }

  _checkSlots() {
    this.hasHeader = this.querySelector(':scope > [slot="header"]') !== null;
    this.hasFooter = this.querySelector(':scope > [slot="footer"]') !== null;
  }

  render() {
    return html`
      <div class="card">
        <div class="card__header"><slot name="header" @slotchange=${this._checkSlots}></slot></div>
        <div class="card__content"><slot></slot></div>
        <div class="card__footer"><slot name="footer" @slotchange=${this._checkSlots}></slot></div>
      </div>
    `;
  }
}
