import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-form-field",
);
import "./form-field.js";

const meta = {
	title: "Components/FormField",
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

export const FormField = {};

export const FormFieldWithError = {
	args: {
		error: "This is an error",
	},
};

export const FormFieldWithHelp = {
	args: {
		help: "This is help text",
	},
};

export const FormFieldWithSelect = {
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

export const FormFieldWithTextArea = {
	args: {
		slot: html`<textarea placeholder="This is a placeholder"></textarea>`,
	},
};

export const FormFieldWithCheckbox = {
  args: {
    direction: 'horizontal',
		slot: html`<input type="checkbox" value="1" name="name" />`,
	},
};

export const FormFieldWithRadio = {
  args: {
    direction: 'horizontal',
		slot: html`<input type="radio" />`,
	},
};

export const FormFieldWithRadioGroup = {
	args: {
		slot: html`
      <grantcodes-form-field label="Radio number 1" direction="horizontal">
        <input type="radio" name="radio-group" value="1" />
      </grantcodes-form-field>
      <grantcodes-form-field label="Radio number 2" direction="horizontal">
        <input type="radio" name="radio-group" value="2" />
      </grantcodes-form-field>
      <grantcodes-form-field label="Radio number 3" direction="horizontal">
        <input type="radio" name="radio-group" value="3" />
      </grantcodes-form-field>
    `,
	},
};

export const FormFieldWithCheckboxGroup = {
	args: {
		slot: html`
      <grantcodes-form-field label="Checkbox number 1" direction="horizontal"
        ><input type="checkbox"
      /></grantcodes-form-field>
      <grantcodes-form-field label="Checkbox number 2" direction="horizontal"
        ><input type="checkbox"
      /></grantcodes-form-field>
      <grantcodes-form-field label="Checkbox number 3" direction="horizontal"
        ><input type="checkbox"
      /></grantcodes-form-field>
    `,
	},
};
