import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import cx from 'classnames'
import containerStyles from './container.scss?inline'

type ContainerAlign = 'default' | 'wide' | 'full' | 'viewport'

@customElement('grantcodes-container')
export class GrantCodesContainer extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(containerStyles)]

  @property()
  align: ContainerAlign = 'default'

  @property({ type: Boolean })
  nopad: boolean = false

  render() {
    const containerClass = cx('container', {
      'container--wide': this.align === 'wide',
      'container--full': this.align === 'full',
      'container--viewport': this.align === 'viewport',
      'container--nopad': this.nopad === true,
    })

    return html`
      <div class="${containerClass}">
        <slot></slot>
      </div>
    `
  }
}
