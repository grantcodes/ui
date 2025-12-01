import { css } from "lit";

export const footerStyles = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	:host {
		display: block;
		container-type: inline-size;
		container-name: footer;
	}

	.footer {
		margin-block-start: auto;
	}

	.footer__container {
		padding-block: 3rem 2rem;
		padding-inline: 1rem;
		max-inline-size: var(--size-block-width-wide, 1400px);
		margin-inline: auto;
	}

	.footer__columns {
		display: grid;
		grid-template-columns: repeat(var(--footer-columns, 3), 1fr);
		gap: 2rem;
	}

	/* Responsive grid using container queries */
	@container footer (max-width: 768px) {
		.footer__columns {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container footer (max-width: 480px) {
		.footer__columns {
			grid-template-columns: 1fr;
		}
	}

	/* Bottom section (copyright, social links, etc.) */
	.footer__bottom {
		margin-block-start: 2rem;
		padding-block-start: 2rem;
		border-block-start: 1px solid var(--color-base-primary-200);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.footer__bottom:has(slot[name="bottom"]:empty) {
		display: none;
	}

	@container footer (max-width: 640px) {
		.footer__bottom {
			flex-direction: column;
			text-align: center;
		}
	}

	/* Slotted content styling */
	::slotted(*) {
		font-size: var(--font-size-small);
		color: var(--color-base-primary-700);
	}

	::slotted(h3),
	::slotted(h4) {
		font-size: var(--font-size-normal);
		color: var(--color-base-primary-900);
		margin-block-start: 0;
		margin-block-end: 1rem;
		font-weight: 600;
	}

	::slotted(a) {
		color: var(--color-base-primary-600);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	::slotted(a:hover) {
		color: var(--color-base-primary-800);
		text-decoration: underline;
	}

	::slotted(ul) {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
`;
