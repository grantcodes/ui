import { GrantCodesCard } from './card.component.js'

export * from './card.component.js'
export default GrantCodesCard

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-card': GrantCodesCard
  }
}
