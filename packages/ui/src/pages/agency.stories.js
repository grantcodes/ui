import { html } from "lit";
import "../components/app-bar/app-bar.js";
import "../components/button/button.js";
import "../components/hero/hero.js";
import "../components/media-text/media-text.js";
import "../components/feature-list/feature-list.js";
import "../components/cta/cta.js";
import "../components/testimonials/testimonials.js";
import "../components/footer/footer.js";

const meta = {
	title: "Pages/Agency",
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

const footerContent = html`
	<grantcodes-footer-column>
		<h3>Studio North</h3>
		<p>A design and engineering studio building digital products that last.</p>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Work</h3>
		<ul>
			<li><a href="/work">Case Studies</a></li>
			<li><a href="/services">Services</a></li>
			<li><a href="/process">Our Process</a></li>
		</ul>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Studio</h3>
		<ul>
			<li><a href="/about">About Us</a></li>
			<li><a href="/team">Team</a></li>
			<li><a href="/careers">Careers</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</grantcodes-footer-column>
`;

/**
 * Agency / studio marketing page. Uses media-text blocks to walk through
 * the studio's offering, with a CTA section and testimonials from clients.
 */
export const Default = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/" style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: inherit;">
				Studio North
			</a>
			<div slot="nav" style="display: flex; gap: 0.5rem;">
				<a href="/work">Work</a>
				<a href="/services">Services</a>
				<a href="/about">About</a>
			</div>
			<div slot="actions">
				<grantcodes-button>Get in touch</grantcodes-button>
			</div>
		</grantcodes-app-bar>

		<grantcodes-hero
			title="We design and build digital products people actually want to use"
			subtitle="Studio North is a small, focused team of designers and engineers. We partner with founders and product teams to turn ideas into polished, scalable software."
			button="See our work"
			href="/work"
			size="lg"
		></grantcodes-hero>

		<grantcodes-feature-list
			title="What we do"
			columns="3"
			items=${JSON.stringify([
				{
					title: "Product design",
					description:
						"UX research, interaction design, and visual design from concept to delivery.",
					icon: "pen-tool",
				},
				{
					title: "Web development",
					description:
						"Fast, accessible front-ends built with modern tooling and a focus on longevity.",
					icon: "code",
				},
				{
					title: "Brand identity",
					description:
						"Naming, logo, and visual language for startups that want to stand out from day one.",
					icon: "layers",
				},
			])}
		></grantcodes-feature-list>

		<grantcodes-media-text
			title="We start by understanding the problem, not the brief"
			text="Before we open Figma, we spend time with your users, your data, and your team. Good design solves real problems — that only happens when we deeply understand the context. Our discovery phase isn't a box-ticking exercise; it's where the real work starts."
			media=${JSON.stringify({ src: "https://placehold.co/640x480?text=Discovery+Workshop", alt: "A team working through a discovery workshop on a whiteboard", kind: "image" })}
			cta=${JSON.stringify({ label: "Our process", href: "/process" })}
		></grantcodes-media-text>

		<grantcodes-media-text
			title="Design and engineering working side by side"
			text="We don't throw designs over a wall. Our designers and engineers work in the same room (or the same Slack channel) from day one. That means fewer surprises, faster iteration, and a product that actually looks like the designs."
			media=${JSON.stringify({ src: "https://placehold.co/640x480?text=Design+%26+Eng", alt: "Designers and engineers collaborating on a project", kind: "image" })}
			cta=${JSON.stringify({ label: "How we work", href: "/about" })}
			reverse
		></grantcodes-media-text>

		<grantcodes-media-text
			title="We ship, then we stick around"
			text="Launch is not the finish line. We offer ongoing retainers for teams who want a trusted design and engineering partner after go-live — whether that's iterating on feedback, scaling the product, or training your internal team."
			media=${JSON.stringify({ src: "https://placehold.co/640x480?text=Ongoing+Support", alt: "A chart showing continuous product iteration over time", kind: "image" })}
			cta=${JSON.stringify({ label: "Engagement options", href: "/services" })}
		></grantcodes-media-text>

		<grantcodes-testimonials
			title="From our clients"
			layout="list"
			items=${JSON.stringify([
				{
					quote:
						"Studio North turned a very messy brief into a product that exceeded what we imagined. They pushed back in the right places and delivered something genuinely special.",
					name: "Leo Hartmann",
					role: "Founder",
					company: "Archvault",
					avatar: "https://i.pravatar.cc/80?img=53",
				},
				{
					quote:
						"Their process is tight. We always knew what was happening, what was coming next, and why. That clarity is rare in agency relationships.",
					name: "Chloe Bergstrom",
					role: "VP Product",
					company: "Meridian Health",
					avatar: "https://i.pravatar.cc/80?img=25",
				},
			])}
		></grantcodes-testimonials>

		<grantcodes-cta
			eyebrow="Let's talk"
			title="Have a project in mind?"
			text="We take on a small number of projects each quarter so we can give each one the attention it deserves. If you're building something meaningful, we'd love to hear about it."
			primary-action=${JSON.stringify({ label: "Start a conversation", href: "/contact" })}
			secondary-action=${JSON.stringify({ label: "See case studies", href: "/work" })}
			align="center"
		></grantcodes-cta>

		<grantcodes-footer columns="3">
			${footerContent}
			<div slot="bottom">
				<p>&copy; 2025 Studio North. All rights reserved.</p>
			</div>
			<div slot="bottom" style="display: flex; gap: var(--g-theme-spacing-md);">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
			</div>
		</grantcodes-footer>
	`,
};
