import { LitElement, html, unsafeCSS } from 'lit'
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from 'lit/decorators.js'
import cx from 'classnames'
import dropzoneStyles from './dropzone.scss?inline'

@customElement('grantcodes-dropzone')
export class GrantCodesDropzone extends LitElement {
  static styles = [unsafeCSS(dropzoneStyles)]

  @property({ type: Boolean, reflect: true })
  fullscreenOnDrag: boolean = false

  @queryAssignedElements({ selector: 'input[type=file]' })
  _input!: HTMLInputElement[]

  @state()
  private _fullscreen: boolean = false

  @state()
  private _placeholder: string | undefined

  private _enableFullscreen = () => {
    if (this.fullscreenOnDrag) {
      this._fullscreen = true
    }
  }

  // TODO: Can freeze in fullscreen if starting dragging then cancel.
  private _disableFullscreen = () => {
    this._fullscreen = false
  }

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('dragenter', this._enableFullscreen)
    document.addEventListener('dragend', this._disableFullscreen)
  }

  disconnectedCallback(): void {
    document.removeEventListener('dragenter', this._enableFullscreen)
    document.removeEventListener('dragend', this._disableFullscreen)
    super.disconnectedCallback()
  }

  firstUpdated(): void {
    if (this._input.length === 0) {
      throw new Error('No file input found')
    }
    this._placeholder = this._input[0].placeholder
  }

  render() {
    const dropzoneClass = cx('dropzone', {
      'dropzone--fullscreen': this._fullscreen,
    })

    return html`
      <div
        class=${dropzoneClass}
        @mouseLeave=${this._disableFullscreen}
        @dragEnd=${this._disableFullscreen}
        @dragLeave=${this._disableFullscreen}
      >
        <slot></slot>
        <span class="dropzone__placeholder">${this._placeholder}</span>
      </div>
    `
  }
}
