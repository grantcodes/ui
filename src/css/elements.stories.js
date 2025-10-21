import { html } from "lit";

// This default export determines where your story goes in the story list
const meta = {
	title: "Styles/Elements",
	// component: "grantcodes-elements",
};

export default meta;

export const Image = {
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
};

export const Figure = {
	args: {},
	render: ({ width, height }) =>
		html`<figure>
      <img width="800" height="600" src="https://placehold.co/800x600" />
      <figcaption>This is a caption</figcaption>
    </figure>`,
};

export const Link = {
	args: {
		text: "This is a link",
	},
	render: ({ text }) => html`<a href="#">${text}</a>`,
};

export const Button = {
	args: {
		text: "This is a button",
		disabled: false,
	},
	render: ({ text, disabled }) => html`<button>${text}</button>`,
};

export const Input = {
	args: {
		placeholder: "This is an input",
	},
	render: ({ placeholder }) => html`<input placeholder="${placeholder}" />`,
};

export const Label = {
	args: {
		text: "This is a label",
	},
	render: ({ text }) => html`<label>${text}</label>`,
};

export const Select = {
	args: {},
	render: ({ text }) => html`<select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
  </select>`,
};

export const Textarea = {
	args: {
		placeholder: "This is a textarea",
	},
	render: ({ placeholder }) =>
		html`<textarea placeholder="${placeholder}"></textarea>`,
};

export const Checkbox = {
	args: {},
	render: ({ text }) => html`<input type="checkbox" />`,
};

export const Radio = {
	args: {
		text: "This is a radio",
	},
	render: ({ text }) => html`<input type="radio" />`,
};

export const DetailsSummary = {
	args: {
		exclusive: false,
	},
	argTypes: {},
	render: ({ exclusive }) => html`
		<details name=${exclusive ? "accordion" : ""}>
			<summary>Summary</summary>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ratione ad Suscipit, impedit ipsa sed soluta sapiente totam Voluptatibus, corporis.
		</details>
		<details name=${exclusive ? "accordion" : ""}>
			<summary>Summary</summary>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ratione ad Suscipit, impedit ipsa sed soluta sapiente totam Voluptatibus, corporis.
		</details>
	`,
};
