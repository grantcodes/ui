import { LitElement, nothing, type PropertyValues } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit/static-html.js';
import { X } from '../../icons.js';
import { SlotPresenceController } from '../../lib/slot-presence-controller.js';
import '../button/button.js';
import '../icon/icon.js';
import dialogStyles from './dialog.css' with { type: 'css' };

// Safari does not implement closedby; the attribute is only added when supported.
const supportsClosedBy =
  typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype;

/**
 * A modal dialog named by its aria-label or header text.
 * @slot - Dialog content.
 * @slot header - Heading content used as the accessible name when aria-label is absent.
 * @slot footer - Footer actions.
 * @fires toggle - When the dialog opens or closes, including Escape, light-dismiss and the close button; `detail.open` is the new state.
 * @cssproperty [--g-dialog-inline-size=1200px] - Largest inline size of the dialog.
 */
export class GrantCodesDialog extends LitElement {
  declare _footerPresence: SlotPresenceController;
  declare _hasFooter: boolean;
  declare _hasHeader: boolean;
  declare _headerPresence: SlotPresenceController;
  declare dialog: null | HTMLDialogElement;
  /** Shows the close button and enables supported light-dismiss; Escape still closes the dialog. */
  declare dismissible: boolean;
  /** Fills the viewport edge to edge, for media viewers. */
  declare fullscreen: boolean;
  /** Opens the native dialog modally and reflects its open state. */
  declare open: boolean;

  static styles = [dialogStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    dismissible: { type: Boolean },
    fullscreen: { type: Boolean, reflect: true },
    _hasHeader: { state: true },
    _hasFooter: { state: true },
  };

  constructor() {
    super();

    this.open = false;
    this.dismissible = true;
    this.fullscreen = false;
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
    this.requestUpdate();
  }

  firstUpdated() {
    this.dialog = this.renderRoot.querySelector('dialog');
  }

  updated(changedProperties: PropertyValues) {
    if (!changedProperties.has('open') || !this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
    // The first render of a closed dialog is not a change; controlled wrappers only need real toggles.
    if ((changedProperties.get('open') ?? false) === this.open) return;
    this.dispatchEvent(
      new CustomEvent('toggle', { detail: { open: this.open }, bubbles: true, composed: true })
    );
  }

  // Esc and light-dismiss close the native dialog without touching `open`.
  _handleNativeClose() {
    this.open = false;
  }

  dismissTemplate() {
    if (!this.dismissible) return nothing;

    return html`
      <grantcodes-button
        class="dialog__dismiss"
        variant="ghost"
        color="neutral"
        @click=${() => {
          this.open = false;
        }}
      >
        <grantcodes-icon role="img" aria-label="Dismiss dialog">${unsafeHTML(X)}</grantcodes-icon>
      </grantcodes-button>
    `;
  }

  render() {
    const headerLabel = [...this.querySelectorAll('[slot="header"]')]
      .map((element) => element.textContent)
      .join(' ')
      .trim();

    return html`
	      <dialog
        class="dialog"
        aria-label=${this.getAttribute('aria-label') || headerLabel || nothing}
        closedby=${supportsClosedBy && this.dismissible ? 'any' : nothing}
        @close=${this._handleNativeClose}
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
