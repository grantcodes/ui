import { GrantCodesSidebar } from "./sidebar.component.js";

export * from "./sidebar.component.js";
export default GrantCodesSidebar;

if (!customElements.get("grantcodes-sidebar")) {
	customElements.define("grantcodes-sidebar", GrantCodesSidebar);
}
