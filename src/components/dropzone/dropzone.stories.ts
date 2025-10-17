import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } = getStorybookHelpers(
	"grantcodes-dropzone",
);
import "./dropzone.js";

const meta: Meta = {
	component: "grantcodes-dropzone",
	args: {
		...args,
		fullscreenOnDrag: true,
		placeholder: "Placeholder in the dropzone slot",
		onChange: (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			console.log("Received files:", target?.files);
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
type Story = StoryObj;

export const Dropzone: Story = {};
