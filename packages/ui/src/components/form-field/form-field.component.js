import { LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { generateId } from '../../lib/generate-id.js';
import formFieldStyles from './form-field.css' with { type: 'css' };

/**
 * Wraps a native `input`, `select` or `textarea` with a label, optional help text and optional
 * error message, and mirrors the error/help state onto the control's ARIA attributes.
 *
 * ```html
 * <grantcodes-form-field label="Email" help="We only use this for receipts.">
 *   <input type="email" name="email" required />
 * </grantcodes-form-field>
 * ```
 *
 * Add `direction="horizontal"` for checkboxes and radios, and nest fields to group them — the
 * parent then renders a `<fieldset>` with its `label` as the `<legend>`.
 *
 * ```html
 * <grantcodes-form-field label="Contact preference" error="Choose one option.">
 *   <grantcodes-form-field label="Email" direction="horizontal">
 *     <input type="radio" name="contact" value="email" />
 *   </grantcodes-form-field>
 *   <grantcodes-form-field label="Phone" direction="horizontal">
 *     <input type="radio" name="contact" value="phone" />
 *   </grantcodes-form-field>
 * </grantcodes-form-field>
 * ```
 *
 * See README.md in this directory for every variant.
 */
export class GrantCodesFormField extends LitElement {
  static formAssociated = true;
  static styles = [formFieldStyles];

  static properties = {
    label: { type: String, reflect: true },
    direction: { type: String },
    error: { type: String },
    help: { type: String },
  };

  constructor() {
    super();

    /** Label text, rendered in a `<label>` or, for a grouped field, a `<legend>`. */
    this.label = '';

    /**
     * Error message. Stays hidden until the field is touched, then appears and sets
     * `aria-describedby` and `aria-invalid` on the first control.
     */
    this.error = undefined;

    /** Help text rendered with the label and referenced from the first control's `aria-describedby`. */
    this.help = undefined;

    this.groupInput = false;

    /**
     * Direction of the field. Generally want horizontal for checkboxes and radios.
     * @type {'vertical' | 'horizontal'}
     */
    this.direction = 'vertical';

    /** @type {NodeListOf<GrantCodesFormField>} */
    this.nestedFields;

    this._revalidate = this._revalidate.bind(this);
    this._syncGroupState = this._syncGroupState.bind(this);
    this._touched = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Not in the constructor: a custom element that gains an attribute there is never upgraded.
    if (!this.id) {
      this.id = generateId('form-field');
    }
    this.addEventListener('input', this._revalidate);
    // blur/invalid do not bubble, so they are caught on the way down.
    this.addEventListener('blur', this._revalidate, true);
    this.addEventListener('invalid', this._revalidate, true);
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._revalidate);
    this.removeEventListener('blur', this._revalidate, true);
    this.removeEventListener('invalid', this._revalidate, true);
    super.disconnectedCallback();
  }

  _revalidate(event) {
    // A consumer-set error should appear once the field has been interacted with.
    if (event?.target?.matches?.('input, select, textarea')) {
      this._touched = true;
    }
    this.requestUpdate();
  }

  get errorId() {
    return `${this.id}-error`;
  }

  get helpId() {
    return `${this.id}-help`;
  }

  get _labelId() {
    return `${this.id}-label`;
  }

  get _controls() {
    return Array.from(this.children).filter((child) =>
      child.matches('input, select, textarea'),
    );
  }

  get ariaDescribedBy() {
    const ids = [];
    if (this.error) {
      ids.push(this.errorId);
    }
    if (this.help) {
      ids.push(this.helpId);
    }
    return ids;
  }

  /** Errors stay hidden until the field is interacted with or reports :user-invalid. */
  get showError() {
    if (!this.error) return false;
    const controls = this.groupInput
      ? this.querySelectorAll('input, select, textarea')
      : this._controls;
    if (controls.length === 0) return true;
    if (this._touched) return true;
    return Array.from(controls).some((control) => control.matches(':user-invalid'));
  }

  firstUpdated() {
    this._syncGroupState();
    this.syncControlAria();
  }

  updated(changedProperties) {
    if (
      changedProperties.has('label') ||
      changedProperties.has('error') ||
      changedProperties.has('help')
    ) {
      this.syncControlAria();
    }
  }

  _syncGroupState() {
    this.nestedFields = this.querySelectorAll(':scope > grantcodes-form-field');
    const isGroup = this.nestedFields.length > 0;
    if (this.groupInput !== isGroup) {
      this.groupInput = isGroup;
      this.requestUpdate();
    }
    if (!isGroup) {
      this.syncControlAria();
    }
  }

  _ensureControlAccessibility(control) {
    if (!control.id) {
      control.id = `${this.id}-control`;
    }

    const label =
      Array.from(this.children).find((child) => child.id === this._labelId) ??
      document.createElement('label');
    label.id = this._labelId;
    label.htmlFor = control.id;
    label.textContent = this.label;
    label.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0';
    if (control.nextElementSibling !== label) {
      control.insertAdjacentElement('afterend', label);
    }

    let previous = label;
    for (const [id, text] of [
      [this.errorId, this.error],
      [this.helpId, this.help],
    ]) {
      let description = Array.from(this.children).find((child) => child.id === id);
      if (!text) {
        description?.remove();
        continue;
      }
      description ??= document.createElement('span');
      description.id = id;
      description.textContent = text;
      description.style.cssText = label.style.cssText;
      if (previous.nextElementSibling !== description) {
        previous.insertAdjacentElement('afterend', description);
      }
      previous = description;
    }
  }

  /** Mirrors the current error/help state onto the first control. */
  syncControlAria() {
    const input = this._controls[0];
    if (!input) return;

    this._ensureControlAccessibility(input);
    const ownIds = [this.errorId, this.helpId];
    const existingIds = (input.getAttribute('aria-describedby') ?? '')
      .split(/\s+/)
      .filter((id) => id && !ownIds.includes(id));
    const describedBy = [...existingIds, ...this.ariaDescribedBy].join(' ');

    if (describedBy) {
      input.setAttribute('aria-describedby', describedBy);
    } else {
      input.removeAttribute('aria-describedby');
    }

    if (this.error) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  handleLabelClick(event) {
    const input = this._controls[0];
    if (!input) return;

    // The slotted control is not a DOM descendant of the shadow <label>, so the
    // platform does not forward the click; do it here and suppress a duplicate.
    event.preventDefault();
    input.focus();
    input.click();
  }

  errorTemplate() {
    if (!this.error) {
      return html``;
    }

    return html`
      <p class="form-field__error" id=${this.errorId} ?hidden=${!this.showError}>${this.error}</p>
    `;
  }

  helpTemplate() {
    if (!this.help) {
      return html``;
    }

    return html`
      <span class="form-field__help" id=${this.helpId}>${this.help}</span>
    `;
  }

  render() {
    const wrapperClass = classMap({
      'form-field': true,
      'form-field--horizontal': this.direction === 'horizontal',
    });
    if (this.groupInput) {
      return html`
      <fieldset class=${wrapperClass}>
        <legend class="form-field__label">${this.label}</legend>
        <slot @slotchange=${this._syncGroupState}></slot>
        ${this.errorTemplate()}
      </fieldset>
    `;
    }

    return html`
      <div class=${wrapperClass}>
        <label>
          <span class="form-field__label" @click=${this.handleLabelClick}
            >${this.label}</span
          >
          ${this.helpTemplate()}
          <slot @slotchange=${this._syncGroupState}></slot>
        </label>
        ${this.errorTemplate()}
      </div>
    `;
  }
}
