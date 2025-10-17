// Replace your-framework with the framework you are using (e.g., react, vue3)
import type { Preview } from "@storybook/web-components-vite";
import { setCustomElementsManifest } from "@storybook/web-components";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import manifest from "../custom-elements.json" with { type: "json" };

import "../src/scss/base.scss";
import "../src/scss/themes/grantcodes.scss";

setCustomElementsManifest(manifest);

setStorybookHelpersConfig({});

const preview: Preview = {
	parameters: {
		controls: {
			expanded: true,
		},
	},
	tags: ["autodocs"],
};

export default preview;
