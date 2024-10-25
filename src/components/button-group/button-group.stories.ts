import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./button-group";
import "../button/button";

const meta: Meta = {
	component: "grantcodes-button-group",
	args: {},
	render: () => html`<grantcodes-button-group>
    <grantcodes-button>Button 1</grantcodes-button>
    <grantcodes-button>Button 2</grantcodes-button>
    <grantcodes-button>Button 3</grantcodes-button>
  </grantcodes-button-group>`,
};

export default meta;
type Story = StoryObj;

export const ButtonGroup: Story = {};
