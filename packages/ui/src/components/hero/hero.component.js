import { LitElement, html } from "lit";
import heroStyles from "./hero.css" with { type: "css" };
import "../button/button.js";

export class GrantCodesHero extends LitElement {
	static styles = [heroStyles];

	static properties = {
		/**
		 * Main heading text.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Supporting paragraph text shown below the title.
		 * @type {string}
		 */
		subtitle: { type: String },
		/**
		 * Label for the CTA button. Only rendered when `href` is also set.
		 * @type {string}
		 */
		button: { type: String },
		/**
		 * URL the CTA button links to.
		 * @type {string}
		 */
		href: { type: String },
		/**
		 * Controls the vertical height of the hero section.
		 * @type {'sm' | 'md' | 'lg'}
		 */
		size: { type: String, reflect: true },
		/**
		 * Whether to center-align text content.
		 * @type {boolean}
		 */
		center: { type: Boolean, reflect: true },
	};

	constructor() {
		super();
		this.title = "";
		this.subtitle = "";
		this.button = "";
		this.href = "";
		this.size = "md";
		this.center = false;
	}

	render() {
		return html`
			<section class="hero">
				<div class="hero__container">
					<h1 class="hero__title">${this.title}</h1>
					${
						this.subtitle
							? html`<p class="hero__text">${this.subtitle}</p>`
							: null
					}
					${
						this.href && this.button
							? html`<grantcodes-button href=${this.href}
								>${this.button}</grantcodes-button
							>`
							: null
					}
					<slot></slot>
				</div>
			</section>
		`;
	}
}
