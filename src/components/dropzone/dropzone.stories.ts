import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './dropzone.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-dropzone',
  render: ({ slot, multiple, accept, onChange }) =>
    html`<grantcodes-dropzone
      accept=${accept}
      @change=${onChange}
      ?multiple=${multiple}
      >${slot}</grantcodes-dropzone
    >`,
  args: {
    multiple: false,
    accept: '*',
    onChange: (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      console.log(target?.files)
    },
    slot: 'Placeholder in the dropzone slot',
  },
}

export default meta
type Story = StoryObj

export const Dropzone: Story = {}
