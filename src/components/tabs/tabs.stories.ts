import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './tabs.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-tabs',
  render: ({ text }) => html`<grantcodes-tabs>${text}</grantcodes-tabs>`,
  args: {
    text: 'Text',
  },
}

export default meta
type Story = StoryObj

export const Tabs: Story = {}
