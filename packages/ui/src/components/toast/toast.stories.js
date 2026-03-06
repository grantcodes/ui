import { html } from "lit";
import "./toast.js";

const meta = {
	title: "Components/Toast",
	component: "grantcodes-toast",
};

export default meta;

/**
 * Basic toast notification that auto-dismisses after 5 seconds
 */
export const Toast = {
	render: () => html`
		<grantcodes-toast-container position="top-right">
			<grantcodes-toast variant="info" title="Information">
				This is an informational toast message.
			</grantcodes-toast>
		</grantcodes-toast-container>
	`,
};

/**
 * All toast variants
 */
export const AllVariants = {
	render: () => html`
		<grantcodes-toast-container position="top-right">
			<grantcodes-toast variant="info" title="Info" duration="0">
				This is an info toast message.
			</grantcodes-toast>
			<grantcodes-toast variant="success" title="Success" duration="0">
				Operation completed successfully!
			</grantcodes-toast>
			<grantcodes-toast variant="warning" title="Warning" duration="0">
				Please review before continuing.
			</grantcodes-toast>
			<grantcodes-toast variant="error" title="Error" duration="0">
				An error occurred. Please try again.
			</grantcodes-toast>
		</grantcodes-toast-container>
	`,
};

/**
 * Toast without title
 */
export const WithoutTitle = {
	render: () => html`
		<grantcodes-toast-container position="top-right">
			<grantcodes-toast variant="success" duration="0">
				This toast has no title, just the message content.
			</grantcodes-toast>
		</grantcodes-toast-container>
	`,
};

/**
 * Non-dismissible toast (no close button)
 */
export const NonDismissible = {
	render: () => html`
		<grantcodes-toast-container position="top-right">
			<grantcodes-toast variant="info" title="Loading" ?dismissible=${false} duration="0">
				Please wait while we process your request...
			</grantcodes-toast>
		</grantcodes-toast-container>
	`,
};

/**
 * Different positions for toast container
 */
export const Positions = {
	render: () => html`
		<div style="position: relative; height: 400px; border: 1px solid #ccc;">
			<grantcodes-toast-container position="top-left">
				<grantcodes-toast variant="info" title="Top Left" duration="0">
					Toast in top-left corner
				</grantcodes-toast>
			</grantcodes-toast-container>

			<grantcodes-toast-container position="top-center">
				<grantcodes-toast variant="success" title="Top Center" duration="0">
					Toast in top-center
				</grantcodes-toast>
			</grantcodes-toast-container>

			<grantcodes-toast-container position="top-right">
				<grantcodes-toast variant="warning" title="Top Right" duration="0">
					Toast in top-right corner
				</grantcodes-toast>
			</grantcodes-toast-container>

			<grantcodes-toast-container position="bottom-left">
				<grantcodes-toast variant="info" title="Bottom Left" duration="0">
					Toast in bottom-left corner
				</grantcodes-toast>
			</grantcodes-toast-container>

			<grantcodes-toast-container position="bottom-center">
				<grantcodes-toast variant="success" title="Bottom Center" duration="0">
					Toast in bottom-center
				</grantcodes-toast>
			</grantcodes-toast-container>

			<grantcodes-toast-container position="bottom-right">
				<grantcodes-toast variant="error" title="Bottom Right" duration="0">
					Toast in bottom-right corner
				</grantcodes-toast>
			</grantcodes-toast-container>
		</div>
	`,
};

/**
 * Stacked toasts showing multiple notifications
 */
export const Stacked = {
	render: () => html`
		<grantcodes-toast-container position="top-right">
			<grantcodes-toast variant="info" title="First notification" duration="0">
				This is the first toast message.
			</grantcodes-toast>
			<grantcodes-toast variant="success" title="Second notification" duration="0">
				This is the second toast message.
			</grantcodes-toast>
			<grantcodes-toast variant="warning" title="Third notification" duration="0">
				This is the third toast message.
			</grantcodes-toast>
		</grantcodes-toast-container>
	`,
};

/**
 * Interactive demo with button to trigger toasts
 */
export const Interactive = {
	render: () => html`
		<div>
			<button
				@click=${() => {
					const container = document.querySelector("grantcodes-toast-container");
					if (!container) {
						const newContainer = document.createElement("grantcodes-toast-container");
						newContainer.position = "top-right";
						document.body.appendChild(newContainer);
					}

					const toast = document.createElement("grantcodes-toast");
					toast.variant = "success";
					toast.title = "Toast Created!";
					toast.textContent = "This toast was created dynamically.";
					toast.duration = 3000;

					const finalContainer =
						document.querySelector("grantcodes-toast-container") ||
						document.body.appendChild(document.createElement("grantcodes-toast-container"));
					finalContainer.appendChild(toast);
				}}
			>
				Show Toast
			</button>
		</div>
	`,
};


