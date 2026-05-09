import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import formFieldStyles from "./form-field.css" with { type: "css" };
import { generateId } from "../../lib/generate-id.js";

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

		this.label = "";
		this.error = undefined;
		this.help = undefined;

		this.groupInput = false;

		/**
		 * Direction of the field. Generally want horizontal for checkboxes and radios.
		 * @type {'vertical' | 'horizontal'}
		 */
		this.direction = "vertical";

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
		const wrapperClass = classMap({
			"form-field": true,
			"form-field--horizontal": this.direction === "horizontal",
		});
		if (this.groupInput) {
			return html`
      <fieldset class=${wrapperClass}>
        <legend class="form-field__label">${this.label}</legend>
        <slot></slot>
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
          <slot></slot>
        </label>
        ${this.errorTemplate()}
      </div>
    `;
	}
}
