import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { tooltipStyles } from "./tooltip.styles.js";
import { generateId } from "../../lib/generate-id";

export class GrantCodesTooltip extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [tooltipStyles];

	static properties = {
		label: { type: String },
		description: { type: String },
	};

	constructor() {
		super();

		this.id = generateId("tooltip");
		/**
		 * Label for the tooltip, used when the tooltip is the main label for the item.
		 */
		this.label = "";

		/**
		 * Description for the tooltip, used when the tooltip is additional descriptive text for the item.
		 */
		this.description = "";
	}

	/** @type {Element[]} */
	slotted = [];

	firstUpdated() {
		const slot = this.renderRoot.querySelector("slot");
		this.slotted = slot ? slot.assignedElements() : [];
		const labeledElement = this.slotted[0];
		if (labeledElement) {
			if (this.label) {
				labeledElement.setAttribute("aria-labelledby", this.id);
			} else if (this.description) {
				labeledElement.setAttribute("aria-describedby", this.id);
			}
		}
	}

	render() {
		if (this.label && this.description) {
			throw new Error("You cannot provide both a label and a description");
		}

		return html`
      <div class="tooltip">
        <div class="tooltip__slot">
          <slot></slot>
        </div>
        <p id="${this.id}" class="tooltip__content" role="tooltip">
          ${this.label || this.description}
        </p>
      </div>
    `;
	}
}

customElements.define("grantcodes-tooltip", GrantCodesTooltip);
