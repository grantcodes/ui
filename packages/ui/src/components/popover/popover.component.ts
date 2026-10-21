import { LitElement, type PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import { generateId } from '../../lib/generate-id.js';
import { startViewTransition } from '../../lib/view-transition.js';
import popoverStyles from './popover.css' with { type: 'css' };

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

type TriggerState = {
  expanded: string | null;
  element: HTMLElement;
};

const PLACEMENTS = new Set<Placement>(['bottom-start', 'bottom-end', 'top-start', 'top-end']);
const INTERACTIVE_SELECTOR =
  'button, a[href], input, select, textarea, [contenteditable="true"], [tabindex]';

export class GrantCodesPopover extends LitElement {
  static styles = [popoverStyles];

  static properties = {
    open: { type: Boolean, reflect: true, noAccessor: true },
    placement: { type: String },
  };

  private _open = false;
  private _openScheduled = false;
  private _pendingFocusReturn = false;
  private _pendingOpen: boolean | null = null;
  private _triggerState: TriggerState | null = null;
  private _viewTransitionName = generateId('popover-vt');

  /** Whether the panel is visible. */
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._requestOpen(Boolean(value));
  }

  /** Where the panel is positioned relative to its trigger. */
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';

  constructor() {
    super();
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleTriggerClick);
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this._handleTriggerClick);
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeydown);
    this._openScheduled = false;
    this._pendingOpen = null;
    this._pendingFocusReturn = false;
    this._restoreTrigger();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.style.setProperty('--popover-anchor', `--popover-anchor-${generateId('')}`);
    this.style.setProperty('--popover-vt-name', this._viewTransitionName);
    this._syncTrigger();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('placement') && !PLACEMENTS.has(this.placement)) {
      this.placement = 'bottom-start';
    }
    this._syncTrigger();
  }

  private _requestOpen(open: boolean, returnFocus = false): void {
    this._pendingOpen = open;
    this._pendingFocusReturn = returnFocus;
    if (this._openScheduled) return;

    this._openScheduled = true;
    queueMicrotask(() => {
      if (!this.isConnected) return;
      startViewTransition(() => this._commitOpen());
    });
  }

  private async _commitOpen(): Promise<void> {
    if (!this.isConnected) return;
    const open = this._pendingOpen;
    const returnFocus = this._pendingFocusReturn;
    this._pendingOpen = null;
    this._pendingFocusReturn = false;
    this._openScheduled = false;
    if (open === null || open === this._open) return;

    const previousOpen = this._open;
    this._open = open;
    this.requestUpdate('open', previousOpen);
    await this.updateComplete;
    if (!this.isConnected || this._open !== open) return;

    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open },
        bubbles: true,
        composed: true,
      }),
    );

    if (open) {
      this._focusPanel();
    } else if (returnFocus || this._shouldRestoreFocus()) {
      this._triggerState?.element.focus();
    }
  }

  private _handleTriggerClick(event: Event): void {
    const trigger = this._syncTrigger();
    if (!trigger || this._isDisabled(trigger)) return;
    if (!event.composedPath().includes(trigger) && !trigger.contains(event.target as Node)) return;
    this._requestOpen(!(this._pendingOpen ?? this._open));
  }

  private _handleDocumentClick(event: Event): void {
    if (!(this._pendingOpen ?? this._open) || event.composedPath().includes(this)) return;
    this._requestOpen(false, this._shouldRestoreFocus());
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || event.defaultPrevented || !(this._pendingOpen ?? this._open))
      return;
    const panel = this.renderRoot.querySelector<HTMLElement>('.popover__panel');
    if (!panel || (!event.composedPath().includes(this) && !panel.contains(event.target as Node)))
      return;
    event.preventDefault();
    event.stopPropagation();
    this._requestOpen(false, true);
  }

  private _handleTriggerSlotChange(): void {
    this._syncTrigger();
  }

  private _syncTrigger(): HTMLElement | null {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const trigger = this._findControl(slot?.assignedElements({ flatten: true })[0]);
    if (this._triggerState?.element === trigger) {
      trigger?.setAttribute('aria-expanded', String(this._open));
      return trigger;
    }

    this._restoreTrigger();
    if (!trigger) return null;
    this._triggerState = { element: trigger, expanded: trigger.getAttribute('aria-expanded') };
    trigger.setAttribute('aria-expanded', String(this._open));
    return trigger;
  }

  private _restoreTrigger(): void {
    const state = this._triggerState;
    if (!state) return;
    if (state.expanded === null) {
      state.element.removeAttribute('aria-expanded');
    } else {
      state.element.setAttribute('aria-expanded', state.expanded);
    }
    this._triggerState = null;
  }

  private _findControl(element: Element | undefined): HTMLElement | null {
    if (!(element instanceof HTMLElement)) return null;
    if (element.matches(INTERACTIVE_SELECTOR)) return element;
    return element.shadowRoot?.querySelector<HTMLElement>(INTERACTIVE_SELECTOR) ?? null;
  }

  private _focusPanel(): void {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot:not([name])');
    const control = (slot?.assignedElements({ flatten: true }) ?? [])
      .flatMap((element) => this._controlsIn(element))
      .find((element) => this._isFocusable(element));
    (control ?? this.renderRoot.querySelector<HTMLElement>('.popover__panel'))?.focus();
  }

  private _controlsIn(element: Element): HTMLElement[] {
    const controls: HTMLElement[] = [];
    const visit = (node: Element): void => {
      if (node instanceof HTMLElement && node.matches(INTERACTIVE_SELECTOR)) controls.push(node);
      for (const child of node.children) visit(child);
      if (node.shadowRoot) {
        for (const child of node.shadowRoot.children) visit(child);
      }
    };
    visit(element);
    return controls;
  }

  private _isFocusable(element: HTMLElement): boolean {
    return (
      !this._isDisabled(element) && !element.closest('[hidden], [inert]') && element.tabIndex >= 0
    );
  }

  private _isDisabled(element: HTMLElement): boolean {
    return (
      element.matches(':disabled') ||
      ('disabled' in element && Boolean((element as HTMLButtonElement).disabled))
    );
  }

  private _shouldRestoreFocus(): boolean {
    const activeElement =
      (this.getRootNode() as Document | ShadowRoot).activeElement ?? document.activeElement;
    const panel = this.renderRoot.querySelector<HTMLElement>('.popover__panel');
    return Boolean(
      activeElement &&
        (this.contains(activeElement as Node) || panel?.contains(activeElement as Node)),
    );
  }

  render() {
    const placement = PLACEMENTS.has(this.placement) ? this.placement : 'bottom-start';
    return html`
      <div class="popover">
        <div class="popover__trigger">
          <slot name="trigger" @slotchange=${this._handleTriggerSlotChange}></slot>
        </div>
        <div
          class="popover__panel popover__panel--${placement}"
          part="panel"
          tabindex="-1"
          ?hidden=${!this._open}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
