import { LitElement, type PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import popoverStyles from './popover.css' with { type: 'css' };

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const PLACEMENTS = new Set<Placement>(['bottom-start', 'bottom-end', 'top-start', 'top-end']);
const INTERACTIVE_SELECTOR =
  'button, a[href], input, select, textarea, [contenteditable="true"], [tabindex]';

export class GrantCodesPopover extends LitElement {
  static styles = [popoverStyles];

  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { type: String },
  };

  /** Whether the panel is visible. */
  declare open: boolean;

  /** Where the panel is positioned relative to its trigger. */
  declare placement: Placement;

  private _trigger: { element: HTMLElement; expanded: string | null } | null = null;

  constructor() {
    super();
    this.open = false;
    this.placement = 'bottom-start';
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleTriggerClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this._handleTriggerClick);
    this.removeEventListener('keydown', this._handleKeydown);
    this._restoreTrigger();
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues<this>): void {
    const trigger = this._syncTrigger();
    if (!changed.has('open') || (changed.get('open') ?? false) === this.open) return;

    const panel = this.renderRoot.querySelector<HTMLElement>('[part="panel"]');
    if (this.open) {
      panel?.showPopover?.({ source: trigger ?? undefined });
    } else {
      panel?.hidePopover?.();
    }

    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      }),
    );

    if (this.open) {
      this._focusPanel(panel);
    } else if (this.contains(document.activeElement)) {
      trigger?.focus();
    }
  }

  private _handleTriggerClick = (event: Event): void => {
    const trigger = this._syncTrigger();
    if (!trigger || this._isDisabled(trigger) || !event.composedPath().includes(trigger)) return;
    this.open = !this.open;
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || event.defaultPrevented || !this.open) return;
    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  };

  private _syncTrigger(): HTMLElement | null {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const slotted = slot?.assignedElements({ flatten: true })[0];
    const trigger =
      slotted instanceof HTMLElement && !slotted.matches(INTERACTIVE_SELECTOR)
        ? slotted.shadowRoot?.querySelector<HTMLElement>(INTERACTIVE_SELECTOR)
        : slotted;
    if (this._trigger?.element !== trigger) {
      this._restoreTrigger();
      if (trigger instanceof HTMLElement) {
        this._trigger = { element: trigger, expanded: trigger.getAttribute('aria-expanded') };
      }
    }
    this._trigger?.element.setAttribute('aria-expanded', String(this.open));
    return this._trigger?.element ?? null;
  }

  private _restoreTrigger(): void {
    if (!this._trigger) return;
    const { element, expanded } = this._trigger;
    if (expanded === null) element.removeAttribute('aria-expanded');
    else element.setAttribute('aria-expanded', expanded);
    this._trigger = null;
  }

  private _focusPanel(panel: HTMLElement | null): void {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot:not([name])');
    const controls: HTMLElement[] = [];
    const visit = (node: Element): void => {
      if (node instanceof HTMLElement && node.matches(INTERACTIVE_SELECTOR)) controls.push(node);
      for (const child of [...node.children, ...(node.shadowRoot?.children ?? [])]) visit(child);
    };
    slot?.assignedElements({ flatten: true }).forEach(visit);
    const control = controls.find(
      (element) =>
        !this._isDisabled(element) &&
        !element.closest('[hidden], [inert]') &&
        element.tabIndex >= 0,
    );
    (control ?? panel)?.focus();
  }

  private _isDisabled(element: HTMLElement): boolean {
    return element.matches(':disabled') || Boolean((element as HTMLButtonElement).disabled);
  }

  render() {
    const placement = PLACEMENTS.has(this.placement) ? this.placement : 'bottom-start';
    return html`
      <div class="popover">
        <div class="popover__trigger">
          <slot name="trigger" @slotchange=${this._syncTrigger}></slot>
        </div>
        <div
          class="popover__panel popover__panel--${placement}"
          part="panel"
          tabindex="-1"
          popover
          @toggle=${(event: ToggleEvent) => {
            this.open = event.newState === 'open';
          }}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
