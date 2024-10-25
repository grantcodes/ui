import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesGallery } from "./gallery.component";

export const Gallery = createComponent({
	tagName: "grantcodes-gallery",
	elementClass: GrantCodesGallery,
	react: React,
});
