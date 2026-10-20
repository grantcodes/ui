import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-dialog');

import './dialog.js';
import '../button/button.js';
import '../button-group/button-group.js';

const meta = {
  title: 'Components/Dialog',
  component: 'grantcodes-dialog',
  args: {
    ...args,
    content: html`<p>This is the content of the dialog</p>`,
    open: true,
    dismissible: true,
  },
  argTypes,
  decorators: [(story: any) => html`<div style="min-height: 300px">${story()}</div>`],
  render: (args: any) =>
    template(
      args,
      html`
				<h2 slot="header">Dialog Header</h2>
				${args.content}
				<grantcodes-button-group slot="footer">
					<grantcodes-button>Cancel</grantcodes-button>
					<grantcodes-button>OK</grantcodes-button>
				</grantcodes-button-group>
			`,
    ),
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

export const Dialog = {};

/**
 * Body content only: an empty header or footer slot renders no bar at all.
 */
export const ContentOnly = {
  args: {
    content: html`<p>No header or footer content, so neither bar is drawn.</p>`,
  },
  render: (args: (typeof meta)['args']) => html`
    <grantcodes-dialog open aria-label="Dialog details">${args.content}</grantcodes-dialog>
  `,
};

export const LongContent = {
  args: {
    content: html`${Array.from(
      { length: 30 },
      (_, index) => html`<p>Long dialog content paragraph ${index + 1}.</p>`,
    )}`,
  },
};
