import { html } from "lit";
import "./dropdown.js";
import "../button/button.js";

const meta = {
	title: "Components/Dropdown",
	component: "grantcodes-dropdown",
};

export default meta;

/**
 * Basic dropdown menu with trigger button
 */
export const Dropdown = {
	render: () => html`
		<grantcodes-dropdown>
			<grantcodes-button slot="trigger">Open Menu</grantcodes-button>
			<div slot="menu">
				<grantcodes-dropdown-item>Profile</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Settings</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Sign out</grantcodes-dropdown-item>
			</div>
		</grantcodes-dropdown>
	`,
};

/**
 * Dropdown with disabled items
 */
export const WithDisabledItems = {
	render: () => html`
		<grantcodes-dropdown>
			<grantcodes-button slot="trigger">Actions</grantcodes-button>
			<div slot="menu">
				<grantcodes-dropdown-item>Edit</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Duplicate</grantcodes-dropdown-item>
				<grantcodes-dropdown-item disabled>Archive</grantcodes-dropdown-item>
				<grantcodes-dropdown-item disabled>Delete</grantcodes-dropdown-item>
			</div>
		</grantcodes-dropdown>
	`,
};

/**
 * Auto try flip
 */
export const AutoTryFlip = {
	render: () => html`
		<div style="height: 100vh; overflow: hidden; display: flex; justify-content: flex-end; align-items: flex-end;">
			<grantcodes-dropdown placement="bottom-start">
				<grantcodes-button slot="trigger">Bottom Start</grantcodes-button>
				<div slot="menu">
					<grantcodes-dropdown-item>Option 1</grantcodes-dropdown-item>
					<grantcodes-dropdown-item>Option 2</grantcodes-dropdown-item>
					<grantcodes-dropdown-item>Option 3</grantcodes-dropdown-item>
				</div>
			</grantcodes-dropdown>
		</div>
	`,
};

/**
 * Dropdown with custom trigger content
 */
export const CustomTrigger = {
	render: () => html`
		<grantcodes-dropdown>
			<div slot="trigger" style="padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 0.25rem; cursor: pointer;">
				<span style="font-weight: 600;">User Menu</span>
				<span style="margin-left: 0.5rem;">▼</span>
			</div>
			<div slot="menu">
				<grantcodes-dropdown-item>My Profile</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Account Settings</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Billing</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Sign Out</grantcodes-dropdown-item>
			</div>
		</grantcodes-dropdown>
	`,
};

/**
 * Dropdown with many items showing keyboard navigation
 */
export const ManyItems = {
	render: () => html`
		<grantcodes-dropdown>
			<grantcodes-button slot="trigger">Select Country</grantcodes-button>
			<div slot="menu">
				<grantcodes-dropdown-item>United States</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>United Kingdom</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Canada</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Australia</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Germany</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>France</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Spain</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Italy</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>Japan</grantcodes-dropdown-item>
				<grantcodes-dropdown-item>South Korea</grantcodes-dropdown-item>
			</div>
		</grantcodes-dropdown>
		<p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
			Try using arrow keys, Home, End, and Escape to navigate
		</p>
	`,
};
