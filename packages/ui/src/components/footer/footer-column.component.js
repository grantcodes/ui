import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import footerColumnStyles from "./footer-column.css" with { type: "css" };

export class GrantCodesFooterColumn extends LitElement {
	static styles = [footerColumnStyles];

	render() {
		return html`
			<div class="footer-column">
				<slot></slot>
			</div>
		`;
	}
}
