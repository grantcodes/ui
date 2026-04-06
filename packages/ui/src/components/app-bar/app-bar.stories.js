import { html } from "lit";
import "./app-bar.js";
import "../button/button.js";

const meta = {
	title: "Components/App Bar",
	component: "grantcodes-app-bar",
};

export default meta;

/**
 * Basic app bar with logo, navigation links, and a sign in action.
 * No inline styles on slotted content — the component's ::slotted() rules handle styling.
 */
export const Default = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">MyApp</a>
			<div slot="nav">
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/features">Features</a>
				<a href="/pricing">Pricing</a>
			</div>
			<div slot="actions">
				<grantcodes-button>Sign In</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};

/**
 * Navigation using a <ul> list — matches the real-world pattern from the Astro site's Header component.
 * The component's ::slotted(ul) rule applies display: flex and removes list styling.
 */
export const WithListNav = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">MyApp</a>
			<ul slot="nav">
				<li><a href="/docs">Docs</a></li>
				<li><a href="/blog">Blog</a></li>
				<li><a href="/changelog">Changelog</a></li>
			</ul>
			<div slot="actions">
				<grantcodes-button>Sign In</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};

/**
 * Sticky app bar that stays at the top of the viewport when scrolling.
 * Wrapped in a tall container to allow scroll testing.
 */
export const Sticky = {
	render: () => html`
		<div style="min-height: 200vh;">
			<grantcodes-app-bar sticky>
				<a slot="logo" href="/">MyApp</a>
				<div slot="nav">
					<a href="/">Home</a>
					<a href="/about">About</a>
					<a href="/features">Features</a>
					<a href="/pricing">Pricing</a>
				</div>
				<div slot="actions">
					<grantcodes-button>Sign In</grantcodes-button>
				</div>
			</grantcodes-app-bar>
			<p style="padding: 2rem;">
				Scroll down to see the sticky app bar remain at the top of the viewport.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
				habitant morbi tristique senectus et netus et malesuada fames ac turpis
				egestas.
			</p>
		</div>
	`,
};

/**
 * Transparent app bar for use over hero sections or colored backgrounds.
 * The background wrapper uses inline styles for story framing — slotted content remains style-free.
 */
export const Transparent = {
	render: () => html`
		<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px;">
			<grantcodes-app-bar transparent>
				<a slot="logo" href="/">MyApp</a>
				<div slot="nav">
					<a href="/">Home</a>
					<a href="/about">About</a>
					<a href="/features">Features</a>
				</div>
				<div slot="actions">
					<grantcodes-button>Sign Up</grantcodes-button>
				</div>
			</grantcodes-app-bar>
		</div>
	`,
};

/**
 * App bar with multiple action buttons in the actions slot.
 * Uses text labels instead of emoji for accessibility and clarity.
 */
export const WithMultipleActions = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">Dashboard</a>
			<div slot="nav">
				<a href="/">Overview</a>
				<a href="/analytics">Analytics</a>
				<a href="/reports">Reports</a>
			</div>
			<div slot="actions">
				<grantcodes-button>Notifications</grantcodes-button>
				<grantcodes-button>Settings</grantcodes-button>
				<grantcodes-button>Profile</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};
