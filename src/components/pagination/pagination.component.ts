import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import paginationStyles from "./pagination.scss?inline";
import { GrantCodesButton } from "../button/button.component.js";

@customElement("grantcodes-pagination")
export class GrantCodesPagination extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(paginationStyles)];

	static dependencies = { "grantcodes-button": GrantCodesButton };

	@property({ attribute: "previous-href" })
	previousHref?: string;

	@property({ attribute: "next-href" })
	nextHref?: string;

	nextTemplate() {
		if (!this.nextHref) {
			return "";
		}

		return html`
      <grantcodes-button class="pagination__next" href=${this.nextHref}
        >Next</grantcodes-button
      >
    `;
	}

	previousTemplate() {
		if (!this.previousHref) {
			return "";
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
