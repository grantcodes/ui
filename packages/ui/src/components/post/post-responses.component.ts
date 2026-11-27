import { html, LitElement } from 'lit';
import postResponsesStyles from './post-responses.css' with { type: 'css' };

/**
 * One group of responses to a post, e.g. its likes or its comments.
 *
 * @slot - The responses (light DOM, so each can carry `p-like h-cite`, `p-comment h-cite`, …).
 */
export class GrantCodesPostResponses extends LitElement {
  declare heading: string;
  declare variant: string;

  static properties = {
    /** Heading for the group, e.g. "Likes (3)". Rendered in shadow DOM so page heading styles do not resize it. */
    heading: { type: String, reflect: true },
    /**
     * `faces` lays responses out as a wrapping row of avatars; `list` stacks them.
     * @type {'list' | 'faces'}
     */
    variant: { type: String, reflect: true },
  };

  static styles = [postResponsesStyles];

  constructor() {
    super();
    this.heading = '';
    this.variant = 'list';
  }

  render() {
    return html`
      <div class="post-responses">
        ${this.heading ? html`<h3 class="post-responses__heading">${this.heading}</h3>` : null}
        <div class="post-responses__items"><slot></slot></div>
      </div>
    `;
  }
}
