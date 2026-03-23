import { LitElement, html } from "lit";
import ctaStyles from "./cta.styles.css" with { type: "css" };
import "../button/button.js";

export class GrantCodesCta extends LitElement {
	static styles = [ctaStyles];

	static properties = {
		/**
		 * Small label shown above the title.
		 * @type {string}
		 */
		eyebrow: { type: String },
		/**
		 * Main heading text.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Supporting paragraph text.
		 * @type {string}
		 */
		text: { type: String },
		/**
		 * Primary CTA as a JSON string: `{"label":"...","href":"..."}`.
		 * @type {string}
		 */
		primaryAction: { type: String, attribute: "primary-action" },
		/**
		 * Secondary CTA as a JSON string: `{"label":"...","href":"..."}`.
		 * @type {string}
		 */
		secondaryAction: { type: String, attribute: "secondary-action" },
		/**
		 * Text alignment of the block.
		 * @type {'left' | 'center'}
		 */
		align: { type: String, reflect: true },
	};

	constructor() {
		super();
		this.eyebrow = "";
		this.title = "";
		this.text = "";
		this.primaryAction = "";
		this.secondaryAction = "";
		this.align = "center";
	}

	get _primaryAction() {
		try {
			return this.primaryAction ? JSON.parse(this.primaryAction) : null;
		} catch {
			return null;
		}
	}

	get _secondaryAction() {
		try {
			return this.secondaryAction ? JSON.parse(this.secondaryAction) : null;
		} catch {
			return null;
		}
	}

	render() {
		const primary = this._primaryAction;
		const secondary = this._secondaryAction;
		return html`
			<section class="cta">
				<div class="cta__container">
					${
						this.eyebrow
							? html`<p class="cta__eyebrow">${this.eyebrow}</p>`
							: null
					}
					<h2 class="cta__title">${this.title}</h2>
					${this.text ? html`<p class="cta__text">${this.text}</p>` : null}
					${
						primary || secondary
							? html`
								<div class="cta__actions">
									${
										primary
											? html`<grantcodes-button href=${primary.href}
												>${primary.label}</grantcodes-button
											>`
											: null
									}
									${
										secondary
											? html`<a
												href=${secondary.href}
												class="cta__secondary-link"
												>${secondary.label}</a
											>`
											: null
									}
								</div>
							`
							: null
					}
				</div>
			</section>
		`;
	}
}
