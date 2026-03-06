import { css } from "lit";

export const formFieldStyles = css`

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0;
  margin: 0;
  border: none;
}

.form-field label,
.form-field slot {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.form-field--inline label {
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
}

.form-field__label {
  margin: 0;
  padding: 0;

  &:where(legend) {
    margin-bottom: 0.25rem;
  }
}

.form-field__help {
  font-size: var(--g-typography-font-size-14);
  opacity: 0.7;
}

.form-field__error {
  margin: 0;
  font-size: var(--g-typography-font-size-14);
  color: var(--g-color-utility-red-700);
}

`;