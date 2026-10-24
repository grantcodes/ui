import { LitElement, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import buttonGroupStyles from './button-group.css' with { type: 'css' };

/**
 * A labelled group with native Tab navigation, not a toolbar.
 * @slot - Buttons and links, each with its own accessible name.
 * @csspart base - Flex layout; override flex-wrap and overflow here when needed.
 * @cssproperty [--g-button-group-gap=var(--g-spacing-sm)] - Spacing in the spaced variant.
 */
export class GrantCodesButtonGroup extends LitElement {
  declare variant: 'joined' | 'spaced';
  declare orientation: 'horizontal' | 'vertical';

  static styles = [buttonGroupStyles];

  static properties = {
    variant: { type: String, reflect: true },
    orientation: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.variant = 'joined';
    this.orientation = 'horizontal';
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'group');
  }

  render(): TemplateResult {
    return html`
      <div class="button-group" part="base">
        <slot></slot>
      </div>
    `;
  }
}
