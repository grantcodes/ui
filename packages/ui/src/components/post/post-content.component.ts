import { html, LitElement, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ChevronDown, ChevronUp } from 'lucide-static';
import postContentStyles from './post-content.css' with { type: 'css' };
import '../button/button.js';
import '../icon/icon.js';

/**
 * A post's body. With `collapsible`, long content is clipped to a few lines behind a
 * "Show more" toggle; without JavaScript the content stays fully visible.
 *
 * @slot - The content (light DOM, so it can carry `e-content` or `p-summary`).
 */
export class GrantCodesPostContent extends LitElement {
  declare collapsible: boolean;
  declare _expanded: boolean;
  declare _overflowing: boolean;
  declare _ready: boolean;
  declare _observer: ResizeObserver | undefined;

  static properties = {
    /** Clips long content behind a "Show more" toggle. */
    collapsible: { type: Boolean, reflect: true },
    _expanded: { state: true },
    _overflowing: { state: true },
    _ready: { state: true },
  };

  static styles = [postContentStyles];

  constructor() {
    super();
    this.collapsible = false;
    this._expanded = false;
    this._overflowing = false;
    this._ready = false;
  }

  firstUpdated() {
    // Clip only once JS can measure and offer the toggle.
    this._ready = true;
    if (typeof ResizeObserver === 'undefined') return;
    this._observer = new ResizeObserver(() => this._measure());
    const body = this.renderRoot.querySelector('.post-content__body');
    if (body) this._observer.observe(body);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  _measure() {
    if (this._expanded) return;
    const body = this.renderRoot.querySelector<HTMLElement>('.post-content__body');
    if (body) this._overflowing = body.scrollHeight > body.clientHeight + 1;
  }

  _toggle() {
    this._expanded = !this._expanded;
  }

  render() {
    const clipped = this.collapsible && this._ready && !this._expanded;
    const toggle = this.collapsible && this._overflowing;
    return html`
      <div
        id="body"
        class="post-content__body ${clipped ? 'post-content__body--clipped' : ''} ${clipped && this._overflowing ? 'post-content__body--faded' : ''}"
        @focusin=${() => {
          if (clipped && this._overflowing) this._expanded = true;
        }}
      >
        <slot></slot>
      </div>
      ${
        toggle
          ? html`<div class="post-content__toggle">
              <grantcodes-button
                variant="outline"
                color="neutral"
                aria-expanded=${this._expanded ? 'true' : 'false'}
                aria-controls="body"
                @click=${this._toggle}
              >
                ${this._expanded ? 'Show less' : 'Show more'}
                <grantcodes-icon slot="end" aria-hidden="true">${unsafeHTML(this._expanded ? ChevronUp : ChevronDown)}</grantcodes-icon>
              </grantcodes-button>
            </div>`
          : nothing
      }
    `;
  }
}
