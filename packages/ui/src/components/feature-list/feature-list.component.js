import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import * as icons from "lucide-static";
import featureListStyles from "./feature-list.css" with { type: "css" };
import "../icon/icon.js";

export class GrantCodesFeatureList extends LitElement {
	static styles = [featureListStyles];

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
		 * Feature items as a JSON string array: `[{"title":"...","description":"...","icon":"...","href":"..."}]`.
		 * @type {string}
		 */
		items: { type: String },
		/**
		 * Number of columns in the grid (1–4).
		 * @type {number}
		 */
		columns: { type: Number },
	};

	constructor() {
		super();
		this.title = "";
		this.subtitle = "";
		this.items = "[]";
		this.columns = 3;
	}

	get _items() {
		try {
			return JSON.parse(this.items);
		} catch {
			return [];
		}
	}

	_iconSvg(name) {
		if (!name) return null;
		// Convert kebab-case to PascalCase for lucide-static lookup
		const key = name
			.split("-")
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join("");
		// biome-ignore lint/performance/noDynamicNamespaceImportAccess: icon names are runtime strings; static imports are not feasible here
		return icons[key] ?? null;
	}

	_renderIcon(name) {
		const svg = this._iconSvg(name);
		if (!svg) return null;
		return html`<grantcodes-icon class="feature-list__icon" aria-hidden="true">${unsafeHTML(svg)}</grantcodes-icon>`;
	}

	render() {
		const items = this._items;
		return html`
			<section class="feature-list">
				<div class="feature-list__container">
					${
						this.title
							? html`<h2 class="feature-list__title">${this.title}</h2>`
							: null
					}
					${
						this.subtitle
							? html`<p class="feature-list__subtitle">${this.subtitle}</p>`
							: null
					}
					<ul
						class="feature-list__grid"
						style="--columns: ${this.columns}"
						role="list"
					>
						${items.map(
							(item) => html`
								<li class="feature-list__item">
									${
										item.href
											? html`
												<a href=${item.href} class="feature-list__link">
												${this._renderIcon(item.icon)}
												<h3 class="feature-list__item-title">
														${item.title}
													</h3>
													${
														item.description
															? html`<p class="feature-list__item-desc">
																${item.description}
															</p>`
															: null
													}
												</a>
											`
											: html`
												<div class="feature-list__content">
												${this._renderIcon(item.icon)}
												<h3 class="feature-list__item-title">
														${item.title}
													</h3>
													${
														item.description
															? html`<p class="feature-list__item-desc">
																${item.description}
															</p>`
															: null
													}
												</div>
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
