import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import paginationStyles from './pagination.css' with { type: 'css' };
import '../button/button.js';

export class GrantCodesPagination extends LitElement {
  declare nextHref: string;
  declare page: number;
  declare pages: number;
  declare previousHref: string;

  static styles = [paginationStyles];

  static properties = {
    previousHref: { attribute: 'previous-href' },
    nextHref: { attribute: 'next-href' },
    page: { type: Number },
    pages: { type: Number },
  };

  constructor() {
    super();

    this.previousHref = '';
    this.nextHref = '';
    this.page = 1;
    this.pages = 1;
  }

  render() {
    return html`
      <nav class="pagination" aria-label="Pagination navigation">
        ${
          this.previousHref
            ? html`<grantcodes-button class="pagination__previous" href=${this.previousHref}>Previous</grantcodes-button>`
            : nothing
        }
        ${
          this.nextHref
            ? html`<grantcodes-button class="pagination__next" href=${this.nextHref}>Next</grantcodes-button>`
            : nothing
        }
      </nav>
    `;
  }
}
