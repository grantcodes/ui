import { html, LitElement, nothing, type PropertyValues } from 'lit';
import { SlotPresenceController } from '../../lib/slot-presence-controller.js';
import sidebarStyles from './sidebar.css' with { type: 'css' };

type DrawerToggleDetail = { open: boolean };

export class GrantCodesSidebar extends LitElement {
  declare _compact: boolean;
  declare _contentPresence: SlotPresenceController;
  declare _hasContent: boolean;
  declare _hasFooter: boolean;
  declare _hasHeader: boolean;
  declare _footerPresence: SlotPresenceController;
  declare _headerPresence: SlotPresenceController;
  declare _pointerStartedInside: boolean;
  declare _resizeObserver: ResizeObserver | undefined;
  declare _restoreFocusTarget: HTMLElement | null;
  declare controlled: boolean;
  declare open: boolean;

  static styles = [sidebarStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    controlled: { type: Boolean, reflect: true },
    _compact: { state: true },
    _hasHeader: { state: true },
    _hasContent: { state: true },
    _hasFooter: { state: true },
  };

  constructor() {
    super();
    this.open = false;
    this.controlled = false;
    this._compact = false;
    this._hasHeader = false;
    this._hasContent = false;
    this._hasFooter = false;
    this._pointerStartedInside = false;
    this._restoreFocusTarget = null;
    this._headerPresence = new SlotPresenceController(this, 'header', (present) => {
      this._hasHeader = present;
    });
    this._contentPresence = new SlotPresenceController(this, 'content', (present) => {
      this._hasContent = present;
    });
    this._footerPresence = new SlotPresenceController(this, 'footer', (present) => {
      this._hasFooter = present;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._observeBreakpoint();
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._closeDialog(false);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._observeBreakpoint();
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('_compact') && !this._compact) this._closeDialog(false);
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('_compact')) {
      this.toggleAttribute('data-compact', this._compact);
      this.dispatchEvent(new Event('sidebar-presentation-change'));
    }
    if (changed.has('open') || changed.has('_compact')) this._syncDialog();
  }

  requestOpen(open: boolean, trigger?: HTMLElement) {
    if (open && trigger) this._restoreFocusTarget = trigger;
    const event = new CustomEvent<DrawerToggleDetail>('drawer-toggle', {
      detail: { open },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!this.dispatchEvent(event)) {
      if (open) this._restoreFocusTarget = null;
      return;
    }
    if (this.controlled) return;
    this.open = open;
  }

  _observeBreakpoint() {
    if (
      typeof ResizeObserver === 'undefined' ||
      typeof HTMLDialogElement === 'undefined' ||
      !('showModal' in HTMLDialogElement.prototype)
    )
      return;
    const probe = this.renderRoot.querySelector<HTMLElement>('.sidebar__breakpoint');
    if (!probe || this._resizeObserver) return;
    this._resizeObserver = new ResizeObserver(([entry]) => {
      this._compact = Math.round(entry.contentRect.width) >= window.innerWidth;
    });
    this._resizeObserver.observe(probe);
  }

  _syncDialog() {
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>('dialog');
    if (!dialog) return;
    if (this._compact && this.open) {
      if (!dialog.open && typeof dialog.showModal === 'function') dialog.showModal();
      return;
    }
    if (dialog.open) this._closeDialog(true);
  }

  _closeDialog(restoreFocus: boolean) {
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>('dialog');
    if (!dialog?.open) return;
    if (!restoreFocus) this.focus({ preventScroll: true });
    dialog.close();
    if (restoreFocus) this._restoreFocus();
  }

  _restoreFocus() {
    const target = this._restoreFocusTarget;
    this._restoreFocusTarget = null;
    if (!target?.isConnected || target.matches(':disabled, [hidden], [inert]')) return;
    target.focus({ preventScroll: true });
  }

  _handleNativeCancel(event: Event) {
    event.preventDefault();
    this.requestOpen(false);
  }

  _handleNativeClose() {
    if (this.open) this.requestOpen(false);
  }

  _handlePointerDown(event: PointerEvent) {
    this._pointerStartedInside = event.target !== event.currentTarget;
  }

  _handleDialogClick(event: MouseEvent) {
    if (event.target !== event.currentTarget || this._pointerStartedInside) return;
    this.requestOpen(false);
  }

  _handleSlotChange() {
    this._headerPresence.refresh();
    this._contentPresence.refresh();
    this._footerPresence.refresh();
  }

  _accessibleText(attribute: 'aria-labelledby' | 'aria-describedby') {
    const ids = this.getAttribute(attribute)?.split(/\s+/).filter(Boolean) ?? [];
    const root = this.getRootNode() as ParentNode;
    return ids
      .map((id) => root.querySelector?.(`#${CSS.escape(id)}`)?.textContent?.trim())
      .filter(Boolean)
      .join(' ');
  }

  _aria() {
    const label = this.getAttribute('aria-label') || this._accessibleText('aria-labelledby');
    const description = this._accessibleText('aria-describedby');
    return { label: label || nothing, description: description || nothing };
  }

  _panelContent() {
    return html`
      <header part="header" class="sidebar__header" ?hidden=${!this._hasHeader}>
        <slot name="header" @slotchange=${this._handleSlotChange}></slot>
      </header>
      <div part="content" class="sidebar__content" ?hidden=${!this._hasContent}>
        <slot name="content" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <footer part="footer" class="sidebar__footer" ?hidden=${!this._hasFooter}>
        <slot name="footer" @slotchange=${this._handleSlotChange}></slot>
      </footer>
    `;
  }

  render() {
    const { label, description } = this._aria();
    return html`
      <div class="sidebar__breakpoint" aria-hidden="true"></div>
      ${
        this._compact
          ? html`
              <dialog
                part="panel"
                class="sidebar__panel"
                aria-label=${label}
                aria-description=${description}
                @cancel=${this._handleNativeCancel}
                @close=${this._handleNativeClose}
                @pointerdown=${this._handlePointerDown}
                @click=${this._handleDialogClick}
              >
                ${this._panelContent()}
              </dialog>
            `
          : html`
              <aside
                part="panel"
                class="sidebar__panel"
                aria-label=${label}
                aria-description=${description}
              >
                ${this._panelContent()}
              </aside>
            `
      }
    `;
  }
}
