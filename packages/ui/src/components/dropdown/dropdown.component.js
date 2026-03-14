import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { generateId } from "../../lib/generate-id.js";
import { dropdownStyles } from "./dropdown.styles.js";

export class GrantCodesDropdown extends LitElement {
	static styles = [dropdownStyles];

	static properties = {
		open: { type: Boolean, reflect: true },
		placement: { type: String },
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
		 * Placement of the dropdown menu
		 * @type {string}
		 */
		this.placement = "bottom-start";

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
		// Set up menu items roles
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
		console.log({ changedProperties });
		if (changedProperties.has("open")) {
			// Update aria-expanded on trigger
			const triggerSlot = this.renderRoot.querySelector('slot[name="trigger"]');
			if (triggerSlot) {
				const assignedElements = triggerSlot.assignedElements();
				if (assignedElements.length > 0) {
					assignedElements[0].setAttribute("aria-expanded", this.open);
				}
			}

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
			this.requestUpdate();
		}
	}

	_handleEscape(e) {
		if (e.key === "Escape" && this.open) {
			this.open = false;
			this._triggerElement?.focus();
		}
	}

	_handleTriggerClick(_e) {
		this.open = !this.open;
		this.requestUpdate();

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
		const placementClass = this.placement
			? `dropdown__menu--${this.placement}`
			: "";
		const openClass = this.open ? "dropdown__menu--open" : "";
		return html`
      <div class="dropdown">
        <div class="dropdown__trigger" @click=${this._handleTriggerClick}>
          <slot name="trigger"></slot>
        </div>
        <div
          id="${this.menuId}"
          class="dropdown__menu ${placementClass} ${openClass}"
          role="menu"
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
