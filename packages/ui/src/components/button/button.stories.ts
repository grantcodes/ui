import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { expect } from 'storybook/test';
import { ArrowRight, Heart } from '../../icons.js';
import type { GrantCodesButton } from './button.component.js';
import './button.js';
import '../icon/icon.js';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-button');

const getButton = (root: HTMLElement): GrantCodesButton => {
  const button = root.querySelector<GrantCodesButton>('grantcodes-button');
  if (!button) throw new Error('Expected a grantcodes-button');
  return button;
};

const innerButton = (host: GrantCodesButton): HTMLElement => {
  const element = host.shadowRoot?.querySelector<HTMLElement>('.button');
  if (!element) throw new Error('Expected an inner button');
  return element;
};

const getIcon = (host: GrantCodesButton): Element => {
  const icon = host.querySelector('grantcodes-icon');
  if (!icon) throw new Error('Expected a grantcodes-icon');
  return icon;
};

const meta = {
  title: 'Components/Button',
  component: 'grantcodes-button',
  args,
  argTypes,
  render: (args: any) => template(args, html`Button label`),
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
    href: 'https://example.com',
  },
  render: (args: any) => template(args, html`Link Button`),
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

/**
 * An icon is the only content, so the button takes the block padding on both
 * inline edges and renders square at every size.
 */
export const IconOnly = {
  render: () => html`
		<div style="display: flex; gap: 0.5rem; align-items: center;">
			<grantcodes-button size="sm">
				<grantcodes-icon role="img" aria-label="Like">${unsafeHTML(Heart)}</grantcodes-icon>
			</grantcodes-button>
			<grantcodes-button>
				<grantcodes-icon role="img" aria-label="Like">${unsafeHTML(Heart)}</grantcodes-icon>
			</grantcodes-button>
			<grantcodes-button size="lg">
				<grantcodes-icon role="img" aria-label="Like">${unsafeHTML(Heart)}</grantcodes-icon>
			</grantcodes-button>
			<grantcodes-button variant="ghost">
				<grantcodes-icon role="img" aria-label="Bookmark">${unsafeHTML(ArrowRight)}</grantcodes-icon>
			</grantcodes-button>
		</div>
	`,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll<GrantCodesButton>('grantcodes-button');
    await Promise.all([...buttons].map((button) => button.updateComplete));
    for (const button of buttons) {
      await expect(button).toHaveAttribute('icon-only');
      const inner = innerButton(button);
      await expect(inner.offsetWidth).toBe(inner.offsetHeight);
    }
  },
};

/**
 * A leading icon pulls halfway into the start padding and keeps a gap before
 * the label.
 */
export const IconStart = {
  render: () => html`
		<grantcodes-button>
			<grantcodes-icon role="img" aria-label="Like">${unsafeHTML(Heart)}</grantcodes-icon> Like
		</grantcodes-button>
	`,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = getButton(canvasElement);
    await button.updateComplete;
    await expect(button).toHaveAttribute('icon-start');
    await expect(button).not.toHaveAttribute('icon-only');
    const style = getComputedStyle(innerButton(button));
    const start = Number.parseFloat(style.paddingInlineStart);
    await expect(start).toBeGreaterThan(Number.parseFloat(style.paddingBlockStart));
    await expect(start).toBeLessThan(Number.parseFloat(style.paddingInlineEnd));
    const icon = getIcon(button);
    await expect(getComputedStyle(icon).marginInlineEnd).not.toBe('0px');
  },
};

/**
 * A trailing icon pulls into the end padding instead.
 */
export const IconEnd = {
  render: () => html`
		<grantcodes-button>
			Like <grantcodes-icon role="img" aria-label="Next">${unsafeHTML(ArrowRight)}</grantcodes-icon>
		</grantcodes-button>
	`,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = getButton(canvasElement);
    await button.updateComplete;
    await expect(button).toHaveAttribute('icon-end');
    await expect(button).not.toHaveAttribute('icon-only');
    const style = getComputedStyle(innerButton(button));
    const end = Number.parseFloat(style.paddingInlineEnd);
    await expect(end).toBeGreaterThan(Number.parseFloat(style.paddingBlockStart));
    await expect(end).toBeLessThan(Number.parseFloat(style.paddingInlineStart));
    const icon = getIcon(button);
    await expect(getComputedStyle(icon).marginInlineStart).not.toBe('0px');
  },
};
