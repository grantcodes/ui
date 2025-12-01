import { css } from "lit";

export const badgeStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: inline-block;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding-inline: 0.625em;
		padding-block: 0.375em;
		border-radius: var(--size-border-radius, 0.375rem);
		font-size: var(--font-size-small);
		font-weight: 500;
		line-height: 1;
		white-space: nowrap;
		border-width: 1px;
		border-style: solid;
		transition: all 0.2s ease;
	}

	

	/* Soft style variants */
	.badge--primary {
		background-color: color-mix(
			in srgb,
			var(--color-base-primary-500) 15%,
			transparent
		);
		color: var(--color-base-primary-700);
		border-color: transparent;
	}

	.badge--success {
		background-color: color-mix(
			in srgb,
			var(--color-base-success-500, #22c55e) 15%,
			transparent
		);
		color: var(--color-base-success-700, #15803d);
		border-color: transparent;
	}

	.badge--warning {
		background-color: color-mix(
			in srgb,
			var(--color-base-warning-500, #f59e0b) 15%,
			transparent
		);
		color: var(--color-base-warning-700, #b45309);
		border-color: transparent;
	}

	.badge--error {
		background-color: color-mix(
			in srgb,
			var(--color-base-error-500, #ef4444) 15%,
			transparent
		);
		color: var(--color-base-error-700, #b91c1c);
		border-color: transparent;
	}

	.badge--info {
		background-color: color-mix(
			in srgb,
			var(--color-base-info-500, #3b82f6) 15%,
			transparent
		);
		color: var(--color-base-info-700, #1d4ed8);
		border-color: transparent;
	}

	.badge--neutral {
		background-color: var(--color-base-primary-100);
		color: var(--color-base-primary-800);
		border-color: transparent;
	}

	.badge__content {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
	}
`;
