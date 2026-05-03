import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import focusRingStyles from "../../lib/styles/focus-ring.css" with {
	type: "css",
};
import accordionItemStyles from "./accordion-item.css" with { type: "css" };

export class GrantCodesAccordionItem extends LitElement {
	static styles = [focusRingStyles, accordionItemStyles];

	static properties = {
		title: { type: String },
		open: { type: Boolean, reflect: true },
	};

	constructor() {
		super();
		this.title = "";
		this.open = false;
	}

	render() {
		return html`
			<details class="accordion__item" ?open=${this.open}>
				<summary class="accordion__summary focus-ring">
					<span>${this.title}</span>
					<svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</summary>
				<div class="accordion__content">
					<slot></slot>
				</div>
			</details>
		`;
	}
}
