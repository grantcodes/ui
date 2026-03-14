import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-container",
);
import "./container.js";

const meta = {
	title: "Components/Container",
	component: "grantcodes-container",
	args: {
		...args,
		content: "This content is inside the container.",
		align: undefined,
		nopad: false,
	},
	argTypes: {
		...argTypes,
		align: {
			type: "string",
			options: ["default", "wide", "full", "viewport", "prose"],
			control: { type: "radio" },
		},
	},
	render: (args) =>
		template(
			args,
			html`<div
        style="background-color: var(--g-theme-color-background-subtle)"
      >
        ${args.content}
      </div>`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Container = {};

export const WideContainer = {
	args: {
		align: "wide",
	},
};

export const FullContainer = {
	args: {
		align: "full",
	},
};

export const ViewportContainer = {
	args: {
		align: "viewport",
	},
};

export const ProseContainer = {
	args: {
		align: "prose",
	},
};
