import { setCustomElementsManifest } from "@storybook/web-components-vite";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import { withThemeByClassName } from "@storybook/addon-themes";
import manifest from "../custom-elements.json" with { type: "json" };

setCustomElementsManifest(manifest);

setStorybookHelpersConfig({});

// Available themes
const THEMES = {
	grantcodes: "grantcodes",
	todomap: "todomap",
	wireframe: "wireframe",
};

// Enable/disable theme CSS files
const toggleThemeCSS = (theme) => {
	if (typeof document === "undefined") return;
	
	Object.keys(THEMES).forEach((themeName) => {
		const link = document.getElementById(`theme-${themeName}`);
		if (link) {
			link.disabled = themeName !== theme;
		}
	});
	
	// Update the theme attribute
	document.documentElement.setAttribute("data-theme", theme);
};

const preview = {
	parameters: {
		// TODO: Fix this?
		layout: "padded",
		controls: {
			expanded: true,
		},
	},
	tags: ["autodocs"],
	decorators: [
		withThemeByClassName({
			themes: THEMES,
			defaultTheme: "grantcodes",
			parentSelector: "html",
		}),
		(Story, context) => {
			// Access the theme from globals (created by withThemeByClassName)
			const theme = context.globals?.theme || "grantcodes";
			
			// Handle CSS file enabling/disabling and data-theme attribute
			// This runs after withThemeByClassName applies the class
			if (typeof window !== "undefined") {
				// Use requestAnimationFrame to ensure DOM updates are complete
				requestAnimationFrame(() => {
					toggleThemeCSS(theme);
				});
			}
			
			return Story();
		},
	],
};

export default preview;
