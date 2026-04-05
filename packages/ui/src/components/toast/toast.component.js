import { html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";
import focusRingStyles from "#styles/focus-ring.css" with { type: "css" };
import toastStyles from "./toast.css" with { type: "css" };
import { GrantCodesIcon } from "../icon/icon.component.js";
import { AlertCircle, Info, CheckCircle2, XCircle, X } from "../../icons.js";

const ICONS = {
	info: Info,
	success: CheckCircle2,
	warning: AlertCircle,
	error: XCircle,
};

export class GrantCodesToast extends LitElement {
	static dependencies = { "grancodes-icon": GrantCodesIcon };
	static styles = [focusRingStyles, toastStyles];

	static properties = {
		variant: { type: String },
		title: { type: String },
		duration: { type: Number },
		position: { type: String },
		dismissible: { type: Boolean },
		_visible: { type: Boolean, state: true },
	};

	constructor() {
		super();

		/**
		 * Visual variant
		 * @type {'info' | 'success' | 'warning' | 'error'}
		 */
		this.variant = "info";

		/**
		 * Toast title
		 * @type {string}
		 */
		this.title = "";

		/**
		 * Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
		 * @type {number}
		 */
		this.duration = 5000;

		/**
		 * Toast position
		 * @type {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'}
		 */
		this.position = "top-right";

		/**
		 * Whether toast can be manually dismissed
		 * @type {boolean}
		 */
		this.dismissible = true;

		/**
		 * Internal visibility state
		 * @type {boolean}
		 */
		this._visible = false;

		/**
		 * Timeout ID for auto-dismiss
		 * @type {number | null}
		 */
		this._dismissTimeout = null;
	}

	connectedCallback() {
		super.connectedCallback();
		// Show toast after a brief delay for animation
		requestAnimationFrame(() => {
			this._visible = true;
		});

		// Set up auto-dismiss
		if (this.duration > 0) {
			this._dismissTimeout = setTimeout(() => {
				this._handleDismiss();
			}, this.duration);
		}
	}

	disconnectedCallback() {
		if (this._dismissTimeout) {
			clearTimeout(this._dismissTimeout);
		}
		super.disconnectedCallback();
	}

	_handleDismiss() {
		this._visible = false;

		// Remove element after animation completes
		setTimeout(() => {
			this.dispatchEvent(
				new CustomEvent("dismiss", {
					bubbles: true,
					composed: true,
				}),
			);
			this.remove();
		}, 300); // Match animation duration
	}

	_renderDismissButton() {
		if (!this.dismissible) {
			return html``;
		}

		return html`
			<button
				type="button"
				class="toast__close focus-ring"
				@click=${this._handleDismiss}
				aria-label="Dismiss notification"
			>
				<grantcodes-icon>${unsafeHTML(X)}</grantcodes-icon>
			</button>
		`;
	}

	render() {
		const icon = ICONS[this.variant];
		const classes = classMap({
			toast: true,
			[`toast--${this.variant}`]: true,
			[`toast--${this.position}`]: true,
			"toast--visible": this._visible,
		});

		return html`
			<div class=${classes} role="status" aria-live="polite">
				<grantcodes-icon class="toast__icon">${unsafeHTML(icon)}</grantcodes-icon>

				<div class="toast__content">
					${this.title ? html`<div class="toast__title">${this.title}</div>` : ""}
					<div class="toast__message">
						<slot></slot>
					</div>
				</div>

				${this._renderDismissButton()}
			</div>
		`;
	}
}

/**
 * Toast container for managing multiple toasts
 */
export class GrantCodesToastContainer extends LitElement {
	static styles = [focusRingStyles, toastStyles];

	static properties = {
		position: { type: String },
	};

	constructor() {
		super();

		/**
		 * Position of the toast container
		 * @type {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'}
		 */
		this.position = "top-right";
	}

	render() {
		const classes = classMap({
			"toast-container": true,
			[`toast-container--${this.position}`]: true,
		});

		return html`
			<div class=${classes}>
				<slot></slot>
			</div>
		`;
	}
}
