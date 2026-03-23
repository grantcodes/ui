import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import paginationStyles from "./pagination.styles.css" with { type: "css" };
import { GrantCodesButton } from "../button/button.component.js";
import "../button/button.js";

export class GrantCodesPagination extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [paginationStyles];

	static dependencies = { "grantcodes-button": GrantCodesButton };

	static properties = {
		previousHref: { attribute: "previous-href" },
		nextHref: { attribute: "next-href" },
		page: { type: Number },
		pages: { type: Number },
	};

	constructor() {
		super();

		this.previousHref = "";
		this.nextHref = "";
		this.page = 1;
		this.pages = 1;
	}

	nextTemplate() {
		if (!this.nextHref) {
			return html``;
		}

		return html`
      <grantcodes-button class="pagination__next" href=${this.nextHref}
        >Next</grantcodes-button
      >
    `;
	}

	previousTemplate() {
		if (!this.previousHref) {
			return html``;
		}

		return html`
      <grantcodes-button class="pagination__previous" href=${this.previousHref}
        >Previous</grantcodes-button
      >
    `;
	}

	render() {
		return html`
      <nav class="pagination" aria-label="Pagination navigation">
        ${this.previousTemplate()} ${this.nextTemplate()}
      </nav>
    `;
	}
}
