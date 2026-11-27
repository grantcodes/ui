import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Bookmark, CalendarCheck, Heart, Quote, Repeat2, Reply } from 'lucide-static';
import postContextStyles from './post-context.css' with { type: 'css' };
import '../icon/icon.js';

const icons: Record<string, string> = {
  reply: Reply,
  rsvp: CalendarCheck,
  like: Heart,
  repost: Repeat2,
  bookmark: Bookmark,
  quotation: Quote,
};

/**
 * A band naming the page a post responds to, with an icon for the kind of response. Runs edge to
 * edge inside a `grantcodes-card`.
 *
 * @slot - The label and link (light DOM, so the link can carry `u-in-reply-to`, `u-like-of`, …).
 * @slot citation - An embedded copy of the page responded to, usually an `h-cite`.
 */
export class GrantCodesPostContext extends LitElement {
  declare type: string;

  static properties = {
    /**
     * Kind of response; picks the icon.
     * @type {'reply' | 'rsvp' | 'like' | 'repost' | 'bookmark' | 'quotation'}
     */
    type: { type: String, reflect: true },
  };

  static styles = [postContextStyles];

  constructor() {
    super();
    this.type = 'reply';
  }

  render() {
    const icon = icons[this.type];
    return html`
      <div class="post-context">
        <div class="post-context__line">
          ${icon ? html`<grantcodes-icon class="post-context__icon" aria-hidden="true">${unsafeHTML(icon)}</grantcodes-icon>` : null}
          <span class="post-context__label"><slot></slot></span>
        </div>
        <slot name="citation"></slot>
      </div>
    `;
  }
}
