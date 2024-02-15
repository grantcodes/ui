import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './dialog.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-dialog',
  render: ({ text }) => html`<grantcodes-dialog>${text}</grantcodes-dialog>`,
  args: {
    text: 'Text',
  },
}

export default meta
type Story = StoryObj

export const Dialog: Story = {}
