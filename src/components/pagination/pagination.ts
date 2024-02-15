import { GrantCodesPagination } from './pagination.component.js'

export * from './pagination.component.js'
export default GrantCodesPagination

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-pagination': GrantCodesPagination
  }
}
