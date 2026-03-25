import { LitElement, html } from "lit";
import newsletterStyles from "./newsletter.css" with { type: "css" };
import "../button/button.js";

export class GrantCodesNewsletter extends LitElement {
	static styles = [newsletterStyles];

	static properties = {
		/**
		 * Section heading.
		 * @type {string}
		 */
		title: { type: String },
		/**
		 * Optional supporting paragraph.
		 * @type {string}
		 */
		text: { type: String },
		/**
		 * Form action URL.
		 * @type {string}
		 */
		action: { type: String },
		/**
		 * Form submission method.
		 * @type {'get' | 'post'}
		 */
		method: { type: String },
		/**
		 * Email input placeholder.
		 * @type {string}
		 */
		placeholder: { type: String },
		/**
		 * Submit button label.
		 * @type {string}
		 */
		buttonLabel: { type: String, attribute: "button-label" },
		/**
		 * Optional small disclaimer text below the form.
		 * @type {string}
		 */
		disclaimer: { type: String },
	};

	constructor() {
		super();
		this.title = "";
		this.text = "";
		this.action = "";
		this.method = "post";
		this.placeholder = "Your email address";
		this.buttonLabel = "Subscribe";
		this.disclaimer = "";
	}

	render() {
		return html`
			<section class="newsletter">
				<div class="newsletter__container">
					<h2 class="newsletter__title">${this.title}</h2>
					${
						this.text
							? html`<p class="newsletter__text">${this.text}</p>`
							: null
					}
					<form
						class="newsletter__form"
						action=${this.action}
						method=${this.method}
					>
						<div class="newsletter__field">
							<label for="newsletter-email" class="newsletter__label"
								>Email address</label
							>
							<div class="newsletter__input-wrap">
								<input
									id="newsletter-email"
									type="email"
									name="email"
									class="newsletter__input"
									placeholder=${this.placeholder}
									required
									autocomplete="email"
								/>
							<grantcodes-button type="submit">
								${this.buttonLabel}
							</grantcodes-button>
							</div>
						</div>
					</form>
					${
						this.disclaimer
							? html`<p class="newsletter__disclaimer">${this.disclaimer}</p>`
							: null
					}
				</div>
			</section>
		`;
	}
}
