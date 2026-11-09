import { html, LitElement, nothing, type PropertyValues } from 'lit';
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import buttonStyles from './button.css' with { type: 'css' };

/**
 * @slot - Button label, or a direct grantcodes-icon for icon-only layout.
 * @slot start - Non-interactive content before the label.
 * @slot end - Non-interactive content after the label.
 */
export class GrantCodesButton extends LitElement {
  declare _fieldsetDisabled: boolean;
  declare color: 'primary' | 'secondary' | 'neutral' | 'danger' | 'inherit';
  declare disabled: boolean;
  declare href: string;
  declare internals: ElementInternals | null;
  declare name: string;
  declare size: 'sm' | 'md' | 'lg';
  declare type: string;
  declare value: string;
  declare variant: 'solid' | 'outline' | 'ghost';

  static styles = [focusRingStyles, buttonStyles];

  static formAssociated = true;

  static properties = {
    href: { type: String },
    type: { type: String },
    name: { type: String },
    value: { type: String },
    color: { type: String, reflect: true },
    size: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    form: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.href = '';
    this.type = 'button';
    this.name = '';
    this.value = '';
    /** @type {'primary' | 'secondary' | 'neutral' | 'danger' | 'inherit'} */
    this.color = 'primary';
    /** @type {'sm' | 'md' | 'lg'} */
    this.size = 'md';
    /** @type {'solid' | 'outline' | 'ghost'} */
    this.variant = 'solid';
    // Do NOT set form="" — an empty form attribute overrides ancestor form association
    this._fieldsetDisabled = false;

    // Attach ElementInternals for form participation.
    // try/catch because happy-dom (DOM-shim test env) may not support attachInternals()
    try {
      this.internals = this.attachInternals();
    } catch {
      this.internals = null;
    }
    this.disabled = false;
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.internals) {
      if (changedProperties.has('name') || changedProperties.has('value')) {
        this.internals.setFormValue(this.name ? this.value : null);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleFormClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleFormClick);
  }

  _handleFormClick(_e: Event) {
    // href mode renders a link — do not intercept form actions
    if (this.href) return;
    // Only handle form actions when we have internals and are inside a form
    if (!this.internals?.form || this.disabled) return;

    const t = this.type.toLowerCase();
    if (t === 'submit') {
      this.internals.form.requestSubmit();
    } else if (t === 'reset') {
      this.internals.form.reset();
    }
    // type === "button" or any other value: no form action (default no-op)
  }

  formDisabledCallback(disabled: boolean) {
    this._fieldsetDisabled = disabled;
    // Browsers call this while Lit reflects the host's own `disabled` attribute, after render and
    // inside the update, where requestUpdate() is ignored; a re-enabled button would stay disabled.
    void this.updateComplete.then(() => this.requestUpdate());
  }

  render() {
    const disabled = this.disabled || this._fieldsetDisabled;
    const content = html`
      <slot name="start"></slot>
      <span><slot></slot></span>
      <slot name="end"></slot>
    `;

    if (this.href) {
      // A link cannot be disabled natively: drop href and expose the disabled state instead.
      return html`
        <a
          class="button focus-ring"
          href=${disabled ? nothing : this.href}
          role=${disabled ? 'link' : nothing}
          aria-disabled=${disabled ? 'true' : nothing}
          ?disabled=${disabled}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button class="button focus-ring" type="button" ?disabled=${disabled}>
        ${content}
      </button>
    `;
  }
}
