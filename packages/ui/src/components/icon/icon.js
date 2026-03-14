import { GrantCodesIcon } from "./icon.component.js";

export * from "./icon.component.js";
export default GrantCodesIcon;

if (!customElements.get("grantcodes-icon")) {
  customElements.define("grantcodes-icon", GrantCodesIcon);
}
