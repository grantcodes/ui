import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-card");
import "./card.js";
import "../button-group/button-group.js";
import "../button/button.js";

const meta = {
	title: "Components/Card",
	component: "grantcodes-card",
	args: {
		...args,
		content: "Here is the card content",
	},
	argTypes,
	render: (args) =>
		template(
			args,
			html`<h3 slot="header">Card Header</h3>
				<p>${args.content}</p>
				<grantcodes-button-group slot="footer">
					<grantcodes-button>Action 1</grantcodes-button>
					<grantcodes-button>Action 2</grantcodes-button>
				</grantcodes-button-group>`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Card = {};
