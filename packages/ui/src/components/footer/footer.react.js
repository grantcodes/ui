import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesFooter, GrantCodesFooterColumn } from "./footer.js"

export const Footer = createComponent({
	tagName: "grantcodes-footer",
	elementClass: GrantCodesFooter,
	react: React,
})

export const FooterColumn = createComponent({
	tagName: "grantcodes-footer-column",
	elementClass: GrantCodesFooterColumn,
	react: React,
})
