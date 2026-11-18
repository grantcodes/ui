import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit/static-html.js';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-card');

import './card.js';
import '../button-group/button-group.js';
import '../button/button.js';

const meta = {
  title: 'Components/Card',
  component: 'grantcodes-card',
  args: {
    ...args,
    content: 'Here is the card content',
  },
  argTypes,
  render: (args: any) =>
    template(
      args,
      html`<h3 slot="header">Card Header</h3>
        <p>${args.content}</p>
        <grantcodes-button-group slot="footer">
          <grantcodes-button>Action 1</grantcodes-button>
          <grantcodes-button>Action 2</grantcodes-button>
        </grantcodes-button-group>`,
    ),
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

export const Card = {};

export const CardWithWideImage = {
  render: () =>
    html`<grantcodes-card style="max-inline-size: 320px;">
      <h3 slot="header">Card with a wide image</h3>
      <img src="https://placehold.co/1200x400" width="1200" height="400" alt="" />
      <p>The reset caps the image at the card's width and keeps its aspect ratio.</p>
    </grantcodes-card>`,
};

export const CardInLink = {
  render: () =>
    html`<a
      href="#"
      style="text-decoration: none; color: inherit; display: block;"
    >
      <grantcodes-card class="is-clickable">
        <h3 slot="header">Card in Link</h3>
        <p>This card is wrapped in an anchor tag and has a hover effect.</p>
      </grantcodes-card>
    </a>`,
};
