import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './loading.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-loading',
  args: {
    text: 'Loading...',
  },
  render: ({ text }) => html`<grantcodes-loading>${text}</grantcodes-loading>`,
}

export default meta
type Story = StoryObj

export const Loading: Story = {}
