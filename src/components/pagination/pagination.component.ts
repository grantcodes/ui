import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import paginationStyles from './pagination.scss?inline'
import { GrantCodesButton } from '../button/button.component.js'

@customElement('grantcodes-pagination')
export class GrantCodesPagination extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(paginationStyles)]

  static dependencies = { 'grantcodes-button': GrantCodesButton }

  @property({ attribute: 'previous-href' })
  previousHref?: string

  @property({ attribute: 'next-href' })
  nextHref?: string

  render() {
    const nextButton = this.nextHref
      ? html`<grantcodes-button href=${this.nextHref}>Next</grantcodes-button>`
      : ''
    const previousButton = this.previousHref
      ? html`<grantcodes-button href=${this.previousHref}
          >Previous</grantcodes-button
        >`
      : ''

    return html`
      <nav class="pagination" aria-label="Pagination navigation">
        ${previousButton} ${nextButton}
      </nav>
    `
  }
}
