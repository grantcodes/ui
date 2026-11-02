import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import linkStyles from '../../css/elements/a.css' with { type: 'css' };
import focusRingStyles from '../../lib/styles/focus-ring.css' with { type: 'css' };
import breadcrumbStyles from './breadcrumb.css' with { type: 'css' };

export class GrantCodesBreadcrumb extends LitElement {
  declare separator: string;

  static styles = [focusRingStyles, breadcrumbStyles];

  static properties = {
    separator: { type: String },
  };

  constructor() {
    super();

    /**
     * Custom separator between breadcrumb items
     * @type {string}
     */
    this.separator = '/';
  }

  render() {
    return html`
			<nav aria-label="Breadcrumb" class="breadcrumb">
				<ol
					class="breadcrumb__list"
					style="--component-breadcrumb-separator: ${JSON.stringify(this.separator ?? '/')}"
				>
					<slot></slot>
				</ol>
			</nav>
		`;
  }
}

export class GrantCodesBreadcrumbItem extends LitElement {
  declare current: boolean;
  declare href: string;

  static styles = [linkStyles, focusRingStyles, breadcrumbStyles];

  static properties = {
    href: { type: String },
    current: { type: Boolean },
  };

  constructor() {
    super();

    /**
     * URL for the breadcrumb item
     * @type {string}
     */
    this.href = '';

    /**
     * Whether this is the current page
     * @type {boolean}
     */
    this.current = false;
  }

  render() {
    const content =
      this.href && !this.current
        ? html`<a href="${this.href}" class="breadcrumb__link focus-ring"><slot></slot></a>`
        : html`<span class="breadcrumb__text"><slot></slot></span>`;

    return html`
			<li class="breadcrumb__item" ?data-current=${this.current}>
				${content}
			</li>
		`;
  }
}
