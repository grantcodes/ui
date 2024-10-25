import { GrantCodesTab } from "./tab.component.js";

export * from "./tab.component.js";
export default GrantCodesTab;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-tab": GrantCodesTab;
	}
}
