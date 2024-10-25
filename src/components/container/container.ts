import { GrantCodesContainer } from "./container.component.js";

export * from "./container.component.js";
export default GrantCodesContainer;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-container": GrantCodesContainer;
	}
}
