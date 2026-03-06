import { css } from "lit";

export const buttonStyles = css`
/* Inlined component-base mixin */
*,
*::before,
*::after {
	box-sizing: border-box;
}

:host {
	display: block;
	--button-border-radius-start: var(--g-theme-border-radius-md);
	--button-border-radius-end: var(--g-theme-border-radius-md);
}

.button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	background: var(--g-theme-button-primary-color-background-default);
	color: var(--g-theme-button-primary-color-content-default);
	border-width: var(--g-theme-border-width-md);
	border-style: solid;
	border-color: var(--g-theme-button-primary-color-border-default);
	padding: 0.5em 1em;
	border-start-start-radius: var(--button-border-radius-start);
	border-start-end-radius: var(--button-border-radius-end);
	border-end-start-radius: var(--button-border-radius-start);
	border-end-end-radius: var(--button-border-radius-end);
	font-size: 1rem;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-decoration: none;
	outline: 1px solid transparent;
	transition:
		color 0.2s,
		border-color 0.2s,
		background-color 0.2s,
		outline 0.2s;

	/* Inlined focus-ring styles */
	outline-color: transparent;
	outline-offset: var(--g-theme-focus-ring-offset-default);
	outline-style: solid;
	outline-width: var(--g-theme-focus-ring-width-default);
}

.button:focus-visible {
	outline-color: var(--g-theme-focus-ring-color-default);
}

@media (prefers-contrast: more) {
	.button:focus-visible {
		outline-color: var(--g-theme-focus-ring-color-contrast);
		box-shadow: 0 0 0
			calc(
				(
					var(--g-theme-focus-ring-width-default) +
					var(--g-theme-focus-ring-offset-default)
				) *
				1.5
			)
			var(--g-theme-focus-ring-color-contrast-shadow);
	}
}

.button:hover,
.button:focus-visible {
	color: var(--g-theme-button-primary-color-content-hover);
	background: var(--g-theme-button-primary-color-background-hover);
	border-color: var(--g-theme-button-primary-color-border-hover);
	cursor: pointer;
	text-decoration: none;
}

.button:active {
	color: var(--g-theme-button-primary-color-content-active);
	background: var(--g-theme-button-primary-color-background-active);
	border-color: var(--g-theme-button-primary-color-border-active);
}

.button:active {
	transform: translateY(1px);
}

.button[disabled] {
	background: var(--g-theme-button-primary-color-background-disabled);
	color: var(--g-theme-button-primary-color-content-disabled);
	border-color: var(--g-theme-button-primary-color-border-disabled);
	cursor: not-allowed;
	filter: grayscale(70%);
	opacity: 0.8;
}

`;
