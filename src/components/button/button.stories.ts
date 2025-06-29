import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./button.js";

const meta: Meta = {
	component: "grantcodes-button",
	args: {
		label: "Button Label",
		href: "https://www.google.com",
		type: "button",
		name: "button",
		value: "button",
		disabled: false,
	},
	render: ({
		label,
		href,
		type,
		name,
		value,
		disabled,
	}) => html`<grantcodes-button
		href=${href}
		type=${type}
		name=${name}
		value=${value}
		?disabled=${disabled}
	>${label}</grantcodes-button>`,
};

export default meta;
type Story = StoryObj;

export const Button: Story = {};
