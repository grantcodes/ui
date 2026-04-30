import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesContainer } from "./container.js";

export const Container = createComponent({
	tagName: "grantcodes-container",
	elementClass: GrantCodesContainer,
	react: React,
});
