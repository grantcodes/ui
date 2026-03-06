import { css } from "lit";

export const containerStyles = css`

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  inline-size: 1200px;
  max-inline-size: 100%;
  padding-inline: 1rem;
  margin-inline: auto;
  background-color: inherit;
}

.container--wide {
  inline-size: 1400px;
}

.container--full {
  inline-size: 100%;
}

.container--viewport {
  inset-inline-start: 50%;
  position: relative;
  inset-inline-end: 50%;
  margin-inline-start: -50vw;
  margin-inline-end: -50vw;
  max-inline-size: 100vw;
  inline-size: 100vw;
  margin-inline-start: -50dvw;
  margin-inline-end: -50dvw;
  max-inline-size: 100dvw;
  inline-size: 100dvw;
}

.container--nopad {
  padding-inline: 0;
}

`;