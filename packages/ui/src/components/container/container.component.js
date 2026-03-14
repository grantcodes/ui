import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { cx } from "../../lib/classnames.js";
import { containerStyles } from "./container.styles.js";

export class GrantCodesContainer extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [containerStyles];

  static properties = {
    align: { type: String },
    nopad: { type: Boolean },
  };

  constructor() {
    super();

    this.align = "default";
    this.nopad = false;
  }

  render() {
    const containerClass = cx("container", {
      "container--wide": this.align === "wide",
      "container--full": this.align === "full",
      "container--prose": this.align === "prose",
      "container--viewport": this.align === "viewport",
      "container--nopad": this.nopad,
    });

    return html`
      <div class="${containerClass}">
        <slot></slot>
      </div>
    `;
  }
}
