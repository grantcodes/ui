import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import cardStyles from "./card.scss?inline";

@customElement("grantcodes-card")
export class GrantCodesCard extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(cardStyles)];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'

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
