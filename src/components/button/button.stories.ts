import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-button");
import { html } from "lit";
import "./button.js";

const meta: Meta = {
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
type Story = StoryObj;

export const Button: Story = {};
