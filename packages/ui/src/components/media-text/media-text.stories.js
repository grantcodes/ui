import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./media-text.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-media-text");

const meta = {
	title: "Blocks/MediaText",
	component: "grantcodes-media-text",
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
 * Default media-text — image on the left, text on the right.
 */
export const Default = {
	args: {
		title: "Design tokens done right",
		text: "Our style dictionary generates CSS custom properties, JS tokens, and JSON outputs from a single source of truth — keeping every theme in perfect sync.",
		media: JSON.stringify({
			src: "https://placehold.co/640x480",
			alt: "Design tokens diagram",
			kind: "image",
		}),
		cta: JSON.stringify({ label: "Read the docs", href: "/docs/tokens" }),
		reverse: false,
	},
};

/**
 * Reversed layout — image on the right, text on the left.
 */
export const Reversed = {
	args: {
		title: "Accessible by default",
		text: "Every component ships with ARIA attributes, keyboard navigation, and focus management built in. No extra configuration required.",
		media: JSON.stringify({
			src: "https://placehold.co/640x480",
			alt: "Accessibility diagram",
			kind: "image",
		}),
		reverse: true,
	},
};

/**
 * Video media variant.
 */
export const Video = {
	args: {
		title: "See it in action",
		text: "Watch how quickly you can spin up a fully-themed UI with our component library.",
		media: JSON.stringify({
			src: "https://www.w3schools.com/html/mov_bbb.mp4",
			alt: "Demo video",
			kind: "video",
		}),
		cta: JSON.stringify({ label: "Try it yourself", href: "/playground" }),
		reverse: false,
	},
};
