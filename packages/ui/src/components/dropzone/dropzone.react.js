import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesDropzone } from "./dropzone.js";

export const Dropzone = createComponent({
	tagName: "grantcodes-dropzone",
	elementClass: GrantCodesDropzone,
	react: React,
});
