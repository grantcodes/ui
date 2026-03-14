import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes } = getStorybookHelpers("grantcodes-pagination");
import "./pagination.js";

const meta = {
	title: "Components/Pagination",
	component: "grantcodes-pagination",
	args: {
		...args,
		previousHref: "#1",
		nextHref: "#3",
	},
	argTypes,
	render: (args) => html`
			<grantcodes-pagination
				.previousHref=${args.previousHref}
				.nextHref=${args.nextHref}
				.page=${args.page ?? 1}
				.pages=${args.pages ?? 1}
			></grantcodes-pagination>
		`,
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Pagination = {};
