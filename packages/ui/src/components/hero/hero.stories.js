import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./hero.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-hero");

const meta = {
	title: "Blocks/Hero",
	component: "grantcodes-hero",
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
 * Default hero with title, subtitle, and CTA.
 */
export const Default = {
	args: {
		title: "Build something great",
		subtitle: "A personal web component library with a custom design system.",
		button: "Get started",
		href: "/docs",
		size: "md",
	},
};

/**
 * Small hero — useful for inner page headers.
 */
export const Small = {
	args: {
		title: "About this project",
		subtitle: "A brief overview of what we're building.",
		size: "sm",
	},
};

/**
 * Large hero with no CTA.
 */
export const Large = {
	args: {
		title: "Welcome",
		size: "lg",
	},
};
