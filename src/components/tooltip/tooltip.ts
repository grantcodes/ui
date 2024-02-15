import { GrantCodesTooltip } from './tooltip.component.js'

export * from './tooltip.component.js'
export default GrantCodesTooltip

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-tooltip': GrantCodesTooltip
  }
}
