import { css } from "lit";

export const sidebarStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: contents;
	}

	.sidebar {
		position: relative;
		inline-size: var(--sidebar-width, 280px);
		block-size: 100%;
		background-color: var(--color-base-background-main, white);
		border-inline-end: 1px solid var(--color-base-primary-200);
		overflow-y: auto;
		transition: inline-size 0.3s ease;
		flex-shrink: 0;
	}

	.sidebar--right {
		border-inline-end: none;
		border-inline-start: 1px solid var(--color-base-primary-200);
	}

	.sidebar--collapsed {
		inline-size: 60px;
	}

	/* Mobile Toggle Button */
	.sidebar__mobile-toggle {
		all: unset;
		display: none;
		position: fixed;
		inset-block-start: 1rem;
		inset-inline-start: 1rem;
		z-index: 1001;
		inline-size: 2.5rem;
		block-size: 2.5rem;
		align-items: center;
		justify-content: center;
		background-color: var(--color-base-background-main, white);
		border: 1px solid var(--color-base-primary-200);
		border-radius: var(--size-border-radius, 0.5rem);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		font-size: 1.5rem;
		transition: all 0.2s ease;
	}

	.sidebar__mobile-toggle:hover {
		background-color: var(--color-base-primary-100);
	}

	.sidebar__mobile-toggle:focus-visible {
		outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
		outline-offset: 2px;
	}

	/* Show mobile toggle on small screens */
	@media (max-width: 768px) {
		.sidebar__mobile-toggle {
			display: flex;
		}

		.sidebar {
			position: fixed;
			inset-block-start: 0;
			inset-block-end: 0;
			inset-inline-start: -100%;
			z-index: 1000;
			box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
			transition: inset-inline-start 0.3s ease;
		}

		.sidebar--right {
			inset-inline-start: auto;
			inset-inline-end: -100%;
			box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
			transition: inset-inline-end 0.3s ease;
		}

		.sidebar--drawer-open {
			inset-inline-start: 0;
		}

		.sidebar--right.sidebar--drawer-open {
			inset-inline-end: 0;
			inset-inline-start: auto;
		}
	}

	/* Overlay */
	.sidebar__overlay {
		display: none;
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		animation: overlay-fade-in 0.2s ease-out;
	}

	@media (max-width: 768px) {
		.sidebar__overlay {
			display: block;
		}
	}

	@keyframes overlay-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Collapse Toggle */
	.sidebar__toggle {
		all: unset;
		position: absolute;
		inset-block-start: 1rem;
		inset-inline-end: 0.5rem;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-base-background-main, white);
		border: 1px solid var(--color-base-primary-200);
		border-radius: var(--size-border-radius, 0.25rem);
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		z-index: 10;
	}

	.sidebar__toggle:hover {
		background-color: var(--color-base-primary-100);
	}

	.sidebar__toggle:focus-visible {
		outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
		outline-offset: 2px;
	}

	.sidebar--right .sidebar__toggle {
		inset-inline-end: auto;
		inset-inline-start: 0.5rem;
	}

	@media (max-width: 768px) {
		.sidebar__toggle {
			display: none;
		}
	}

	/* Content */
	.sidebar__content {
		padding-block: 1rem;
		padding-inline: 1rem;
	}

	.sidebar--collapsed .sidebar__content {
		padding-inline: 0.5rem;
	}

	/* View transitions */
	@media (prefers-reduced-motion: no-preference) {
		@supports (view-transition-name: auto) {
			.sidebar {
				view-transition-name: sidebar;
			}
		}
	}
`;
