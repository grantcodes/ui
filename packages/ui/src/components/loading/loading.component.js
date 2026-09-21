import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { SlotPresenceController } from '../../lib/slot-presence-controller.js';
import loadingStyles from './loading.css' with { type: 'css' };

export class GrantCodesLoading extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [loadingStyles];

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  static properties = {
    _hasLabel: { state: true },
  };

  constructor() {
    super();

    // Slotted text is visually hidden and doubles as the status label.
    this._hasLabel = false;
    this._labelPresence = new SlotPresenceController(this, '', (present) => {
      this._hasLabel = present;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-busy', 'true');
  }

  _handleSlotChange() {
    this._labelPresence.refresh();
  }

  render() {
    return html`
      <span
        class="loading"
        role="status"
        aria-label=${this._hasLabel ? nothing : 'Loading'}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </span>
    `;
  }
}
