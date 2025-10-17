import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-notice");
import "./notice.js";

const meta: Meta = {
	component: "grantcodes-notice",
	args: {
		...args,
		text: "This is the notice content",
		title: "Notice title",
		variant: "info",
		dismissable: false,
	},
	argTypes: {
		...argTypes,
		variant: {
			type: "string",
		},
	},
	render: (args) => template(args, html`${args.text}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const InfoNotice: Story = {};

export const SuccessNotice: Story = {
	args: {
		variant: "success",
	},
};

export const WarningNotice: Story = {
	args: {
		variant: "warning",
	},
};

export const ErrorNotice: Story = {
	args: {
		variant: "error",
	},
};
