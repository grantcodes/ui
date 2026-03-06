import { html } from "lit/static-html.js";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-notice");
import "./notice.js";

const meta = {
	title: "Components/Notice",
	component: "grantcodes-notice",
	args: {
		...args,
		text: "This is the notice content",
		title: "Notice title",
		variant: "info",
		dismissable: false,
	},
	argTypes: {
		...argTypes,
		variant: {
			type: "string",
		},
	},
	render: (args) => template(args, html`${args.text}`),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;

/**
 * Informational notice with info variant and icon.
 * Use for general information that doesn't require immediate action.
 */
export const InfoNotice = {};

/**
 * Success notice indicating a successful operation.
 * Use after successful form submissions, saves, or completions.
 */
export const SuccessNotice = {
	args: {
		variant: "success",
		title: "Success",
		text: "Your changes have been saved successfully.",
	},
};

/**
 * Warning notice for non-critical issues.
 * Use to alert users about potential problems that don't block their workflow.
 */
export const WarningNotice = {
	args: {
		variant: "warning",
		title: "Warning",
		text: "Your session will expire in 5 minutes.",
	},
};

/**
 * Error notice for critical issues.
 * Use when an operation fails or there's a blocking error.
 */
export const ErrorNotice = {
	args: {
		variant: "error",
		title: "Error",
		text: "Failed to save changes. Please try again.",
	},
};

/**
 * Dismissable notice that can be closed by the user.
 * The notice will be removed from the DOM when dismissed.
 */
export const Dismissable = {
	args: {
		variant: "info",
		title: "Dismissable Notice",
		text: "You can close this notice by clicking the X button.",
		dismissable: true,
	},
};

/**
 * Notice without a title, showing only the message.
 */
export const NoTitle = {
	args: {
		variant: "info",
		title: "",
		text: "This is a notice without a title, just the content message.",
	},
};

/**
 * All notice variants displayed together for comparison.
 */
export const AllVariants = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<grantcodes-notice variant="info" title="Information">
				This is an informational message for general updates.
			</grantcodes-notice>
			<grantcodes-notice variant="success" title="Success">
				Operation completed successfully!
			</grantcodes-notice>
			<grantcodes-notice variant="warning" title="Warning">
				Please review this warning before continuing.
			</grantcodes-notice>
			<grantcodes-notice variant="error" title="Error">
				An error occurred. Please contact support.
			</grantcodes-notice>
			<grantcodes-notice variant="info" dismissable>
				This notice can be dismissed by clicking the close button.
			</grantcodes-notice>
		</div>
	`,
};
