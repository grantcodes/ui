import { html, LitElement, type PropertyValues } from 'lit';
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import buttonStyles from './button.css' with { type: 'css' };

const isIcon = (node: Node): boolean =>
  node.nodeType === 1 && (node as Element).localName === 'grantcodes-icon';
const hasContent = (node: Node): boolean =>
  node.nodeType === 1 || (node.nodeType === 3 && (node.textContent ?? '').trim() !== '');

export class GrantCodesButton extends LitElement {
  declare _fieldsetDisabled: boolean;
  declare _contentObserver: MutationObserver | null;
  declare color: 'primary' | 'secondary' | 'neutral' | 'danger';
  declare disabled: boolean;
  declare href: string;
  declare internals: ElementInternals | null;
  declare name: string;
  declare size: 'sm' | 'md' | 'lg';
  declare type: string;
  declare value: string;
  declare variant: 'solid' | 'outline' | 'ghost';

  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
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
    /** @type {'primary' | 'secondary' | 'neutral' | 'danger'} */
    this.color = 'primary';
    /** @type {'sm' | 'md' | 'lg'} */
    this.size = 'md';
    /** @type {'solid' | 'outline' | 'ghost'} */
    this.variant = 'solid';
    // Do NOT set form="" — an empty form attribute overrides ancestor form association
    this._fieldsetDisabled = false;
    this._contentObserver = null;

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
    this._contentObserver ??= new (globalThis.MutationObserver ?? window.MutationObserver)(() =>
      this._syncIconLayout(),
    );
    this._contentObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleFormClick);
    this._contentObserver?.disconnect();
  }

  _handleFormClick(_e: Event) {
    // href mode renders a link — do not intercept form actions
    if (this.href) return;
    // Only handle form actions when we have internals and are inside a form
    if (!this.internals || !this.internals.form || this.disabled) return;

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
    this.requestUpdate();
  }

  firstUpdated() {
    this._syncIconLayout();
  }

  // Shadow CSS cannot see whether slotted content is text or an icon, so the
  // light DOM decides which edge padding rules apply.
  _syncIconLayout = (): void => {
    const nodes = Array.from(this.childNodes).filter(
      (node) => !(node as Element).getAttribute?.('slot') && hasContent(node),
    );
    const icons = nodes.filter(isIcon).length;
    const iconOnly = nodes.length > 0 && icons === nodes.length;

    this.toggleAttribute('icon-only', iconOnly);
    this.toggleAttribute('icon-start', !iconOnly && icons > 0 && isIcon(nodes[0]));
    this.toggleAttribute('icon-end', !iconOnly && icons > 0 && isIcon(nodes[nodes.length - 1]));
  };

  formResetCallback() {
    // Called by the browser when the associated form is reset.
    // Reset the value to an empty string (default state).
    // If a future version tracks an initial value, restore it here.
    this.value = '';
  }

  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  /** @returns {import('lit').TemplateResult} */
  render() {
    const isLink = !!this.href;

    if (isLink) {
      return html`
				<a
					class="button focus-ring"
					href=${this.href}
					?disabled=${this.disabled || this._fieldsetDisabled}
				>
					<span><slot></slot></span>
				</a>
			`;
    }

    return html`
			<button
				class="button focus-ring"
				type="button"
				name=${this.name ?? ''}
				value=${this.value ?? ''}
				?disabled=${this.disabled || this._fieldsetDisabled}
			>
				<span><slot></slot></span>
			</button>
		`;
  }
}
