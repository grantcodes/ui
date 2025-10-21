import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit/static-html.js";
import "./button.js";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-button");

const meta = {
	title: "Components/Button",
	component: "grantcodes-button",
	args,
	argTypes,
	render: (args) => template(args, html`Button label`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Button = {};
