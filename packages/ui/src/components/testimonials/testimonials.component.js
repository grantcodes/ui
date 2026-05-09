import { LitElement, html } from "lit";
import testimonialsStyles from "./testimonials.css" with { type: "css" };
import "../card/card.js";
import "../person/person.js";

export class GrantCodesTestimonials extends LitElement {
	static styles = [testimonialsStyles];

	static properties = {
		/**
		 * Optional section heading.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Testimonial items as a JSON string array: `[{"quote":"...","name":"...","role":"...","company":"...","avatar":"..."}]`.
		 * @type {string}
		 */
		items: { type: String },
		/**
		 * Display layout of the testimonials.
		 * @type {'cards' | 'list'}
		 */
		layout: { type: String, reflect: true },
	};

	constructor() {
		super();
		this.title = "";
		this.items = "[]";
		this.layout = "cards";
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
			<section class="testimonials">
				<div class="testimonials__container">
					${
						this.title
							? html`<h2 class="testimonials__title">${this.title}</h2>`
							: null
					}
					<ul
						class="testimonials__grid testimonials__grid--${this.layout}"
						role="list"
					>
						${items.map(
							(item) => html`
								<li class="testimonials__item">
									<grantcodes-card>
										<blockquote class="testimonials__quote">
											<p class="testimonials__text">
												&ldquo;${item.quote}&rdquo;
											</p>
										</blockquote>
										<footer class="testimonials__attribution" slot="footer">
										   <!-- TODO: Would be nice to include a cite element in here somehow -->
										   <grantcodes-person
													avatar=${item.avatar}
													name=${item.name}
													subtitle=${[item.role, item.company].filter(Boolean).join(", ")}
												></grantcodes-person>
										</footer>
									</grantcodes-card>
								</li>
							`,
						)}
					</ul>
				</div>
			</section>
		`;
	}
}
