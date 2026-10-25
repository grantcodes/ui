import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';
import { nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { expect } from 'storybook/test';
import { ArrowRight, Heart } from '../../icons.js';
import type { GrantCodesButton } from './button.component.js';
import './button.js';
import '../icon/icon.js';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-button');

const ICONS = { none: '', heart: Heart, arrow: ArrowRight };

interface StoryArgs extends Record<string, unknown> {
  label: string;
  icon: keyof typeof ICONS;
  iconPosition: 'start' | 'end';
}

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
  args: {
    ...args,
    label: 'Button label',
    icon: 'none',
    iconPosition: 'start',
  },
  argTypes: {
    ...argTypes,
    label: { control: 'text', description: 'Slotted label text' },
    icon: { control: 'select', options: Object.keys(ICONS), description: 'Slotted icon' },
    iconPosition: { control: 'radio', options: ['start', 'end'], description: 'Slotted icon side' },
  },
  render: ({ label, icon, iconPosition, ...buttonArgs }: StoryArgs) => {
    const svg = ICONS[icon];
    const iconTemplate = svg
      ? html`<grantcodes-icon role="img" aria-label=${label || 'Button'}
          >${unsafeHTML(svg)}</grantcodes-icon
        >`
      : nothing;

    return template(
      buttonArgs,
      html`${iconPosition === 'start' ? iconTemplate : nothing}${label}${
        iconPosition === 'end' ? iconTemplate : nothing
      }`,
    );
  },
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
 * An icon as the only content. The button takes the block padding on both
 * inline edges, so it renders square at every size.
 */
export const IconOnly = {
  args: { label: '', icon: 'heart' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = getButton(canvasElement);
    await button.updateComplete;
    await expect(button).toHaveAttribute('icon-only');
    const inner = innerButton(button);
    await expect(inner.offsetWidth).toBe(inner.offsetHeight);
  },
};

/**
 * A leading icon pulls halfway into the start padding and keeps a gap before
 * the label.
 */
export const IconStart = {
  args: { label: 'Like', icon: 'heart', iconPosition: 'start' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = getButton(canvasElement);
    await button.updateComplete;
    await expect(button).toHaveAttribute('icon-start');
    await expect(button).not.toHaveAttribute('icon-only');
    const style = getComputedStyle(innerButton(button));
    const start = Number.parseFloat(style.paddingInlineStart);
    await expect(start).toBeGreaterThan(Number.parseFloat(style.paddingBlockStart));
    await expect(start).toBeLessThan(Number.parseFloat(style.paddingInlineEnd));
    await expect(getComputedStyle(getIcon(button)).marginInlineEnd).not.toBe('0px');
  },
};

/**
 * A trailing icon pulls halfway into the end padding instead.
 */
export const IconEnd = {
  args: { label: 'Next', icon: 'arrow', iconPosition: 'end' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = getButton(canvasElement);
    await button.updateComplete;
    await expect(button).toHaveAttribute('icon-end');
    await expect(button).not.toHaveAttribute('icon-only');
    const style = getComputedStyle(innerButton(button));
    const end = Number.parseFloat(style.paddingInlineEnd);
    await expect(end).toBeGreaterThan(Number.parseFloat(style.paddingBlockStart));
    await expect(end).toBeLessThan(Number.parseFloat(style.paddingInlineStart));
    await expect(getComputedStyle(getIcon(button)).marginInlineStart).not.toBe('0px');
  },
};

/**
 * Small size, with a smaller icon gap.
 */
export const Small = {
  args: { size: 'sm', label: 'Small' },
};

/**
 * Large size with wider inline padding.
 */
export const Large = {
  args: { size: 'lg', label: 'Large' },
};

/**
 * Ghost variant, a label-only alternative to the default fill.
 */
export const Ghost = {
  args: { variant: 'ghost', color: 'neutral' },
};

/**
 * Outline variant in the danger colour.
 */
export const OutlineDanger = {
  args: { variant: 'outline', color: 'danger', label: 'Delete' },
};

/**
 * Disabled button that cannot be interacted with.
 * The button will not respond to clicks when disabled.
 */
export const Disabled = {
  args: { disabled: true },
};

/**
 * Button rendered as a link (anchor tag).
 * Useful for navigation actions that look like buttons.
 */
export const AsLink = {
  args: { href: 'https://example.com', label: 'Link button' },
};

/**
 * Submit button for forms.
 */
export const Submit = {
  args: { type: 'submit', label: 'Submit' },
};
