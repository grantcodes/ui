import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./testimonials.js";

const { events, args, argTypes } = getStorybookHelpers(
	"grantcodes-testimonials",
);

const meta = {
	title: "Blocks/Testimonials",
	component: "grantcodes-testimonials",
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

const sampleItems = JSON.stringify([
	{
		quote:
			"This component library saved us weeks of design work. The theming system is incredibly flexible.",
		name: "Sarah Chen",
		role: "Lead Engineer",
		company: "Acme Corp",
		avatar: "https://i.pravatar.cc/64?img=1",
	},
	{
		quote: "Accessibility out of the box. Our audits pass first time now.",
		name: "Marcus Webb",
		role: "Frontend Developer",
		company: "Globex",
		avatar: "https://i.pravatar.cc/64?img=2",
	},
	{
		quote: "The design tokens make it trivial to match our brand guidelines.",
		name: "Priya Sharma",
		role: "Design Systems Lead",
		company: "Initech",
		avatar: "https://i.pravatar.cc/64?img=3",
	},
]);

/**
 * Default card layout testimonials.
 */
export const Cards = {
	args: {
		title: "What people are saying",
		items: sampleItems,
		layout: "cards",
	},
};

/**
 * List layout — stacked testimonials with more visual prominence.
 */
export const List = {
	args: {
		title: "Customer stories",
		items: sampleItems,
		layout: "list",
	},
};

/**
 * Testimonials without a section heading.
 */
export const NoHeading = {
	args: {
		items: sampleItems,
		layout: "cards",
	},
};
