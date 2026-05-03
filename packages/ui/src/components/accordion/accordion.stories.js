import { html } from "lit";
import "./accordion.js";

const meta = {
	title: "Components/Accordion",
	component: "grantcodes-accordion",
};

export default meta;

/**
 * Default accordion with multiple items.
 */
export const Accordion = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="What is this?">
				This is an accordion component that allows you to collapse and expand content sections.
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="How do I use it?">
				Wrap grantcodes-accordion-item elements inside a grantcodes-accordion.
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="Can I customize it?">
				Yes, you can style the accordion using CSS custom properties and theme variables.
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};

/**
 * Single item accordion.
 */
export const SingleItem = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="Click to expand">
				This is the content that appears when you expand this accordion item.
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};

/**
 * Accordion with multiple items, first one expanded by default.
 */
export const MultipleItems = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="First Section" open>
				Content for the first section.
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="Second Section">
				Content for the second section.
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="Third Section">
				Content for the third section.
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="Fourth Section">
				Content for the fourth section.
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};

/**
 * Text content in slots is plain text — HTML-looking strings display literally.
 */
export const EscapedPlainTextContent = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="HTML-looking plain text">
				&lt;strong&gt;This stays text&lt;/strong&gt;
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};

/**
 * Slotted HTML content renders naturally — consumers compose their own markup.
 */
export const TrustedHtmlContent = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="Trusted rich content">
				<p>This renders <strong>trusted HTML</strong>.</p>
				<ul>
					<li>Content is composed directly in your template</li>
					<li>No unsafeHTML needed in the component</li>
				</ul>
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};

/**
 * Items can slot any HTML — paragraphs, lists, images, or plain text.
 */
export const MixedContent = {
	render: () => html`
		<grantcodes-accordion>
			<grantcodes-accordion-item title="Rich markup">
				<p>This panel uses <em>multiple</em> HTML elements:</p>
				<ul>
					<li>Paragraphs</li>
					<li>Lists</li>
					<li><strong>Emphasis</strong></li>
				</ul>
			</grantcodes-accordion-item>
			<grantcodes-accordion-item title="Plain text">
				This panel is just plain text.
			</grantcodes-accordion-item>
		</grantcodes-accordion>
	`,
};
