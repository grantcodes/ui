import { GrantCodesAccordion } from "./accordion.component.js";
import { GrantCodesAccordionItem } from "./accordion-item.component.js";

export * from "./accordion.component.js";
export * from "./accordion-item.component.js";
export default GrantCodesAccordion;

customElements.define("grantcodes-accordion", GrantCodesAccordion);
customElements.define("grantcodes-accordion-item", GrantCodesAccordionItem);
