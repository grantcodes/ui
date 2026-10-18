import { html, LitElement, type PropertyValues } from 'lit';
import { generateId } from '../../lib/generate-id.js';
import { startViewTransition } from '../../lib/view-transition.js';
import dropdownStyles from './dropdown.css' with { type: 'css' };

export class GrantCodesDropdown extends LitElement {
  declare _openScheduled: boolean;
  declare _pendingOpen: boolean | null;
  declare _triggerElement: HTMLElement | null;
  declare _viewTransitionName: string;
  declare open: boolean;
  declare placement: string;

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
    this.placement = 'bottom-start';

    /**
     * Reference to the trigger element
     * @type {HTMLElement | null}
     */
    this._triggerElement = null;

    // Per-instance, so two dropdowns cannot abort each other's view transition.
    this._viewTransitionName = generateId('dropdown-vt');
    this._pendingOpen = null;
    this._openScheduled = false;

    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleEscape = this._handleEscape.bind(this);
  }

  get menuId() {
    return `${this.id}-menu`;
  }

  connectedCallback() {
    super.connectedCallback();
    // Not in the constructor: a custom element that gains an attribute there is never upgraded.
    if (!this.id) {
      this.id = generateId('dropdown');
    }
    if (typeof document === 'undefined') return;
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleEscape);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleEscape);
    super.disconnectedCallback();
  }

  firstUpdated() {
    // Set up menu items roles
    const menuSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="menu"]');
    if (menuSlot) {
      const menuItems = menuSlot.assignedElements();
      menuItems.forEach((item) => {
        if (item.tagName === 'GRANTCODES-DROPDOWN-ITEM') {
          item.setAttribute('role', 'menuitem');
          item.setAttribute('tabindex', '-1');
        }
      });
    }

    // Anchor name is per instance so multiple dropdowns cannot anchor to each other.
    this.style.setProperty('--dropdown-anchor', `--dropdown-anchor-${this.id}`);
    this.style.setProperty('--dropdown-vt-name', this._viewTransitionName);
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      // Update aria-expanded on trigger
      const triggerSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');
      if (triggerSlot) {
        const assignedElements = triggerSlot.assignedElements();
        if (assignedElements.length > 0) {
          assignedElements[0].setAttribute('aria-expanded', String(this.open));
        }
      }

      if (this.open) {
        // Focus first menu item when opened
        requestAnimationFrame(() => {
          const menu = this.renderRoot.querySelector('.dropdown__menu');
          const firstItem = menu?.querySelector<HTMLElement>('[role="menuitem"]');
          if (firstItem) {
            firstItem.focus();
          }
        });
      }
    }
  }

  _handleDocumentClick(e: Event) {
    // Close dropdown if clicking outside
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._setOpen(false);
    }
  }

  _handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && (this._pendingOpen ?? this.open)) {
      this._setOpen(false);
      this._triggerElement?.focus();
    }
  }

  _setOpen(open: boolean) {
    if ((this._pendingOpen ?? this.open) === open) return;
    this._pendingOpen = open;
    if (this._openScheduled) return;

    this._openScheduled = true;
    startViewTransition(() => {
      this.open = this._pendingOpen ?? false;
      this._pendingOpen = null;
      this._openScheduled = false;
      return this.updateComplete;
    });
  }

  _handleTriggerClick(_e: Event) {
    const open = !(this._pendingOpen ?? this.open);
    this._setOpen(open);
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _handleMenuKeydown(e: KeyboardEvent) {
    const menu = this.renderRoot.querySelector('.dropdown__menu');
    const items = Array.from(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') || []);
    const currentIndex = items.indexOf(e.target as HTMLElement);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex]?.focus();
        break;
      }
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  render() {
    const placementClass = this.placement ? `dropdown__menu--${this.placement}` : '';
    const openClass = this.open ? 'dropdown__menu--open' : '';
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
  declare disabled: boolean;

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

  _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        composed: true,
      }),
    );

    // Close the dropdown
    const dropdown = this.closest<GrantCodesDropdown>('grantcodes-dropdown');
    if (dropdown) {
      dropdown.open = false;
    }
  }

  render() {
    return html`
      <div
        class="dropdown-item ${this.disabled ? 'dropdown-item--disabled' : ''}"
        @click=${this._handleClick}
      >
        <slot></slot>
      </div>
    `;
  }
}
