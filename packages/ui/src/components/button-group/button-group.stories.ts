import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { expect, within } from 'storybook/test';
import { Bookmark, Heart, Share2 } from '../../icons.js';
import type { GrantCodesButton } from '../button/button.component.js';
import type { GrantCodesButtonGroup } from './button-group.component.js';
import './button-group.js';
import '../button/button.js';
import '../icon/icon.js';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-button-group');

const meta = {
  title: 'Components/ButtonGroup',
  component: 'grantcodes-button-group',
  args: { ...args, 'aria-label': 'Actions' },
  argTypes,
  render: (args: Record<string, unknown>) =>
    template(
      args,
      html`
        <grantcodes-button>Button 1</grantcodes-button>
        <grantcodes-button>Button 2</grantcodes-button>
        <grantcodes-button>Button 3</grantcodes-button>
      `,
    ),
  parameters: { actions: { handles: events } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ButtonGroup: Story = {
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector<GrantCodesButtonGroup>('grantcodes-button-group')!;
    const buttons = group.querySelectorAll<GrantCodesButton>('grantcodes-button');
    await Promise.all([...buttons].map((button) => button.updateComplete));
    const first = buttons[0].shadowRoot!.querySelector('button')!;
    const middle = buttons[1].shadowRoot!.querySelector('button')!;
    const last = buttons[2].shadowRoot!.querySelector('button')!;
    await expect(getComputedStyle(first).borderStartStartRadius).not.toBe('0px');
    await expect(getComputedStyle(first).borderStartEndRadius).toBe('0px');
    await expect(getComputedStyle(middle).borderStartStartRadius).toBe('0px');
    await expect(getComputedStyle(last).borderStartEndRadius).not.toBe('0px');
    await expect(getComputedStyle(group.shadowRoot!.querySelector('[part="base"]')!).overflow).toBe(
      'visible',
    );
  },
};



export const GhostIcons: Story = {
  render: () => html`
    <grantcodes-button-group aria-label="Post actions" variant="spaced">
      <grantcodes-button variant="ghost" color="neutral">
        <grantcodes-icon role="img" aria-label="Like post">${unsafeHTML(Heart)}</grantcodes-icon>
      </grantcodes-button>
      <grantcodes-button variant="ghost" color="neutral">
        <grantcodes-icon role="img" aria-label="Bookmark post">${unsafeHTML(Bookmark)}</grantcodes-icon>
      </grantcodes-button>
      <grantcodes-button variant="ghost" color="neutral">
        <grantcodes-icon role="img" aria-label="Share post">${unsafeHTML(Share2)}</grantcodes-icon>
      </grantcodes-button>
    </grantcodes-button-group>
  `,
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', { name: 'Post actions' });
    const buttons = group.querySelectorAll<GrantCodesButton>('grantcodes-button');
    const names = ['Like post', 'Bookmark post', 'Share post'];
    await expect(buttons).toHaveLength(names.length);
    for (const [index, host] of [...buttons].entries()) {
      await host.updateComplete;
      const button = host.shadowRoot?.querySelector('button');
      if (!button) throw new Error('Expected a rendered button');
      await expect(button).toHaveAccessibleName(names[index]);
      await expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    }
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector<GrantCodesButtonGroup>('grantcodes-button-group')!;
    const buttons = group.querySelectorAll<GrantCodesButton>('grantcodes-button');
    await Promise.all([...buttons].map((button) => button.updateComplete));
    const first = buttons[0].shadowRoot!.querySelector('button')!;
    const last = buttons[2].shadowRoot!.querySelector('button')!;
    await expect(getComputedStyle(first).borderStartEndRadius).not.toBe('0px');
    await expect(getComputedStyle(first).borderEndStartRadius).toBe('0px');
    await expect(getComputedStyle(last).borderStartEndRadius).toBe('0px');
    await expect(getComputedStyle(last).borderEndStartRadius).not.toBe('0px');
    await expect(last.getBoundingClientRect().top).toBeGreaterThan(
      first.getBoundingClientRect().top,
    );
    group.variant = 'spaced';
    await group.updateComplete;
    await expect(getComputedStyle(first).borderEndStartRadius).not.toBe('0px');
    await expect(getComputedStyle(last).borderStartEndRadius).not.toBe('0px');
  },
};
