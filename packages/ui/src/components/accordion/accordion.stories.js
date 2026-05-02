import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./accordion.js";
const { events, args, argTypes } = getStorybookHelpers(
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

/**
 * `content` is escaped plain text, so HTML-looking strings display literally.
 */
export const EscapedPlainTextContent = {
	args: {
		items: [
			{
				title: "HTML-looking plain text",
				content: "<strong>This stays text</strong>",
			},
		],
	},
};

/**
 * `htmlContent` is a trusted HTML path; only pass trusted or already-sanitized strings.
 */
export const TrustedHtmlContent = {
	args: {
		items: [
			{
				title: "Trusted rich content",
				htmlContent:
					"<p>This renders <strong>trusted HTML</strong>.</p><ul><li>Only pass trusted or already-sanitized strings.</li></ul>",
			},
		],
	},
};

/**
 * When both fields are present, `htmlContent` is trusted/sanitized-only and wins over `content`.
 */
export const HtmlContentPrecedence = {
	args: {
		items: [
			{
				title: "Both fields",
				content: "<em>This content fallback is ignored</em>",
				htmlContent: "<strong>htmlContent wins</strong>",
			},
		],
	},
};
