import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./tabs.js";
import "./tab.js";

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-tabs",
	render: () => html`
    <grantcodes-tabs>
      <grantcodes-tab label="Tab 1">
        <p>This is the content of the first tab.</p>
      </grantcodes-tab>
      <grantcodes-tab label="Tab 2">
        <p>This is the content of the second tab.</p>
      </grantcodes-tab>
      <grantcodes-tab label="Tab 3">
        <p>This is the content of the third tab.</p>
      </grantcodes-tab>
    </grantcodes-tabs>
  `,
	args: {},
};

export default meta;
type Story = StoryObj;

export const Tabs: Story = {};
