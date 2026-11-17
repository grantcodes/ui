import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from '../../icons.js';
import noticeStyles from '../notice/notice.css' with { type: 'css' };
import toastStyles from './toast.css' with { type: 'css' };
import '../button/button.js';

// A live region created together with its text is often not read, so the container's regions exist first.
const ANNOUNCE_DELAY = 100;

const ICONS: Record<string, string> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

export class GrantCodesToast extends LitElement {
  declare _dismissTimeout: ReturnType<typeof setTimeout> | null;
  declare _removing: boolean;
  declare _returnFocus: HTMLElement | null;
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

    this._returnFocus = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startDismissTimer();
  }

  _handleFocusIn(event: FocusEvent) {
    this._pauseDismiss();
    const from = event.relatedTarget;
    if (from instanceof HTMLElement && !this.contains(from) && !this.renderRoot.contains(from)) {
      this._returnFocus = from;
    }
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
    // Removing the focused toast would drop focus to the page; send it back where it came from.
    if (this.contains(document.activeElement) && this._returnFocus?.isConnected) {
      this._returnFocus.focus();
    }
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
    const announcedByContainer = this.parentElement?.localName === 'grantcodes-toast-container';
    const role = this.variant === 'error' ? 'alert' : 'status';
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
				role=${announcedByContainer ? nothing : role}
				@mouseenter=${this._pauseDismiss}
				@mouseleave=${this._resumeDismiss}
				@focusin=${this._handleFocusIn}
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

type LiveRole = 'alert' | 'status';

/**
 * Toast container for managing multiple toasts. Announces each new toast through live regions it
 * renders up front: errors assertively, other variants politely.
 */
export class GrantCodesToastContainer extends LitElement {
  declare _announced: WeakSet<Element>;
  declare _announceTimeout: ReturnType<typeof setTimeout> | null;
  declare _pending: Record<LiveRole, string[]>;
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

    this._announced = new WeakSet();
    this._announceTimeout = null;
    this._pending = { alert: [], status: [] };
  }

  disconnectedCallback() {
    clearTimeout(this._announceTimeout ?? undefined);
    this._announceTimeout = null;
    super.disconnectedCallback();
  }

  _handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    for (const toast of slot.assignedElements()) {
      if (!(toast instanceof GrantCodesToast) || this._announced.has(toast)) continue;
      this._announced.add(toast);
      const text = `${toast.title} ${toast.textContent ?? ''}`.replace(/\s+/g, ' ').trim();
      if (text) this._pending[toast.variant === 'error' ? 'alert' : 'status'].push(text);
    }
    if (this._announceTimeout !== null) return;
    if (!this._pending.alert.length && !this._pending.status.length) return;

    // Clearing first lets a repeat of the previous message be read again.
    for (const region of this.renderRoot.querySelectorAll('.toast-announcer')) {
      region.textContent = '';
    }
    this._announceTimeout = setTimeout(() => {
      this._announceTimeout = null;
      for (const role of ['alert', 'status'] as const) {
        const region = this.renderRoot.querySelector(`.toast-announcer[role="${role}"]`);
        if (region) region.textContent = this._pending[role].join(' ');
        this._pending[role] = [];
      }
    }, ANNOUNCE_DELAY);
  }

  render() {
    const classes = classMap({
      'toast-container': true,
      [`toast-container--${this.position}`]: true,
    });

    return html`
			<div class=${classes}>
				<slot @slotchange=${this._handleSlotChange}></slot>
			</div>
			<div class="toast-announcer" role="alert"></div>
			<div class="toast-announcer" role="status"></div>
		`;
  }
}
