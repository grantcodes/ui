import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { breadcrumbStyles } from "./breadcrumb.styles.js";

export class GrantCodesBreadcrumb extends LitElement {
	static styles = [breadcrumbStyles];

	static properties = {
		separator: { type: String },
	};

	constructor() {
		super();

		/**
		 * Custom separator between breadcrumb items
		 * @type {string}
		 */
		this.separator = "/";
	}

	firstUpdated() {
		const value = this.separator ?? "/";
		this.style.setProperty("--component-breadcrumb-separator", `'${value}'`);

		// Track slot content changes to update separators
		const slot = this.renderRoot.querySelector("slot:not([name])");
		if (slot) {
			slot.addEventListener("slotchange", () => this._updateSeparators());
			this._updateSeparators();
		}
	}

	updated(changed) {
		if (changed.has("separator")) {
			// Reflect separator into CSS custom property for pseudo-element content
			const value = this.separator ?? "/";
			this.style.setProperty("--component-breadcrumb-separator", `'${value}'`);
		}

		// Recalculate separators if light DOM may have changed
		if (changed.size > 0) {
			this._updateSeparators();
		}
	}

	_updateSeparators() {
		const slot = this.renderRoot.querySelector("slot:not([name])");
		if (!slot) return;
		const items = slot
			.assignedElements({ flatten: true })
			.filter((el) => el.tagName === "GRANTCODES-BREADCRUMB-ITEM");
		items.forEach((el, index) => {
			if (index < items.length - 1) {
				el.setAttribute("data-has-separator", "");
			} else {
				el.removeAttribute("data-has-separator");
			}
		});
	}

	render() {
		return html`
			<nav aria-label="Breadcrumb" class="breadcrumb">
				<ol class="breadcrumb__list">
					<slot></slot>
				</ol>
			</nav>
		`;
	}
}

export class GrantCodesBreadcrumbItem extends LitElement {
	static styles = [breadcrumbStyles];

	static properties = {
		href: { type: String },
		current: { type: Boolean },
	};

	constructor() {
		super();

		/**
		 * URL for the breadcrumb item
		 * @type {string}
		 */
		this.href = "";

		/**
		 * Whether this is the current page
		 * @type {boolean}
		 */
		this.current = false;
	}

	render() {
		const content =
			this.href && !this.current
				? html`<a href="${this.href}" class="breadcrumb__link focus-ring"><slot></slot></a>`
				: html`<span class="breadcrumb__text"><slot></slot></span>`;

		return html`
			<li class="breadcrumb__item" ?data-current=${this.current}>
				${content}
			</li>
		`;
	}
}
