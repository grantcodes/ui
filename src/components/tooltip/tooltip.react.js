import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesTooltip } from "./tooltip.component";

export const Tooltip = createComponent({
	tagName: "grantcodes-tooltip",
	elementClass: GrantCodesTooltip,
	react: React,
});
