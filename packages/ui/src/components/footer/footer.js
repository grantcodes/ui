import { GrantCodesFooter } from "./footer.component.js";
import { GrantCodesFooterColumn } from "./footer-column.component.js";

export * from "./footer.component.js";
export * from "./footer-column.component.js";
export default GrantCodesFooter;

customElements.define("grantcodes-footer", GrantCodesFooter);
customElements.define("grantcodes-footer-column", GrantCodesFooterColumn);
