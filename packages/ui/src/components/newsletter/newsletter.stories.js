import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./newsletter.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-newsletter");

const meta = {
	title: "Blocks/Newsletter",
	component: "grantcodes-newsletter",
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
 * Default newsletter signup with disclaimer.
 */
export const Default = {
	args: {
		title: "Stay in the loop",
		text: "Get the latest updates, articles, and resources delivered straight to your inbox.",
		action: "/subscribe",
		method: "post",
		placeholder: "you@example.com",
		"button-label": "Subscribe",
		disclaimer: "No spam. Unsubscribe at any time.",
	},
};

/**
 * Minimal newsletter — title and input only.
 */
export const Minimal = {
	args: {
		title: "Subscribe for updates",
		action: "/subscribe",
		"button-label": "Subscribe",
	},
};

/**
 * Newsletter with a custom button label and placeholder.
 */
export const CustomLabels = {
	args: {
		title: "Join the newsletter",
		text: "Weekly tips on building great web experiences.",
		action: "/newsletter",
		placeholder: "Enter your email",
		"button-label": "Join now",
		disclaimer: "We respect your privacy.",
	},
};
