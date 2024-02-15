import { GrantCodesDropzone } from './dropzone.component.js'

export * from './dropzone.component.js'
export default GrantCodesDropzone

declare global {
  interface HTMLElementTagNameMap {
    'grantcodes-dropzone': GrantCodesDropzone
  }
}
