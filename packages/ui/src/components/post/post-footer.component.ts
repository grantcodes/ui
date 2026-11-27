import { html, LitElement } from 'lit';
import postFooterStyles from './post-footer.css' with { type: 'css' };

/**
 * A wrapping row of a post's meta: permalink and date, categories, syndication links. Each
 * slotted element after the first gets a dot separator.
 *
 * @slot - The meta items (light DOM, so they can carry `u-url`, `dt-published`, `p-category`, …).
 */
export class GrantCodesPostFooter extends LitElement {
  static styles = [postFooterStyles];

  render() {
    return html`<div class="post-footer"><slot></slot></div>`;
  }
}
