import { LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { generateId } from '../../lib/generate-id.js';
import formFieldStyles from './form-field.css' with { type: 'css' };

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

    this.label = '';
    this.error = undefined;
    this.help = undefined;

    this.groupInput = false;

    /**
     * Direction of the field. Generally want horizontal for checkboxes and radios.
     * @type {'vertical' | 'horizontal'}
     */
    this.direction = 'vertical';

    /** @type {NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} */
    this.inputElements;

    /** @type {NodeListOf<GrantCodesFormField>} */
    this.nestedFields;

    this._revalidate = this._revalidate.bind(this);
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

  get ariaDescribedBy() {
    const ids = [];
    if (this.error) {
      ids.push(this.errorId);
    }
    if (this.help) {
      ids.push(this.helpId);
    }
    return ids.join(' ');
  }

  /** Errors stay hidden until the field is interacted with or reports :user-invalid. */
  get showError() {
    if (!this.error) return false;
    const controls = this.querySelectorAll('input, select, textarea');
    if (controls.length === 0) return true;
    if (this._touched) return true;
    return Array.from(controls).some((control) => control.matches(':user-invalid'));
  }

  firstUpdated() {
    // Initialize inputs and nested fields if not already set
    if (!this.inputElements) {
      this.inputElements = this.querySelectorAll('input, select, textarea');
    }
    if (!this.nestedFields) {
      this.nestedFields = this.querySelectorAll('grantcodes-form-field');
    }

    const input = this.inputElements[0];

    if (this.nestedFields.length > 0) {
      this.groupInput = true;
      this.requestUpdate();
    }

    if (!input) {
      return;
    }

    this.syncControlAria();
  }

  updated(changedProperties) {
    if (changedProperties.has('error') || changedProperties.has('help')) {
      this.syncControlAria();
    }
  }

  /** Mirrors the current error/help state onto the first control. */
  syncControlAria() {
    const input = this.inputElements?.[0];
    if (!input) return;

    if (this.ariaDescribedBy) {
      input.setAttribute('aria-describedby', this.ariaDescribedBy);
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
    const input = this.inputElements?.[0];
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
        <slot @slotchange=${this._revalidate}></slot>
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
          <slot @slotchange=${this._revalidate}></slot>
        </label>
        ${this.errorTemplate()}
      </div>
    `;
  }
}
