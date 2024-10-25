import { LitElement, html, unsafeCSS } from "lit";
import {
	customElement,
	property,
	state,
	queryAll,
	queryAssignedElements,
} from "lit/decorators.js";
import tabsStyles from "./tabs.scss?inline";
import type { GrantCodesTab } from "./tab.component";
import type { GrantCodesTabsTab } from "./tabs-tab.component";
import "./tabs-tab";
import "./tabs-panel";
import { generateId } from "../../lib/generate-id";

@customElement("grantcodes-tabs")
export class GrantCodesTabs extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(tabsStyles)];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'

	constructor() {
		super();

		this.id = generateId("tabs");
	}

	@property({ type: String })
	label = "";

	// get labeledBy(): string | null {
	//   if (this.label.startsWith('#')) {
	//     return this.label
	//   }
	//   return null
	// }

	@queryAssignedElements({ selector: "grantcodes-tab" })
	tabs!: GrantCodesTab[];

	@queryAll("grantcodes-tabs-tab")
	tabsListTabs!: GrantCodesTabsTab[];

	@state()
	focusedTabIndex = -1;

	get activeTab() {
		return this.tabs.find((tab) => tab.active) ?? null;
	}

	set activeTab(tab: GrantCodesTab | null) {
		// Ignore setting activeTab to null. As long as there are children, one tab
		// must be selected.
		this.tabs.map((t, i) => {
			if (t === tab) {
				t.active = true;
				this.focusedTabIndex = i;
			} else {
				t.active = false;
			}
		});
		this.requestUpdate();
	}

	firstUpdated(): void {
		this.requestUpdate();
		if (this.activeTab == null) {
			this.activeTab = this.tabs[0];
		}
	}

	handleTabKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			e.preventDefault();
			const tabs = this.tabs;
			const nextIndex =
				e.key === "ArrowRight"
					? (this.focusedTabIndex + 1) % tabs.length
					: this.focusedTabIndex - 1;

			// Focus the next tab.
			const tabsListTab = this.tabsListTabs[nextIndex];
			if (tabsListTab) {
				tabsListTab.focus();
				this.focusedTabIndex = nextIndex;
			}
		}
	}

	// TODO: Should be able to use arrow keys to browse tabs.

	render() {
		return html`
      <div class="tabs" id="${this.id}">
        <div role="tablist" class="tabs__tablist" aria-label=${this.label}>
          <div class="tabs__tablist__inner">
            ${this.tabs.map(
							(tab, i) =>
								html`<grantcodes-tabs-tab
                  index=${i + 1}
                  label="${tab.label}"
                  containerId="${this.id}"
                  ?active=${tab.active}
                  @click=${() => {
										this.activeTab = tab;
									}}
                  @keydown=${this.handleTabKeyDown}
                ></grantcodes-tabs-tab>`,
						)}
          </div>
        </div>

        <div class="tabs__panels">
          ${this.tabs.map(
						(tab, i) =>
							html`<grantcodes-tabs-panel
                index=${i}
                label="${tab.label}"
                containerId="${this.id}"
                ?active=${tab.active}
                >${tab.content}</grantcodes-tabs-panel
              >`,
					)}
        </div>

        <slot></slot>
      </div>
    `;
	}
}
