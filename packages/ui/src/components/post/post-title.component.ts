import { LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import postTitleStyles from './post-title.css' with { type: 'css' };

/**
 * A post's title. The heading element lives in shadow DOM so page heading styles do not resize
 * it inside a card; the slotted text stays in light DOM and can carry `p-name`.
 *
 * @slot - The title text.
 */
export class GrantCodesPostTitle extends LitElement {
  declare level: number;

  static properties = {
    /** Heading level, 1–6. */
    level: { type: Number, reflect: true },
  };

  static styles = [postTitleStyles];

  constructor() {
    super();
    this.level = 2;
  }

  render() {
    const level = Math.min(Math.max(Math.round(this.level) || 2, 1), 6);
    const tag = unsafeStatic(`h${level}`);
    return html`<${tag} class="post-title"><slot></slot></${tag}>`;
  }
}
