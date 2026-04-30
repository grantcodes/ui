import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesNewsletter } from "./newsletter.js";

export const Newsletter = createComponent({
	tagName: "grantcodes-newsletter",
	elementClass: GrantCodesNewsletter,
	react: React,
});
