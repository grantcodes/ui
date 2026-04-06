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

		return html`
			<header class=${classes}>
				<div class="app-bar__container">
					<div class="app-bar__logo">
						<slot name="logo"></slot>
					</div>

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

					<!-- Navigation (single slot, collapsible on mobile) -->
					<nav
						part="nav"
						class="app-bar__nav ${this._mobileMenuOpen ? "app-bar__nav--mobile-open" : ""}"
						aria-label="Main navigation"
					>
						<slot name="nav"></slot>
					</nav>
				</div>
			</header>
		`;
	}
}
