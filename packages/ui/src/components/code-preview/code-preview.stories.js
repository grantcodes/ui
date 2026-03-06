import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-code-preview",
);
import "./code-preview.js";

const jsCode = `
import { thing } from "module";

const a = 1;
const b = 2;

console.log(a + b);

export default thing;
`;

const htmlCode = `
<div>
  <h1>Hello, World</h1>
  <grantcodes-code-preview language="html"></grantcodes-code-preview>
</div> 
`;

const cssCode = `
body {
  font-family: "Arial", sans-serif;
  color: #333;
}
`;

const meta = {
	title: "Components/CodePreview",
	component: "grantcodes-code-preview",
	args: {
		...args,
		language: "javascript",
		theme: "aurora-x",
		code: jsCode,
	},
	argTypes,
	render: (args) => template(args, html`${args.code}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const CodePreview = {};

export const HTMLCodePreview = {
	args: {
		language: "html",
		code: htmlCode,
	},
};

export const CSSCodePreview = {
	args: {
		language: "css",
		code: cssCode,
	},
};
