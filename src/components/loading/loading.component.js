import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { loadingStyles } from "./loading.styles.js";

export class GrantCodesLoading extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [loadingStyles];

	// Define reactive properties--updating a reactive property causes
	// the component to update.

	render() {
		return html`
      <span class="loading">
        <slot></slot>
      </span>
    `;
	}
}

customElements.define("grantcodes-loading", GrantCodesLoading);
