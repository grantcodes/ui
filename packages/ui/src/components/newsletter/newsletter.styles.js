import { css } from "lit";

export const newsletterStyles = css`
  :host {
    display: block;
  }

  .newsletter {
    padding-block: var(--g-theme-spacing-3xl);
    padding-inline: var(--g-theme-spacing-md);
    background: var(--g-theme-color-background-brand-knockout, #7c3aed);
    text-align: center;
  }

  .newsletter__container {
    max-width: 55ch;
    margin: 0 auto;
  }

  .newsletter__title {
    margin: 0 0 var(--g-theme-spacing-sm);
    font: var(--g-theme-typography-headline-sm);
    color: var(--g-theme-color-content-brand-knockout, #ffffff);
  }

  .newsletter__text {
    margin: 0 0 var(--g-theme-spacing-xl);
    font: var(--g-theme-typography-body-lg);
    color: var(--g-theme-color-content-brand-knockout, #ffffff);
    opacity: 0.9;
  }

  .newsletter__form {
    width: 100%;
  }

  .newsletter__label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .newsletter__field {
    display: flex;
    flex-direction: column;
    gap: var(--g-theme-spacing-sm);
  }

  .newsletter__input-wrap {
    display: flex;
    gap: var(--g-theme-spacing-sm);
  }

  .newsletter__input {
    flex: 1;
    min-width: 0;
    padding-block: var(--g-theme-spacing-sm);
    padding-inline: var(--g-theme-spacing-md);
    font-size: var(--g-theme-typography-body-default-font-size);
    border: 2px solid transparent;
    border-radius: var(--g-theme-border-radius-md, 0.5rem);
    background: var(--g-theme-color-background-default);
    color: var(--g-theme-color-content-default);
    outline: none;
  }

  .newsletter__input:focus {
    border-color: var(--g-theme-color-border-default);
  }

  .newsletter__disclaimer {
    margin: var(--g-theme-spacing-md) 0 0;
    font: var(--g-theme-typography-body-sm);
    color: var(--g-theme-color-content-brand-knockout, #ffffff);
    opacity: 0.75;
  }

  @media (max-width: 480px) {
    .newsletter__input-wrap {
      flex-direction: column;
    }
  }
`;
