import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import iconStyles from "./icon.scss?inline";

@customElement("grantcodes-icon")
export class GrantCodesIcon extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(iconStyles)];

	@property({ type: String }) icon = "";

	// TODO: Don't know if this is how I want to do icons.
	// Maybe it could just be by icon name?
	// Or should I export the lucide icons as my own recommended icon set?
	// I think the nicest would be to just have <grantcodes-icon><svg ...whatever></svg></grantcodes-icon> but that seems to be difficult with lucide imports.
	// https://lucide.dev/guide/packages/lucide#custom-element-binding is probably what I want?

	render() {
		const iconWrapper = document.createElement("div");
		iconWrapper.innerHTML = this.icon;
		const iconSvg = iconWrapper.children[0];

		return html`<span class="icon">${iconSvg}</span>`;
	}
}
