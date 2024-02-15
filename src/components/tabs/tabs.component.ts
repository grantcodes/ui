import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import tabsStyles from './tabs.scss?inline'

@customElement('grantcodes-tabs')
export class GrantCodesTabs extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(tabsStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  // @property() label = 'Button Label'

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `
  }
}
