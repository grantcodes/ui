import { GrantCodesDialog } from './dialog.component.js'

export * from './dialog.component.js'
export default GrantCodesDialog

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-dialog': GrantCodesDialog
  }
}
