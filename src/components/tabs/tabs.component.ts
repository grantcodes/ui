import { LitElement, html, unsafeCSS } from "lit";
import {
	customElement,
	property,
	state,
	queryAll,
	queryAssignedElements,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tabsStyles from "./tabs.scss?inline";
import type { GrantCodesTab } from "./tab.component";
import type { GrantCodesTabsButton } from "./internal/tabs-button.component";
import "./internal/tabs-button";
import { generateId } from "../../lib/generate-id";

@customElement("grantcodes-tabs")
export class GrantCodesTabs extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(tabsStyles)];

	constructor() {
		super();

		if (!this.id) {
			this.id = generateId("tabs");
		}
	}

	@property({ type: String })
	label?: string;

	@queryAssignedElements({ selector: "grantcodes-tab" })
	tabs!: GrantCodesTab[];

	@queryAll("grantcodes-tabs-button")
	tabButtons!: GrantCodesTabsButton[];

	@state()
	focusedTabIndex = -1;

	get activeTab() {
		return this.tabs.find((tab) => tab.active) ?? null;
	}

	set activeTab(tab: GrantCodesTab | null) {
		// Ignore setting activeTab to null. As long as there are children, one tab
		// must be selected.
		this.tabs.forEach((t, i) => {
			if (t === tab) {
				t.active = true;
				this.focusedTabIndex = i;
			} else {
				t.active = false;
			}
		});
		this.requestUpdate();
	}

	private initializeTabs() {
		this.tabs.forEach((tab, i) => {
			tab.index = i;
			tab.containerId = this.id;
		});

		// If no tab is active, default to the first tab.
		if (this.activeTab == null) {
			this.focusedTabIndex = 0;
			this.activeTab = this.tabs[0];
		}
	}

	firstUpdated(): void {
		this.initializeTabs();
	}

	handleTabKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			e.preventDefault();
			const tabs = this.tabs;
			const nextIndex =
				e.key === "ArrowRight"
					? (this.focusedTabIndex + 1) % tabs.length
					: this.focusedTabIndex - 1;

			// Focus the next tab button.
			const tabButton = this.tabButtons[nextIndex];
			if (tabButton) {
				tabButton.focus();
				this.focusedTabIndex = nextIndex;
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
					?active=${tab.active}
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
