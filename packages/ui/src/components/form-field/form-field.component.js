import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import formFieldStyles from "./form-field.css" with { type: "css" };
import { classMap } from "lit/directives/class-map.js";
import { generateId } from "../../lib/generate-id.js";

/**
 * Wraps native inputs with labels, help text, error messages, and aria-describedby.
 * Checkbox/radio inputs are auto-detected (label displays inline).
 * Nesting form-fields creates a fieldset/legend group.
 *
 * @example
 * ```html
 * <grantcodes-form-field label="Name">
 *   <input type="text" name="name" />
 * </grantcodes-form-field>
 * ```
 *
 * @example
 * ```html
 * <grantcodes-form-field label="Accept terms">
 *   <input type="checkbox" name="terms" />
 * </grantcodes-form-field>
 * ```
 *
 * @example
 * ```html
 * <grantcodes-form-field label="Plan">
 *   <grantcodes-form-field label="Free">
 *     <input type="radio" name="plan" value="free" />
 *   </grantcodes-form-field>
 *   <grantcodes-form-field label="Pro">
 *     <input type="radio" name="plan" value="pro" />
 *   </grantcodes-form-field>
 * </grantcodes-form-field>
 * ```
 *
 * @example
 * ```html
 * <grantcodes-form-field label="Email" error="Enter a valid email" help="We won't spam you">
 *   <input type="email" name="email" />
 * </grantcodes-form-field>
 * ```
 *
 * @slot default - The input, select, or textarea element, or nested form-field elements for groups
 */
export class GrantCodesFormField extends LitElement {
	static formAssociated = true;
	static styles = [formFieldStyles];

	static properties = {
		/** Label text (renders as `<legend>` in grouped variant) */
		label: { type: String },
		/** Error message, linked to input via aria-describedby */
		error: { type: String },
		/** Help text, linked to input via aria-describedby */
		help: { type: String },
	};

	constructor() {
		super();

		this.label = "";
		this.error = undefined;
		this.help = undefined;

		this.inlineInput = false;
		this.groupInput = false;

		/** @type {NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} */
		this.inputElements;

		/** @type {NodeListOf<GrantCodesFormField>} */
		this.nestedFields;

		if (!this.id) {
			this.id = generateId("form-field");
		}
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
		return ids.join(" ");
	}

	firstUpdated() {
		// Initialize inputs and nested fields if not already set
		if (!this.inputElements) {
			this.inputElements = this.querySelectorAll("input, select, textarea");
		}
		if (!this.nestedFields) {
			this.nestedFields = this.querySelectorAll("grantcodes-form-field");
		}

		const input = this.inputElements[0];

		if (this.nestedFields.length > 0) {
			this.groupInput = true;
			this.requestUpdate();
		}

		if (!input) {
			return;
		}

		input.id = this.id;
		input.setAttribute("aria-describedby", this.ariaDescribedBy);

		if (input.type === "checkbox" || input.type === "radio") {
			this.inlineInput = true;
			this.requestUpdate();
		}
	}

	handleLabelClick() {
		const input = this.inputElements[0];
		if (input) {
			input.focus();
			if (
				input instanceof HTMLInputElement &&
				(input.type === "checkbox" || input.type === "radio")
			) {
				input.checked = !input.checked;
			}
		}
	}

	// handleError() {
	//   if (this.error) {
	//     const input = this.inputElements[0]
	//     if (input) {
	//       if (this.help) {
	//         input.setAttribute('aria-describedby', `${this.errorId} ${this.helpId}`)
	//       } else {
	//         input.setAttribute('aria-describedby', this.errorId)
	//       }
	//     }
	//   }
	// }

	errorTemplate() {
		if (!this.error) {
			return html``;
		}

		return html`
      <p class="form-field__error" id=${this.errorId}>Error: ${this.error}</p>
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
		const classes = classMap({
			"form-field": true,
			"form-field--inline": this.inlineInput,
		});

		if (this.groupInput) {
			return html`
      <fieldset class=${classes}>
        <legend class="form-field__label">${this.label}</legend>
        <slot></slot>
        ${this.errorTemplate()}
      </fieldset>
    `;
		}

		return html`
      <div class=${classes}>
        <label>
          <span class="form-field__label" @click=${this.handleLabelClick}
            >${this.label}</span
          >
          ${this.helpTemplate()}
          <slot></slot>
        </label>
        ${this.errorTemplate()}
      </div>
    `;
	}
}
