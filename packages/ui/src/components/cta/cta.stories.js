import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./cta.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-cta");

const meta = {
	title: "Blocks/CTA",
	component: "grantcodes-cta",
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
 * Default centered CTA with primary and secondary actions.
 */
export const Default = {
	args: {
		eyebrow: "Get started today",
		title: "Build something remarkable",
		text: "A personal web component library with a custom design system, ready for your next project.",
		"primary-action": JSON.stringify({ label: "Get started", href: "/docs" }),
		"secondary-action": JSON.stringify({ label: "Learn more", href: "/about" }),
		align: "center",
	},
};

/**
 * Left-aligned CTA, no secondary action.
 */
export const LeftAligned = {
	args: {
		title: "Ready to ship?",
		text: "Deploy your components today with zero configuration.",
		"primary-action": JSON.stringify({ label: "Deploy now", href: "/deploy" }),
		align: "left",
	},
};

/**
 * Minimal CTA — title only with a single action.
 */
export const Minimal = {
	args: {
		title: "Join the community",
		"primary-action": JSON.stringify({ label: "Sign up", href: "/signup" }),
		align: "center",
	},
};
