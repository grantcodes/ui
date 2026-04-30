import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesLoading } from "./loading.js";

export const Loading = createComponent({
	tagName: "grantcodes-loading",
	elementClass: GrantCodesLoading,
	react: React,
});
