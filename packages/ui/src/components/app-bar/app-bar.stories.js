import { html } from "lit";
import "./app-bar.js";
import "./nav-link.js";
import "../button/button.js";

const meta = {
	title: "Components/App Bar",
	component: "grantcodes-app-bar",
};

export default meta;

/**
 * Basic app bar with logo, navigation links, and a sign in action.
 * Nav links use <grantcodes-nav-link> for consistent ghost button styling.
 */
export const Default = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">MyApp</a>
			<div slot="nav">
				<grantcodes-nav-link><a href="/">Home</a></grantcodes-nav-link>
				<grantcodes-nav-link><a href="/about">About</a></grantcodes-nav-link>
				<grantcodes-nav-link><a href="/features">Features</a></grantcodes-nav-link>
				<grantcodes-nav-link><a href="/pricing">Pricing</a></grantcodes-nav-link>
			</div>
			<div slot="actions">
				<grantcodes-button>Sign In</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};

/**
 * Navigation using a <ul> list — matches the real-world pattern from the Astro site.
 * Each <li> wraps a <grantcodes-nav-link> so styling works through the shadow boundary.
 */
export const WithListNav = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">MyApp</a>
			<ul slot="nav">
				<li><grantcodes-nav-link><a href="/docs">Docs</a></grantcodes-nav-link></li>
				<li><grantcodes-nav-link><a href="/blog">Blog</a></grantcodes-nav-link></li>
				<li><grantcodes-nav-link><a href="/changelog">Changelog</a></grantcodes-nav-link></li>
			</ul>
			<div slot="actions">
				<grantcodes-button>Sign In</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};

/**
 * Sticky app bar that stays at the top of the viewport when scrolling.
 */
export const Sticky = {
	render: () => html`
		<div style="min-height: 200vh;">
			<grantcodes-app-bar sticky>
				<a slot="logo" href="/">MyApp</a>
				<div slot="nav">
					<grantcodes-nav-link><a href="/">Home</a></grantcodes-nav-link>
					<grantcodes-nav-link><a href="/about">About</a></grantcodes-nav-link>
					<grantcodes-nav-link><a href="/features">Features</a></grantcodes-nav-link>
					<grantcodes-nav-link><a href="/pricing">Pricing</a></grantcodes-nav-link>
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
 */
export const Transparent = {
	render: () => html`
		<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px;">
			<grantcodes-app-bar transparent>
				<a slot="logo" href="/">MyApp</a>
				<div slot="nav">
					<grantcodes-nav-link><a href="/">Home</a></grantcodes-nav-link>
					<grantcodes-nav-link><a href="/about">About</a></grantcodes-nav-link>
					<grantcodes-nav-link><a href="/features">Features</a></grantcodes-nav-link>
				</div>
				<div slot="actions">
					<grantcodes-button>Sign Up</grantcodes-button>
				</div>
			</grantcodes-app-bar>
		</div>
	`,
};

/**
 * App bar with multiple action buttons.
 */
export const WithMultipleActions = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/">Dashboard</a>
			<div slot="nav">
				<grantcodes-nav-link><a href="/">Overview</a></grantcodes-nav-link>
				<grantcodes-nav-link><a href="/analytics">Analytics</a></grantcodes-nav-link>
				<grantcodes-nav-link><a href="/reports">Reports</a></grantcodes-nav-link>
			</div>
			<div slot="actions">
				<grantcodes-button>Notifications</grantcodes-button>
				<grantcodes-button>Settings</grantcodes-button>
				<grantcodes-button>Profile</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};
