import { GrantCodesTabsItem } from "./internal/tabs-item.component";
import { html } from "lit/static-html.js";
import { tabsStyles } from "./tabs.styles.js";

export class GrantCodesTab extends GrantCodesTabsItem {
	static styles = [tabsStyles];

	render() {
		return html`
			<div
				id="${this.panelId}"
				role="tabpanel"
				aria-labelledby="${this.buttonId}"
				class="tabs__panel ${this.active ? "is-active" : ""}"
			>
				<slot></slot>
			</div>
		`;
	}
}

customElements.define("grantcodes-tab", GrantCodesTab);
