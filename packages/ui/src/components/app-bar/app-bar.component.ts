import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { SlotPresenceController } from '../../lib/slot-presence-controller.js';
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import appBarStyles from './app-bar.css' with { type: 'css' };

export class GrantCodesAppBar extends LitElement {
  declare _hasNav: boolean;
  declare _mobileMenuOpen: boolean;
  declare _navPresence: SlotPresenceController;
  declare _resizeObserver: null | ResizeObserver;
  declare sticky: boolean;
  declare transparent: boolean;

  static styles = [focusRingStyles, appBarStyles];

  static properties = {
    sticky: { type: Boolean, reflect: true },
    transparent: { type: Boolean, reflect: true },
    _mobileMenuOpen: { type: Boolean, state: true },
    _hasNav: { state: true },
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
     * Whether the nav slot has content; without it the menu button and
     * overlay would drive an empty panel.
     * @type {boolean}
     */
    this._hasNav = false;
    this._navPresence = new SlotPresenceController(this, 'nav', (present) => {
      this._hasNav = present;
    });

    /**
     * Close mobile menu when the component crosses the desktop breakpoint.
     * Matches the 768px container query in app-bar.css.
     */
    this._resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            for (const entry of entries) {
              if (entry.contentBoxSize[0].inlineSize >= 768 && this._mobileMenuOpen) {
                this._closeMobileMenu();
              }
            }
          })
        : null;
    this._handleEscape = this._handleEscape.bind(this);
    this._handleSlotChange = this._handleSlotChange.bind(this);
  }

  _handleSlotChange() {
    this._navPresence.refresh();
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver?.observe(this);
    document.addEventListener('keydown', this._handleEscape);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._handleEscape);
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  _handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') this._closeMobileMenu();
  }

  _closeMobileMenu() {
    if (!this._mobileMenuOpen) return;
    this._mobileMenuOpen = false;
    this._dispatchMenuToggle();
  }

  _toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
    this._dispatchMenuToggle();
  }

  _dispatchMenuToggle() {
    this.dispatchEvent(
      new CustomEvent('menu-toggle', {
        detail: { open: this._mobileMenuOpen },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const classes = classMap({
      'app-bar': true,
      'app-bar--sticky': this.sticky,
      'app-bar--transparent': this.transparent,
    });

    const navClasses = classMap({
      'app-bar__nav': true,
      'app-bar__nav--open': this._mobileMenuOpen,
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
						?hidden=${!this._hasNav}
					>
						<slot name="nav" @slotchange=${this._handleSlotChange}></slot>
					</nav>

					<!-- Actions (right side) -->
					<div class="app-bar__actions">
						<slot name="actions"></slot>
					</div>

					${
						this._hasNav
							? html`
								<!-- Mobile Menu Button -->
								<button
									type="button"
									class="app-bar__menu-button focus-ring"
									aria-label="${this._mobileMenuOpen ? 'Close menu' : 'Open menu'}"
									aria-expanded="${this._mobileMenuOpen}"
									@click=${this._toggleMobileMenu}
								>
									<span class="app-bar__menu-icon"></span>
								</button>
							`
							: nothing
					}
				</div>

				<!-- Mobile overlay backdrop -->
				${
					this._hasNav
						? html`
								<div
									class="app-bar__overlay ${this._mobileMenuOpen ? 'app-bar__overlay--visible' : ''}"
									@click=${this._toggleMobileMenu}
								></div>
							`
						: nothing
				}
			</header>
		`;
  }
}
