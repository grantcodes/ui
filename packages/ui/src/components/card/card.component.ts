import { html, LitElement } from 'lit';
import cardStyles from './card.css' with { type: 'css' };

export class GrantCodesCard extends LitElement {
  declare hasFooter: boolean;
  declare hasHeader: boolean;

  static properties = {
    hasHeader: { type: Boolean, reflect: true },
    hasFooter: { type: Boolean, reflect: true },
  };

  static styles = [cardStyles];

  constructor() {
    super();
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
