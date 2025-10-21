import { setCustomElementsManifest } from "@storybook/web-components";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import manifest from "../custom-elements.json" with { type: "json" };

setCustomElementsManifest(manifest);

setStorybookHelpersConfig({});

const preview = {
	parameters: {
		// TODO: Fix this?
		layout: "padded",
		controls: {
			expanded: true,
		},
	},
	tags: ["autodocs"],
};

export default preview;
