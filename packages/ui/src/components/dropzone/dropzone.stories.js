import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-dropzone",
);
import "./dropzone.js";

const meta = {
	title: "Components/Dropzone",
	component: "grantcodes-dropzone",
	args: {
		...args,
		fullscreenOnDrag: true,
		placeholder: "Placeholder in the dropzone slot",
		onChange: (e) => {
			const target = e.target;
			console.log("Received files:", target.files);
		},
	},
	argTypes,
	render: (args) =>
		template(
			args,
			html`<input
				type="file"
				placeholder="${args.placeholder}"
				accept="*"
				multiple
				@change=${args.onChange}
			/>`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

export const Dropzone = {};
