import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./feature-list.js";

const { events, args, argTypes } = getStorybookHelpers(
	"grantcodes-feature-list",
);

const meta = {
	title: "Blocks/FeatureList",
	component: "grantcodes-feature-list",
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
		title: "Fast by default",
		description: "Zero-runtime CSS with design tokens baked in at build time.",
		icon: "⚡",
	},
	{
		title: "Accessible",
		description:
			"WAI-ARIA compliant components with keyboard navigation support.",
		icon: "♿",
	},
	{
		title: "Themeable",
		description: "Switch between themes without touching component code.",
		icon: "🎨",
	},
	{
		title: "Framework-agnostic",
		description: "Standard web components that work anywhere.",
		icon: "🔌",
	},
	{
		title: "Tree-shakeable",
		description: "Import only the components you use.",
		icon: "🌲",
	},
	{
		title: "Well documented",
		description: "Storybook stories and JSDoc for every component.",
		icon: "📚",
	},
]);

/**
 * Default 3-column feature grid with heading and subtitle.
 */
export const Default = {
	args: {
		title: "Everything you need",
		subtitle: "Built for developers who care about quality.",
		items: sampleItems,
		columns: 3,
	},
};

/**
 * Two-column layout — useful for simpler feature sets.
 */
export const TwoColumn = {
	args: {
		title: "Key features",
		items: JSON.stringify([
			{
				title: "Design tokens",
				description:
					"Consistent spacing, colour, and typography across your entire UI.",
				icon: "🎯",
			},
			{
				title: "Lit-powered",
				description: "Lightweight reactive web components built with Lit.",
				icon: "🔥",
			},
		]),
		columns: 2,
	},
};

/**
 * Features with links on each item.
 */
export const WithLinks = {
	args: {
		title: "Explore components",
		items: JSON.stringify([
			{
				title: "Button",
				description: "Primary, secondary, ghost variants.",
				href: "/button",
			},
			{
				title: "Card",
				description: "Flexible content containers.",
				href: "/card",
			},
			{
				title: "Dialog",
				description: "Accessible modal dialogs.",
				href: "/dialog",
			},
		]),
		columns: 3,
	},
};
