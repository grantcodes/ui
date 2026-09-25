import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from '../../icons.js';
import { generateId } from '../../lib/generate-id.js';
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import {
  canViewTransition,
  prefersReducedMotion,
  startViewTransition,
} from '../../lib/view-transition.js';
import { GrantCodesIcon } from '../icon/icon.component.js';
import toastStyles from './toast.css' with { type: 'css' };

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

export class GrantCodesToast extends LitElement {
  static dependencies = { 'grancodes-icon': GrantCodesIcon };
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
    this.variant = 'info';

    /**
     * Toast title
     * @type {string}
     */
    this.title = '';

    /**
     * Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
     * @type {number}
     */
    this.duration = 5000;

    /**
     * Toast position
     * @type {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'}
     */
    this.position = 'top-right';

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

    /**
     * Timeout ID for removing the toast after its exit animation
     * @type {number | null}
     */
    this._removeTimeout = null;

    /**
     * Guards against dismissing twice (close click plus auto-dismiss)
     * @type {boolean}
     */
    this._removing = false;

    // A view transition drives the enter and exit where it is available.
    this._useViewTransition = canViewTransition();
    // Per-instance, so two toasts cannot abort each other's view transition.
    this._viewTransitionName = generateId('toast-vt');
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--toast-vt-name', this._viewTransitionName);
    this.toggleAttribute('data-view-transition', this._useViewTransition);

    if (this._useViewTransition) {
      startViewTransition(() => {
        this._visible = true;
        return this.updateComplete;
      });
    } else {
      // Let the first paint land at opacity 0 so the CSS transition has somewhere to go.
      requestAnimationFrame(() => {
        this._visible = true;
      });
    }

    this._startDismissTimer();
  }

  disconnectedCallback() {
    clearTimeout(this._dismissTimeout);
    clearTimeout(this._removeTimeout);
    super.disconnectedCallback();
  }

  _startDismissTimer() {
    if (this.duration <= 0) return;
    clearTimeout(this._dismissTimeout);
    this._dismissTimeout = setTimeout(() => this._handleDismiss(), this.duration);
  }

  // Hover or focus holds the toast open; leaving restarts the full duration.
  _pauseDismiss() {
    clearTimeout(this._dismissTimeout);
    this._dismissTimeout = null;
  }

  _resumeDismiss() {
    if (!this._visible || this._dismissTimeout !== null) return;
    this._startDismissTimer();
  }

  _handleDismiss() {
    this._pauseDismiss();
    if (this._removing) return;
    this._removing = true;

    if (this._useViewTransition) {
      const transition = startViewTransition(() => {
        this._visible = false;
        return this.updateComplete;
      });
      if (transition) {
        transition.finished.then(
          () => this._remove(),
          () => this._remove(),
        );
        return;
      }
    }

    this._visible = false;
    clearTimeout(this._removeTimeout);
    this._removeTimeout = setTimeout(() => this._remove(), prefersReducedMotion() ? 0 : 300);
  }

  _remove() {
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
    this.remove();
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
      'toast--visible': this._visible,
    });

    return html`
			<div
				class=${classes}
				role=${this.variant === 'error' ? 'alert' : 'status'}
				aria-live=${this.variant === 'error' ? 'assertive' : 'polite'}
				@mouseenter=${this._pauseDismiss}
				@mouseleave=${this._resumeDismiss}
				@focusin=${this._pauseDismiss}
				@focusout=${this._resumeDismiss}
			>
				<grantcodes-icon class="toast__icon">${unsafeHTML(icon)}</grantcodes-icon>

				<div class="toast__content">
					${this.title ? html`<div class="toast__title">${this.title}</div>` : ''}
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
    this.position = 'top-right';
  }

  render() {
    const classes = classMap({
      'toast-container': true,
      [`toast-container--${this.position}`]: true,
    });

    return html`
			<div class=${classes}>
				<slot></slot>
			</div>
		`;
  }
}
