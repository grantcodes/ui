import { describe, it, before } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

describe("todomap background token parity", () => {
  let content;

  before(() => {
    execSync("node ./build.js", { cwd: packageRoot, stdio: "pipe" });
    content = fs.readFileSync(
      path.join(packageRoot, "dist", "css", "todomap", "tokens.css"),
      "utf8"
    );
  });

  it("todomap tokens.css contains all background tokens present in grantcodes", () => {
    const requiredTokens = [
      "--g-theme-color-background-default-hover",
      "--g-theme-color-background-subtle-hover",
      "--g-theme-color-background-disabled",
      "--g-theme-color-background-transparent",
      "--g-theme-color-background-transparent-strong",
    ];
    for (const tokenName of requiredTokens) {
      assert.match(
        content,
        new RegExp(tokenName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ":"),
        `Expected ${tokenName} to exist in todomap tokens.css`
      );
    }
  });
});
