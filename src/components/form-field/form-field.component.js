import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { formFieldStyles } from "./form-field.styles.js";
import { cx } from "../../lib/classnames.js";
import { generateId } from "../../lib/generate-id.js";

export class GrantCodesFormField extends LitElement {
	static formAssociated = true;
	static styles = [formFieldStyles];

	static properties = {
		label: { type: String },
		error: { type: String },
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
			this.inputElements = this.querySelectorAll(
				"input, select, textarea",
			);
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

	/**
	 * Template for a group of form components
	 *
	 * @param   {string}  className  html class attribute
	 *
	 * @return  {}             [return description]
	 */
	groupTemplate(className) {
		return html`
      <fieldset class="${className}">
        <legend class="form-field__label">${this.label}</legend>
        <slot></slot>
        ${this.errorTemplate()}
      </fieldset>
    `;
	}

	render() {
		const elementClass = cx("form-field", {
			"form-field--inline": this.inlineInput,
		});

		if (this.groupInput) {
			return this.groupTemplate(elementClass);
		}

		return html`
      <div class="${elementClass}">
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
