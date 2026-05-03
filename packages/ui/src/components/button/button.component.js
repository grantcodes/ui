import { html, LitElement } from "lit";
import focusRingStyles from "../../lib/styles/focus-ring.css" with {
	type: "css",
};
import buttonStyles from "./button.css" with { type: "css" };

export class GrantCodesButton extends LitElement {
	// Styles are scoped to this element: they won't conflict with styles
	// on the main page or in other components. Styling API can be exposed
	// via CSS custom properties.
	static styles = [focusRingStyles, buttonStyles];

	static formAssociated = true;

	static properties = {
		href: { type: String },
		type: { type: String },
		name: { type: String },
		value: { type: String },
		disabled: { type: Boolean, reflect: true },
		form: { type: String, reflect: true },
	};

	constructor() {
		super();

		this.href = "";
		this.type = "button";
		this.name = "";
		this.value = "";
		// Do NOT set form="" — an empty form attribute overrides ancestor form association
		this._fieldsetDisabled = false;

		// Attach ElementInternals for form participation.
		// try/catch because happy-dom (DOM-shim test env) may not support attachInternals()
		try {
			this.internals = this.attachInternals();
		} catch (e) {
			this.internals = null;
		}
		this.disabled = false;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (this.internals) {
			if (changedProperties.has("name") || changedProperties.has("value")) {
				this.internals.setFormValue(this.name ? this.value : null);
			}
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this._handleFormClick);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener("click", this._handleFormClick);
	}

	_handleFormClick(e) {
		// href mode renders a link — do not intercept form actions
		if (this.href) return;
		// Only handle form actions when we have internals and are inside a form
		if (!this.internals || !this.internals.form || this.disabled) return;

		const t = this.type.toLowerCase();
		if (t === "submit") {
			this.internals.form.requestSubmit();
		} else if (t === "reset") {
			this.internals.form.reset();
		}
		// type === "button" or any other value: no form action (default no-op)
	}

	formDisabledCallback(disabled) {
		this._fieldsetDisabled = disabled;
		this.requestUpdate();
	}

	formResetCallback() {
		// Called by the browser when the associated form is reset.
		// Reset the value to an empty string (default state).
		// If a future version tracks an initial value, restore it here.
		this.value = "";
	}

	// The render() method is called any time reactive properties change.
	// Return HTML in a string template literal tagged with the `html`
	// tag function to describe the component's internal DOM.
	// Expressions can set attribute values, property values, event handlers,
	// and child nodes/text.
	/** @returns {import('lit').TemplateResult} */
	render() {
		const isLink = !!this.href;

		if (isLink) {
			return html`
				<a
					class="button focus-ring"
					href=${this.href}
					?disabled=${this.disabled || this._fieldsetDisabled}
				>
					<span><slot></slot></span>
				</a>
			`;
		}

		return html`
			<button
				class="button focus-ring"
				type="button"
				name=${this.name ?? ""}
				value=${this.value ?? ""}
				?disabled=${this.disabled || this._fieldsetDisabled}
			>
				<span><slot></slot></span>
			</button>
		`;
	}
}
