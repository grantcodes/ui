import { css } from "lit";

export const dialogStyles = css`

.dialog {
  width: 100%;
  padding: 0;
  max-width: 1200px;
  background: var(--g-theme-color-background-default);
  border-style: solid;
  border-width: var(--g-theme-border-width-sm);
  border-color: var(--g-theme-color-border-default);
  border-radius: var(--g-theme-border-radius-md);
  overflow: hidden;
}

.dialog::backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
}

.dialog__dismiss {
  display: block;
  position: absolute;
  border: none;
  line-height: 1;
  font-size: 1.4rem;
  cursor: pointer;
  background: transparent;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
  margin-block-start: -0.25rem;
  margin-inline-end: -0.25rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  justify-content: center;
  align-items: center;
}

.dialog__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem;
}

.dialog__header,
.dialog__footer {
  &:empty,
  &:has(slot:empty) {
    display: none;
  }
}

.dialog__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: var(--g-theme-border-width-sm) solid
    var(--g-theme-color-border-default);
}

.dialog__footer ::slotted(grantcodes-button-group) {
  --g-theme-border-radius-md: 0;
}

`;