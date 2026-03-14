import { GrantCodesFooter } from "./footer.component.js";
import { GrantCodesFooterColumn } from "./footer-column.component.js";

export * from "./footer.component.js";
export * from "./footer-column.component.js";
export default GrantCodesFooter;

if (!customElements.get("grantcodes-footer")) {
	customElements.define("grantcodes-footer", GrantCodesFooter);
}
if (!customElements.get("grantcodes-footer-column")) {
	customElements.define("grantcodes-footer-column", GrantCodesFooterColumn);
}
