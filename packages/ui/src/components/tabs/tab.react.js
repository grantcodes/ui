import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesTab } from "./tab.js"

export const Tab = createComponent({
	tagName: "grantcodes-tab",
	elementClass: GrantCodesTab,
	react: React,
})
