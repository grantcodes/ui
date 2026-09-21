import { LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit/static-html.js';
import focusRingStyles from '../../../lib/styles/focus-ring.css' with { type: 'css' };
import tabsStyles from '../tabs.css' with { type: 'css' };
import { GrantCodesTabsItem } from './tabs-item.component.js';

export class GrantCodesTabsButton extends GrantCodesTabsItem {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = [focusRingStyles, tabsStyles];

  render() {
    return html`
			<button
				id="${this.buttonId}"
				type="button"
				role="tab"
				aria-selected=${this.active}
				aria-controls="${this.panelId}"
				tabindex=${ifDefined(this.active ? undefined : '-1')}
				class="tabs__tab focus-ring ${this.active ? 'is-active' : ''}"
			>
				<span>${this.label}</span>
			</button>
		`;
  }
}
