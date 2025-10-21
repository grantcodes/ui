import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesTabs } from "./tabs.component";

export const Tabs = createComponent({
	tagName: "grantcodes-tabs",
	elementClass: GrantCodesTabs,
	react: React,
});
