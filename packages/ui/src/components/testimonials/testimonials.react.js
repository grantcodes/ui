import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesTestimonials } from "./testimonials.js"

export const Testimonials = createComponent({
	tagName: "grantcodes-testimonials",
	elementClass: GrantCodesTestimonials,
	react: React,
})
