import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import iconStyles from './icon.css' with { type: 'css' };

export class GrantCodesIcon extends LitElement {
  static styles = [iconStyles];

  render() {
    return html`<span class="icon"><slot></slot></span>`;
  }
}
