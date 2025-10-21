import { css } from "lit";

export const buttonGroupStyles = css`

/* Inlined component-base mixin */
*,
*::before,
*::after {
	box-sizing: border-box;
}

:host {
	display: block;
}

.button-group {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background: var(--component-button-base-background);
	border-radius: var(--component-button-base-border-radius);
	min-width: fit-content;
	max-width: 100%;
}

.button-group ::slotted(grantcodes-button) {
	/* --component-button-base-border-radius: 0; */
}

`;