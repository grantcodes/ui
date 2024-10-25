import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./icon.js";
import { ArrowRight } from "../../icons.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-icon",
	render: ({ icon }) =>
		html`<grantcodes-icon icon="${icon}"></grantcodes-icon>`,
	args: {
		icon: ArrowRight,
	},
};

export default meta;
type Story = StoryObj;

export const Icon: Story = {};
