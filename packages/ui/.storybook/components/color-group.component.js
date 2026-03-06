import { LitElement, html, css } from 'lit'
import './color-swatch.component.js'

export class ColorGroup extends LitElement {
	static styles = css`
		:host {
			display: block;
			margin-bottom: 2rem;
		}

		.heading {
			font-size: 1.25rem;
			font-weight: 600;
			margin: 0 0 1rem 0;
			color: var(--g-theme-color-content-default, #333);
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 1rem;
		}
	`

	static properties = {
		title: { type: String },
		colors: { type: Object },
	}

	render() {
		// Sort colors by numeric value if present
		const sortedColors = Object.entries(this.colors || {}).sort(([a], [b]) => {
			const aNum = parseInt(a.match(/\d+/)?.[0] || "0", 10);
			const bNum = parseInt(b.match(/\d+/)?.[0] || "0", 10);
			if (aNum !== bNum) return aNum - bNum;
			return a.localeCompare(b);
		});

		return html`
			<h3 class="heading">${this.title}</h3>
			<div class="grid">
				${sortedColors.map(([name, colorData]) => {
					const value = typeof colorData === "object" && colorData.value ? colorData.value : colorData;
					const tokenName = typeof colorData === "object" && colorData.tokenName 
						? colorData.tokenName 
						: `g-color-${name}`;
					const variableName = `--${tokenName}`;
					
					return html`
						<color-swatch
							.name=${name}
							.value=${value}
							.variableName=${variableName}
						></color-swatch>
					`;
				})}
			</div>
		`
	}
}
customElements.define('color-group', ColorGroup)
