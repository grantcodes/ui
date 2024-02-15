import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

// This default export determines where your story goes in the story list
const meta: Meta = {
  title: 'Styles/Typography',
  component: 'grantcodes-typography',
}

export default meta
type Story = StoryObj

export const Heading1: Story = {
  args: {
    text: 'Heading 1',
  },
  render: ({ text }) => html`<h1>${text}</h1>`,
}

export const Heading2: Story = {
  args: {
    text: 'Heading 2',
  },
  render: ({ text }) => html`<h2>${text}</h2>`,
}

export const Heading3: Story = {
  args: {
    text: 'Heading 3',
  },
  render: ({ text }) => html`<h3>${text}</h3>`,
}

export const Heading4: Story = {
  args: {
    text: 'Heading 4',
  },
  render: ({ text }) => html`<h4>${text}</h4>`,
}

export const Heading5: Story = {
  args: {
    text: 'Heading 5',
  },
  render: ({ text }) => html`<h5>${text}</h5>`,
}

export const Heading6: Story = {
  args: {
    text: 'Heading 6',
  },
  render: ({ text }) => html`<h6>${text}</h6>`,
}

export const Paragraph: Story = {
  args: {
    text: 'This is a paragraph.',
  },
  render: ({ text }) => html`<p>${text}</p>`,
}

export const Emphasis: Story = {
  args: {
    text: 'This is emphasized text.',
  },
  render: ({ text }) => html`<p><em>${text}</em></p>`,
}

export const Strong: Story = {
  args: {
    text: 'This is strong text.',
  },
  render: ({ text }) => html`<p><strong>${text}</strong></p>`,
}

export const Small: Story = {
  args: {
    text: 'This is smallprint.',
  },
  render: ({ text }) => html`<p><small>${text}</small></p>`,
}

export const Deleted: Story = {
  args: {
    text: 'This is deleted text.',
  },
  render: ({ text }) => html`<p><del>${text}</del></p>`,
}

export const Inserted: Story = {
  args: {
    text: 'This is inserted text.',
  },
  render: ({ text }) => html`<p><ins>${text}</ins></p>`,
}

export const Code: Story = {
  args: {
    text: 'This is code.',
  },
  render: ({ text }) => html`<p><code>${text}</code></p>`,
}

export const Subscript: Story = {
  args: {
    text: 'This is subscript text.',
  },
  render: ({ text }) => html`<p><sub>${text}</sub></p>`,
}

export const Superscript: Story = {
  args: {
    text: 'This is superscript text.',
  },
  render: ({ text }) => html`<p><sup>${text}</sup></p>`,
}

export const Mark: Story = {
  args: {
    text: 'This is marked text.',
  },
  render: ({ text }) => html`<p><mark>${text}</mark></p>`,
}

export const OrderedList: Story = {
  args: {
    items: ['Item 1', 'Item 2'],
  },
  render: ({ items }) => html`
    <ol>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ol>
  `,
}

export const UnorderedList: Story = {
  args: {
    items: ['Item 1', 'Item 2'],
  },
  render: ({ items }) => html`
    <ul>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ul>
  `,
}

export const DescriptionDetails: Story = {
  args: {
    items: [
      { term: 'Term 1', description: 'Description 1' },
      { term: 'Term 2', description: 'Description 2' },
    ],
  },
  render: ({ items }) => html`
    <dl>
      ${items.map(
        (item) => html`
          <dt>${item.term}</dt>
          <dd>${item.description}</dd>
        `
      )}
    </dl>
  `,
}

export const Pre: Story = {
  args: {
    text: 'This is a pre block.',
  },
  render: ({ text }) => html`<pre>${text}</pre>`,
}

export const Blockquote: Story = {
  args: {
    text: 'This is a blockquote.',
  },
  render: ({ text }) => html`<blockquote>
    <p>${text}</p>
    <footer><cite>Cite info</cite></footer>
  </blockquote>`,
}
