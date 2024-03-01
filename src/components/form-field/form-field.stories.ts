import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './form-field.js'

// This default export determines where your story goes in the story list
const meta: Meta = {
  component: 'grantcodes-form-field',
  render: ({ label, error, help, slot }) =>
    html`
      <grantcodes-form-field label="${label}" help="${help}" error="${error}">
        ${slot}
      </grantcodes-form-field>
    `,
  decorators: [(story) => html`<form>${story()}</form>`],
  args: {
    label: 'Label',
    error: '',
    help: '',
    slot: html`<input type="text" placeholder="This is a placeholder" />`,
  },
}

export default meta
type Story = StoryObj

export const FormField: Story = {}

export const FormFieldWithError: Story = {
  args: {
    error: 'This is an error',
  },
}

export const FormFieldWithHelp: Story = {
  args: {
    help: 'This is help text',
  },
}

export const FormFieldWithSelect: Story = {
  args: {
    slot: html`
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `,
  },
}

export const FormFieldWithTextArea: Story = {
  args: {
    slot: html`<textarea placeholder="This is a placeholder"></textarea>`,
  },
}

export const FormFieldWithCheckbox: Story = {
  args: {
    slot: html`<input type="checkbox" value="1" name="name" />`,
  },
}

export const FormFieldWithRadio: Story = {
  args: {
    slot: html`<input type="radio" />`,
  },
}

export const FormFieldWithRadioGroup: Story = {
  args: {
    slot: html`
      <grantcodes-form-field label="Radio number 1">
        <input type="radio" name="radio-group" value="1" />
      </grantcodes-form-field>
      <grantcodes-form-field label="Radio number 2">
        <input type="radio" name="radio-group" value="2" />
      </grantcodes-form-field>
      <grantcodes-form-field label="Radio number 3">
        <input type="radio" name="radio-group" value="3" />
      </grantcodes-form-field>
    `,
  },
}

export const FormFieldWithCheckboxGroup: Story = {
  args: {
    slot: html`
      <grantcodes-form-field label="Checkbox number 1"
        ><input type="checkbox"
      /></grantcodes-form-field>
      <grantcodes-form-field label="Checkbox number 2"
        ><input type="checkbox"
      /></grantcodes-form-field>
      <grantcodes-form-field label="Checkbox number 3"
        ><input type="checkbox"
      /></grantcodes-form-field>
    `,
  },
}
