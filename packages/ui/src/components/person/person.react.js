import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesMediaText } from "./person.js";

export const MediaText = createComponent({
	tagName: "grantcodes-person",
	elementClass: GrantCodesMediaText,
	react: React,
});
