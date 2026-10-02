import { html, LitElement } from 'lit';
import { generateId } from '../../lib/generate-id.js';
import { startViewTransition } from '../../lib/view-transition.js';
import dropdownStyles from './dropdown.css' with { type: 'css' };

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
    this._handleMenuKeydown = this._handleMenuKeydown.bind(this);
    this._handleMenuSlotChange = this._handleMenuSlotChange.bind(this);
    this._menuObserver = null;
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
    this.addEventListener('keydown', this._handleMenuKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleEscape);
    this.removeEventListener('keydown', this._handleMenuKeydown);
    this._menuObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._handleMenuSlotChange();
    this._syncTrigger();
    this.style.setProperty('--dropdown-anchor', `--dropdown-anchor-${this.id}`);
    this.style.setProperty('--dropdown-vt-name', this._viewTransitionName);
  }

  _getMenuItems() {
    const menuSlot = this.renderRoot.querySelector('slot[name="menu"]');
    const items = menuSlot
      ?.assignedElements({ flatten: true })
      .flatMap((element) => [
        ...(element.matches('grantcodes-dropdown-item') ? [element] : []),
        ...element.querySelectorAll('grantcodes-dropdown-item'),
      ]);
    return [...new Set(items ?? [])];
  }

  _getEnabledMenuItems() {
    return this._getMenuItems().filter((item) => !item.disabled && !item.hasAttribute('disabled'));
  }

  _handleMenuSlotChange() {
    const menuSlot = this.renderRoot.querySelector('slot[name="menu"]');
    const assignedElements = menuSlot?.assignedElements({ flatten: true }) ?? [];
    this._menuObserver?.disconnect();
    const MenuMutationObserver = globalThis.MutationObserver ?? window.MutationObserver;
    this._menuObserver = new MenuMutationObserver(() => this._syncMenuItems());
    assignedElements.forEach((element) => {
      this._menuObserver.observe(element, { childList: true, subtree: true });
    });
    this._syncMenuItems();
  }

  _syncMenuItems() {
    this._getMenuItems().forEach((item) => {
      const disabled = item.disabled || item.hasAttribute('disabled');
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
      item.setAttribute('aria-disabled', String(disabled));
    });
  }

  _getTriggerElement() {
    const triggerSlot = this.renderRoot.querySelector('slot[name="trigger"]');
    const trigger = triggerSlot?.assignedElements({ flatten: true })[0];
    return trigger?.shadowRoot?.querySelector('button, a, input, select, textarea') ?? trigger ?? null;
  }

  _syncTrigger() {
    const trigger = this._getTriggerElement();
    if (!trigger) return;
    this._triggerElement = trigger;
    if (!trigger.matches('button, a, input, select, textarea')) {
      trigger.setAttribute('role', 'button');
      trigger.tabIndex = 0;
    }
    trigger.setAttribute('aria-controls', this.menuId);
    trigger.setAttribute('aria-expanded', String(this.open));
    trigger.setAttribute('aria-haspopup', 'menu');
  }

  updated(changedProperties) {
    this._syncTrigger();
    if (changedProperties.has('open') && this.open) {
      requestAnimationFrame(() => this._getEnabledMenuItems()[0]?.focus());
    }
  }

  _handleDocumentClick(e) {
    // Close dropdown if clicking outside
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._setOpen(false);
    }
  }

  _handleEscape(e) {
    if (e.key === 'Escape' && (this._pendingOpen ?? this.open)) {
      this._setOpen(false);
      this._triggerElement?.focus();
    }
  }

  _setOpen(open) {
    if ((this._pendingOpen ?? this.open) === open) return;
    this._pendingOpen = open;
    if (this._openScheduled) return;

    this._openScheduled = true;
    startViewTransition(() => {
      this.open = this._pendingOpen;
      this._pendingOpen = null;
      this._openScheduled = false;
      return this.updateComplete;
    });
  }

  _handleTriggerClick(_e) {
    this._syncTrigger();
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

  _handleTriggerKeydown(e) {
    if (!e.composedPath().includes(this._triggerElement)) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._setOpen(true);
      requestAnimationFrame(() => {
        const items = this._getEnabledMenuItems();
        (e.key === 'ArrowDown' ? items[0] : items.at(-1))?.focus();
      });
    } else if (
      !this._triggerElement.matches('button, a, input, select, textarea') &&
      (e.key === 'Enter' || e.key === ' ')
    ) {
      e.preventDefault();
      this._handleTriggerClick(e);
    }
  }

  _handleMenuKeydown(e) {
    const items = this._getEnabledMenuItems();
    const currentItem = e.composedPath().find((node) => node?.tagName === 'GRANTCODES-DROPDOWN-ITEM');
    if (!currentItem) return;
    const currentIndex = items.indexOf(currentItem);

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
        items.at(-1)?.focus();
        break;
    }
  }

  render() {
    const placementClass = this.placement ? `dropdown__menu--${this.placement}` : '';
    const openClass = this.open ? 'dropdown__menu--open' : '';
    return html`
      <div class="dropdown">
        <div
          class="dropdown__trigger"
          @click=${this._handleTriggerClick}
          @keydown=${this._handleTriggerKeydown}
        >
          <slot name="trigger" @slotchange=${() => this._syncTrigger()}></slot>
        </div>
        <div
          id="${this.menuId}"
          class="dropdown__menu ${placementClass} ${openClass}"
          role="menu"
        >
          <slot name="menu" @slotchange=${this._handleMenuSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export class GrantCodesDropdownItem extends LitElement {
  static styles = [dropdownStyles];

  static properties = {
    disabled: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    /**
     * Whether the item is disabled
     * @type {boolean}
     */
    this.disabled = false;
  }

  _activate(e) {
    if (this.disabled) {
      e?.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('select', {
        bubbles: true,
        composed: true,
      }),
    );

    const dropdown = this.closest('grantcodes-dropdown');
    dropdown?._setOpen(false);
    dropdown?._triggerElement?.focus();
  }

  _handleClick(e) {
    this._activate(e);
  }

  _handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._activate(e);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
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
