import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-button-group",
);
import { html } from "lit/static-html.js";
import "./button-group";
import "../button/button";

const meta = {
	title: "Components/ButtonGroup",
	component: "grantcodes-button-group",
	args: {
		...args,
	},
	argTypes,
	render: (args) =>
		template(
			args,
			html`
    <grantcodes-button>Button 1</grantcodes-button>
    <grantcodes-button>Button 2</grantcodes-button>
    <grantcodes-button>Button 3</grantcodes-button>`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const ButtonGroup = {};
