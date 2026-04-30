import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesDropdown, GrantCodesDropdownItem } from "./dropdown.js";

export const Dropdown = createComponent({
	tagName: "grantcodes-dropdown",
	elementClass: GrantCodesDropdown,
	react: React,
	events: {
		onToggle: "toggle",
	},
});

export const DropdownItem = createComponent({
	tagName: "grantcodes-dropdown-item",
	elementClass: GrantCodesDropdownItem,
	react: React,
	events: {
		onSelect: "select",
	},
});
