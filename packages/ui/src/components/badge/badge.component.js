import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import badgeStyles from "./badge.styles.css" with { type: "css" };

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
		const classes = classMap({
			badge: true,
			[`badge--${this.variant}`]: Boolean(this.variant),
		});

		return html`
			<span class=${classes}>
				<span class="badge__content">
					<slot></slot>
				</span>
			</span>
		`;
	}
}
