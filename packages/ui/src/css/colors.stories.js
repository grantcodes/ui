import grantcodes from "@grantcodes/style-dictionary/grantcodes/json";
import wireframe from "@grantcodes/style-dictionary/wireframe/json";
import todomap from "@grantcodes/style-dictionary/todomap/json";
import { LitElement, html, css } from "lit";
import "../../.storybook/components/color-group.component.js";

const COLOR_PREFIXES = ["g-color-", "g-theme-color-"];

// Filter function to only include keys that start with one of the color prefixes
const filterByColorPrefixes = (tokens) => {
	return Object.fromEntries(
		Object.entries(tokens).filter(([key]) =>
			COLOR_PREFIXES.some((prefix) => key.startsWith(prefix)),
		),
	);
};

const themeColors = {
	grantcodes: filterByColorPrefixes(grantcodes),
	wireframe: filterByColorPrefixes(wireframe),
	todomap: filterByColorPrefixes(todomap),
};

// Color Palette Component
class ColorPalette extends LitElement {
	static styles = css`
		:host {
			display: block;
			padding: 2rem;
			background: var(--g-theme-color-background-default, #fff);
			color: var(--g-theme-color-content-default, #333);
		}

		.banner {
			margin-bottom: 2rem;
			padding: 1rem;
			background: var(--g-theme-color-background-subtle, #f5f5f5);
			border-radius: 0.5rem;
			border: 1px solid var(--g-theme-color-border-default, #ccc);
		}

		.theme-title {
			margin: 0;
			font-weight: 600;
			color: var(--g-theme-color-content-default, #333);
			font-size: 1rem;
		}

		.theme-hint {
			margin: 0.5rem 0 0 0;
			color: var(--g-theme-color-content-subtle, #666);
			font-size: 0.875rem;
		}
	`;

	static properties = {
		theme: { type: String },
	};

	constructor() {
		super();
		this.theme = "grantcodes";
	}

	getColorGroups() {
		const currentThemeColors =
			themeColors[this.theme] || themeColors.grantcodes;
		const colorGroups = {
			neutral: {},
			"utility-green": {},
			"utility-blue": {},
			"utility-yellow": {},
			"utility-red": {},
			"brand-purple": {},
			transparent: {},
			"theme-background": {},
			"theme-border": {},
			"theme-content": {},
		};

		// Group colors from the filtered theme colors
		Object.entries(currentThemeColors).forEach(([tokenName, value]) => {
			let key = tokenName;
			if (tokenName.startsWith("g-color-")) {
				key = tokenName.replace("g-color-", "");
			} else if (tokenName.startsWith("g-theme-color-")) {
				key = tokenName.replace("g-theme-color-", "");
				const parts = key.split("-");
				if (parts.length >= 2) {
					const category = parts[0];
					const name = parts.slice(1).join("-");
					if (category === "background") {
						colorGroups["theme-background"][name] = { value, tokenName };
					} else if (category === "border") {
						colorGroups["theme-border"][name] = { value, tokenName };
					} else if (category === "content") {
						colorGroups["theme-content"][name] = { value, tokenName };
					}
					return;
				}
			}

			const parts = key.split("-");

			if (parts[0] === "neutral") {
				const name = parts.slice(1).join("-");
				colorGroups.neutral[name] = { value, tokenName };
			} else if (parts[0] === "utility") {
				const color = parts[1];
				const name = parts.slice(2).join("-");
				if (color === "green") {
					colorGroups["utility-green"][name] = { value, tokenName };
				} else if (color === "blue") {
					colorGroups["utility-blue"][name] = { value, tokenName };
				} else if (color === "yellow") {
					colorGroups["utility-yellow"][name] = { value, tokenName };
				} else if (color === "red") {
					colorGroups["utility-red"][name] = { value, tokenName };
				}
			} else if (parts[0] === "brand") {
				const color = parts[1];
				const name = parts.slice(2).join("-");
				if (color === "purple") {
					colorGroups["brand-purple"][name] = { value, tokenName };
				}
			} else if (parts[0] === "transparent") {
				const name = parts[1];
				colorGroups.transparent[name] = { value, tokenName };
			}
		});

		return colorGroups;
	}

	render() {
		const colorGroups = this.getColorGroups();
		const themeDisplay =
			this.theme.charAt(0).toUpperCase() + this.theme.slice(1);

		return html`
			<div class="banner">
				<p class="theme-title">
					<strong>Current Theme:</strong> ${themeDisplay}
				</p>
				<p class="theme-hint">
					Use the theme picker in the toolbar to switch between themes.
				</p>
			</div>

			${Object.entries(colorGroups).map(([groupKey, colors]) => {
				if (Object.keys(colors).length === 0) return null;

				const title = groupKey
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");

				return html`
					<color-group
						.title=${title}
						.colors=${colors}
					></color-group>
				`;
			})}
		`;
	}
}
customElements.define("color-palette", ColorPalette);

// This default export determines where your story goes in the story list
const meta = {
	title: "Styles/Colors",
	parameters: {
		docs: {
			description: {
				component:
					"Color palette from the design system. Colors update based on the selected theme in the Storybook toolbar.",
			},
		},
	},
};

export default meta;

// Main colors story that responds to theme changes
export const AllColors = {
	render: (args, context) => {
		const theme = context.globals?.theme || "grantcodes";
		return html`<color-palette .theme=${theme}></color-palette>`;
	},
};
