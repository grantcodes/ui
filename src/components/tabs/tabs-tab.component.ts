import { GrantCodesTabsItem } from './tabs-item.component'
import { html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import tabsStyles from './tabs.scss?inline'

@customElement('grantcodes-tabs-tab')
export class GrantCodesTabsTab extends GrantCodesTabsItem {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(tabsStyles)]

  render() {
    return html`
      <button
        id="${this.tabId}"
        type="button"
        role="tab"
        ?aria-selected=${this.active}
        aria-controls="${this.panelId}"
        class="tabs__tab ${this.active ? 'is-active' : ''}"
      >
        <span>${this.label}</span>
      </button>
    `
  }
}
