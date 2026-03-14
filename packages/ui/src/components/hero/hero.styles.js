import { css } from "lit";

export const heroStyles = css`
	:host {
		display: block;
	}

	.hero {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		text-align: center;
		padding: var(--g-theme-spacing-2xl) var(--g-theme-spacing-md);
		background: var(--g-theme-color-background-brand-knockout, #7c3aed);
	}

	.hero__container {
		width: 100%;
		max-width: 65ch;
	}

	.hero__title {
		margin: 0 0 var(--g-theme-spacing-md);
		font-weight: var(--g-typography-font-weight-900);
		font-size: clamp(2rem, 5vw, 4rem);
		color: var(--g-theme-color-content-brand-knockout, #ffffff);
	}

	.hero__text {
		font-size: var(--g-theme-typography-title-default-font-size);
		color: var(--g-theme-color-content-brand-knockout, #ffffff);
		margin: 0 0 var(--g-theme-spacing-lg);
	}

	:host([size="sm"]) .hero {
		min-height: 30vh;
		padding: var(--g-theme-spacing-xl) var(--g-theme-spacing-md);
	}

	:host([size="lg"]) .hero {
		min-height: 70vh;
		padding: var(--g-theme-spacing-3xl) var(--g-theme-spacing-md);
	}
`;
