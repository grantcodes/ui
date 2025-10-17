import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-form-field",
);
import "./form-field.js";

const meta: Meta = {
	component: "grantcodes-form-field",
	args: {
		...args,
		label: "Label",
		error: "",
		help: "",
		slot: html`<input type="text" placeholder="This is a placeholder" />`,
	},
	argTypes,
	decorators: [(story) => html`<form>${story()}</form>`],
	render: (args) => template(args, args.slot),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const FormField: Story = {};

export const FormFieldWithError: Story = {
	args: {
		error: "This is an error",
	},
};

export const FormFieldWithHelp: Story = {
	args: {
		help: "This is help text",
	},
};

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
};

export const FormFieldWithTextArea: Story = {
	args: {
		slot: html`<textarea placeholder="This is a placeholder"></textarea>`,
	},
};

export const FormFieldWithCheckbox: Story = {
	args: {
		slot: html`<input type="checkbox" value="1" name="name" />`,
	},
};

export const FormFieldWithRadio: Story = {
	args: {
		slot: html`<input type="radio" />`,
	},
};

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
};

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
};
