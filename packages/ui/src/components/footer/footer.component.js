import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import footerStyles from "./footer.css" with { type: "css" };

export class GrantCodesFooter extends LitElement {
	static styles = [footerStyles];

	static properties = {
		columns: { type: Number },
	};

	constructor() {
		super();

		/**
		 * Number of columns in the footer
		 * @type {number}
		 */
		this.columns = 3;
	}

	render() {
		return html`
			<footer class="footer">
				<div class="footer__container">
					<div class="footer__columns" style="--footer-columns: ${this.columns}">
						<slot></slot>
					</div>

			
					<div class="footer__bottom">
						<slot name="bottom"></slot>
					</div>
				</div>
			</footer>
		`;
	}
}
