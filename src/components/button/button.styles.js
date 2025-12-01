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
}

.button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	background: var(--component-button-base-background);
	color: var(--component-button-base-color);
	border-width: var(--component-button-base-border-width);
	border-style: solid;
	border-color: var(--component-button-base-border-color);
	padding: 0.5em 1em;
	border-radius: var(--component-button-base-border-radius);
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
	outline-offset: var(--component-focus-ring-offset, 0px);
	outline-style: solid;
	outline-width: var(--component-focus-ring-width, 2px);
}

.button:focus-visible {
	outline-color: var(--component-focus-ring-color);
}

@media (prefers-contrast: more) {
	.button:focus-visible {
		--component-focus-ring-color: var(--color-base-primary-200);
		box-shadow: 0 0 0
			calc(
				(
					var(--component-focus-ring-width) +
					var(--component-focus-ring-offset, 0px)
				) *
				1.5
			)
			var(--color-base-primary-800);
	}
}

.button:hover,
.button:focus-visible {
	color: var(--component-button-active-color);
	background: var(--component-button-active-background);
	cursor: pointer;
	text-decoration: none;
}

.button:active {
	transform: translateY(1px);
}

.button[disabled] {
	cursor: not-allowed;
	filter: grayscale(70%);
	opacity: 0.8;
}

`;












