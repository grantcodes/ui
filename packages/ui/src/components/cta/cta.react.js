import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesCta } from "./cta.js";

export const Cta = createComponent({
	tagName: "grantcodes-cta",
	elementClass: GrantCodesCta,
	react: React,
});
