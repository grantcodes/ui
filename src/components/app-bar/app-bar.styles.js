import { css } from "lit";

export const appBarStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: block;
		container-type: inline-size;
		container-name: app-bar;
	}

	.app-bar {
		background-color: var(--color-base-background-main, white);
		border-block-end: 1px solid var(--color-base-primary-200);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		position: sticky;
		inset-block-start: 0;
		z-index: 100;
	}

	.app-bar--transparent {
		background-color: transparent;
		border-block-end-color: transparent;
		box-shadow: none;
	}

	.app-bar__container {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-inline: 1rem;
		padding-block: 1rem;
		max-inline-size: var(--size-block-width-wide, 1400px);
		margin-inline: auto;
		flex-wrap: wrap; /* allow nav to drop below on mobile */
	}

	/* Logo */
	.app-bar__logo {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	/* Navigation */
	.app-bar__nav {
		display: none; /* hidden by default on mobile */
		flex: 1;
		align-items: center;
		gap: 1.5rem;
		order: 5; /* push below top row on mobile */
		inline-size: 100%;
	}

	/* Mobile: when menu is open, show nav stacked vertically */
	.app-bar__nav--mobile-open {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-inline: 1rem;
		padding-block: 1rem;
		border-block-start: 1px solid var(--color-base-primary-200);
		width: 100%;
	}

	/* Show nav on larger screens using container queries */
	@container app-bar (min-width: 768px) {
		.app-bar__nav {
			display: flex;
		}
	}

	/* Actions */
	.app-bar__actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-inline-start: auto;
	}

	/* Mobile Menu Button */
	.app-bar__menu-button {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 2.5rem;
		block-size: 2.5rem;
		padding: 0.5rem;
		border-radius: var(--size-border-radius, 0.25rem);
		cursor: pointer;
		color: var(--color-base-primary-700);
		transition: background-color 0.2s ease;
	}

	.app-bar__menu-button:hover {
		background-color: var(--color-base-primary-100);
	}

	.app-bar__menu-button:focus-visible {
		outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
		outline-offset: 2px;
	}

	/* Hide menu button on larger screens */
	@container app-bar (min-width: 768px) {
		.app-bar__menu-button {
			display: none;
		}
	}

	/* Hamburger Icon */
	.app-bar__menu-icon {
		display: block;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		position: relative;
	}

	.app-bar__menu-icon::before,
	.app-bar__menu-icon::after {
		content: "";
		position: absolute;
		inline-size: 100%;
		block-size: 2px;
		inset-inline-start: 0;
		background-color: currentColor;
		transition: transform 0.2s ease;
	}

	.app-bar__menu-icon::before {
		inset-block-start: 0.25rem;
		box-shadow: 0 0.5rem 0 currentColor;
	}

	.app-bar__menu-icon::after {
		inset-block-end: 0.25rem;
	}

	/* Animated hamburger to X */
	.app-bar__menu-button[aria-expanded="true"] .app-bar__menu-icon::before {
		inset-block-start: 0.5rem;
		transform: rotate(45deg);
		box-shadow: none;
	}

	.app-bar__menu-button[aria-expanded="true"] .app-bar__menu-icon::after {
		inset-block-end: 0.5rem;
		transform: rotate(-45deg);
	}

	/* Mobile Navigation */
	.app-bar__mobile-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-inline: 1rem;
		padding-block: 1rem;
		border-block-start: 1px solid var(--color-base-primary-200);
		animation: slide-down 0.2s ease-out;
	}

	/* Desktop: show nav inline and reset mobile styles */
	@container app-bar (min-width: 768px) {
		.app-bar__container {
			flex-wrap: nowrap; /* keep single row on desktop */
		}

		.app-bar__nav {
			display: flex;
			flex-direction: row;
			gap: 1.5rem;
			padding: 0;
			border: 0;
			width: auto;
			order: 2; /* ensure nav sits before actions */
		}

		.app-bar__actions {
			order: 3;
		}

		.app-bar__menu-button {
			order: 4;
		}

		/* Ensure mobile-open class doesn't affect desktop */
		.app-bar__nav--mobile-open {
			display: flex;
		}
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Slotted content styling helpers */
	::slotted(a) {
		color: var(--color-base-primary-700);
		text-decoration: none;
		padding-block: 0.5rem;
		padding-inline: 0.75rem;
		border-radius: var(--size-border-radius, 0.25rem);
		transition: all 0.2s ease;
		font-weight: 500;
	}

	::slotted(a:hover) {
		color: var(--color-base-primary-900);
		background-color: var(--color-base-primary-100);
	}

	::slotted(a:focus-visible) {
		outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
		outline-offset: 2px;
	}
`;
