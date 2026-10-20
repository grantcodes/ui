import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';

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

export const Tooltip = {};

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
