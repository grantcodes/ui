import { GrantCodesCard } from "./card.component.js";

export * from "./card.component.js";
export default GrantCodesCard;

if (!customElements.get("grantcodes-card")) {
	customElements.define("grantcodes-card", GrantCodesCard);
}
