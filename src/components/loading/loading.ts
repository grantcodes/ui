import { GrantCodesLoading } from "./loading.component.js";

export * from "./loading.component.js";
export default GrantCodesLoading;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-loading": GrantCodesLoading;
	}
}
