import { LitElement, html } from "lit";
import { pricingStyles } from "./pricing.styles.js";
import "../button/button.js";

export class GrantCodesPricing extends LitElement {
	static styles = [pricingStyles];

	static properties = {
		/**
		 * Optional section heading.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Optional supporting text below the heading.
		 * @type {string}
		 */
		subtitle: { type: String },
		/**
		 * Pricing tiers as a JSON string array.
		 * Each tier: `{"name":"...","price":"...","period":"...","description":"...","features":[{"text":"...","included":true}],"cta":{"label":"...","href":"..."},"highlighted":false}`.
		 * @type {string}
		 */
		tiers: { type: String },
	};

	constructor() {
		super();
		this.title = "";
		this.subtitle = "";
		this.tiers = "[]";
	}

	get _tiers() {
		try {
			return JSON.parse(this.tiers);
		} catch {
			return [];
		}
	}

	render() {
		const tiers = this._tiers;
		return html`
			<section class="pricing">
				<div class="pricing__container">
					${this.title
						? html`<h2 class="pricing__title">${this.title}</h2>`
						: null}
					${this.subtitle
						? html`<p class="pricing__subtitle">${this.subtitle}</p>`
						: null}
					<ul class="pricing__grid" role="list">
						${tiers.map(
							(tier) => html`
								<li
									class="pricing__tier${tier.highlighted
										? " pricing__tier--highlighted"
										: ""}"
								>
									<div class="pricing__tier-header">
										<h3 class="pricing__tier-name">${tier.name}</h3>
										<div class="pricing__price-wrap">
											<span class="pricing__price">${tier.price}</span>
											${tier.period
												? html`<span class="pricing__period"
														>/${tier.period}</span
													>`
												: null}
										</div>
										${tier.description
											? html`<p class="pricing__tier-desc">
													${tier.description}
												</p>`
											: null}
									</div>
									<ul class="pricing__features" role="list">
										${(tier.features ?? []).map(
											(feature) => html`
												<li
													class="pricing__feature${feature.included
														? ""
														: " pricing__feature--excluded"}"
												>
													<span
														class="pricing__feature-icon"
														aria-hidden="true"
													>
														${feature.included ? "✓" : "✗"}
													</span>
													${feature.text}
												</li>
											`,
										)}
									</ul>
									<div class="pricing__cta">
										<grantcodes-button href=${tier.cta.href}
											>${tier.cta.label}</grantcodes-button
										>
									</div>
								</li>
							`,
						)}
					</ul>
				</div>
			</section>
		`;
	}
}
