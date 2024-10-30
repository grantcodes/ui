import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class GrantCodesTabsItem extends LitElement {
	@property({ type: Boolean })
	active = false;

	@property({ type: String })
	label = "";

	@property({ type: Number })
	index = -1;

	@property({ type: String })
	containerId = "";

	@property({ type: String, reflect: true })
	get buttonId() {
		return `${this.containerId}-button-${this.index.toString()}`;
	}

	@property({ type: String })
	get panelId() {
		return `${this.containerId}-panel-${this.index.toString()}`;
	}

	@property({ type: String })
	get content() {
		return this.label;
	}

	override render() {
		return html``;
	}
}
