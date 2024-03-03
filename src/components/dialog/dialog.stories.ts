import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './dialog.js'
import '../button/button.js'
import '../button-group/button-group.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-dialog',
  decorators: [
    (story) => html`<div style="min-height: 300px">${story()}</div>`,
  ],
  render: ({ content, open, dismissable }) =>
    html`
      <grantcodes-dialog ?open=${open} ?dismissable=${dismissable}>
        <h2 slot="header">Dialog Header</h2>
        ${content}
        <grantcodes-button-group slot="footer">
          <grantcodes-button @click=${() => (open = false)}
            >Cancel</grantcodes-button
          >
          <grantcodes-button @click=${() => (open = false)}
            >OK</grantcodes-button
          >
        </grantcodes-button-group>
      </grantcodes-dialog>
    `,
  args: {
    content: html`<p>This is the content of the dialog</p>`,
    open: true,
    dismissable: true,
  },
}

export default meta
type Story = StoryObj

export const Dialog: Story = {}
