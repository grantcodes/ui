import { html, LitElement } from 'lit';
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import menuToggleStyles from './menu-toggle.css' with { type: 'css' };

/**
 * A controlled animated menu button. Listen for click and update expanded.
 * @csspart button - The native button.
 * @csspart icon - The animated hamburger icon.
 */
export class GrantCodesMenuToggle extends LitElement {
  declare expanded: boolean;
  declare controlsElement: Element | null;

  static styles = [focusRingStyles, menuToggleStyles];
  static properties = {
    expanded: { type: Boolean, reflect: true },
    controlsElement: { attribute: false },
  };

  constructor() {
    super();
    this.expanded = false;
    this.controlsElement = null;
  }

  updated() {
    const button = this.renderRoot.querySelector('button');
    if (button && 'ariaControlsElements' in button) {
      button.ariaControlsElements = this.controlsElement ? [this.controlsElement] : [];
    }
  }

  focus(options?: FocusOptions) {
    this.renderRoot.querySelector('button')?.focus(options);
  }

  render() {
    return html`
      <button type="button" part="button" class="menu-toggle focus-ring"
        aria-label=${this.expanded ? 'Close menu' : 'Open menu'}
        aria-expanded=${this.expanded}>
        <span part="icon" class="menu-toggle__icon" aria-hidden="true"></span>
      </button>
    `;
  }
}
