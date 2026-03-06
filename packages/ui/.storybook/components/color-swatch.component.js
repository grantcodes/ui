import { LitElement, html, css } from 'lit'

export class ColorSwatch extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem;
			border: 1px solid var(--g-theme-color-border-default, #ccc);
			border-radius: 0.5rem;
			background: var(--g-theme-color-background-default, #fff);
		}

		.color-box {
			width: 100%;
			height: 80px;
			border: 1px solid var(--g-theme-color-border-subtle, #e0e0e0);
			border-radius: 0.25rem;
		}

		.label {
			font-size: 0.875rem;
			font-weight: 600;
			color: var(--g-theme-color-content-default, #333);
			margin-bottom: 0.25rem;
		}

		.value {
			font-size: 0.75rem;
			font-family: monospace;
			color: var(--g-theme-color-content-subtle, #666);
			margin-bottom: 0.25rem;
		}

		.variable {
			font-size: 0.75rem;
			font-family: monospace;
			color: var(--g-theme-color-content-subtle, #666);
		}
	`

	static properties = {
		name: { type: String },
		value: { type: String },
		variableName: { type: String },
	}

	render() {
		return html`
			<div 
				class="color-box" 
				style="background-color: ${this.value}"
			></div>
			<div class="label">${this.name}</div>
			<div class="value">${this.value}</div>
			<div class="variable">${this.variableName}</div>
		`
	}
}
customElements.define('color-swatch', ColorSwatch)
