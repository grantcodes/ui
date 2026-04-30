import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesStats } from "./stats.js";

export const Stats = createComponent({
	tagName: "grantcodes-stats",
	elementClass: GrantCodesStats,
	react: React,
});
