import * as React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesNotice } from "./notice.component";

export const Notice = createComponent({
	tagName: "grantcodes-notice",
	elementClass: GrantCodesNotice,
	react: React,
});
