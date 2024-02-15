import { GrantCodesNotice } from './notice.component.js'

export * from './notice.component.js'
export default GrantCodesNotice

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-notice': GrantCodesNotice
  }
}
