import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit'
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js'
import formFieldStyles from './form-field.scss?inline'
import cx from 'classnames'
import { generateId } from '../../lib/generate-id'

@customElement('grantcodes-form-field')
export class GrantCodesFormField extends LitElement {
  static formAssociated = true
  static styles = [unsafeCSS(formFieldStyles)]

  @property({ type: String })
  label: string = ''

  @property({ type: String })
  error?: string

  @property({ type: String })
  help?: string

  inlineInput: boolean = false
  groupInput: boolean = false

  get errorId() {
    return `${this.id}-error`
  }

  get helpId() {
    return `${this.id}-help`
  }

  get ariaDescribedBy() {
    const ids = []
    if (this.error) {
      ids.push(this.errorId)
    }
    if (this.help) {
      ids.push(this.helpId)
    }
    return ids.join(' ')
  }

  @queryAssignedElements({ selector: 'input, select, textarea' })
  inputElements!: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >

  @queryAssignedElements({ selector: 'grantcodes-form-field' })
  nestedFields!: NodeListOf<GrantCodesFormField>

  constructor() {
    super()
    if (!this.id) {
      this.id = generateId('form-field')
    }
  }

  protected firstUpdated(): void {
    const input = this.inputElements[0]

    if (this.nestedFields.length > 0) {
      this.groupInput = true
      this.requestUpdate()
    }

    if (!input) {
      return
    }

    input.id = this.id
    input.setAttribute('aria-describedby', this.ariaDescribedBy)

    if (input.type === 'checkbox' || input.type === 'radio') {
      this.inlineInput = true
      this.requestUpdate()
    }
  }

  private handleLabelClick() {
    const input = this.inputElements[0]
    if (input) {
      input.focus()
      if (
        input instanceof HTMLInputElement &&
        (input.type === 'checkbox' || input.type === 'radio')
      ) {
        input.checked = !input.checked
      }
    }
  }

  // private handleError() {
  //   if (this.error) {
  //     const input = this.inputElements[0]
  //     if (input) {
  //       if (this.help) {
  //         input.setAttribute('aria-describedby', `${this.errorId} ${this.helpId}`)
  //       } else {
  //         input.setAttribute('aria-describedby', this.errorId)
  //       }
  //     }
  //   }
  // }

  errorTemplate() {
    if (!this.error) {
      return ''
    }

    return html`
      <p class="form-field__error" id=${this.errorId}>Error: ${this.error}</p>
    `
  }

  helpTemplate() {
    if (!this.help) {
      return ''
    }

    return html`
      <span class="form-field__help" id=${this.helpId}>${this.help}</span>
    `
  }

  groupTemplate({ className }: { className: string }) {
    return html`
      <fieldset class="${className}">
        <legend class="form-field__label">${this.label}</legend>
        <slot></slot>
        ${this.errorTemplate()}
      </fieldset>
    `
  }

  render() {
    const elementClass = cx('form-field', {
      'form-field--inline': this.inlineInput,
    })

    if (this.groupInput) {
      return this.groupTemplate({ className: elementClass })
    }

    return html`
      <div class="${elementClass}">
        <label>
          <span class="form-field__label" @click=${this.handleLabelClick}
            >${this.label}</span
          >
          ${this.helpTemplate()}
          <slot></slot>
        </label>
        ${this.errorTemplate()}
      </div>
    `
  }
}
