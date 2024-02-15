import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import cx from 'classnames'
import dropzoneStyles from './dropzone.scss?inline'

@customElement('grantcodes-dropzone')
export class GrantCodesDropzone extends LitElement {
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [unsafeCSS(dropzoneStyles)]

  // Define reactive properties--updating a reactive property causes
  // the component to update.
  @property({ type: Boolean, reflect: true })
  fullscreenOnDrag: boolean = false

  @property({ type: String })
  accept: string = '*'

  @property({ type: Boolean })
  multiple: boolean = false

  @property({ type: Function })
  onFiles: Function | null = null

  @state()
  private _fullscreen: boolean = false

  private _enableFullscreen = () => {
    if (this.fullscreenOnDrag) {
      this._fullscreen = true
    }
  }

  private _disableFullscreen = () => {
    this._fullscreen = false
  }

  private _handleChange = (e: InputEvent): boolean => {
    const copy = Reflect.construct(e.constructor, [e.type, e])
    const dispatched = this.dispatchEvent(copy)

    if (!dispatched) {
      e.preventDefault()
    }

    return dispatched
  }

  connectedCallback(): void {
    super.connectedCallback()
    window.addEventListener('dragenter', this._enableFullscreen)
    window.addEventListener('dragend', this._disableFullscreen)
  }

  disconnectedCallback(): void {
    window.removeEventListener('dragenter', this._enableFullscreen)
    window.removeEventListener('dragend', this._disableFullscreen)
    super.disconnectedCallback()
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
        <input
          type="file"
          class="dropzone__input"
          @change=${this._handleChange}
          accept=${this.accept}
          ?multiple=${this.multiple}
        />
      </div>
    `
  }
}
