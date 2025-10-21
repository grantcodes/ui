import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-loading");
import "./loading.js";

const meta = {
	title: "Components/Loading",
	component: "grantcodes-loading",
	args: {
		...args,
		text: "Loading...",
	},
	argTypes,
	render: (args) => template(args, html`${args.text}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Loading = {};
