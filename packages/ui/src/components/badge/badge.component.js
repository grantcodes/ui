import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { cx } from "../../lib/classnames.js";
import { badgeStyles } from "./badge.styles.js";

export class GrantCodesBadge extends LitElement {
	static styles = [badgeStyles];

	static properties = {
		variant: { type: String },
	};

	constructor() {
		super();

		/**
		 * Visual variant of the badge
		 * @type {'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'}
		 */
		this.variant = "neutral";
	}

	render() {
		const badgeClass = cx("badge", {
			[`badge--${this.variant}`]: Boolean(this.variant),
		});

		return html`
			<span class="${badgeClass}">
				<span class="badge__content">
					<slot></slot>
				</span>
			</span>
		`;
	}
}
