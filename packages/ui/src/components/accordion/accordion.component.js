import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import accordionStyles from "./accordion.css" with { type: "css" };

export class GrantCodesAccordion extends LitElement {
	static styles = [accordionStyles];

	render() {
		return html`<div class="accordion"><slot></slot></div>`;
	}
}
