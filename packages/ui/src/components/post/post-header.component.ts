import { html, LitElement } from 'lit';
import postHeaderStyles from './post-header.css' with { type: 'css' };

/**
 * Author row of a post or response: an avatar beside the author's name and a line of meta text.
 *
 * @slot avatar - The author's picture, usually a `grantcodes-avatar`.
 * @slot - The author's name (light DOM, so it can carry `p-author h-card`).
 * @slot meta - Secondary text under the name, such as the date.
 */
export class GrantCodesPostHeader extends LitElement {
  static styles = [postHeaderStyles];

  render() {
    return html`
      <div class="post-header">
        <slot name="avatar"></slot>
        <div class="post-header__text">
          <div class="post-header__name"><slot></slot></div>
          <div class="post-header__meta"><slot name="meta"></slot></div>
        </div>
      </div>
    `;
  }
}
