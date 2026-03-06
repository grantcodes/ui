import { html } from "lit";
import "./badge.js";

const meta = {
	title: "Components/Badge",
	component: "grantcodes-badge",
	args: {
		variant: "neutral",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "success", "warning", "error", "info", "neutral"],
		},
	},
	render: (args) => html`
		<grantcodes-badge variant=${args.variant} style=${args.style}>
			Badge
		</grantcodes-badge>
	`,
};

export default meta;

/**
 * Default badge with neutral variant
 */
export const Badge = {};

export const Primary = {
	args: {
		variant: "primary",
	},
};

export const Success = {
	args: {
		variant: "success",
	},
};

export const Warning = {
	args: {
		variant: "warning",
	},
};
