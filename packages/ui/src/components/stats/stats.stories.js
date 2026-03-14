import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./stats.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-stats");

const meta = {
	title: "Blocks/Stats",
	component: "grantcodes-stats",
	args,
	argTypes,
	parameters: {
		actions: {
			handles: events,
		},
		layout: "fullscreen",
	},
};

export default meta;

/**
 * Default stats block with 4 metrics.
 */
export const Default = {
	args: {
		title: "By the numbers",
		items: JSON.stringify([
			{ value: "10k+", label: "Developers", context: "using our components" },
			{ value: "99.9%", label: "Uptime", context: "in the last 12 months" },
			{ value: "42ms", label: "Avg load time" },
			{ value: "24/7", label: "Support" },
		]),
		columns: 4,
	},
};

/**
 * Three stats — useful when you have fewer key metrics.
 */
export const ThreeStats = {
	args: {
		items: JSON.stringify([
			{ value: "500+", label: "Components" },
			{ value: "15", label: "Themes" },
			{ value: "0", label: "Dependencies" },
		]),
		columns: 3,
	},
};

/**
 * Stats without a heading — embed directly into a page section.
 */
export const NoHeading = {
	args: {
		items: JSON.stringify([
			{ value: "$0", label: "Cost to start" },
			{ value: "MIT", label: "License" },
			{ value: "100%", label: "Open source" },
			{ value: "∞", label: "Customisable" },
		]),
		columns: 4,
	},
};
