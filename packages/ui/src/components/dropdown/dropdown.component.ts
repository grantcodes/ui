import { html, LitElement, type PropertyValues } from 'lit';
import dropdownStyles from './dropdown.css' with { type: 'css' };

const CONTROL_SELECTOR = 'button, a, input, select, textarea';

export class GrantCodesDropdown extends LitElement {
  declare _triggerElement: HTMLElement | null;
  declare open: boolean;
  declare placement: string;

  static styles = [dropdownStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { type: String },
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
    this._triggerElement = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleMenuKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleMenuKeydown);
    super.disconnectedCallback();
  }

  _getMenuItems(): GrantCodesDropdownItem[] {
    const menuSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="menu"]');
    const items = menuSlot
      ?.assignedElements({ flatten: true })
      .flatMap((element) => [
        ...(element instanceof GrantCodesDropdownItem ? [element] : []),
        ...element.querySelectorAll<GrantCodesDropdownItem>('grantcodes-dropdown-item'),
      ]);
    return [...new Set(items ?? [])].filter((item) => !item.disabled);
  }

  _syncTrigger() {
    const triggerSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const slotted = triggerSlot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    const trigger = slotted?.shadowRoot?.querySelector<HTMLElement>(CONTROL_SELECTOR) ?? slotted;
    if (!trigger) return;
    this._triggerElement = trigger;
    if (!trigger.matches(CONTROL_SELECTOR)) {
      trigger.setAttribute('role', 'button');
      trigger.tabIndex = 0;
    }
    trigger.setAttribute('aria-expanded', String(this.open));
    trigger.setAttribute('aria-haspopup', 'menu');
  }

  updated(changedProperties: PropertyValues) {
    this._syncTrigger();
    if (!changedProperties.has('open')) return;
    const menu = this.renderRoot.querySelector<HTMLElement>('.dropdown__menu');
    // The trigger as source keeps clicks on it from light-dismissing the menu.
    if (this.open) {
      menu?.showPopover?.({ source: this._triggerElement ?? undefined });
      requestAnimationFrame(() => this._getMenuItems()[0]?.focus());
    } else {
      menu?.hidePopover?.();
    }
  }

  _handleTriggerClick() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
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
      this.open = true;
      requestAnimationFrame(() => {
        const items = this._getMenuItems();
        (e.key === 'ArrowDown' ? items[0] : items.at(-1))?.focus();
      });
    } else if (!trigger.matches(CONTROL_SELECTOR) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleTriggerClick();
    }
  }

  _handleMenuKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open) {
      this.open = false;
      this._triggerElement?.focus();
      return;
    }

    const items = this._getMenuItems();
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
    return html`
      <div class="dropdown">
        <div
          class="dropdown__trigger"
          @click=${this._handleTriggerClick}
          @keydown=${this._handleTriggerKeydown}
        >
          <slot name="trigger" @slotchange=${this._syncTrigger}></slot>
        </div>
        <div
          class="dropdown__menu dropdown__menu--${this.placement}"
          role="menu"
          popover
          @toggle=${(e: ToggleEvent) => {
            // The native event is composed, so it would reach host listeners under this component's own `toggle` name.
            e.stopPropagation();
            this.open = e.newState === 'open';
          }}
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
    if (!dropdown) return;
    dropdown.open = false;
    dropdown._triggerElement?.focus();
  }

  _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._activate(e);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'menuitem');
    this.tabIndex = -1;
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
        @click=${this._activate}
      >
        <slot></slot>
      </div>
    `;
  }
}
