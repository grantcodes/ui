import { css } from "lit";

export const avatarStyles = css`

/* Inlined component-base mixin */
*,
*::before,
*::after {
  box-sizing: border-box;
}

:host {
  display: block;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--g-theme-spacing-2xl);
  block-size: var(--g-theme-spacing-2xl);
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--g-color-brand-purple-200);
  color: var(--g-color-brand-purple-900);
  text-align: center;
  font-size: var(--g-theme-typography-title-sm-font-size);
  font-weight: var(--g-theme-typography-label-default-font-weight);
}

.avatar__image {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
}

.avatar__fallback {
  line-height: 1;
}

`;
