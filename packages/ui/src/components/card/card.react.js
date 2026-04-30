import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesCard } from "./card.js";

export const Card = createComponent({
	tagName: "grantcodes-card",
	elementClass: GrantCodesCard,
	react: React,
});
