import { css } from "lit";

export const tabsStyles = css`

.tabs {
  --border-width: 3px;
  display: block;
}

.tabs__tablist {
  overflow: auto;
  contain: none;

}

.tabs__tablist__inner {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: fit-content;
  min-width: 100%;

  // Kind of a bottom border but prevents overflow issues.
  background-image: linear-gradient(
    var(--color-base-primary-100),
    var(--color-base-primary-100)
  );
  background-size: auto $border-width;
  background-position: bottom;
  background-repeat: repeat-x;
}

.tabs__tab {
  padding: 0.6em 1.2em;
  line-height: 1;
  font-size: 1rem;
  border: none;
  border-block-start: var(--border-width) solid transparent;
  border-block-end: var(--border-width) solid var(--color-base-primary-100);
  opacity: 0.7;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s, border-color 0.2s;
  --component-focus-ring-offset: calc(var(--component-focus-ring-width) * -1);
  
  @media (min-width: 40em) {
    padding-inline: var(--size-space-unit, 1rem);
  }

  &:hover,
  &:focus-visible {
    opacity: 1;
    border-block-end-color: var(--color-base-primary-200);
  }

  &.is-active {
    border-block-end-color: var(--color-base-primary-500);
    z-index: 1;
    position: relative;
    opacity: 1;
  }
}

.tabs__panel {
  margin-block-start: var(--size-space-unit, 1rem);
  outline-color: var(--color-base-primary-500);
  outline-offset: var(--size-space-unit, 1rem);
  display: none;

  &.is-active {
    display: block;
  }
}
`;
