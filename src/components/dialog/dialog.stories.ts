import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './dialog.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-dialog',
  decorators: [
    (story) => html`<div style="min-height: 300px">${story()}</div>`,
  ],
  render: ({ text, open }) =>
    html`<grantcodes-dialog ?open=${open}>${text}</grantcodes-dialog>`,
  args: {
    text: 'Text',
    open: true,
  },
}

export default meta
type Story = StoryObj

export const Dialog: Story = {}
