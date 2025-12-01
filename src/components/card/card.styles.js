import { css } from "lit";

export const cardStyles = css`

/* Inlined component-base mixin */
*,
*::before,
*::after {
	box-sizing: border-box;
}

:host {
	display: block;
	/* Enable container queries for responsive card layouts */
	container-type: inline-size;
	container-name: card;
}

.card {
	display: flex;
	inline-size: 100%;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;
	background: var(--component-card-background);
	border-style: solid;
	border-width: var(--component-card-border-width);
	border-color: var(--component-card-border-color);
	border-radius: var(--component-card-border-radius);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease,
		background-color 0.2s ease;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.04);
}


/* Image support - images in header or content will be styled appropriately */
.card__header img,
.card__content img {
	display: block;
	width: 100%;
	height: auto;
	border-radius: inherit;
}

.card__header {
	padding-inline: var(--size-space-unit, 1rem);
	padding-block: calc(var(--size-space-unit, 1rem) * 0.75);
	border-block-end: 1px solid var(--component-card-border-color);
}

.card__header ::slotted(*) {
	margin: 0;
	font-weight: 600;
	font-size: var(--font-size-large, 1.125rem);
}

.card__content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: var(--size-space-unit, 1rem);
	padding-block: var(--size-space-unit, 1rem);
	padding-inline: var(--size-space-unit, 1rem);
}

.card__content > * {
	margin: 0;
}

.card__footer {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-end;
	gap: calc(var(--size-space-unit, 1rem) * 0.5);
	border-block-start: 1px solid var(--component-card-border-color);
	background: var(--component-button-base-background);
}

.card__meta {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--size-space-unit);
	margin: 0;
	padding-inline: var(--size-space-unit, 1rem);
	padding-block: 1em;
	font-size: var(--font-size-small);
	/* Use color-mix() for modern color manipulation */
	background-color: color-mix(in srgb, var(--color-base-background-main) 90%, var(--color-base-primary-500) 10%);
	color: var(--color-base-dark-shade);
}

.card__meta__item {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: nowrap;
	gap: 0.3em;
}

.card__meta__item dt,
.card__meta__item dd {
	display: block;
	margin: 0;
	padding: 0;
}

.card__meta__item dt::after {
	content: ":";
}

`;
