import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import splitBarStyles from './split-bar.css' with { type: 'css' };
import { calculateSegments } from './split-bar.calculations.js';

export class GrantCodesSplitBar extends LitElement {
  static styles = [splitBarStyles];

  static properties = {
    /**
     * Relative segment weights as an array or JSON attribute.
     * @type {{ id: string, label: string, value: number, color?: string }[]}
     */
    segments: { type: Array },
  };

  constructor() {
    super();
    this.segments = [];
  }

  render() {
    const segments = calculateSegments(this.segments);

    return html`
      <div class="split-bar__bar" part="bar" aria-hidden="true">
        ${segments.map(
          ({ id, share, color }) => html`
            <span
              class="split-bar__segment"
              part="segment"
              style=${styleMap({
                '--split-bar-segment-share': `${share * 100}%`,
                '--split-bar-segment-color': color,
              })}
              data-segment-id=${id}
            ></span>
          `,
        )}
      </div>
      ${segments.length
        ? html`
            <ul class="split-bar__legend" part="legend" role="list">
              ${segments.map(
                ({ id, label, color, percentage }) => html`
                  <li class="split-bar__legend-item" data-segment-id=${id}>
                    <span
                      class="split-bar__swatch"
                      style=${styleMap({ '--split-bar-segment-color': color })}
                      aria-hidden="true"
                    ></span>
                    <span class="split-bar__percentage">${percentage}%</span>
                    <span class="split-bar__label">${label}</span>
                  </li>
                `)}
            </ul>
          `
        : null}
    `;
  }
}
