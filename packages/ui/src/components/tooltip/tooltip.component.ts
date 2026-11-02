import { LitElement, type PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import tooltipStyles from './tooltip.css' with { type: 'css' };

type Relationship = {
  attribute: 'aria-label' | 'aria-description';
  control: HTMLElement;
  previous: string | null;
};

export class GrantCodesTooltip extends LitElement {
  declare _relationship: Relationship | null;
  declare _suppressed: boolean;
  declare description: string;
  declare label: string;

  static styles = [tooltipStyles];

  static properties = {
    label: { type: String },
    description: { type: String },
    _suppressed: { state: true },
  };

  constructor() {
    super();
    this.label = '';
    this.description = '';
    this._suppressed = false;
    this._relationship = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleExit);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    this.removeEventListener('focusout', this._handleExit);
    this._clearRelationship();
    super.disconnectedCallback();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label') || changedProperties.has('description')) {
      this._updateRelationship();
    }
  }

  _handleSlotChange() {
    this._suppressed = false;
    this._updateRelationship();
  }

  _handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') this._suppressed = true;
  }

  _handleExit() {
    this._suppressed = false;
  }

  _clearRelationship() {
    if (!this._relationship) return;
    const { attribute, control, previous } = this._relationship;
    if (previous === null) control.removeAttribute(attribute);
    else control.setAttribute(attribute, previous);
    this._relationship = null;
  }

  _updateRelationship() {
    this._clearRelationship();
    const trigger = this.renderRoot.querySelector('slot')?.assignedElements()[0];
    const content = this.label || this.description;
    if (!(trigger instanceof HTMLElement) || !content) return;

    const control =
      trigger.shadowRoot?.querySelector<HTMLElement>(
        'button, a, input, select, textarea, [tabindex]',
      ) ?? trigger;
    const attribute = this.label ? 'aria-label' : 'aria-description';
    this._relationship = { attribute, control, previous: control.getAttribute(attribute) };
    control.setAttribute(attribute, content);
  }

  render() {
    if (this.label && this.description) {
      throw new Error('You cannot provide both a label and a description');
    }

    return html`
      <div
        class="tooltip ${this._suppressed ? 'tooltip--suppressed' : ''}"
        @mouseleave=${this._handleExit}
      >
        <div class="tooltip__slot">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
        <p class="tooltip__content" role="tooltip">${this.label || this.description}</p>
      </div>
    `;
  }
}
