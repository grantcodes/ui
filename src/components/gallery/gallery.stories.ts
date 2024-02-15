import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './gallery.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-gallery',
  render: ({ text }) => html`<grantcodes-gallery>${text}</grantcodes-gallery>`,
  args: {
    text: 'Text',
  },
}

export default meta
type Story = StoryObj

export const Gallery: Story = {}
