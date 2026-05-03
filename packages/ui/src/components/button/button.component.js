import { html, LitElement } from "lit";
import focusRingStyles from "../../lib/styles/focus-ring.css" with {
	type: "css",
};
import buttonStyles from "./button.css" with { type: "css" };

export class GrantCodesButton extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [focusRingStyles, buttonStyles];

	static properties = {
		href: { type: String },
		type: { type: String },
		name: { type: String },
		value: { type: String },
		disabled: { type: Boolean, reflect: true },
		variant: { type: String },
		color: { type: String },
	};

	constructor() {
		super();

		this.href = "";
		this.type = "button";
		this.name = "";
		this.value = "";
		this.disabled = false;

		/**
		 * The style of the button.
		 * @type {'solid' | 'outline' | 'ghost'}
		 */
		this.variant = "solid";

		/**
		 * The color of the button.
		 * @type {'primary' | 'secondary' | 'neutral' | 'danger'}
		 */
		this.color = "primary";
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
					?disabled=${this.disabled}
				>
					<span><slot></slot></span>
				</a>
			`;
		}

		return html`
			<button
				class="button focus-ring"
				type=${this.type}
				name=${this.name ?? ""}
				value=${this.value ?? ""}
				?disabled=${this.disabled}
			>
				<span><slot></slot></span>
			</button>
		`;
	}
}
