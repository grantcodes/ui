import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from '../../icons.js';
import noticeStyles from '../notice/notice.css' with { type: 'css' };
import toastStyles from './toast.css' with { type: 'css' };
import '../button/button.js';

const ICONS: Record<string, string> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

export class GrantCodesToast extends LitElement {
  declare _dismissTimeout: ReturnType<typeof setTimeout> | null;
  declare _removing: boolean;
  declare dismissible: boolean;
  declare duration: number;
  declare position: string;
  declare variant: string;

  // Toast wears Notice's variant colours; its own sheet comes last to override layout and motion.
  static styles = [noticeStyles, toastStyles];

  static properties = {
    variant: { type: String },
    title: { type: String },
    duration: { type: Number },
    position: { type: String },
    dismissible: { type: Boolean },
    _removing: { state: true },
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
     * Timeout ID for auto-dismiss
     * @type {number | null}
     */
    this._dismissTimeout = null;

    /**
     * Guards against dismissing twice (close click plus auto-dismiss)
     * @type {boolean}
     */
    this._removing = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startDismissTimer();
  }

  disconnectedCallback() {
    clearTimeout(this._dismissTimeout ?? undefined);
    super.disconnectedCallback();
  }

  _startDismissTimer() {
    if (this.duration <= 0) return;
    clearTimeout(this._dismissTimeout ?? undefined);
    this._dismissTimeout = setTimeout(() => this._handleDismiss(), this.duration);
  }

  // Hover or focus holds the toast open; leaving restarts the full duration.
  _pauseDismiss() {
    clearTimeout(this._dismissTimeout ?? undefined);
    this._dismissTimeout = null;
  }

  _resumeDismiss() {
    if (this._removing || this._dismissTimeout !== null) return;
    this._startDismissTimer();
  }

  async _handleDismiss() {
    this._pauseDismiss();
    if (this._removing) return;
    this._removing = true;

    await this.updateComplete;
    // Reduced motion sets no transitions, so there is nothing to wait for.
    const frame = this.renderRoot.querySelector<HTMLElement>('.toast-frame');
    const animations = frame?.getAnimations?.({ subtree: true }) ?? [];
    await Promise.allSettled(animations.map((animation) => animation.finished));
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
    this.remove();
  }

  _renderDismissButton() {
    if (!this.dismissible) return nothing;

    return html`
			<grantcodes-button
				class="toast__close"
				size="sm"
				variant="ghost"
				color="inherit"
				@click=${this._handleDismiss}
			>
				<grantcodes-icon role="img" aria-label="Dismiss notification">${unsafeHTML(X)}</grantcodes-icon>
			</grantcodes-button>
		`;
  }

  render() {
    const icon = ICONS[this.variant];
    const classes = classMap({
      notice: true,
      [`notice--${this.variant}`]: true,
      toast: true,
      [`toast--${this.variant}`]: true,
      [`toast--${this.position}`]: true,
    });

    return html`
			<div class="toast-frame ${this._removing ? 'toast-frame--closing' : ''}">
			<div class="toast-frame__inner">
			<div
				class=${classes}
				role=${this.variant === 'error' ? 'alert' : 'status'}
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
			</div>
			</div>
		`;
  }
}

/**
 * Toast container for managing multiple toasts
 */
export class GrantCodesToastContainer extends LitElement {
  declare position: string;

  static styles = [toastStyles];

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
