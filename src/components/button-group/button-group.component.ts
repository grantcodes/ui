import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import buttonGroupStyles from "./button-group.scss?inline";

@customElement("grantcodes-button-group")
export class GrantCodesButtonGroup extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(buttonGroupStyles)];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'

	// The render() method is called any time reactive properties change.
	// Return HTML in a string template literal tagged with the `html`
	// tag function to describe the component's internal DOM.
	// Expressions can set attribute values, property values, event handlers,
	// and child nodes/text.
	render() {
		return html`
      <div class="button-group">
        <slot></slot>
      </div>
    `;
	}
}
