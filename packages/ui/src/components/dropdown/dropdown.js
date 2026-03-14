import {
	GrantCodesDropdown,
	GrantCodesDropdownItem,
} from "./dropdown.component.js";

export * from "./dropdown.component.js";
export default GrantCodesDropdown;

if (!customElements.get("grantcodes-dropdown")) {
  customElements.define("grantcodes-dropdown", GrantCodesDropdown);
}
if (!customElements.get("grantcodes-dropdown-item")) {
  customElements.define("grantcodes-dropdown-item", GrantCodesDropdownItem);
}
