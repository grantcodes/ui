import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { dropdownStyles } from "./dropdown.styles.js";
import { generateId } from "../../lib/generate-id.js";

export class GrantCodesDropdown extends LitElement {
	static styles = [dropdownStyles];

	static properties = {
		open: { type: Boolean, reflect: true },
		_triggerElement: { type: Object, state: true },
	};

	constructor() {
		super();

		/**
		 * Whether the dropdown is open
		 * @type {boolean}
		 */
		this.open = false;

		/**
		 * Reference to the trigger element
		 * @type {HTMLElement | null}
		 */
		this._triggerElement = null;

		if (!this.id) {
			this.id = generateId("dropdown");
		}

		this._handleDocumentClick = this._handleDocumentClick.bind(this);
		this._handleEscape = this._handleEscape.bind(this);
	}

	get menuId() {
		return `${this.id}-menu`;
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("click", this._handleDocumentClick);
		document.addEventListener("keydown", this._handleEscape);
	}

	disconnectedCallback() {
		document.removeEventListener("click", this._handleDocumentClick);
		document.removeEventListener("keydown", this._handleEscape);
		super.disconnectedCallback();
	}

	firstUpdated() {
		const triggerSlot = this.renderRoot.querySelector('slot[name="trigger"]');
		if (triggerSlot) {
			const assignedElements = triggerSlot.assignedElements();
			if (assignedElements.length > 0) {
				this._triggerElement = assignedElements[0];
				// this._triggerElement.setAttribute("aria-haspopup", "true");
				// this._triggerElement.setAttribute("aria-expanded", this.open);
				// this._triggerElement.setAttribute("aria-controls", this.menuId);
				this._triggerElement.setAttribute("popovertarget", this.menuId);
			}
		}

		// Set up menu items
		const menuSlot = this.renderRoot.querySelector('slot[name="menu"]');
		if (menuSlot) {
			const menuItems = menuSlot.assignedElements();
			menuItems.forEach((item) => {
				if (item.tagName === "GRANTCODES-DROPDOWN-ITEM") {
					item.setAttribute("role", "menuitem");
					item.setAttribute("tabindex", "-1");
				}
			});
		}
	}

	updated(changedProperties) {
		if (changedProperties.has("open") && this._triggerElement) {
			this._triggerElement.setAttribute("aria-expanded", this.open);

			if (this.open) {
				// Focus first menu item when opened
				requestAnimationFrame(() => {
					const menu = this.renderRoot.querySelector(".dropdown__menu");
					const firstItem = menu?.querySelector('[role="menuitem"]');
					if (firstItem) {
						firstItem.focus();
					}
				});
			}
		}
	}

	_handleDocumentClick(e) {
		// Close dropdown if clicking outside
		const path = e.composedPath();
		if (!path.includes(this)) {
			this.open = false;
		}
	}

	_handleEscape(e) {
		if (e.key === "Escape" && this.open) {
			this.open = false;
			this._triggerElement?.focus();
		}
	}

	_handleTriggerClick() {
		this.open = !this.open;
		this.dispatchEvent(
			new CustomEvent("toggle", {
				detail: { open: this.open },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleMenuKeydown(e) {
		const menu = this.renderRoot.querySelector(".dropdown__menu");
		const items = Array.from(menu?.querySelectorAll('[role="menuitem"]') || []);
		const currentIndex = items.indexOf(e.target);

		switch (e.key) {
			case "ArrowDown": {
				e.preventDefault();
				const nextIndex = (currentIndex + 1) % items.length;
				items[nextIndex]?.focus();
				break;
			}
			case "ArrowUp": {
				e.preventDefault();
				const prevIndex = (currentIndex - 1 + items.length) % items.length;
				items[prevIndex]?.focus();
				break;
			}
			case "Home":
				e.preventDefault();
				items[0]?.focus();
				break;
			case "End":
				e.preventDefault();
				items[items.length - 1]?.focus();
				break;
		}
	}

	render() {
		return html`
			<div class="dropdown">
				<div class="dropdown__trigger">
					<slot name="trigger"></slot>
				</div>
				<div
					id="${this.menuId}"
					class="dropdown__menu"
					role="menu"
					popover
					@keydown=${this._handleMenuKeydown}
				>
					<slot name="menu"></slot>
				</div>
			</div>
		`;
	}
}

export class GrantCodesDropdownItem extends LitElement {
	static styles = [dropdownStyles];

	static properties = {
		disabled: { type: Boolean },
	};

	constructor() {
		super();

		/**
		 * Whether the item is disabled
		 * @type {boolean}
		 */
		this.disabled = false;
	}

	_handleClick(e) {
		if (this.disabled) {
			e.preventDefault();
			return;
		}

		this.dispatchEvent(
			new CustomEvent("select", {
				bubbles: true,
				composed: true,
			}),
		);

		// Close the dropdown
		const dropdown = this.closest("grantcodes-dropdown");
		if (dropdown) {
			dropdown.open = false;
		}
	}

	render() {
		return html`
			<div
				class="dropdown-item ${this.disabled ? "dropdown-item--disabled" : ""}"
				@click=${this._handleClick}
			>
				<slot></slot>
			</div>
		`;
	}
}
