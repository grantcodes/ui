import { GrantCodesTabsTab } from "./tabs-tab.component.js";

export * from "./tabs-tab.component.js";
export default GrantCodesTabsTab;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-tabs-tab": GrantCodesTabsTab;
	}
}
