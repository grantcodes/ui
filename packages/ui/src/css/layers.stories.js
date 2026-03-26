import { html } from "lit";

const meta = {
	title: "Styles/CSS Layers",
};

export default meta;

export const LayerOrder = {
	render: () => html`
		<div style="max-width: 40rem;">
			<h2>CSS Layers</h2>
			<p>Styles are organized into CSS cascade layers, from lowest to highest priority:</p>

			<ol>
				<li><strong>reset</strong> — sanitize.css, root defaults</li>
				<li><strong>base</strong> — typography, element styles</li>
				<li><strong>utilities</strong> — focus-ring, helpers</li>
				<li><strong>components</strong> — web component styles</li>
			</ol>

			<p>Unlayered styles (your overrides, theme variables) always win.</p>
		</div>
	`,
};

export const LayerOverrideDemo = {
	render: () => html`
		<style>
			/* This override is unlayered, so it beats all layers */
			.layer-demo-override {
				color: var(--g-theme-color-content-brand, rebeccapurple);
				font-weight: bold;
			}
		</style>
		<div style="max-width: 40rem; display: flex; flex-direction: column; gap: 1.5rem;">
			<h2>Layer Override Demo</h2>
			<p>Because styles are layered, overriding component/base styles is straightforward — no <code>!important</code> needed.</p>

			<div>
				<h3>Default paragraph (base layer)</h3>
				<p>This paragraph uses the default typography styles from the <code>base</code> layer.</p>
			</div>

			<div>
				<h3>Overridden paragraph (unlayered)</h3>
				<p class="layer-demo-override">This paragraph is overridden with an unlayered style — it wins over the base layer automatically.</p>
			</div>

			<div>
				<h3>Component with override</h3>
				<grantcodes-button>Default button</grantcodes-button>
				<style>
					.custom-btn::part(button) {
						border-radius: 999px;
					}
				</style>
				<grantcodes-button class="custom-btn">Custom border radius (unlayered override)</grantcodes-button>
			</div>
		</div>
	`,
};

export const AllLayers = {
	render: () => html`
		<style>
			.layers-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
				gap: 1rem;
				max-width: 60rem;
			}
			.layer-card {
				padding: 1rem;
				border: 1px solid var(--g-theme-color-border-default, #ccc);
				border-radius: var(--g-theme-border-radius-md, 0.5rem);
			}
			.layer-card h4 {
				margin-top: 0;
			}
			.layer-card code {
				font-size: 0.85em;
			}
		</style>
		<h2>All Layers</h2>
		<div class="layers-grid">
			<div class="layer-card">
				<h4>1. reset</h4>
				<p>Lowest priority. Normalizes browser defaults.</p>
				<code>sanitize.css</code><br>
				<code>::selection</code><br>
				<code>::backdrop</code>
			</div>
			<div class="layer-card">
				<h4>2. base</h4>
				<p>Typography and HTML element styles.</p>
				<code>typography.css</code><br>
				<code>elements.css</code>
			</div>
			<div class="layer-card">
				<h4>3. utilities</h4>
				<p>Reusable utility classes.</p>
				<code>focus-ring.css</code><br>
				<code>helpers.css</code>
			</div>
			<div class="layer-card">
				<h4>4. components</h4>
				<p>All web component styles.</p>
				<code>accordion</code>, <code>button</code>, <code>card</code>, etc.
			</div>
		</div>
	`,
};
