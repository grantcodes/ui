import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './container.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-container',
  render: ({ content, align, nopad }) =>
    html`<grantcodes-container
      style="background-color: var(--color-base-background-shade)"
      align="${align}"
      ?nopad=${nopad}
      >${content}</grantcodes-container
    >`,
  args: {
    content: 'This content is inside the container.',
    align: undefined,
    nopad: false,
  },
  argTypes: {
    align: {
      type: 'string',
      options: ['default', 'wide', 'full', 'viewport'],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj

export const Container: Story = {}

export const WideContainer: Story = {
  args: {
    align: 'wide',
  },
}

export const FullContainer: Story = {
  args: {
    align: 'full',
  },
}

export const ViewportContainer: Story = {
  args: {
    align: 'viewport',
  },
}
