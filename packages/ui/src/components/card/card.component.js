import { LitElement, html } from "lit";
import cardStyles from "./card.styles.css" with { type: "css" };

export class GrantCodesCard extends LitElement {
	static properties = {
		hasHeader: { type: Boolean, reflect: true },
		hasFooter: { type: Boolean, reflect: true },
	};

	static styles = [cardStyles];

	constructor() {
		super();
		this.hasHeader = false;
		this.hasFooter = false;
	}

	firstUpdated() {
		this._checkSlots();
		this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
			slot.addEventListener("slotchange", () => this._checkSlots());
		});
	}

	_checkSlots() {
		const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]');
		const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]');
		this.hasHeader =
			(headerSlot?.assignedNodes({ flatten: true }).length ?? 0) > 0;
		this.hasFooter =
			(footerSlot?.assignedNodes({ flatten: true }).length ?? 0) > 0;

		const headerEl = this.shadowRoot?.querySelector(".card__header");
		const footerEl = this.shadowRoot?.querySelector(".card__footer");
		headerEl?.toggleAttribute("data-has-content", this.hasHeader);
		footerEl?.toggleAttribute("data-has-content", this.hasFooter);
	}

	render() {
		return html`
      <div class="card">
        <div class="card__header"><slot name="header"></slot></div>
        <div class="card__content"><slot></slot></div>
        <div class="card__footer"><slot name="footer"></slot></div>
      </div>
    `;
	}
}
