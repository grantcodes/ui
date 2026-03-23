import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import iconStyles from "./icon.styles.css" with { type: "css" };

export class GrantCodesIcon extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [iconStyles];

	render() {
		return html`<span class="icon"><slot></slot></span>`;
	}
}
