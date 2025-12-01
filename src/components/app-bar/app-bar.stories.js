import { html } from "lit";
import "./app-bar.js";
import "../button/button.js";

const meta = {
	title: "Components/App Bar",
	component: "grantcodes-app-bar",
};

export default meta;

/**
 * Basic app bar with logo and navigation
 */
export const AppBar = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/" style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: var(--color-base-primary-900);">
				MyApp
			</a>
			<div slot="nav" style="display: flex; gap: 0.5rem;">
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
 * Transparent app bar for hero sections
 */
export const Transparent = {
	render: () => html`
		<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px;">
			<grantcodes-app-bar transparent>
				<a slot="logo" href="/" style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: white;">
					MyApp
				</a>
				<div slot="nav" style="display: flex; gap: 0.5rem;">
					<a href="/" style="color: white;">Home</a>
					<a href="/about" style="color: white;">About</a>
					<a href="/features" style="color: white;">Features</a>
				</div>
				<div slot="actions">
					<grantcodes-button style="--component-button-base-background: white; --component-button-base-color: #667eea;">
						Sign Up
					</grantcodes-button>
				</div>
			</grantcodes-app-bar>
			<div style="padding: 4rem 2rem; text-align: center; color: white;">
				<h1 style="font-size: 3rem; margin: 0;">Welcome to MyApp</h1>
				<p style="font-size: 1.5rem; margin-top: 1rem;">The transparent app bar blends seamlessly</p>
			</div>
		</div>
	`,
};

/**
 * App bar with multiple actions
 */
export const WithMultipleActions = {
	render: () => html`
		<grantcodes-app-bar>
			<a slot="logo" href="/" style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: var(--color-base-primary-900);">
				Dashboard
			</a>
			<div slot="nav" style="display: flex; gap: 0.5rem;">
				<a href="/">Overview</a>
				<a href="/analytics">Analytics</a>
				<a href="/reports">Reports</a>
			</div>
			<div slot="actions" style="display: flex; gap: 0.5rem; align-items: center;">
				<grantcodes-button>🔔</grantcodes-button>
				<grantcodes-button>⚙️</grantcodes-button>
				<grantcodes-button>👤</grantcodes-button>
			</div>
		</grantcodes-app-bar>
	`,
};
