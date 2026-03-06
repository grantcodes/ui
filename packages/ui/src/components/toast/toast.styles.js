import { css } from "lit";

export const toastStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: block;
		pointer-events: none;
	}

	/* Toast Container */
	.toast-container {
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		pointer-events: none;
		max-inline-size: 100vw;
		max-block-size: 100vh;
		overflow: hidden;
	}

	/* Container positions */
	.toast-container--top-left {
		inset-block-start: 0;
		inset-inline-start: 0;
	}

	.toast-container--top-center {
		inset-block-start: 0;
		inset-inline-start: 50%;
		transform: translateX(-50%);
	}

	.toast-container--top-right {
		inset-block-start: 0;
		inset-inline-end: 0;
	}

	.toast-container--bottom-left {
		inset-block-end: 0;
		inset-inline-start: 0;
	}

	.toast-container--bottom-center {
		inset-block-end: 0;
		inset-inline-start: 50%;
		transform: translateX(-50%);
	}

	.toast-container--bottom-right {
		inset-block-end: 0;
		inset-inline-end: 0;
	}

	/* Toast */
	.toast {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		min-inline-size: 300px;
		max-inline-size: 500px;
		padding-block: 1rem;
		padding-inline: 1rem;
		border-radius: var(--g-theme-border-radius-md);
		background-color: var(--g-theme-color-background-default);
		border-inline-start-width: 4px;
		border-inline-start-style: solid;
		pointer-events: auto;
		opacity: 0;
		transform: translateY(-1rem);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.toast--visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Variant colors */
	.toast--info {
		border-inline-start-color: var(--g-theme-color-background-utility-info);
	}

	.toast--success {
		border-inline-start-color: var(--g-theme-color-background-utility-success);
	}

	.toast--warning {
		border-inline-start-color: var(--g-theme-color-background-utility-warning);
	}

	.toast--error {
		border-inline-start-color: var(--g-theme-color-background-utility-error);
	}

	/* Toast icon */
	.toast__icon {
		flex-shrink: 0;
		inline-size: 1.5rem;
		block-size: 1.5rem;
	}

	.toast--info .toast__icon {
		color: var(--g-theme-color-background-utility-info);
	}

	.toast--success .toast__icon {
		color: var(--g-theme-color-background-utility-success);
	}

	.toast--warning .toast__icon {
		color: var(--g-theme-color-background-utility-warning);
	}

	.toast--error .toast__icon {
		color: var(--g-theme-color-background-utility-error);
	}

	/* Toast content */
	.toast__content {
		flex: 1;
		min-inline-size: 0;
	}

	.toast__title {
		font-weight: 600;
		font-size: var(--g-typography-font-size-16);
		margin-block-end: 0.25rem;
		color: var(--g-theme-color-content-default);
	}

	.toast__message {
		font-size: var(--g-typography-font-size-14);
		color: var(--g-theme-color-content-secondary);
		line-height: 1.5;
	}

	/* Close button */
	.toast__close {
		all: unset;
		flex-shrink: 0;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--g-theme-border-radius-md);
		color: var(--g-theme-color-content-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		margin-inline-start: 0.5rem;
	}

	.toast__close:hover {
		color: var(--g-theme-color-content-default);
		background-color: var(--g-theme-color-background-subtle-hover);
	}

	.toast__close:focus-visible {
		outline: 2px solid var(--component-focus-ring-color);
		outline-offset: 2px;
	}

	/* Bottom position toasts slide up instead of down */
	.toast--bottom-left,
	.toast--bottom-center,
	.toast--bottom-right {
		transform: translateY(1rem);
	}

	.toast--bottom-left.toast--visible,
	.toast--bottom-center.toast--visible,
	.toast--bottom-right.toast--visible {
		transform: translateY(0);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.toast-container {
			inset-inline: 0;
			transform: none;
		}

		.toast {
			min-inline-size: auto;
			inline-size: 100%;
		}
	}

	/* View transitions */
	@media (prefers-reduced-motion: no-preference) {
		@supports (view-transition-name: auto) {
			.toast {
				view-transition-name: toast;
			}
		}
	}
`;
