import { GrantCodesTabsItem } from "./internal/tabs-item.component";
import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tabsStyles from "./tabs.scss?inline";

@customElement("grantcodes-tab")
export class GrantCodesTab extends GrantCodesTabsItem {
	static styles = [unsafeCSS(tabsStyles)];

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
