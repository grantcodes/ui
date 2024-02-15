import { GrantCodesAvatar } from './avatar.component.js'

export * from './avatar.component.js'
export default GrantCodesAvatar

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-avatar': GrantCodesAvatar
  }
}
