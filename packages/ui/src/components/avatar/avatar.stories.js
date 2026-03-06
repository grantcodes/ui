import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-avatar");
import "./avatar.js";

const meta = {
	title: "Components/Avatar",
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

export const Avatar = {};

export const Initials = {
	args: {
		src: undefined,
	},
};












