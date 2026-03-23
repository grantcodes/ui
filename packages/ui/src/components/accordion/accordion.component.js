import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import focusRingStyles from "#styles/focus-ring.styles.css" with { type: "css" };
import accordionStyles from "./accordion.styles.css" with { type: "css" };

export class GrantCodesAccordion extends LitElement {
	static styles = [focusRingStyles, accordionStyles];

	static properties = {
		items: { type: Array },
	};

	constructor() {
		super();
		this.items = [];
	}

	render() {
		return html`
      <div class="accordion">
        ${this.items.map(
					(item, index) => html`
            <details class="accordion__item">
              <summary class="accordion__summary focus-ring">
                ${item.title}
              </summary>
              <div class="accordion__content">${item.content}</div>
            </details>
          `,
				)}
      </div>
    `;
	}
}
