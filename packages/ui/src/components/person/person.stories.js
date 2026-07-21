import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-person');

import './person.js';

const meta = {
  title: 'Components/Person',
  component: 'grantcodes-person',
  args: {
    ...args,
    name: 'Tommy Tobasco',
    role: 'Designer',
    company: 'GrantCodes',
    avatar: 'https://placehold.co/160x160',
    size: 'small',
  },
  argTypes,
  render: (storyArgs) => template(storyArgs),
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

export const Default = {};

export const Initials = {
  args: {
    avatar: undefined,
  },
};

export const WithDescription = {
  args: {
    name: 'Sam Torres',
    role: 'CTO',
    company: 'Flowbase',
    avatar: 'https://i.pravatar.cc/80?img=12',
    size: 'medium',
  },
  render: (storyArgs) => html`
		<grantcodes-person
			name="${storyArgs.name}"
			role="${storyArgs.role}"
			company="${storyArgs.company}"
			avatar="${storyArgs.avatar}"
			size="${storyArgs.size}"
		>
			<span slot="description"
				>Writes about engineering culture, distributed teams, and systems
				thinking.</span
			>
		</grantcodes-person>
	`,
};
