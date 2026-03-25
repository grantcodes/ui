import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesBadge } from "./badge.js"

export const Badge = createComponent({
	tagName: "grantcodes-badge",
	elementClass: GrantCodesBadge,
	react: React,
})
