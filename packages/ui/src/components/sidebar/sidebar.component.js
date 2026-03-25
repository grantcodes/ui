import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import focusRingStyles from "#styles/focus-ring.css" with { type: "css" };
import sidebarStyles from "./sidebar.css" with { type: "css" };

export class GrantCodesSidebar extends LitElement {
	static styles = [focusRingStyles, sidebarStyles];

	static properties = {
		position: { type: String },
		collapsed: { type: Boolean, reflect: true },
		collapsible: { type: Boolean },
		width: { type: String },
		_drawerOpen: { type: Boolean, state: true },
	};

	constructor() {
		super();

		/**
		 * Position of the sidebar
		 * @type {'left' | 'right'}
		 */
		this.position = "left";

		/**
		 * Whether the sidebar is collapsed on desktop
		 * @type {boolean}
		 */
		this.collapsed = false;

		/**
		 * Whether the sidebar can be collapsed
		 * @type {boolean}
		 */
		this.collapsible = true;

		/**
		 * Custom width of the sidebar
		 * @type {string}
		 */
		this.width = "280px";

		/**
		 * Whether mobile drawer is open
		 * @type {boolean}
		 */
		this._drawerOpen = false;

		this._handleDocumentClick = this._handleDocumentClick.bind(this);
		this._handleEscape = this._handleEscape.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("click", this._handleDocumentClick);
		document.addEventListener("keydown", this._handleEscape);
	}

	disconnectedCallback() {
		document.removeEventListener("click", this._handleDocumentClick);
		document.removeEventListener("keydown", this._handleEscape);
		super.disconnectedCallback();
	}

	_handleDocumentClick(e) {
		// Close mobile drawer if clicking outside
		if (this._drawerOpen) {
			const path = e.composedPath();
			if (!path.includes(this)) {
				this._drawerOpen = false;
			}
		}
	}

	_handleEscape(e) {
		if (e.key === "Escape" && this._drawerOpen) {
			this._drawerOpen = false;
		}
	}

	_toggleCollapsed() {
		if (!this.collapsible) return;

		this.collapsed = !this.collapsed;
		this.dispatchEvent(
			new CustomEvent("toggle", {
				detail: { collapsed: this.collapsed },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_toggleDrawer() {
		this._drawerOpen = !this._drawerOpen;
		this.dispatchEvent(
			new CustomEvent("drawer-toggle", {
				detail: { open: this._drawerOpen },
				bubbles: true,
				composed: true,
			}),
		);
	}

	render() {
		const sidebarClasses = classMap({
			sidebar: true,
			"sidebar--collapsed": this.collapsed,
			[`sidebar--${this.position}`]: true,
			"sidebar--drawer-open": this._drawerOpen,
		});

		return html`
			<!-- Mobile Toggle Button -->
			<button
				type="button"
				class="sidebar__mobile-toggle focus-ring"
				@click=${this._toggleDrawer}
				aria-label="${this._drawerOpen ? "Close sidebar" : "Open sidebar"}"
			>
				☰
			</button>

			<!-- Overlay for mobile -->
			${
				this._drawerOpen
					? html`
					<div
						class="sidebar__overlay"
						@click=${() => {
							this._drawerOpen = false;
						}}
					></div>
				`
					: ""
			}

			<!-- Sidebar -->
			<aside
				class=${sidebarClasses}
				style="--sidebar-width: ${this.width}"
			>
				<!-- Collapse Toggle (Desktop) -->
				${
					this.collapsible
						? html`
						<button
							type="button"
							class="sidebar__toggle focus-ring"
							@click=${this._toggleCollapsed}
							aria-label="${this.collapsed ? "Expand sidebar" : "Collapse sidebar"}"
							aria-expanded="${!this.collapsed}"
						>
							${this.position === "left" ? (this.collapsed ? "→" : "←") : this.collapsed ? "←" : "→"}
						</button>
					`
						: ""
				}

				<!-- Content -->
				<div class="sidebar__content">
					<slot></slot>
				</div>
			</aside>
		`;
	}
}
