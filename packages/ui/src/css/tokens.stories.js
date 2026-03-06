import grantcodes from '@grantcodes/style-dictionary/grantcodes/json'
import wireframe from '@grantcodes/style-dictionary/wireframe/json'
import todomap from '@grantcodes/style-dictionary/todomap/json'
import { LitElement, html, css } from 'lit'

const allTokens = {
	grantcodes,
	wireframe,
	todomap,
}

// Token List Component
class TokenList extends LitElement {
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

		.theme-section {
			margin-bottom: 3rem;
		}

		.section-title {
			margin: 0 0 1rem 0;
			font-weight: 600;
			font-size: 1.5rem;
			color: var(--g-theme-color-content-default, #333);
			padding-bottom: 0.5rem;
			border-bottom: 2px solid var(--g-theme-color-border-default, #ccc);
		}

		.token-count {
			margin: 0.5rem 0 1rem 0;
			color: var(--g-theme-color-content-subtle, #666);
			font-size: 0.875rem;
		}

		.token-table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1rem;
		}

		.token-table th {
			text-align: left;
			padding: 0.75rem;
			background: var(--g-theme-color-background-subtle, #f5f5f5);
			border-bottom: 2px solid var(--g-theme-color-border-default, #ccc);
			font-weight: 600;
			font-size: 0.875rem;
			color: var(--g-theme-color-content-default, #333);
		}

		.token-table td {
			padding: 0.75rem;
			border-bottom: 1px solid var(--g-theme-color-border-default, #e0e0e0);
			font-size: 0.875rem;
		}

		.token-table tr:hover {
			background: var(--g-theme-color-background-subtle, #f9f9f9);
		}

		.token-name {
			font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
			color: var(--g-theme-color-content-default, #333);
			font-weight: 500;
		}

		.token-value {
			font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
			color: var(--g-theme-color-content-subtle, #666);
			word-break: break-all;
		}
	`

	static properties = {
		theme: { type: String },
	}

	constructor() {
		super();
		this.theme = 'grantcodes';
	}

	formatValue(value) {
		if (value === null || value === undefined) {
			return String(value)
		}
		if (typeof value === 'object') {
			return JSON.stringify(value, null, 2)
		}
		return String(value)
	}

	render() {
		const currentThemeTokens = allTokens[this.theme] || allTokens.grantcodes;
		const tokenEntries = Object.entries(currentThemeTokens).sort(([a], [b]) => a.localeCompare(b));
		const themeDisplay = this.theme.charAt(0).toUpperCase() + this.theme.slice(1);

		return html`
			<div class="banner">
				<p class="theme-title">
					<strong>Current Theme:</strong> ${themeDisplay}
				</p>
				<p class="theme-hint">
					Use the theme picker in the toolbar to switch between themes.
				</p>
			</div>

			<div class="theme-section">
				<h2 class="section-title">${themeDisplay} Tokens</h2>
				<div class="token-count">${tokenEntries.length} tokens</div>
				<table class="token-table">
					<thead>
						<tr>
							<th>Token Name</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						${tokenEntries.map(([tokenName, value]) => html`
							<tr>
								<td class="token-name">--${tokenName}</td>
								<td class="token-value">${this.formatValue(value)}</td>
								<td style="background-color: var(--${tokenName});"></td>
							</tr>
						`)}
					</tbody>
				</table>
			</div>
		`
	}
}

customElements.define('token-list', TokenList)

// This default export determines where your story goes in the story list
const meta = {
	title: "Styles/Tokens",
	parameters: {
		docs: {
			description: {
				component:
					"Complete list of design tokens. Tokens update based on the selected theme in the Storybook toolbar.",
			},
		},
	},
}

export default meta

// Main tokens story that responds to theme changes
export const AllTokens = {
	render: (args, context) => {
		const theme = context.globals?.theme || "grantcodes";
		return html`<token-list .theme=${theme}></token-list>`;
	},
}
