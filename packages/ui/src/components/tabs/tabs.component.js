import { html, LitElement } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import focusRingStyles from "../../lib/styles/focus-ring.css" with {
	type: "css",
};
import tabsStyles from "./tabs.css" with { type: "css" };
import { GrantCodesTab } from "./tab.component.js";
import { GrantCodesTabsButton } from "./internal/tabs-button.component.js";
import "./internal/tabs-button.js";
import { generateId } from "../../lib/generate-id.js";

export class GrantCodesTabs extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [focusRingStyles, tabsStyles];

	static properties = {
		label: { type: String },
		_focusedTabIndex: { type: Number, state: true },
	};

	constructor() {
		super();

		this.label = "";
		this._focusedTabIndex = -1;

		if (!this.id) {
			this.id = generateId("tabs");
		}
	}

	/** @type {GrantCodesTab[]} */
	tabs = [];

	/** @type {GrantCodesTabsButton[]} */
	tabButtons = [];

	get activeTab() {
		return this.tabs.find((tab) => tab.active) || null;
	}

	set activeTab(tab) {
		// Ignore setting activeTab to null. As long as there are children, one tab
		// must be selected.
		this.tabs.forEach((t, i) => {
			if (t === tab) {
				t.active = true;
				this._focusedTabIndex = i;
			} else {
				t.active = false;
			}
		});
		this.requestUpdate();
	}

	initializeTabs() {
		this.tabs.forEach((tab, i) => {
			tab.index = i;
			tab.containerId = this.id;
		});

		// If no tab is active, default to the first tab.
		if (this.activeTab == null) {
			this._focusedTabIndex = 0;
			this.activeTab = this.tabs[0];
		}
	}

	firstUpdated() {
		const slot = this.renderRoot.querySelector("slot");
		this.tabs = slot
			? slot.assignedElements().filter((el) => el.tagName === "GRANTCODES-TAB")
			: [];
		this.tabButtons = Array.from(
			this.renderRoot.querySelectorAll("grantcodes-tabs-button"),
		);
		this.initializeTabs();
	}

	handleTabKeyDown(e) {
		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			e.preventDefault();
			const tabs = this.tabs;
			const nextIndex =
				e.key === "ArrowRight"
					? (this._focusedTabIndex + 1) % tabs.length
					: (this._focusedTabIndex - 1 + tabs.length) % tabs.length;

			// Focus the next tab button.
			const tabButton = this.tabButtons[nextIndex];
			if (tabButton) {
				tabButton.focus();
				this._focusedTabIndex = nextIndex;
			}
		}
	}

	renderTabButtons() {
		return this.tabs.map(
			(tab, i) => html`
				<grantcodes-tabs-button
					index=${i + 1}
					label="${tab.label}"
					containerId="${this.id}"
					active=${tab.active}
					@click=${() => {
						this.activeTab = tab;
					}}
					@keydown=${this.handleTabKeyDown}
				></grantcodes-tabs-button>
			`,
		);
	}

	render() {
		return html`
			<div class="tabs" id="${this.id}">
				<div role="tablist" class="tabs__tablist" aria-label=${ifDefined(this.label)}>
					<div class="tabs__tablist__inner">
						${this.renderTabButtons()}
					</div>
				</div>

				<div class="tabs__panels">
					<slot></slot>
				</div>
			</div>
		`;
	}
}
