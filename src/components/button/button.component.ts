import { LitElement, unsafeCSS } from "lit";
import { html, literal } from "lit/static-html.js";
import { customElement, property } from "lit/decorators.js";
import buttonStyles from "./button.scss?inline";

@customElement("grantcodes-button")
export class GrantCodesButton extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(buttonStyles)];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'

	@property()
	href?: string;

	// The render() method is called any time reactive properties change.
	// Return HTML in a string template literal tagged with the `html`
	// tag function to describe the component's internal DOM.
	// Expressions can set attribute values, property values, event handlers,
	// and child nodes/text.
	render() {
		const tag = this.href ? literal`a` : literal`button`;

		return html`
      <${tag} href="${this.href}" class="button">
        <span><slot></slot></span>
      </${tag}>
    `;
	}
}
