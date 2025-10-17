import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-loading");
import "./loading.js";

const meta: Meta = {
	component: "grantcodes-loading",
	args: {
		...args,
		text: "Loading...",
	},
	argTypes,
	render: (args) => template(args, html`${args.text}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const Loading: Story = {};
