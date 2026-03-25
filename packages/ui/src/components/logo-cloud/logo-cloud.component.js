import { LitElement, html } from "lit";
import logoCloudStyles from "./logo-cloud.css" with { type: "css" };

export class GrantCodesLogoCloud extends LitElement {
	static styles = [logoCloudStyles];

	static properties = {
		/**
		 * Optional label shown above the logos.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Logo items as a JSON string array: `[{"name":"...","src":"...","alt":"...","href":"..."}]`.
		 * @type {string}
		 */
		logos: { type: String },
	};

	constructor() {
		super();
		this.title = "";
		this.logos = "[]";
	}

	get _logos() {
		try {
			return JSON.parse(this.logos);
		} catch {
			return [];
		}
	}

	render() {
		const logos = this._logos;
		return html`
			<section class="logo-cloud">
				<div class="logo-cloud__container">
					${
						this.title
							? html`<p class="logo-cloud__title">${this.title}</p>`
							: null
					}
					<ul class="logo-cloud__grid" role="list">
						${logos.map(
							(logo) => html`
								<li class="logo-cloud__item">
									${
										logo.href
											? html`
												<a
													href=${logo.href}
													class="logo-cloud__link"
													aria-label=${logo.name}
												>
													<img
														src=${logo.src}
														alt=${logo.alt ?? logo.name}
														class="logo-cloud__logo"
														loading="lazy"
													/>
												</a>
											`
											: html`
												<img
													src=${logo.src}
													alt=${logo.alt ?? logo.name}
													class="logo-cloud__logo"
													loading="lazy"
												/>
											`
									}
								</li>
							`,
						)}
					</ul>
				</div>
			</section>
		`;
	}
}
