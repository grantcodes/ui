import { cssImportAttributes } from "@grantcodes/ui/vite-plugin";

export function getViteConfig() {
	return {
		optimizeDeps: {
			exclude: ["@grantcodes/ui"],
		},
		ssr: {
			noExternal: ["@grantcodes/ui"],
		},
		plugins: [cssImportAttributes()],
	};
}
