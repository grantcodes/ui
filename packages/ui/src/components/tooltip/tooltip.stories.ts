import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';
import { expect, waitFor } from 'storybook/test';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-tooltip');
type StoryArgs = typeof args;

import '../button/button.js';
import './tooltip.js';

const meta = {
  title: 'Components/Tooltip',
  component: 'grantcodes-tooltip',
  args: {
    ...args,
    label: 'This is a tooltip label',
    description: '',
  },
  argTypes,
  render: (storyArgs: StoryArgs) =>
    template(storyArgs, html`<button type="button">This has a tooltip</button>`),
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

export const Tooltip = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector('grantcodes-tooltip') as HTMLElement;
    const trigger = tooltip.querySelector('button') as HTMLButtonElement;
    trigger.focus();
    const content = tooltip.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
    await waitFor(() => expect(getComputedStyle(content).display).toBe('block'));
    // The tooltip sits clear of its trigger instead of covering it.
    await expect(content.getBoundingClientRect().top).toBeGreaterThan(
      trigger.getBoundingClientRect().bottom,
    );
  },
};

export const CustomTrigger = {
  render: (storyArgs: StoryArgs) =>
    template(storyArgs, html`<grantcodes-button>Custom trigger</grantcodes-button>`),
};

export const Description = {
  args: {
    label: '',
    description: 'This is a tooltip description',
  },
};
