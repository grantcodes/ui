import { html } from "lit";
import "../components/app-bar/app-bar.js";
import "../components/button/button.js";
import "../components/hero/hero.js";
import "../components/logo-cloud/logo-cloud.js";
import "../components/feature-list/feature-list.js";
import "../components/stats/stats.js";
import "../components/testimonials/testimonials.js";
import "../components/pricing/pricing.js";
import "../components/newsletter/newsletter.js";
import "../components/footer/footer.js";

const meta = {
	title: "Pages/SaaS Landing",
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

const navLinks = html`
	<a href="/">Home</a>
	<a href="/features">Features</a>
	<a href="/pricing">Pricing</a>
	<a href="/about">About</a>
`;

const footerContent = html`
	<grantcodes-footer-column>
		<h3>Flowbase</h3>
		<p>The modern platform for teams that move fast and ship great software.</p>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Product</h3>
		<ul>
			<li><a href="/features">Features</a></li>
			<li><a href="/pricing">Pricing</a></li>
			<li><a href="/changelog">Changelog</a></li>
			<li><a href="/roadmap">Roadmap</a></li>
		</ul>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Company</h3>
		<ul>
			<li><a href="/about">About</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/careers">Careers</a></li>
			<li><a href="/press">Press</a></li>
		</ul>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Legal</h3>
		<ul>
			<li><a href="/privacy">Privacy Policy</a></li>
			<li><a href="/terms">Terms of Service</a></li>
			<li><a href="/security">Security</a></li>
			<li><a href="/cookies">Cookie Policy</a></li>
		</ul>
	</grantcodes-footer-column>
`;

/**
 * Full SaaS product landing page. Demonstrates a realistic composition of
 * all block components from top to bottom: app-bar, hero, logo-cloud,
 * feature-list, stats, testimonials, pricing, newsletter, and footer.
 */
export const Default = {
	render: () => html`
		<grantcodes-app-bar sticky>
			<a slot="logo" href="/" style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: inherit;">
				Flowbase
			</a>
			<div slot="nav" style="display: flex; gap: 0.5rem;">
				${navLinks}
			</div>
			<div slot="actions" style="display: flex; gap: 0.5rem;">
				<grantcodes-button variant="ghost">Sign in</grantcodes-button>
				<grantcodes-button>Get started</grantcodes-button>
			</div>
		</grantcodes-app-bar>

		<grantcodes-hero
			title="Ship faster without the chaos"
			subtitle="Flowbase brings your team's tasks, docs, and deploys into one calm, focused workspace. No more tab-switching. No more dropped balls."
			button="Start for free"
			href="/signup"
			size="lg"
		></grantcodes-hero>

		<grantcodes-logo-cloud
			title="Trusted by teams at"
			logos=${JSON.stringify([
				{ name: "Vercel", src: "https://placehold.co/120x40?text=Vercel", alt: "Vercel" },
				{ name: "Linear", src: "https://placehold.co/120x40?text=Linear", alt: "Linear" },
				{ name: "Stripe", src: "https://placehold.co/120x40?text=Stripe", alt: "Stripe" },
				{ name: "Notion", src: "https://placehold.co/120x40?text=Notion", alt: "Notion" },
				{ name: "Figma", src: "https://placehold.co/120x40?text=Figma", alt: "Figma" },
				{ name: "Loom", src: "https://placehold.co/120x40?text=Loom", alt: "Loom" },
			])}
		></grantcodes-logo-cloud>

		<grantcodes-feature-list
			title="Everything your team needs"
			subtitle="Flowbase combines the tools you already love into a single, cohesive experience — so your team stays in flow."
			columns="3"
			items=${JSON.stringify([
				{ title: "Task management", description: "Create, assign, and track work across your entire team with a simple, powerful interface.", icon: "check-square" },
				{ title: "Real-time docs", description: "Write collaboratively without conflicts. Docs live next to the tasks they belong to.", icon: "file-text" },
				{ title: "CI/CD pipelines", description: "Trigger builds, run tests, and deploy to production without leaving your workspace.", icon: "git-branch" },
				{ title: "Team inbox", description: "Pull in Slack, email, and GitHub notifications into one shared inbox your team can triage together.", icon: "inbox" },
				{ title: "Analytics", description: "Understand velocity, cycle time, and deployment frequency with built-in engineering metrics.", icon: "bar-chart-2" },
				{ title: "Access controls", description: "Fine-grained roles and SSO keep your data secure without slowing your team down.", icon: "shield" },
			])}
		></grantcodes-feature-list>

		<grantcodes-stats
			title="Built for teams that care about output"
			columns="4"
			items=${JSON.stringify([
				{ value: "12×", label: "Faster shipping", context: "compared to teams using 4+ separate tools" },
				{ value: "98%", label: "Uptime SLA", context: "backed by our enterprise plan" },
				{ value: "50k+", label: "Active teams", context: "across 80 countries" },
				{ value: "4.9 / 5", label: "Customer rating", context: "across G2, Capterra, and Product Hunt" },
			])}
		></grantcodes-stats>

		<grantcodes-testimonials
			title="What teams are saying"
			layout="cards"
			items=${JSON.stringify([
				{
					quote: "We cut our weekly planning meeting from 90 minutes to 15. Flowbase just… makes it obvious what needs to happen next.",
					name: "Maya Okafor",
					role: "Engineering Lead",
					company: "Pulse Labs",
					avatar: "https://i.pravatar.cc/80?img=47",
				},
				{
					quote: "I've tried every project tool out there. Flowbase is the first one that didn't need a dedicated Ops person to keep it clean.",
					name: "Sam Torres",
					role: "CTO",
					company: "Stackform",
					avatar: "https://i.pravatar.cc/80?img=12",
				},
				{
					quote: "The CI integration alone saved us four hours a week. The rest is just a bonus at this point.",
					name: "Priya Nair",
					role: "Senior Developer",
					company: "Mintcode",
					avatar: "https://i.pravatar.cc/80?img=32",
				},
			])}
		></grantcodes-testimonials>

		<grantcodes-pricing
			title="Simple, honest pricing"
			subtitle="No per-seat surprises. No feature gating. Pick the plan that fits your team size."
			tiers=${JSON.stringify([
				{
					name: "Starter",
					price: "Free",
					period: "",
					description: "For solo developers and small side projects.",
					features: [
						{ text: "Up to 3 team members", included: true },
						{ text: "Unlimited tasks", included: true },
						{ text: "5 GB storage", included: true },
						{ text: "CI/CD pipelines", included: false },
						{ text: "SSO", included: false },
						{ text: "Priority support", included: false },
					],
					cta: { label: "Get started free", href: "/signup" },
					highlighted: false,
				},
				{
					name: "Team",
					price: "$49",
					period: "/ month",
					description: "For growing teams that need to move fast.",
					features: [
						{ text: "Up to 20 team members", included: true },
						{ text: "Unlimited tasks", included: true },
						{ text: "50 GB storage", included: true },
						{ text: "CI/CD pipelines", included: true },
						{ text: "SSO", included: false },
						{ text: "Priority support", included: false },
					],
					cta: { label: "Start free trial", href: "/signup?plan=team" },
					highlighted: true,
				},
				{
					name: "Enterprise",
					price: "$149",
					period: "/ month",
					description: "For large teams with advanced security needs.",
					features: [
						{ text: "Unlimited team members", included: true },
						{ text: "Unlimited tasks", included: true },
						{ text: "500 GB storage", included: true },
						{ text: "CI/CD pipelines", included: true },
						{ text: "SSO", included: true },
						{ text: "Priority support", included: true },
					],
					cta: { label: "Contact sales", href: "/contact" },
					highlighted: false,
				},
			])}
		></grantcodes-pricing>

		<grantcodes-newsletter
			title="Stay in the loop"
			text="Get product updates, engineering articles, and early access to new features. One email a week, no spam."
			button-label="Subscribe"
			placeholder="you@company.com"
			disclaimer="Unsubscribe any time. We never sell your data."
		></grantcodes-newsletter>

		<grantcodes-footer columns="4">
			${footerContent}
			<div slot="bottom">
				<p>&copy; 2025 Flowbase, Inc. All rights reserved.</p>
			</div>
			<div slot="bottom" style="display: flex; gap: var(--g-theme-spacing-md);">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
				<a href="/security">Security</a>
			</div>
		</grantcodes-footer>
	`,
};
