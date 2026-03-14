import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./pricing.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-pricing");

const meta = {
	title: "Blocks/Pricing",
	component: "grantcodes-pricing",
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

const tiers = JSON.stringify([
	{
		name: "Starter",
		price: "$0",
		period: "month",
		description: "Perfect for side projects and open source.",
		features: [
			{ text: "5 projects", included: true },
			{ text: "Community support", included: true },
			{ text: "Basic analytics", included: true },
			{ text: "Custom domain", included: false },
			{ text: "Priority support", included: false },
		],
		cta: { label: "Get started free", href: "/signup" },
		highlighted: false,
	},
	{
		name: "Pro",
		price: "$19",
		period: "month",
		description: "Everything you need for a growing team.",
		features: [
			{ text: "Unlimited projects", included: true },
			{ text: "Priority support", included: true },
			{ text: "Advanced analytics", included: true },
			{ text: "Custom domain", included: true },
			{ text: "SLA guarantee", included: false },
		],
		cta: { label: "Start free trial", href: "/signup?plan=pro" },
		highlighted: true,
	},
	{
		name: "Enterprise",
		price: "$99",
		period: "month",
		description: "Dedicated support and compliance features.",
		features: [
			{ text: "Unlimited projects", included: true },
			{ text: "Dedicated support", included: true },
			{ text: "Advanced analytics", included: true },
			{ text: "Custom domain", included: true },
			{ text: "SLA guarantee", included: true },
		],
		cta: { label: "Contact sales", href: "/contact" },
		highlighted: false,
	},
]);

/**
 * Three-tier pricing with one highlighted plan.
 */
export const Default = {
	args: {
		title: "Simple, transparent pricing",
		subtitle: "No hidden fees. Cancel any time.",
		tiers,
	},
};

/**
 * Pricing without the section heading.
 */
export const NoHeading = {
	args: {
		tiers,
	},
};

/**
 * Two-tier pricing — free vs paid.
 */
export const TwoTiers = {
	args: {
		title: "Choose a plan",
		tiers: JSON.stringify([
			{
				name: "Free",
				price: "$0",
				description: "Get started at no cost.",
				features: [
					{ text: "3 projects", included: true },
					{ text: "Community support", included: true },
					{ text: "Custom domain", included: false },
				],
				cta: { label: "Sign up free", href: "/signup" },
				highlighted: false,
			},
			{
				name: "Paid",
				price: "$9",
				period: "month",
				description: "Unlock the full platform.",
				features: [
					{ text: "Unlimited projects", included: true },
					{ text: "Email support", included: true },
					{ text: "Custom domain", included: true },
				],
				cta: { label: "Upgrade", href: "/upgrade" },
				highlighted: true,
			},
		]),
	},
};
