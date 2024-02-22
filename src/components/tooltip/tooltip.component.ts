import { LitElement, html, unsafeCSS } from 'lit'
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from 'lit/decorators.js'
import tooltipStyles from './tooltip.scss?inline'

@customElement('grantcodes-tooltip')
export class GrantCodesTooltip extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(tooltipStyles)]

  /**
   * Label for the tooltip, used when the tooltip is the main label for the item.
   */
  @property({ type: String })
  label = ''

  /**
   * Description for the tooltip, used when the tooltip is additional descriptive text for the item.
   */
  @property({ type: String })
  description = ''

  get id(): string {
    return 'tooltip'
  }

  @queryAssignedElements({ selector: '*' })
  slotted!: HTMLElement[]

  firstUpdated(): void {
    const labeledElement = this.slotted?.[0]
    if (labeledElement) {
      if (this.label) {
        labeledElement.setAttribute('aria-labelledby', this.id)
      } else if (this.description) {
        labeledElement.setAttribute('aria-describedby', this.id)
      }
    }
  }

  render() {
    if (this.label && this.description) {
      throw new Error('You cannot provide both a label and a description')
    }

    return html`
      <div class="tooltip">
        <div class="tooltip__slot">
          <slot></slot>
        </div>
        <p id="${this.id}" class="tooltip__content" role="tooltip">
          ${this.label || this.description}
        </p>
      </div>
    `
  }
}
