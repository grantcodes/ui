import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-notice");
import "./notice.js";

const meta = {
	title: "Components/Notice",
	component: "grantcodes-notice",
	args: {
		...args,
		text: "This is the notice content",
		title: "Notice title",
		variant: "info",
		dismissable: false,
	},
	argTypes: {
		...argTypes,
		variant: {
			type: "string",
		},
	},
	render: (args) => template(args, html`${args.text}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const InfoNotice = {};

export const SuccessNotice = {
	args: {
		variant: "success",
	},
};

export const WarningNotice = {
	args: {
		variant: "warning",
	},
};

export const ErrorNotice = {
	args: {
		variant: "error",
	},
};
