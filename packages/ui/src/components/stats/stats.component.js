import { LitElement, html } from "lit";
import statsStyles from "./stats.styles.css" with { type: "css" };

export class GrantCodesStats extends LitElement {
	static styles = [statsStyles];

	static properties = {
		/**
		 * Optional section heading.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Stat items as a JSON string array: `[{"label":"...","value":"...","context":"..."}]`.
		 * @type {string}
		 */
		items: { type: String },
		/**
		 * Number of columns in the grid (1–6).
		 * @type {number}
		 */
		columns: { type: Number },
	};

	constructor() {
		super();
		this.title = "";
		this.items = "[]";
		this.columns = 4;
	}

	get _items() {
		try {
			return JSON.parse(this.items);
		} catch {
			return [];
		}
	}

	render() {
		const items = this._items;
		return html`
			<section class="stats">
				<div class="stats__container">
					${
						this.title
							? html`<h2 class="stats__title">${this.title}</h2>`
							: null
					}
					<ul
						class="stats__grid"
						style="--columns: ${this.columns}"
						role="list"
					>
						${items.map(
							(item) => html`
								<li class="stats__item">
									<span class="stats__value">${item.value}</span>
									<span class="stats__label">${item.label}</span>
									${
										item.context
											? html`<span class="stats__context">${item.context}</span>`
											: null
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
