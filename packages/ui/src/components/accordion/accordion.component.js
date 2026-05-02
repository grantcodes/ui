import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import focusRingStyles from "../../lib/styles/focus-ring.css" with {
	type: "css",
};
import accordionStyles from "./accordion.css" with { type: "css" };

export class GrantCodesAccordion extends LitElement {
	static styles = [focusRingStyles, accordionStyles];

	static properties = {
		items: { type: Array },
	};

	constructor() {
		super();
		this.items = [];
	}

	renderPanelContent(item) {
		return item.htmlContent !== undefined && item.htmlContent !== null
			? unsafeHTML(item.htmlContent)
			: item.content;
	}

	render() {
		return html`
      <div class="accordion">
        ${this.items.map(
					(item, index) => html`
            <details class="accordion__item">
              <summary class="accordion__summary focus-ring">
                <span>${item.title}</span>
                <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div class="accordion__content">${this.renderPanelContent(item)}</div>
            </details>
          `,
				)}
      </div>
    `;
	}
}
