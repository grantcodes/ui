import { LitElement, html } from "lit";
import { mediaTextStyles } from "./media-text.styles.js";
import "../button/button.js";

export class GrantCodesMediaText extends LitElement {
	static styles = [mediaTextStyles];

	static properties = {
		/**
		 * Section heading.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Body text paragraph.
		 * @type {string}
		 */
		text: { type: String },
		/**
		 * Media object as a JSON string: `{"src":"...","alt":"...","kind":"image|video"}`.
		 * @type {string}
		 */
		media: { type: String },
		/**
		 * When true, the media appears on the right and text on the left.
		 * @type {boolean}
		 */
		reverse: { type: Boolean, reflect: true },
		/**
		 * Optional CTA as a JSON string: `{"label":"...","href":"..."}`.
		 * @type {string}
		 */
		cta: { type: String },
	};

	constructor() {
		super();
		this.title = "";
		this.text = "";
		this.media = "";
		this.reverse = false;
		this.cta = "";
	}

	get _media() {
		try {
			return this.media ? JSON.parse(this.media) : null;
		} catch {
			return null;
		}
	}

	get _cta() {
		try {
			return this.cta ? JSON.parse(this.cta) : null;
		} catch {
			return null;
		}
	}

	render() {
		const media = this._media;
		const cta = this._cta;
		return html`
			<section class="media-text">
				<div class="media-text__container">
					<div class="media-text__media">
						${
							media?.kind === "video"
								? html`<video
									src=${media.src}
									class="media-text__video"
									controls
									preload="metadata"
									aria-label=${media.alt ?? ""}
								></video>`
								: html`<img
									src=${media?.src ?? ""}
									alt=${media?.alt ?? ""}
									class="media-text__image"
									loading="lazy"
								/>`
						}
					</div>
					<div class="media-text__content">
						<h2 class="media-text__title">${this.title}</h2>
						<p class="media-text__text">${this.text}</p>
						${
							cta
								? html`<grantcodes-button href=${cta.href}
									>${cta.label}</grantcodes-button
								>`
								: null
						}
					</div>
				</div>
			</section>
		`;
	}
}
