import { GrantCodesLoading } from "./loading.component.js";

export * from "./loading.component.js";
export default GrantCodesLoading;

if (!customElements.get("grantcodes-loading")) {
  customElements.define("grantcodes-loading", GrantCodesLoading);
}
