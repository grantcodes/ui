import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesAppBar } from "./app-bar.js";

export const AppBar = createComponent({
	tagName: "grantcodes-app-bar",
	elementClass: GrantCodesAppBar,
	react: React,
	events: {
		onMenuToggle: "menu-toggle",
	},
});
