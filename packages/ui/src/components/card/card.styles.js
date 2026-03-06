import { css } from "lit";

export const cardStyles = css`
  /* Inlined component-base mixin */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
    /* Enable container queries for responsive card layouts */
    container-type: inline-size;
    container-name: card;
  }

  .card {
    display: flex;
    inline-size: 100%;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    background: var(--g-theme-color-background-default);
    border-style: solid;
    border-width: var(--g-theme-border-width-sm);
    border-color: var(--g-theme-color-border-default);
    border-radius: var(--g-theme-border-radius-md);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      0 1px 2px rgba(0, 0, 0, 0.24);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.08),
      0 6px 12px rgba(0, 0, 0, 0.04);
  }

  /* Image support - images in header or content will be styled appropriately */
  .card__header img,
  .card__content img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: inherit;
  }

  .card__header {
    padding-inline: 1rem;
    padding-block: calc(1rem * 0.75);
    border-block-end: 1px solid var(--g-theme-color-border-default);
  }

  .card__header ::slotted(*) {
    margin: 0;
    font-weight: 600;
    font-size: var(--g-typography-font-size-24);
  }

  .card__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    padding-block: 1rem;
    padding-inline: 1rem;
  }

  .card__content > * {
    margin: 0;
  }

  .card__footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: calc(1rem * 0.5);
    border-block-start: 1px solid var(--g-theme-color-border-default);
    background: var(--g-theme-color-background-default);
  }

  .card__footer ::slotted(grantcodes-button-group) {
    width: 100%;
    justify-content: flex-end;
  }

  .card__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0;
    padding-inline: 1rem;
    padding-block: 1em;
    font-size: var(--g-typography-font-size-14);
    /* Use color-mix() for modern color manipulation */
    background-color: color-mix(
      in srgb,
      var(--g-theme-color-background-default) 90%,
      var(--g-color-brand-purple-500) 10%
    );
    color: var(--g-theme-color-content-default);
  }

  .card__meta__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.3em;
  }

  .card__meta__item dt,
  .card__meta__item dd {
    display: block;
    margin: 0;
    padding: 0;
  }

  .card__meta__item dt::after {
    content: ":";
  }
`;
