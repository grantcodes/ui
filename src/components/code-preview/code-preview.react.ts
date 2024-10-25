import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesCodePreview } from "./code-preview.component";

export const CodePreview = createComponent({
	tagName: "grantcodes-code-preview",
	elementClass: GrantCodesCodePreview,
	react: React,
});
