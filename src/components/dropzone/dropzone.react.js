import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesDropzone } from "./dropzone.component";

export const Dropzone = createComponent({
	tagName: "grantcodes-dropzone",
	elementClass: GrantCodesDropzone,
	react: React,
});
