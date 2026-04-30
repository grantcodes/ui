import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesToast, GrantCodesToastContainer } from "./toast.js";

export const Toast = createComponent({
	tagName: "grantcodes-toast",
	elementClass: GrantCodesToast,
	react: React,
	events: {
		onDismiss: "dismiss",
	},
});

export const ToastContainer = createComponent({
	tagName: "grantcodes-toast-container",
	elementClass: GrantCodesToastContainer,
	react: React,
});
