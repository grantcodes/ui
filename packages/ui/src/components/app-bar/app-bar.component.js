import { LitElement } from "lit";
import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import focusRingStyles from "#styles/focus-ring.css" with { type: "css" };
import appBarStyles from "./app-bar.css" with { type: "css" };

export class GrantCodesAppBar extends LitElement {
	static styles = [focusRingStyles, appBarStyles];

	static properties = {
		sticky: { type: Boolean },
		transparent: { type: Boolean },
		_mobileMenuOpen: { type: Boolean, state: true },
	};

	constructor() {
		super();

		/**
		 * Whether the app bar is sticky
		 * @type {boolean}
		 */
		this.sticky = false;

		/**
		 * Whether the app bar has transparent background
		 * @type {boolean}
		 */
		this.transparent = false;

		/**
		 * Mobile menu open state
		 * @type {boolean}
		 */
		this._mobileMenuOpen = false;

		/**
		 * Close mobile menu when the component crosses the desktop breakpoint.
		 * Matches the 768px container query in app-bar.css.
		 */
		this._resizeObserver = typeof ResizeObserver !== "undefined"
			? new ResizeObserver((entries) => {
					for (const entry of entries) {
						if (entry.contentBoxSize[0].inlineSize >= 768 && this._mobileMenuOpen) {
							this._mobileMenuOpen = false;
						}
					}
				})
			: null;
	}

	connectedCallback() {
		super.connectedCallback();
		this._resizeObserver?.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
	}

	_toggleMobileMenu() {
		this._mobileMenuOpen = !this._mobileMenuOpen;
		this.dispatchEvent(
			new CustomEvent("menu-toggle", {
				detail: { open: this._mobileMenuOpen },
				bubbles: true,
				composed: true,
			}),
		);
	}

	render() {
		const classes = classMap({
			"app-bar": true,
			"app-bar--sticky": this.sticky,
			"app-bar--transparent": this.transparent,
		});

		const navClasses = classMap({
			"app-bar__nav": true,
			"app-bar__nav--open": this._mobileMenuOpen,
		});

		return html`
			<header class=${classes}>
				<div class="app-bar__bar">
					<div class="app-bar__logo">
						<slot name="logo"></slot>
					</div>

					<!-- Navigation (inline on desktop, overlay on mobile) -->
					<nav
						part="nav"
						class=${navClasses}
						aria-label="Main navigation"
					>
						<slot name="nav"></slot>
					</nav>

					<!-- Actions (right side) -->
					<div class="app-bar__actions">
						<slot name="actions"></slot>
					</div>

					<!-- Mobile Menu Button -->
					<button
						type="button"
						class="app-bar__menu-button focus-ring"
						aria-label="${this._mobileMenuOpen ? "Close menu" : "Open menu"}"
						aria-expanded="${this._mobileMenuOpen}"
						@click=${this._toggleMobileMenu}
					>
						<span class="app-bar__menu-icon"></span>
					</button>
				</div>

				<!-- Mobile overlay backdrop -->
				<div
					class="app-bar__overlay ${this._mobileMenuOpen ? "app-bar__overlay--visible" : ""}"
					@click=${this._toggleMobileMenu}
				></div>
			</header>
		`;
	}
}
