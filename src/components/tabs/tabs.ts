import { GrantCodesTabs } from './tabs.component.js'

export * from './tabs.component.js'
export default GrantCodesTabs

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-tabs': GrantCodesTabs
  }
}
