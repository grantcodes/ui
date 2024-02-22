import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './tooltip.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-tooltip',
  render: ({ label, description }) =>
    html`
      <div style="padding-block: 6rem">
        <grantcodes-tooltip label=${label} description=${description}>
          <span>This has a tooltip</span>
        </grantcodes-tooltip>
      </div>
    `,
  args: {
    label: 'This is a tooltip label',
    description: '',
  },
}

export default meta
type Story = StoryObj

export const Tooltip: Story = {}

export const Description: Story = {
  args: {
    label: '',
    description: 'This is a tooltip description',
  },
}
