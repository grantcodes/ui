import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './code-preview.js'

const jsCode = `
import { thing } from "module";

const a = 1;
const b = 2;

console.log(a + b);

export default thing;
`

const htmlCode = `
<div>
  <h1>Hello, World!</h1>
  <grantcodes-code-preview language="html"></grantcodes-code-preview>
</div> 
`

const cssCode = `
body {
  font-family: "Arial", sans-serif;
  color: #333;
}
`

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-code-preview',
  render: ({ code, language, theme }) =>
    html`
      <grantcodes-code-preview language="${language}" theme="${theme}">
        ${code}
      </grantcodes-code-preview>
    `,
  args: {
    language: 'javascript',
    theme: 'aurora-x',
    code: jsCode,
  },
}

export default meta
type Story = StoryObj

export const CodePreview: Story = {}

export const HTMLCodePreview: Story = {
  args: {
    language: 'html',
    code: htmlCode,
  },
}

export const CSSCodePreview: Story = {
  args: {
    language: 'css',
    code: cssCode,
  },
}
