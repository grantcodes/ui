import { LitElement, type PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import { GrantCodesMenuToggle } from '../menu-toggle/menu-toggle.component.js';
import type { GrantCodesSidebar } from './sidebar.component.js';
import sidebarToggleStyles from './sidebar-toggle.css' with { type: 'css' };

const CONTROL_SELECTOR = 'button, grantcodes-button:not([href])';

type ControlState = {
  controls: string | null;
  expanded: string | null;
  element: HTMLElement;
};

export class GrantCodesSidebarToggle extends LitElement {
  declare _controlState: ControlState | null;
  declare _observer: MutationObserver | undefined;
  declare _onPresentationChange: () => void;
  declare _rootObserver: MutationObserver | undefined;
  declare _sidebar: GrantCodesSidebar | null;
  declare for: string;

  static styles = [sidebarToggleStyles];

  static properties = {
    for: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.for = '';
    this._sidebar = null;
    this._controlState = null;
    this._handleClick = this._handleClick.bind(this);
    this._onPresentationChange = () => this._syncControl();
  }

  connectedCallback() {
    super.connectedCallback();
    if (window.MutationObserver) {
      this._rootObserver = new window.MutationObserver(() => this._syncSidebar());
      this._rootObserver.observe(this.getRootNode(), { childList: true, subtree: true });
    }
    this._syncSidebar();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    this._rootObserver?.disconnect();
    this._sidebar?.removeEventListener('sidebar-presentation-change', this._onPresentationChange);
    this._restoreControl();
    this._sidebar = null;
    super.disconnectedCallback();
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('for')) this._syncSidebar();
  }

  _findSidebar() {
    if (!this.for) return null;
    const root = this.getRootNode() as ParentNode;
    const id = globalThis.CSS?.escape?.(this.for) ?? this.for;
    return root.querySelector<GrantCodesSidebar>(`grantcodes-sidebar#${id}`);
  }

  _syncSidebar() {
    const sidebar = this._findSidebar();
    if (sidebar === this._sidebar) {
      this._syncControl();
      return;
    }
    this._observer?.disconnect();
    this._sidebar?.removeEventListener('sidebar-presentation-change', this._onPresentationChange);
    this._restoreControl();
    this._sidebar = sidebar;
    if (!sidebar) {
      this.hidden = true;
      return;
    }
    if (window.MutationObserver) {
      this._observer = new window.MutationObserver(() => this._syncControl());
      this._observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['open', 'data-compact'],
      });
    }
    sidebar.addEventListener('sidebar-presentation-change', this._onPresentationChange);
    this._syncControl();
  }

  _findControl() {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>('slot');
    if (slot?.assignedNodes().length) {
      return slot.assignedElements({ flatten: true })
        .find((element): element is HTMLElement => element.matches(CONTROL_SELECTOR));
    }
    return this.renderRoot.querySelector<GrantCodesMenuToggle>('grantcodes-menu-toggle');
  }

  _restoreControl() {
    const state = this._controlState;
    if (!state) return;
    state.element.removeEventListener('click', this._handleClick);
    if (state.element instanceof GrantCodesMenuToggle) {
      state.element.expanded = false;
      state.element.controlsElement = null;
    }
    if (state.controls === null) state.element.removeAttribute('aria-controls');
    else state.element.setAttribute('aria-controls', state.controls);
    if (state.expanded === null) state.element.removeAttribute('aria-expanded');
    else state.element.setAttribute('aria-expanded', state.expanded);
    this._controlState = null;
  }

  _syncControl() {
    const control = this._findControl();
    if (this._controlState?.element !== control) this._restoreControl();
    if (!control || !this._sidebar) {
      this.hidden = true;
      return;
    }
    if (!this._controlState) {
      this._controlState = {
        element: control,
        controls: control.getAttribute('aria-controls'),
        expanded: control.getAttribute('aria-expanded'),
      };
    }
    control.addEventListener('click', this._handleClick);
    if (control instanceof GrantCodesMenuToggle) {
      control.expanded = this._sidebar.open;
      control.controlsElement = this._sidebar;
    } else {
      control.setAttribute('aria-controls', this._sidebar.id);
      control.setAttribute('aria-expanded', String(this._sidebar.open));
    }
    this.hidden = !this._sidebar.hasAttribute('data-compact');
  }

  _handleSlotChange() {
    this._syncControl();
  }

  _handleClick() {
    const control = this._findControl();
    if (!control) return;
    if (control.matches(':disabled') || ('disabled' in control && Boolean(control.disabled)))
      return;
    this._sidebar?.requestOpen(!this._sidebar.open, control);
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}>
      <grantcodes-menu-toggle></grantcodes-menu-toggle>
    </slot>`;
  }
}
