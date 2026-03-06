import { css } from "lit";

export const tabsStyles = css`
*,
*::before,
*::after {
	box-sizing: border-box;
}

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
	background-image: linear-gradient(
		var(--g-theme-color-border-default, var(--g-color-brand-purple-100)),
		var(--g-theme-color-border-default, var(--g-color-brand-purple-100))
	);
	background-size: auto var(--border-width);
	background-position: bottom;
	background-repeat: repeat-x;
}

.tabs__tab {
	padding: 0.6em 1.2em;
	line-height: 1;
	font-size: 1rem;
	border: none;
	border-block-start: var(--border-width) solid transparent;
	border-block-end: var(--border-width) solid var(--g-theme-color-border-default, var(--g-color-brand-purple-100));
	background-color: transparent;
	color: var(--g-theme-color-content-default);
	opacity: 0.7;
	white-space: nowrap;
	cursor: pointer;
	transition: opacity 0.2s, border-color 0.2s, background-color 0.2s;
	--component-focus-ring-offset: calc(var(--component-focus-ring-width) * -1);
}

@media (min-width: 40em) {
	.tabs__tab {
		padding-inline: 1rem;
	}
}

.tabs__tab:hover,
.tabs__tab:focus-visible {
	opacity: 1;
	border-block-end-color: var(--g-theme-color-border-default, var(--g-color-brand-purple-200));
}

.tabs__tab.is-active {
	border-block-end-color: var(--g-theme-color-border-brand, var(--g-color-brand-purple-500));
	background-color: var(--g-theme-color-background-subtle);
	color: var(--g-theme-color-content-default);
	z-index: 1;
	position: relative;
	opacity: 1;
}

.tabs__tab:focus-visible {
	outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
	outline-offset: 2px;
}

.tabs__panel {
	margin-block-start: 1rem;
	outline-color: var(--g-theme-color-border-brand, var(--g-color-brand-purple-500));
	outline-offset: 1rem;
	display: none;
}

.tabs__panel.is-active {
	display: block;
}
`;
