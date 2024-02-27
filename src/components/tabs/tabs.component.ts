import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit'
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js'
import tabsStyles from './tabs.scss?inline'
import { GrantCodesTab } from './tab.component'
import './tabs-tab'
import './tabs-panel'
import { generateId } from '../../lib/generate-id'

@customElement('grantcodes-tabs')
export class GrantCodesTabs extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(tabsStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  // @property() label = 'Button Label'

  constructor() {
    super()

    this.id = generateId('tabs')
  }

  @property({ type: String })
  label: string = ''

  // get labeledBy(): string | null {
  //   if (this.label.startsWith('#')) {
  //     return this.label
  //   }
  //   return null
  // }

  @queryAssignedElements({ selector: 'grantcodes-tab' })
  tabs!: GrantCodesTab[]

  get activeTab() {
    return this.tabs.find((tab) => tab.active) ?? null
  }
  set activeTab(tab: GrantCodesTab | null) {
    // Ignore setting activeTab to null. As long as there are children, one tab
    // must be selected.
    this.tabs.map((t) => (t.active = t === tab))
    if (tab) {
      // this.activateTab(tab);
    }
    this.requestUpdate()
  }

  firstUpdated(): void {
    this.requestUpdate()
    if (!this.activeTab) {
      this.activeTab = this.tabs[0]
    }
  }

  // TODO: Should be able to use arrow keys to browse tabs.

  render() {
    return html`
      <div class="tabs" id="${this.id}">
        <div role="tablist" class="tabs__tablist" aria-label=${this.label}>
          <div class="tabs__tablist__inner">
            ${this.tabs.map(
              (tab, i) =>
                html`<grantcodes-tabs-tab
                  containerId="${this.id}"
                  label="${tab.label}"
                  index="${i}"
                  ?active=${tab.active}
                  @click=${() => (this.activeTab = tab)}
                ></grantcodes-tabs-tab>`
            )}
          </div>
        </div>

        <div class="tabs__panels">
          ${this.tabs.map(
            (tab, i) =>
              html`<grantcodes-tabs-panel
                containerId="${this.id}"
                label="${tab.label}"
                index="${i}"
                ?active=${tab.active}
                >${tab.content}</grantcodes-tabs-panel
              >`
          )}
        </div>

        <slot></slot>
      </div>
    `
  }
}
