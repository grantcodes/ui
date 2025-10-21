import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-tooltip");
import "./tooltip.js";

const meta = {
	title: "Components/Tooltip",
	component: "grantcodes-tooltip",
	args: {
		...args,
		label: "This is a tooltip label",
		description: "",
	},
	argTypes,
	render: (args) => template(args, html`<span>This has a tooltip</span>`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Tooltip = {};

export const Description = {
	args: {
		label: "",
		description: "This is a tooltip description",
	},
};
