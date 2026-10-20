import { html, LitElement, type PropertyValues } from 'lit';
import { generateId } from '../../lib/generate-id.js';
import { startViewTransition } from '../../lib/view-transition.js';
import dropdownStyles from './dropdown.css' with { type: 'css' };

export class GrantCodesDropdown extends LitElement {
  declare _menuObserver: MutationObserver | null;
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
    this._viewTransitionName = generateId('dropdown-vt');
    this._pendingOpen = null;
    this._openScheduled = false;
    this._menuObserver = null;

    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleEscape = this._handleEscape.bind(this);
    this._handleMenuKeydown = this._handleMenuKeydown.bind(this);
    this._handleMenuSlotChange = this._handleMenuSlotChange.bind(this);
  }

  get menuId() {
    return `${this.id}-menu`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = generateId('dropdown');
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

  _getMenuItems(): GrantCodesDropdownItem[] {
    const menuSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="menu"]');
    const items = menuSlot
      ?.assignedElements({ flatten: true })
      .flatMap((element) => [
        ...(element instanceof GrantCodesDropdownItem ? [element] : []),
        ...element.querySelectorAll<GrantCodesDropdownItem>('grantcodes-dropdown-item'),
      ]);
    return [...new Set(items ?? [])];
  }

  _getEnabledMenuItems() {
    return this._getMenuItems().filter((item) => !item.disabled);
  }

  _handleMenuSlotChange() {
    const menuSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="menu"]');
    const assignedElements = menuSlot?.assignedElements({ flatten: true }) ?? [];
    this._menuObserver?.disconnect();
    const MenuMutationObserver = globalThis.MutationObserver ?? window.MutationObserver;
    const observer = new MenuMutationObserver(() => this._syncMenuItems());
    this._menuObserver = observer;
    assignedElements.forEach((element) => {
      observer.observe(element, { childList: true, subtree: true });
    });
    this._syncMenuItems();
  }

  _syncMenuItems() {
    this._getMenuItems().forEach((item) => {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
      item.setAttribute('aria-disabled', String(item.disabled));
    });
  }

  _getTriggerElement(): HTMLElement | null {
    const triggerSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const trigger = triggerSlot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    return trigger?.shadowRoot?.querySelector<HTMLElement>('button, a, input, select, textarea') ?? trigger ?? null;
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

  updated(changedProperties: PropertyValues) {
    this._syncTrigger();
    if (changedProperties.has('open') && this.open) {
      requestAnimationFrame(() => this._getEnabledMenuItems()[0]?.focus());
    }
  }

  _handleDocumentClick(e: Event) {
    if (!e.composedPath().includes(this)) this._setOpen(false);
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

  _handleTriggerKeydown(e: KeyboardEvent) {
    const trigger = this._triggerElement;
    if (!trigger || !e.composedPath().includes(trigger)) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._setOpen(true);
      requestAnimationFrame(() => {
        const items = this._getEnabledMenuItems();
        (e.key === 'ArrowDown' ? items[0] : items.at(-1))?.focus();
      });
    } else if (
      !trigger.matches('button, a, input, select, textarea') &&
      (e.key === 'Enter' || e.key === ' ')
    ) {
      e.preventDefault();
      this._handleTriggerClick(e);
    }
  }

  _handleMenuKeydown(e: KeyboardEvent) {
    const items = this._getEnabledMenuItems();
    const currentItem = e.composedPath().find((node) => node instanceof GrantCodesDropdownItem);
    if (!(currentItem instanceof GrantCodesDropdownItem)) return;
    const currentIndex = items.indexOf(currentItem);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
        break;
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
        <div id="${this.menuId}" class="dropdown__menu ${placementClass} ${openClass}" role="menu">
          <slot name="menu" @slotchange=${this._handleMenuSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export class GrantCodesDropdownItem extends LitElement {
  declare disabled: boolean;

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

  _activate(e?: Event) {
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

    const dropdown = this.closest<GrantCodesDropdown>('grantcodes-dropdown');
    dropdown?._setOpen(false);
    dropdown?._triggerElement?.focus();
  }

  _handleClick(e: Event) {
    this._activate(e);
  }

  _handleKeydown(e: KeyboardEvent) {
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

  updated(changedProperties: PropertyValues) {
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
