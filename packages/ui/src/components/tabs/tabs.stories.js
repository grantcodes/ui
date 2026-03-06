import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-tabs");
import "./tabs.js";
import "./tab.js";

const meta = {
	title: "Components/Tabs",
	component: "grantcodes-tabs",
	args: {
		...args,
	},
	argTypes,
	render: (args) =>
		template(
			args,
			html`
				<grantcodes-tab label="Tab 1">
					<p>This is the content of the first tab.</p>
				</grantcodes-tab>
				<grantcodes-tab label="Tab 2">
					<p>This is the content of the second tab.</p>
				</grantcodes-tab>
				<grantcodes-tab label="Tab 3">
					<p>This is the content of the third tab.</p>
				</grantcodes-tab>
			`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Tabs = {};
