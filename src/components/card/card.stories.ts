import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./card.js";
import "../button-group/button-group.js";
import "../button/button.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-card",
	args: {
		content: "Here is the card content",
	},
	render: ({ content }) =>
		html`<grantcodes-card>
      <h3 slot="card-header">Card Header</h3>
      <p slot="card-content">${content}</p>
      <grantcodes-button-group slot="card-actions">
        <grantcodes-button>Action 1</grantcodes-button>
        <grantcodes-button>Action 2</grantcodes-button>
      </grantcodes-button-group>
    </grantcodes-card>`,
};

export default meta;
type Story = StoryObj;

export const Card: Story = {};
