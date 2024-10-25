import { LitElement, type TemplateResult, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
// import { avatarStyles } from './avatar.styles'
import avatarStyles from "./avatar.scss?inline";

@customElement("grantcodes-avatar")
export class GrantCodesAvatar extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [unsafeCSS(avatarStyles)];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	@property() src = "";
	@property() name = "";
	@property() alt = "";
	@property() initials = "";

	getInitials(): string {
		if (this.initials) return this.initials;
		if (this.name) {
			const [first, second] = this.name.split(" ");
			return `${first[0]}${second ? second[0] : ""}`;
		}
		return "";
	}

	getAlt(): string {
		if (this.alt) return this.alt;
		return `${this.name || this.initials} avatar`;
	}

	getImg(): TemplateResult {
		if (this.src) {
			return html`<img src=${this.src} alt=${this.getAlt()} />`;
		}
		return html``;
	}

	render(): TemplateResult {
		const img = this.getImg();
		const initials = html`<span class="avatar__initials"
      >${this.getInitials()}</span
    >`;
		const content = img || initials;
		return html` <div class="avatar">${content}</div> `;
	}
}
