import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { literal } from "lit/static-html.js";
import { buttonStyles } from "./button.styles.js";

export class GrantCodesButton extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [buttonStyles];

	static properties = {
		href: { type: String },
		type: { type: String },
		name: { type: String },
		value: { type: String },
		disabled: { type: Boolean, reflect: true },
	};

	constructor() {
		super();

		this.href = "";
		this.type = "button";
		this.name = "";
		this.value = "";
		this.disabled = false;
	}

	// The render() method is called any time reactive properties change.
	// Return HTML in a string template literal tagged with the `html`
	// tag function to describe the component's internal DOM.
	// Expressions can set attribute values, property values, event handlers,
	// and child nodes/text.
	/** @returns {import('lit').TemplateResult} */
	render() {
		const isLink = !!this.href;
		const tag = isLink ? literal`a` : literal`button`;

		if (isLink) {
			return html`
				<${tag}
					class="button"
					href=${this.href}
					?disabled=${this.disabled}
				>
					<span><slot></slot></span>
				</${tag}>
			`;
		}

		return html`
			<${tag}
				class="button"
				type=${this.type}
				name=${this.name ?? ""}
				value=${this.value ?? ""}
				?disabled=${this.disabled}
			>
				<span><slot></slot></span>
			</${tag}>
		`;
	}
}
