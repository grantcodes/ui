import { GrantCodesTabsItem } from "./internal/tabs-item.component.js";
import { html } from "lit/static-html.js";
import focusRingStyles from "../../lib/styles/focus-ring.css" with { type: "css" };
import tabsStyles from "./tabs.css" with { type: "css" };

export class GrantCodesTab extends GrantCodesTabsItem {
	static styles = [focusRingStyles, tabsStyles];

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
