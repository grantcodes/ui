import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import cx from 'classnames'
import noticeStyles from './notice.scss?inline'
import { GrantCodesIcon } from '../icon/icon.component.js'
import { AlertCircle, Info, CheckCircle2, XCircle, X } from '../../icons.js'

type NoticeVariant = 'info' | 'success' | 'warning' | 'error'

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
}

@customElement('grantcodes-notice')
export class GrantCodesNotice extends LitElement {
  static dependencies = { 'grancodes-icon': GrantCodesIcon }
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(noticeStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  // @property() label = 'Button Label'
  /**
   * The style of the notice
   */
  @property()
  variant: NoticeVariant = 'info'

  /**
   * A title for the notice
   */
  @property()
  title: string = ''

  /**
   * What to do when the notice is dismissed.
   *
   * @returns
   */
  @property()
  onDismiss?: () => void

  render() {
    const icon = ICONS[this.variant]

    return html`
      <aside class="${cx('notice', `notice--${this.variant}`)}">
        <!-- <Icon icon="{iconEl}" class="notice__icon" /> -->
        <grantcodes-icon icon="${icon}" class="notice__icon"></grantcodes-icon>

        <div class="notice__content">
          ${this.title && html` <h2 class="notice__title">${this.title}</h2> `}
          <p><slot></slot></p>
        </div>

        ${this.onDismiss &&
        html`
          <button class="notice__close">
            <grantcodes-icon icon="${X}" title="Close Notice"></grantcodes-icon>
          </button>
        `}
      </aside>
    `
  }
}
