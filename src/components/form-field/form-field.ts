import { GrantCodesFormField } from "./form-field.component.js";

export * from "./form-field.component.js";
export default GrantCodesFormField;

declare global {
	interface HTMLElementTagNameMap {
		"grantcodes-form-field": GrantCodesFormField;
	}
}
