import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesButtonGroup } from "./button-group.js";

export const ButtonGroup = createComponent({
	tagName: "grantcodes-button-group",
	elementClass: GrantCodesButtonGroup,
	react: React,
});
