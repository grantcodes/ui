import { defineConfig } from "vite";
import { cssImportAttributes } from "./vite-plugin-css-import-attributes.js";

export default defineConfig({
	plugins: [cssImportAttributes()],
	build: {
		lib: {
			entry: "src/main.js",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["lit", "@grantcodes/style-dictionary", "react", "@lit/react"],
		},
	},
});
