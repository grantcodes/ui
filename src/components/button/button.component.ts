import { LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import buttonStyles from "./button.scss?inline";

@customElement("grantcodes-button")
export class GrantCodesButton extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(buttonStyles)];

	@property()
	href?: string;

	@property({ type: String })
	type: "button" | "submit" | "reset" = "button";

	@property({ type: String })
	name?: string;

	@property({ type: String })
	value?: string;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	// The render() method is called any time reactive properties change.
	// Return HTML in a string template literal tagged with the `html`
	// tag function to describe the component's internal DOM.
	// Expressions can set attribute values, property values, event handlers,
	// and child nodes/text.
	render() {
		const isLink = !!this.href;
		const tag = isLink ? literal`a` : literal`button`;

		return html`
			<${tag}
				class="button"
				href=${isLink ? this.href : undefined}
				?disabled=${!isLink && this.disabled}
				type=${!isLink ? this.type : undefined}
				name=${!isLink ? this.name : undefined}
				value=${!isLink ? this.value : undefined}
			>
				<span><slot></slot></span>
			</${tag}>
		`;
	}
}
