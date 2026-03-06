import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { cardStyles } from "./card.styles.js";

export class GrantCodesCard extends LitElement {
	static styles = [cardStyles];

	render() {
			return html`
		      <div class="card">
		        <div class="card__header"><slot name="header"></slot></div>
		        <div class="card__content"><slot></slot></div>
		        <div class="card__footer"><slot name="footer"></slot></div>
		      </div>
		    `;
	}
}
