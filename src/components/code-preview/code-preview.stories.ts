import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './code-preview.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-code-preview',
  render: ({ code, language }) =>
    html`<grantcodes-code-preview languange="${language}"
      >${code}</grantcodes-code-preview
    >`,
  args: {
    language: 'javascript',
    code: `
      import { thing } from "module;

      const a = 1;
      const b = 2;

      console.log(a + b);

      export default thing;
    `,
  },
}

export default meta
type Story = StoryObj

export const CodePreview: Story = {}
