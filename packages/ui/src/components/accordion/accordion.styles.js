import { css } from "lit";
import { focusRingStyles } from "../../lib/styles/focus-ring.styles.js";

export const accordionStyles = css`
  ${focusRingStyles}

  :host {
    display: block;
  }

  .accordion {
    display: flex;
    flex-direction: column;
    gap: var(--g-theme-spacing-sm);
  }

  .accordion__item {
    border: 1px solid var(--g-theme-color-border-default);
    border-radius: var(--g-theme-border-radius-md, 0.5rem);
    height: 3.5rem;
    transition: height 0.25s;
  }

  .accordion__item[open] {
    height: auto;
    overflow: clip;
  }

  .accordion__summary {
    padding: var(--g-theme-spacing-md);
    cursor: pointer;
    background: var(--g-theme-color-background-subtle);
    border: var(--g-theme-border-width-md) solid
      var(--g-theme-color-border-subtle);
    border-radius: var(--g-theme-border-radius-md);
    font-weight: var(--g-typography-font-weight-500);
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-property: background-color, outline-width, outline-color;
  }

  .accordion__summary:hover {
    background: var(--g-theme-color-background-subtle-hover);
  }

  .accordion__summary::-webkit-details-marker {
    display: none;
  }

  .accordion__summary::after {
    content: "+";
    font: var(--g-theme-typography-title-default);
    line-height: 1;
  }

  .accordion__item[open] .accordion__summary::after {
    content: "-";
  }

  .accordion__content {
    padding: var(--g-theme-spacing-md);
    background: var(--g-theme-color-background-default);
  }
`;
