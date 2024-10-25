import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import dialogStyles from "./dialog.scss?inline";

@customElement("grantcodes-dialog")
export class GrantCodesDialog extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(dialogStyles)];

	@query("dialog")
	private readonly dialog!: HTMLDialogElement;

	@property({ type: Boolean, reflect: true })
	open = false;

	@property({ type: Boolean })
	dismissible = true;

	updated(changedProperties: Map<string | number | symbol, unknown>) {
		if (changedProperties.has("open")) {
			this._handleOpenChange();
		}
	}

	private _handleOpenChange() {
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
