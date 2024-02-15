import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import loadingStyles from './loading.scss?inline'

@customElement('grantcodes-loading')
export class GrantCodesLoading extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(loadingStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.

  render() {
    return html`
      <span class="loading">
        <slot></slot>
      </span>
    `
  }
}
