import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesCard } from "./card.component";

export const Card = createComponent({
	tagName: "grantcodes-card",
	elementClass: GrantCodesCard,
	react: React,
});
