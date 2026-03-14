import { GrantCodesTooltip } from "./tooltip.component.js";

export * from "./tooltip.component.js";
export default GrantCodesTooltip;

if (!customElements.get("grantcodes-tooltip")) {
  customElements.define("grantcodes-tooltip", GrantCodesTooltip);
}
