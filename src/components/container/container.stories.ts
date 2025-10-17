import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-container",
);
import "./container.js";

const meta: Meta = {
	component: "grantcodes-container",
	args: {
		...args,
		content: "This content is inside the container.",
		align: undefined,
		nopad: false,
	},
	argTypes: {
		...argTypes,
		align: {
			type: "string",
			options: ["default", "wide", "full", "viewport"],
			control: { type: "radio" },
		},
	},
	render: (args) =>
		template(
			args,
			html`<div style="background-color: var(--color-base-background-shade)">
					${args.content}
				</div>`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const Container: Story = {};

export const WideContainer: Story = {
	args: {
		align: "wide",
	},
};

export const FullContainer: Story = {
	args: {
		align: "full",
	},
};

export const ViewportContainer: Story = {
	args: {
		align: "viewport",
	},
};
