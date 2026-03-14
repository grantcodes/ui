import { GrantCodesTabs } from "./tabs.component.js";

export * from "./tabs.component.js";
export default GrantCodesTabs;

if (!customElements.get("grantcodes-tabs")) {
  customElements.define("grantcodes-tabs", GrantCodesTabs);
}
