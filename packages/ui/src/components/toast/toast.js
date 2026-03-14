import {
	GrantCodesToast,
	GrantCodesToastContainer,
} from "./toast.component.js";

export * from "./toast.component.js";
export default GrantCodesToast;

if (!customElements.get("grantcodes-toast")) {
  customElements.define("grantcodes-toast", GrantCodesToast);
}
if (!customElements.get("grantcodes-toast-container")) {
  customElements.define("grantcodes-toast-container", GrantCodesToastContainer);
}
