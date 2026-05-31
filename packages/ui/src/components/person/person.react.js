import React from "react";
import { createComponent } from "@lit/react";
import { GrantCodesPerson } from "./person.js";

export const Person = createComponent({
	tagName: "grantcodes-person",
	elementClass: GrantCodesPerson,
	react: React,
});
