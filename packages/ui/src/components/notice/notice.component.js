import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";
import noticeStyles from "./notice.css" with { type: "css" };
import { GrantCodesIcon } from "../icon/icon.component.js";
import { AlertCircle, Info, CheckCircle2, XCircle, X } from "../../icons.js";

const ICONS = {
	info: Info,
	success: CheckCircle2,
	warning: AlertCircle,
	error: XCircle,
};

export class GrantCodesNotice extends LitElement {
	static dependencies = { "grancodes-icon": GrantCodesIcon };
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [noticeStyles];

	// Define reactive properties--updating a reactive property causes
	// the component to update.
	// @property() label = 'Button Label'
	static properties = {
		variant: { type: String },
		title: { type: String },
		dismissable: { type: Boolean },
	};

	constructor() {
		super();

		this.variant = "info";
		this.title = "";
		this.dismissable = false;
	}

	onDismiss(_e) {
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				this.remove();
			});
		} else {
			this.remove();
		}
	}

	renderDismiss() {
		if (this.dismissable) {
			return html`
				<button class="notice__close" @click=${this.onDismiss}>
					<grantcodes-icon title="Close Notice">${unsafeHTML(X)}</grantcodes-icon>
				</button>
			`;
		}
		return html``;
	}

	render() {
		const icon = ICONS[this.variant];
		const classes = classMap({
			notice: true,
			[`notice--${this.variant}`]: true,
		});

		return html`
			<aside class=${classes}>
				<grantcodes-icon class="notice__icon">${unsafeHTML(icon)}</grantcodes-icon>

				<div class="notice__content">
					${this.title && html`<h2 class="notice__title">${this.title}</h2>`}
					<p><slot></slot></p>
				</div>

				${this.renderDismiss()}
			</aside>
		`;
	}
}
