import { GrantCodesButton } from './button.component.js'

export * from './button.component.js'
export default GrantCodesButton

// GrantCodesButton.define('grantcodes-button')

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-button': GrantCodesButton
  }
}
