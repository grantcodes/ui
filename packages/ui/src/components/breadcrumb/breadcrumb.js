import {
	GrantCodesBreadcrumb,
	GrantCodesBreadcrumbItem,
} from "./breadcrumb.component.js";

export * from "./breadcrumb.component.js";
export default GrantCodesBreadcrumb;

if (!customElements.get("grantcodes-breadcrumb")) {
	customElements.define("grantcodes-breadcrumb", GrantCodesBreadcrumb);
}
if (!customElements.get("grantcodes-breadcrumb-item")) {
	customElements.define("grantcodes-breadcrumb-item", GrantCodesBreadcrumbItem);
}
