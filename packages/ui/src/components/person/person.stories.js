import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-person");
import "./person.js";

const meta = {
	title: "Components/Person",
	component: "grantcodes-person",
	args: {
		...args,
		name: "Tommy Tobasco",
		role: "Designer",
		company: "GrantCodes",
		avatar: "https://placehold.co/160x160",
		size: "small",
	},
	argTypes,
	render: (storyArgs) => template(storyArgs),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Default = {};

export const Initials = {
	args: {
		avatar: undefined,
	},
};
