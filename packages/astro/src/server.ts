// Import the DOM shim FIRST — side-effect order matters for SSR
import "../shims/server-shim.ts";

import { check, renderToStaticMarkup } from "./ssr/lit-renderer.js";

export default {
	name: "@grantcodes/astro",
	check,
	renderToStaticMarkup,
};
