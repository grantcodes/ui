import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';

/**
 * Internal shared base class for tabs primitives.
 * @internal
 * @tag grantcodes-tabs-item
 */
export class GrantCodesTabsItem extends LitElement {
  static properties = {
    active: { type: Boolean },
    label: { type: String },
    index: { type: Number },
    containerId: { type: String },
    buttonId: { type: String, reflect: true },
    panelId: { type: String },
    content: { type: String },
  };

  constructor() {
    super();

    this.active = false;
    this.label = '';
    this.index = -1;
    this.containerId = '';
  }

  get buttonId() {
    return `${this.containerId}-button-${this.index.toString()}`;
  }

  get panelId() {
    return `${this.containerId}-panel-${this.index.toString()}`;
  }

  get content() {
    return this.label;
  }

  render() {
    return html``;
  }
}
