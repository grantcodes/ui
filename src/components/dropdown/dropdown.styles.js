import { css } from "lit";

export const dropdownStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host,
	.dropdown {
		display: inline-block;
	}

	.dropdown__trigger {
		display: inline-block;
		cursor: pointer;
		anchor-name: --dropdown-trigger;
	}

	.dropdown__menu {
		position: fixed;
		position-anchor: --dropdown-trigger;
		position-area: bottom span-right;
		position-try: block-end, block-start span-inline-start;
		inset: auto;
		z-index: 1000;
		min-inline-size: 12rem;
		margin-block: 0.25rem;
		padding-block: 0.5rem;
		background-color: white;
		border: 1px solid var(--color-base-primary-200);
		border-radius: var(--size-border-radius, 0.5rem);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		animation: dropdown-fade-in 0.15s ease-out;
	}

	.dropdown__menu ::slotted(*) {
		display: flex;
		flex-direction: column;
	}

	

	/* Dropdown item */
	.dropdown-item {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		font-size: var(--font-size-normal);
		color: var(--color-base-primary-900);
		cursor: pointer;
		transition: background-color 0.15s ease;
		user-select: none;
	}

	.dropdown-item:hover {
		background-color: var(--color-base-primary-100);
	}

	.dropdown-item:focus {
		outline: none;
		background-color: var(--color-base-primary-100);
	}

	.dropdown-item:active {
		background-color: var(--color-base-primary-200);
	}

	.dropdown-item--disabled {
		color: var(--color-base-primary-400);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.dropdown-item--disabled:hover,
	.dropdown-item--disabled:focus,
	.dropdown-item--disabled:active {
		background-color: transparent;
	}

	/* Animation */
	@keyframes dropdown-fade-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* For top placement, reverse animation */
	.dropdown__menu--top-start,
	.dropdown__menu--top-end {
		animation: dropdown-fade-in-top 0.15s ease-out;
	}

	@keyframes dropdown-fade-in-top {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* View transitions support */
	@media (prefers-reduced-motion: no-preference) {
		@supports (view-transition-name: auto) {
			.dropdown__menu {
				view-transition-name: dropdown-menu;
			}
		}
	}
`;
