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
    flex-grow: 1;
    /* Enable container queries for responsive card layouts */
    container-type: inline-size;
    container-name: card;
  }

  .card {
    display: flex;
    inline-size: 100%;
    min-block-size: 100%;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    background: var(--g-theme-color-background-default);
    border-style: solid;
    border-width: var(--g-theme-border-width-sm);
    border-color: var(--g-theme-color-border-default);
    border-radius: var(--g-theme-border-radius-md);
    box-shadow: var(--g-theme-box-shadow-md);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  /* Image support - images in header or content will be styled appropriately */
  .card__header img,
  .card__content img {
    display: block;
    inline-size: 100%;
    block-size: auto;
    border-radius: inherit;
  }

  .card__header {
    padding-inline: var(--g-theme-spacing-md);
    padding-block: var(--g-spacing-12);
    border-block-end: 1px solid var(--g-theme-color-border-default);
  }

  .card__header:has(> slot:empty) {
    display: none;
  }

  .card__header ::slotted(*) {
    margin: 0;
    font: var(--g-theme-typography-title-default);
  }

  .card__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--g-theme-spacing-md);
    padding-block: var(--g-theme-spacing-md);
    padding-inline: var(--g-theme-spacing-md);
  }

  .card__content:has(::slotted(:empty)) {
    display: none;
  }

  .card__content > * {
    margin: 0;
  }

  .card__footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--g-theme-spacing-sm);
    padding-inline: var(--g-theme-spacing-md);
    padding-block: var(--g-spacing-12);
    border-block-start: 1px solid var(--g-theme-color-border-default);
    background: var(--g-theme-color-background-default);
  }

  .card__footer:has(> slot:empty) {
    display: none;
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
    gap: var(--g-theme-spacing-md);
    margin: 0;
    padding-inline: var(--g-theme-spacing-md);
    padding-block: 1em;
    font-size: var(--g-theme-typography-meta-sm-font-size);
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

  :host(.is-clickable) .card {
    cursor: pointer;
  }

  :host(.is-clickable:hover) .card {
    transform: translateY(-2px);
    box-shadow: var(--g-theme-box-shadow-lg);
    border-color: var(--g-theme-color-border-default);
  }

  :host(.is-clickable:active) .card {
    transform: translateY(-1px);
    border-color: var(--g-theme-color-border-active);
  }
`;
