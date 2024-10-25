import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./button.js";

const meta: Meta = {
	component: "grantcodes-button",
	args: {
		label: "Button Label",
	},
	render: ({ label }) => html`<grantcodes-button>${label}</grantcodes-button>`,
};

export default meta;
type Story = StoryObj;

export const Button: Story = {};
