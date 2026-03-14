import { css } from "lit";

export const statsStyles = css`
  :host {
    display: block;
  }

  .stats {
    padding-block: var(--g-theme-spacing-3xl);
    padding-inline: var(--g-theme-spacing-md);
    background: var(--g-theme-color-background-subtle);
  }

  .stats__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .stats__title {
    margin: 0 0 var(--g-theme-spacing-xl);
    font-size: var(--g-theme-typography-headline-sm-font-size);
    font-weight: var(--g-theme-typography-headline-sm-font-weight);
    text-align: center;
    color: var(--g-theme-color-content-default);
  }

  .stats__grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 4), 1fr);
    gap: var(--g-theme-spacing-xl);
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }

  @media (max-width: 640px) {
    .stats__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .stats__item {
    display: flex;
    flex-direction: column;
    gap: var(--g-theme-spacing-xs);
  }

  .stats__value {
    font: var(--g-theme-typography-display-default);
    white-space: nowrap;
    line-height: 1;
    color: var(--g-theme-color-content-brand, #7c3aed);
  }

  .stats__label {
    font-size: var(--g-theme-typography-label-default-font-size);
    font-weight: var(--g-theme-typography-label-default-font-weight);
    color: var(--g-theme-color-content-default);
  }

  .stats__context {
    font-size: var(--g-theme-typography-body-sm-font-size);
    color: var(--g-theme-color-content-secondary);
  }
`;
