import { GrantCodesButtonGroup } from "./button-group.component.js";

export * from "./button-group.component.js";
export default GrantCodesButtonGroup;

// GrantCodesButtonGroup.define('grantcodes-button-group')

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-button-group": GrantCodesButtonGroup;
	}
}
