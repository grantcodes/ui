import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./avatar.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-avatar",
	args: {
		src: "https://placehold.co/160x160",
		name: "Tommy Tobasco",
		alt: "Tommy Tomasco Avatar",
		initials: "2T",
	},
	render: ({ src, name, alt, initials }) =>
		html`<grantcodes-avatar
      src="${src}"
      name="${name}"
      alt="${alt}"
      initials="${initials}"
    ></grantcodes-avatar>`,
};

export default meta;
type Story = StoryObj;

export const Avatar: Story = {};
