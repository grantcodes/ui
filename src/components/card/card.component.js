import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { cardStyles } from "./card.styles.js";

export class GrantCodesCard extends LitElement {
	static styles = [cardStyles];

	render() {
		return html`
      <div class="card">
        <slot name="card-header" class="card__header"></slot>
        <slot name="card-content" class="card__content"></slot>
        <slot name="card-actions" class="card__actions"></slot>
        <slot name="card-footer" class="card__footer"></slot>
      </div>
    `;
	}
}
