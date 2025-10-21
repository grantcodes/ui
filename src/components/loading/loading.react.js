import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesLoading } from "./loading.component";

export const Loading = createComponent({
	tagName: "grantcodes-loading",
	elementClass: GrantCodesLoading,
	react: React,
});
