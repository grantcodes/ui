import { GrantCodesTabsItem } from './tabs-item.component'
import { html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import tabsStyles from './tabs.scss?inline'

@customElement('grantcodes-tabs-panel')
export class GrantCodesTabsPanel extends GrantCodesTabsItem {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(tabsStyles)]

  render() {
    return html`
      <div
        id="${this.panelId}"
        role="tabpanel"
        aria-labelledby="${this.tabId}"
        class="tabs__panel ${this.active ? 'is-active' : ''}"
      >
        <slot></slot>
      </div>
    `
  }
}
