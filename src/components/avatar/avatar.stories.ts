import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-avatar");
import "./avatar.js";

const meta: Meta = {
	component: "grantcodes-avatar",
	args: {
		...args,
		src: "https://placehold.co/160x160",
		name: "Tommy Tobasco",
		alt: "Tommy Tomasco Avatar",
		initials: "2T",
	},
	argTypes,
	render: (args) => template(args),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const Avatar: Story = {};

export const Initials: Story = {
	args: {
		src: undefined,
	},
};
