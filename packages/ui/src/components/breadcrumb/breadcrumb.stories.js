import { html } from "lit";
import "./breadcrumb.js";

const meta = {
	title: "Components/Breadcrumb",
	component: "grantcodes-breadcrumb",
};

export default meta;

/**
 * Basic breadcrumb navigation showing the current page hierarchy
 */
export const Breadcrumb = {
	render: () => html`
		<grantcodes-breadcrumb>
			<grantcodes-breadcrumb-item href="/">Home</grantcodes-breadcrumb-item>
			<grantcodes-breadcrumb-item href="/products">Products</grantcodes-breadcrumb-item>
			<grantcodes-breadcrumb-item href="/products/electronics">
				Electronics
			</grantcodes-breadcrumb-item>
			<grantcodes-breadcrumb-item current>Laptops</grantcodes-breadcrumb-item>
		</grantcodes-breadcrumb>
	`,
};
