import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./logo-cloud.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-logo-cloud");

const meta = {
	title: "Blocks/LogoCloud",
	component: "grantcodes-logo-cloud",
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

const sampleLogos = JSON.stringify([
	{
		name: "Acme Corp",
		src: "https://placehold.co/120x40?text=Acme",
		alt: "Acme Corp logo",
	},
	{
		name: "Globex",
		src: "https://placehold.co/120x40?text=Globex",
		alt: "Globex logo",
	},
	{
		name: "Initech",
		src: "https://placehold.co/120x40?text=Initech",
		alt: "Initech logo",
	},
	{
		name: "Umbrella",
		src: "https://placehold.co/120x40?text=Umbrella",
		alt: "Umbrella Corp logo",
	},
	{
		name: "Hooli",
		src: "https://placehold.co/120x40?text=Hooli",
		alt: "Hooli logo",
	},
]);

/**
 * Logo cloud with a label and linked logos.
 */
export const Default = {
	args: {
		title: "Trusted by teams at",
		logos: JSON.stringify([
			{
				name: "Acme Corp",
				src: "https://placehold.co/120x40?text=Acme",
				alt: "Acme Corp logo",
				href: "https://example.com",
			},
			{
				name: "Globex",
				src: "https://placehold.co/120x40?text=Globex",
				alt: "Globex logo",
				href: "https://example.com",
			},
			{
				name: "Initech",
				src: "https://placehold.co/120x40?text=Initech",
				alt: "Initech logo",
				href: "https://example.com",
			},
			{
				name: "Umbrella",
				src: "https://placehold.co/120x40?text=Umbrella",
				alt: "Umbrella Corp logo",
				href: "https://example.com",
			},
			{
				name: "Hooli",
				src: "https://placehold.co/120x40?text=Hooli",
				alt: "Hooli logo",
				href: "https://example.com",
			},
		]),
	},
};

/**
 * Logo cloud without a title heading.
 */
export const NoTitle = {
	args: {
		logos: sampleLogos,
	},
};

/**
 * Logo cloud with unlinked logos — read-only brand display.
 */
export const Unlinked = {
	args: {
		title: "Built with",
		logos: sampleLogos,
	},
};
