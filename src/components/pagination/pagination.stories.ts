import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./pagination.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-pagination",
	render: ({ previousHref, nextHref }) =>
		html`<grantcodes-pagination
      previous-href=${previousHref}
      next-href=${nextHref}
    ></grantcodes-pagination>`,
	args: {
		previousHref: "#1",
		nextHref: "#3",
	},
};

export default meta;
type Story = StoryObj;

export const Pagination: Story = {};
