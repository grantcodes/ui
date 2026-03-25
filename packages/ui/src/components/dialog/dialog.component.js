import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import dialogStyles from "./dialog.css" with { type: "css" };

export class GrantCodesDialog extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [dialogStyles];

	static properties = {
		open: { type: Boolean, reflect: true },
		dismissible: { type: Boolean },
	};

	constructor() {
		super();

		this.dialog;

		this.open = false;
		this.dismissible = true;
	}

	firstUpdated() {
		this.dialog = this.renderRoot.querySelector("dialog");
	}

	updated(changedProperties) {
		if (changedProperties.has("open")) {
			this._handleOpenChange();
		}
	}

	_handleOpenChange() {
		if (this.open) {
			this.dialog.showModal();
		} else {
			this.dialog.close();
		}
	}

	dismissTemplate() {
		if (!this.dismissible) {
			return html``;
		}

		return html`
      <button
        class="dialog__dismiss"
        @click=${() => {
					this.open = false;
				}}
        aria-label="Dismiss dialog"
      >
        &times;
      </button>
    `;
	}

	render() {
		return html`
	      <dialog class="dialog" ?open=${this.open}>
        ${this.dismissTemplate()}

        <header class="dialog__header">
          <slot name="header"></slot>
        </header>

        <slot class="dialog__content"></slot>

        <footer class="dialog__footer">
          <slot name="footer"> </slot>
        </footer>
      </dialog>
    `;
	}
}
