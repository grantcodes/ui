import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesFeatureList } from "./feature-list.js"

export const FeatureList = createComponent({
	tagName: "grantcodes-feature-list",
	elementClass: GrantCodesFeatureList,
	react: React,
})
