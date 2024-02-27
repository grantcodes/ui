import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'

export class GrantCodesTabsItem extends LitElement {
  @property({ type: Boolean })
  active: Boolean = false

  @property({ type: String })
  label: String = ''

  @property({ type: Number })
  index: Number = -1

  @property({ type: String })
  containerId: String = ''

  @property({ type: String })
  get tabId() {
    return (
      `${this.containerId}-tab-` + this.label.toLowerCase().replace(' ', '-')
    )
  }

  @property({ type: String })
  get panelId() {
    return (
      `${this.containerId}-panel-` + this.label.toLowerCase().replace(' ', '-')
    )
  }

  @property({ type: String })
  get content() {
    return this.label
  }

  override render() {
    return html``
  }
}
