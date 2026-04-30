import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesNotice } from "./notice.js";

export const Notice = createComponent({
	tagName: "grantcodes-notice",
	elementClass: GrantCodesNotice,
	react: React,
});
