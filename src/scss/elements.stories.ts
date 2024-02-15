import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

// This default export determines where your story goes in the story list
const meta: Meta = {
  title: 'Styles/Elements',
  component: 'grantcodes-elements',
}

export default meta
type Story = StoryObj

export const Image: Story = {
  args: {
    width: 400,
    height: 400,
  },
  render: ({ width, height }) =>
    html`<img
      width="${width}"
      height="${height}"
      src="https://placehold.co/${width}x${height}"
    />`,
}

export const Figure: Story = {
  args: {},
  render: ({ width, height }) =>
    html`<figure>
      <img width="800" height="600" src="https://placehold.co/800x600" />
      <figcaption>This is a caption</figcaption>
    </figure>`,
}

export const Link: Story = {
  args: {
    text: 'This is a link',
  },
  render: ({ text }) => html`<a href="#">${text}</a>`,
}

export const Button: Story = {
  args: {
    text: 'This is a button',
    disabled: false,
  },
  render: ({ text, disabled }) => html`<button>${text}</button>`,
}

export const Input: Story = {
  args: {
    placeholder: 'This is an input',
  },
  render: ({ placeholder }) => html`<input placeholder="${placeholder}" />`,
}

export const Label: Story = {
  args: {
    text: 'This is a label',
  },
  render: ({ text }) => html`<label>${text}</label>`,
}

export const Select: Story = {
  args: {},
  render: ({ text }) => html`<select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>`,
}

export const Textarea: Story = {
  args: {
    placeholder: 'This is a textarea',
  },
  render: ({ placeholder }) =>
    html`<textarea placeholder="${placeholder}"></textarea>`,
}

export const Checkbox: Story = {
  args: {},
  render: ({ text }) => html`<input type="checkbox" />`,
}

export const Radio: Story = {
  args: {
    text: 'This is a radio',
  },
  render: ({ text }) => html`<input type="radio" />`,
}
