import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { SlotPresenceController } from '../../lib/slot-presence-controller.js';
import dialogStyles from './dialog.css' with { type: 'css' };

// Safari does not implement closedby; the attribute is only added when supported.
const supportsClosedBy =
  typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype;

export class GrantCodesDialog extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [dialogStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    dismissible: { type: Boolean },
    _hasHeader: { state: true },
    _hasFooter: { state: true },
  };

  constructor() {
    super();

    this.dialog;

    this.open = false;
    this.dismissible = true;
    this._hasHeader = false;
    this._hasFooter = false;

    this._headerPresence = new SlotPresenceController(this, 'header', (present) => {
      this._hasHeader = present;
    });
    this._footerPresence = new SlotPresenceController(this, 'footer', (present) => {
      this._hasFooter = present;
    });
  }

  _handleSlotChange() {
    this._headerPresence.refresh();
    this._footerPresence.refresh();
  }

  firstUpdated() {
    this.dialog = this.renderRoot.querySelector('dialog');
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      this._handleOpenChange();
    }
  }

  _handleOpenChange() {
    if (!this.dialog) return;
    if (this.open) {
      if (!this.dialog.open) {
        this.dialog.showModal();
      }
    } else if (this.dialog.open) {
      this.dialog.close();
    }
  }

  // Esc and light-dismiss close the native dialog without touching `open`.
  _handleNativeClose() {
    this.open = false;
  }

  _handleNativeCancel() {
    this.open = false;
  }

  dismissTemplate() {
    if (!this.dismissible) {
      return html``;
    }

    return html`
      <button
        class="dialog__dismiss"
        @click=${() => {
          this.open = false;
        }}
        aria-label="Dismiss dialog"
      >
        &times;
      </button>
    `;
  }

  render() {
    return html`
	      <dialog
        class="dialog"
        closedby=${supportsClosedBy && this.dismissible ? 'any' : nothing}
        @close=${this._handleNativeClose}
        @cancel=${this._handleNativeCancel}
      >
        ${this.dismissTemplate()}

        <header class="dialog__header" ?hidden=${!this._hasHeader}>
          <slot name="header" @slotchange=${this._handleSlotChange}></slot>
        </header>

        <slot class="dialog__content"></slot>

        <footer class="dialog__footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._handleSlotChange}></slot>
        </footer>
      </dialog>
    `;
  }
}
