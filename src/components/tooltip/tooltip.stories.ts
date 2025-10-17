import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-tooltip");
import "./tooltip.js";

const meta: Meta = {
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
type Story = StoryObj;

export const Tooltip: Story = {};

export const Description: Story = {
	args: {
		label: "",
		description: "This is a tooltip description",
	},
};
