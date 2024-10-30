import { GrantCodesTabsItem } from "./tabs-item.component";
import { html, unsafeCSS, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tabsStyles from "../tabs.scss?inline";

@customElement("grantcodes-tabs-button")
export class GrantCodesTabsButton extends GrantCodesTabsItem {
	static shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(tabsStyles)];

	render() {
		return html`
      <button
        id="${this.buttonId}"
        type="button"
        role="tab"
        ?aria-selected=${this.active}
        aria-controls="${this.panelId}"
        tabindex=${ifDefined(this.active ? undefined : "-1")} 
        class="tabs__tab ${this.active ? "is-active" : ""}"
      >
        <span>${this.label}</span>
      </button>
    `;
	}
}
