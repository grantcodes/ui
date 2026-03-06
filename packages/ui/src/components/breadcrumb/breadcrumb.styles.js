import { css } from "lit";

export const breadcrumbStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: block;
	}

	.breadcrumb {
		display: block;
	}

	.breadcrumb__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.breadcrumb__item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	font-size: var(--g-typography-font-size-14);
	color: var(--g-color-brand-purple-700);
	}

	/* Separator using ::after pseudo-element; driven by parent via data-has-separator */
	:host([data-has-separator]) .breadcrumb__item::after {
		content: var(--component-breadcrumb-separator, "/");
		display: inline-block;
		color: var(--g-color-brand-purple-400);
		font-weight: 300;
		user-select: none;
		pointer-events: none;
	}

	/* Current page styling */
	.breadcrumb__item[data-current] {
		font-weight: 600;
		color: var(--color-base-primary-900);
	}

	.breadcrumb__item[data-current]::after {
		display: none;
	}

	.breadcrumb__link {
		color: var(--g-color-brand-purple-600);
		text-decoration: none;
		transition: color 0.2s ease;
		border-radius: var(--g-theme-border-radius-md, 0.25rem);
		padding-inline: 0.25em;
		padding-block: 0.125em;
		margin-inline: -0.25em;
		margin-block: -0.125em;
	}

	.breadcrumb__link:hover {
		color: var(--g-color-brand-purple-700);
		text-decoration: underline;
	}

	.breadcrumb__link:focus-visible {
		outline: 2px solid var(--component-focus-ring-color, rgba(106, 91, 197, 0.4));
		outline-offset: 2px;
	}

	.breadcrumb__text {
		display: inline-block;
	}

	/* Responsive: Show only last few items on small screens */
	@media (max-width: 640px) {
		.breadcrumb__item:not(:last-child):not(:nth-last-child(2)) {
			display: none;
		}

		.breadcrumb__item:nth-last-child(2)::before {
			content: "...";
			display: inline-block;
			margin-inline-end: 0.5rem;
			color: var(--g-color-brand-purple-400);
		}
	}
`;


