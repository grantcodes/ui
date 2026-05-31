import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit/static-html.js";
import "./button.js";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-button");

const meta = {
	title: "Components/Button",
	component: "grantcodes-button",
	args,
	argTypes,
	render: (args) => template(args, html`Button label`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

/**
 * Default button with standard appearance.
 */
export const Button = {};

/**
 * Different button styles
 */
export const ButtonStyles = {
	render: () => html`
		<div style="display: flex; gap: 1rem;">
  		<div>
        <h4>Default</h4>
        <grantcodes-button>Default</grantcodes-button>
        <grantcodes-button color="secondary">Secondary</grantcodes-button>
        <grantcodes-button color="neutral">Neutral</grantcodes-button>
        <grantcodes-button color="danger">Danger</grantcodes-button>
  		</div>
      <div>
        <h4>Ghost</h4>
        <grantcodes-button variant="ghost">Default</grantcodes-button>
        <grantcodes-button variant="ghost" color="secondary">Secondary</grantcodes-button>
        <grantcodes-button variant="ghost" color="neutral">Neutral</grantcodes-button>
        <grantcodes-button variant="ghost" color="danger">Danger</grantcodes-button>
  		</div>
      <div>
        <h4>Outline</h4>
        <grantcodes-button variant="outline">Default</grantcodes-button>
        <grantcodes-button variant="outline" color="secondary">Secondary</grantcodes-button>
        <grantcodes-button variant="outline" color="neutral">Neutral</grantcodes-button>
        <grantcodes-button variant="outline" color="danger">Danger</grantcodes-button>
  		</div>
      <div>
        <h4>Sizes</h4>
        <grantcodes-button size="sm">Small</grantcodes-button>
        <grantcodes-button>Default</grantcodes-button>
        <grantcodes-button size="lg">Large</grantcodes-button>
      </div>
		</div>
	`,
};

/**
 * Disabled button that cannot be interacted with.
 * The button will not respond to clicks when disabled.
 */
export const Disabled = {
	args: {
		disabled: true,
	},
};

/**
 * Button rendered as a link (anchor tag).
 * Useful for navigation actions that look like buttons.
 */
export const AsLink = {
	args: {
		href: "https://example.com",
	},
	render: (args) => template(args, html`Link Button`),
};

/**
 * Different button types for forms.
 * - button: Standard button (default)
 * - submit: Submits a form
 * - reset: Resets form fields
 */
export const ButtonTypes = {
	render: () => html`
		<div style="display: flex; gap: 1rem;">
			<grantcodes-button type="button">Button</grantcodes-button>
			<grantcodes-button type="submit">Submit</grantcodes-button>
			<grantcodes-button type="reset">Reset</grantcodes-button>
		</div>
	`,
};

/**
 * Various button states for different contexts.
 */
export const AllStates = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
			<grantcodes-button>Normal Button</grantcodes-button>
			<grantcodes-button disabled>Disabled Button</grantcodes-button>
			<grantcodes-button href="#">Link Button</grantcodes-button>
			<grantcodes-button>
				<strong>With HTML Content</strong>
			</grantcodes-button>
		</div>
	`,
};
