import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesAvatar } from "./avatar.js"

export const Avatar = createComponent({
	tagName: "grantcodes-avatar",
	elementClass: GrantCodesAvatar,
	react: React,
})
