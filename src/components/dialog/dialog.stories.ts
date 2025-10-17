import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-dialog");
import "./dialog.js";
import "../button/button.js";
import "../button-group/button-group.js";

const meta: Meta = {
	component: "grantcodes-dialog",
	args: {
		...args,
		content: html`<p>This is the content of the dialog</p>`,
		open: true,
		dismissable: true,
	},
	argTypes,
	decorators: [
		(story) => html`<div style="min-height: 300px">${story()}</div>`,
	],
	render: (args) =>
		template(
			args,
			html`
				<h2 slot="header">Dialog Header</h2>
				${args.content}
				<grantcodes-button-group slot="footer">
					<grantcodes-button>Cancel</grantcodes-button>
					<grantcodes-button>OK</grantcodes-button>
				</grantcodes-button-group>
			`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const Dialog: Story = {};
