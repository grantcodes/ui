import React from "react"
import { createComponent } from "@lit/react"
import { GrantCodesGalleryImage } from "./gallery-image.js"

export const GalleryImage = createComponent({
	tagName: "grantcodes-gallery-image",
	elementClass: GrantCodesGalleryImage,
	react: React,
})
