import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit/static-html.js";
import "./accordion.js";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-accordion",
);

const meta = {
	title: "Components/Accordion",
	component: "grantcodes-accordion",
	args,
	argTypes,
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

/**
 * Default accordion with multiple items.
 */
export const Accordion = {
	args: {
		items: [
			{
				title: "What is this?",
				content:
					"This is an accordion component that allows you to collapse and expand content sections.",
			},
			{
				title: "How do I use it?",
				content:
					"Pass an array of items with title and content properties to the items property.",
			},
			{
				title: "Can I customize it?",
				content:
					"Yes, you can style the accordion using CSS custom properties and theme variables.",
			},
		],
	},
};

/**
 * Single item accordion.
 */
export const SingleItem = {
	args: {
		items: [
			{
				title: "Click to expand",
				content:
					"This is the content that appears when you expand this accordion item.",
			},
		],
	},
};

/**
 * Accordion with multiple items expanded by default.
 * Note: Native HTML details/summary doesn't support open by default,
 * but you can control this with CSS or JavaScript if needed.
 */
export const MultipleItems = {
	args: {
		items: [
			{
				title: "First Section",
				content: "Content for the first section.",
			},
			{
				title: "Second Section",
				content: "Content for the second section.",
			},
			{
				title: "Third Section",
				content: "Content for the third section.",
			},
			{
				title: "Fourth Section",
				content: "Content for the fourth section.",
			},
		],
	},
};
