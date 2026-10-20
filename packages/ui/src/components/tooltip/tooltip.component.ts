import { LitElement, type PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import { generateId } from '../../lib/generate-id.js';
import tooltipStyles from './tooltip.css' with { type: 'css' };

type Relationship = {
  attribute: 'aria-describedby' | 'aria-labelledby';
  source: HTMLSpanElement;
  trigger: HTMLElement;
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
    if (!this.id) this.id = generateId('tooltip');
  }

  disconnectedCallback() {
    this._clearRelationship();
    super.disconnectedCallback();
  }

  firstUpdated() {
    const tooltipSlot = this.renderRoot.querySelector<HTMLElement>('.tooltip__slot');
    tooltipSlot?.style.setProperty('anchor-name', `--tooltip-${this.id}`);
    this.renderRoot
      .querySelector<HTMLElement>('.tooltip')
      ?.style.setProperty('--tooltip-anchor', `--tooltip-${this.id}`);
    this._updateRelationship();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label') || changedProperties.has('description')) {
      this._updateRelationship();
    }
  }

  _handleSlotChange() {
    this._clearRelationship();
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

    const { attribute, source, trigger } = this._relationship;
    const ids = (trigger.getAttribute(attribute) || '')
      .split(/\s+/)
      .filter((id) => id && id !== source.id);
    if (ids.length) {
      trigger.setAttribute(attribute, ids.join(' '));
    } else {
      trigger.removeAttribute(attribute);
    }
    source.remove();
    this._relationship = null;
  }

  _updateRelationship() {
    this._clearRelationship();
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot');
    const trigger = slot?.assignedElements()[0];
    const content = this.label || this.description;
    if (!trigger || !content) return;

    const control =
      trigger.shadowRoot?.querySelector<HTMLElement>(
        'button, a, input, select, textarea, [tabindex]',
      ) ?? (trigger instanceof HTMLElement ? trigger : null);
    if (!control) return;

    const source = document.createElement('span');
    const attribute = this.label ? 'aria-labelledby' : 'aria-describedby';
    source.id = `${this.id}-text`;
    source.hidden = true;
    source.textContent = content;
    const root = control.getRootNode();
    (root instanceof ShadowRoot ? root : this).append(source);

    const ids = (control.getAttribute(attribute) || '').split(/\s+/).filter(Boolean);
    control.setAttribute(attribute, [...ids, source.id].join(' '));
    this._relationship = { attribute, source, trigger: control };
  }

  render() {
    if (this.label && this.description) {
      throw new Error('You cannot provide both a label and a description');
    }

    return html`
      <div
        class="tooltip ${this._suppressed ? 'tooltip--suppressed' : ''}"
        @keydown=${this._handleKeydown}
        @mouseleave=${this._handleExit}
        @focusout=${this._handleExit}
      >
        <div class="tooltip__slot">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
        <p class="tooltip__content" role="tooltip">${this.label || this.description}</p>
      </div>
    `;
  }
}
