import { LitElement, html } from "lit";
import personStyles from "./person.css" with { type: "css" };
import "../avatar/avatar.js";

export class GrantCodesPerson extends LitElement {
	static styles = [personStyles];

	static properties = {
		/**
		 * The persons name.
		 */
		name: { type: String },
		/**
		 * The src of the avatar
		 */
    avatar: { type: String },
    /**
     * The subtitle for the profile
     */
    subtitle: { type: String },
    /**
     * Link for the profile
     */
    href: { type: String },
	};

	constructor() {
		super();
		this.name = "";
    this.avatar = "";
    this.subtitle = "";
    this.href = ""
  }

  getSubtitle() {
    if (this.subtitle) {
      if (this.href) {
        return html`<a href=${this.href}>${this.subtitle}</a>`
      }
      return this.subtitle;
    }
    if (this.href) {
      try {
        const hostname = new URL(this.href).hostname
        return html`<a href=${this.href}>${hostname}</a>`
      } catch (err) {
        // No big deal
      }
    }
    return ''
  }

	render() {
		return html`
			<div class="person">
    			<grantcodes-avatar src=${this.avatar} name=${this.name}></grantcodes-avatar>
					<div class="person__content">
						<h5 class="person__name">${this.name}</h2>
						<p class="person__subtitle">${this.getSubtitle()}</p>
					</div>
			</div>
		`;
	}
}
