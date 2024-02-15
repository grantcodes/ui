import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { codeToHtml } from 'shiki'
import codePreviewStyles from './code-preview.scss?inline'

@customElement('grantcodes-code-preview')
export class GrantCodesCodePreview extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(codePreviewStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  // @property() label = 'Button Label'

  async render() {
    const code = this.innerHTML
    const codeHtml =
      (await codeToHtml(code, {
        lang: 'javascript',
        theme: 'vitesse-dark',
      })) ?? code
    console.log(codeHtml)

    return html`<div class="code-preview">${codeHtml}</div>`
  }
}
