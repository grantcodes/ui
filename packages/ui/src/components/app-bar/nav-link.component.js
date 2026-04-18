import { LitElement, html } from "lit";
import focusRingStyles from "../../lib/styles/focus-ring.css" with { type: "css" };
import navLinkStyles from "./nav-link.css" with { type: "css" };

export class GrantCodesNavLink extends LitElement {
	static styles = [focusRingStyles, navLinkStyles];

	render() {
		return html`
			<span class="nav-link">
				<slot></slot>
			</span>
		`;
	}
}
