import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./dropzone.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-dropzone",
	render: ({ placeholder, onChange, fullscreenOnDrag }) =>
		html`<grantcodes-dropzone ?fullscreenOnDrag=${fullscreenOnDrag}>
      <input
        type="file"
        placeholder="${placeholder}"
        accept="*"
        multiple
        @change=${onChange}
      />
    </grantcodes-dropzone>`,
	args: {
		fullscreenOnDrag: true,
		placeholder: "Placeholder in the dropzone slot",
		onChange: (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			console.log("Received files:", target?.files);
		},
	},
};

export default meta;
type Story = StoryObj;

export const Dropzone: Story = {};
