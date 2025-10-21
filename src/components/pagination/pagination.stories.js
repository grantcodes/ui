import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-pagination",
);
import "./pagination.js";

const meta = {
	title: "Components/Pagination",
	component: "grantcodes-pagination",
	args: {
		...args,
		previousHref: "#1",
		nextHref: "#3",
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

export const Pagination = {};
