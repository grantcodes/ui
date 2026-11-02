import { LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit/static-html.js';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from '../../icons.js';
import { generateId } from '../../lib/generate-id.js';
import { startViewTransition } from '../../lib/view-transition.js';
import noticeStyles from './notice.css' with { type: 'css' };

const ICONS: Record<string, string> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

export class GrantCodesNotice extends LitElement {
  declare _viewTransitionName: string;
  declare dismissable: boolean;
  declare variant: string;

  static styles = [noticeStyles];

  static properties = {
    variant: { type: String },
    title: { type: String },
    dismissable: { type: Boolean },
  };

  constructor() {
    super();

    this.variant = 'info';
    this.title = '';
    this.dismissable = false;

    // Per-instance, so two notices cannot abort each other's view transition.
    this._viewTransitionName = generateId('notice-vt');
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--notice-vt-name', this._viewTransitionName);
  }

  onDismiss(_e: Event) {
    startViewTransition(() => {
      this.remove();
    });
  }

  renderDismiss() {
    if (!this.dismissable) return nothing;

    return html`
			<button
				class="notice__close"
				type="button"
				aria-label="Dismiss notice"
				@click=${this.onDismiss}
			>
				<grantcodes-icon aria-hidden="true">${unsafeHTML(X)}</grantcodes-icon>
			</button>
		`;
  }

  render() {
    const icon = ICONS[this.variant];
    const classes = classMap({
      notice: true,
      [`notice--${this.variant}`]: true,
    });

    return html`
			<aside class=${classes}>
				<grantcodes-icon class="notice__icon">${unsafeHTML(icon)}</grantcodes-icon>

				<div class="notice__content">
					${this.title && html`<h2 class="notice__title">${this.title}</h2>`}
					<p><slot></slot></p>
				</div>

				${this.renderDismiss()}
			</aside>
		`;
  }
}
