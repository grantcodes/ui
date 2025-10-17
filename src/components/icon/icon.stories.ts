import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-icon");
import "./icon.js";
import { ArrowRight } from "../../icons.js";

const meta: Meta = {
	component: "grantcodes-icon",
	args: {
		...args,
		icon: ArrowRight,
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

export const Icon: Story = {};
