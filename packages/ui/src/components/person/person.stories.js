import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./person.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-person");

const meta = {
	title: "Blocks/Person",
	component: "grantcodes-person",
	args,
	argTypes,
	parameters: {
		actions: {
			handles: events,
		},
		layout: "padded",
	},
};

export default meta;

/**
 * Standard Person component
 */
export const Default = {
	args: {
    name: "Grant Richmond",
    avatar: "https://backend.grant.codes/me.jpg",
    subtitle: "grant.codes",
    href: "https://grant.codes",
	},
};

export const Basic = {
  args: {
    name: "Grant Richmond",
  }
}
