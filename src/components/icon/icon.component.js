import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { iconStyles } from "./icon.styles.js";

export class GrantCodesIcon extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [iconStyles];

	static properties = {
		icon: { type: String },
	};

	constructor() {
		super();

		this.icon = "";
	}

	// TODO: Don't know if this is how I want to do icons.
	// Maybe it could just be by icon name
	// Or should I export the lucide icons as my own recommended icon set
	// I think the nicest would be to just have <grantcodes-icon><svg ...whatever></svg></grantcodes-icon> but that seems to be difficult with lucide imports.
	// https://lucide.dev/guide/packages/lucide#custom-element-binding is probably what I want

	render() {
		return html`<span class="icon">${unsafeHTML(this.icon)}</span>`;
	}
}

customElements.define("grantcodes-icon", GrantCodesIcon);
