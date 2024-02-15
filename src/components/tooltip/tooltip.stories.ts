import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './tooltip.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-tooltip',
  render: ({ text }) => html`<grantcodes-tooltip>${text}</grantcodes-tooltip>`,
  args: {
    text: 'Text',
  },
}

export default meta
type Story = StoryObj

export const Tooltip: Story = {}
