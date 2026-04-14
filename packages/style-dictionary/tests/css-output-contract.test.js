import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const THEMES = ["grantcodes", "wireframe", "todomap", "grantina"];
const REQUIRED_KEYS = [
	"--g-theme-color-background-default:",
	"--g-color-neutral-100:",
	"--g-theme-typography-body-font-size:",
	"--g-theme-spacing-md:",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

describe("CSS output contract", () => {
	it("build emits only supported CSS contract entries per theme", () => {
		execSync("node ./build.js", {
			cwd: packageRoot,
			stdio: "pipe",
			encoding: "utf8",
		});

		for (const theme of THEMES) {
			const tokensPath = path.join(packageRoot, "dist", "css", theme, "tokens.css");
			const defaultVariablesPath = path.join(
				packageRoot,
				"dist",
				"css",
				theme,
				"default-variables.css",
			);

			assert.ok(
				fs.existsSync(tokensPath),
				`Expected tokens.css to exist for theme ${theme}`,
			);
			assert.ok(
				!fs.existsSync(defaultVariablesPath),
				`Expected default-variables.css to be absent for theme ${theme}`,
			);

			const tokensContent = fs.readFileSync(tokensPath, "utf8");
			for (const requiredKey of REQUIRED_KEYS) {
				assert.match(
					tokensContent,
					new RegExp(requiredKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
					`Expected ${requiredKey} in ${theme}/tokens.css`,
				);
			}
		}
	});
});
