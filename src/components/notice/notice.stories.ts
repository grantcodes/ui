import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./notice.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-notice",
	args: {
		text: "This is the notice content",
		title: "Notice title",
		variant: "info",
	},
	argTypes: {
		variant: {
			type: "string",
		},
	},
	render: ({ text, title, variant, onDismiss }) =>
		// TODO: I think on-dismiss is bad practice, because it's using on- prefix
		html`<grantcodes-notice
      variant="${variant}"
      title="${title}"
      on-dismiss="${onDismiss}"
      >${text}</grantcodes-notice
    >`,
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
