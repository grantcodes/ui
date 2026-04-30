import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesGallery } from "./gallery.js";

export const Gallery = createComponent({
	tagName: "grantcodes-gallery",
	elementClass: GrantCodesGallery,
	react: React,
});
