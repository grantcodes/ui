import { LitElement, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import personStyles from "./person.css" with { type: "css" };
import "../avatar/avatar.js";

export class GrantCodesPerson extends LitElement {
	static properties = {
		name: { type: String },
		role: { type: String },
		company: { type: String },
		avatar: { type: String },
		alt: { type: String },
		size: { type: String },
	};

	static styles = [personStyles];

	constructor() {
		super();
		this.name = "";
		this.role = "";
		this.company = "";
		this.avatar = "";
		this.alt = "";
		this.size = "medium";
	}

	get meta() {
		return [this.role, this.company].filter(Boolean).join(", ");
	}

	render() {
		const meta = this.meta;

		return html`
			<div class="person">
				<grantcodes-avatar
					src=${ifDefined(this.avatar || undefined)}
					name=${ifDefined(this.name || undefined)}
					alt=${ifDefined(this.alt || undefined)}
					size=${this.size}
				></grantcodes-avatar>
				<div class="person__meta">
					<cite class="person__name">${this.name}</cite>
					${meta ? html`<span class="person__details">${meta}</span>` : null}
					<slot name="description" class="person__description"></slot>
				</div>
			</div>
		`;
	}
}
