import { describe, it, before } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

describe("wireframe font-scale parity", () => {
  let content;

  before(() => {
    execSync("node ./build.js", { cwd: packageRoot, stdio: "pipe" });
    content = fs.readFileSync(
      path.join(packageRoot, "dist", "css", "wireframe", "tokens.css"),
      "utf8"
    );
  });

  it("wireframe tokens.css contains font-scale tokens identical to grantcodes", () => {
    assert.match(content, /--g-typography-font-scale-sm:\s*1\.333;/);
    assert.match(content, /--g-typography-font-scale-lg:\s*1\.5;/);
    assert.match(
      content,
      /--g-typography-font-scale-default:\s*var\(--g-typography-font-scale-sm\);/
    );
  });

  it("wireframe font-size-xs through font-size-display are calc() expressions, not static rem", () => {
    for (const key of [
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "display",
    ]) {
      assert.match(
        content,
        new RegExp("--g-typography-font-size-" + key + ":\\s*calc\\("),
        `Expected --g-typography-font-size-${key} to be a calc() expression`
      );
      assert.doesNotMatch(
        content,
        new RegExp(
          "--g-typography-font-size-" + key + ":\\s*[\\d.]+rem"
        ),
        `Expected --g-typography-font-size-${key} to NOT be a static rem value`
      );
    }
  });

  it("wireframe tier-2 h1/h2/h3 font-size reference calc-based font-size tokens", () => {
    // outputReferences: true means tier-2 tokens emit var() references to the tier-1 calc tokens
    assert.match(content, /--g-theme-typography-h1-font-size:\s*var\(--g-typography-font-size-/);
    assert.match(content, /--g-theme-typography-h2-font-size:\s*var\(--g-typography-font-size-/);
    assert.match(content, /--g-theme-typography-h3-font-size:\s*var\(--g-typography-font-size-/);
  });
});

describe("todomap font-scale parity", () => {
  let content;

  before(() => {
    execSync("node ./build.js", { cwd: packageRoot, stdio: "pipe" });
    content = fs.readFileSync(
      path.join(packageRoot, "dist", "css", "todomap", "tokens.css"),
      "utf8"
    );
  });

  it("todomap tokens.css contains font-scale tokens identical to grantcodes", () => {
    assert.match(content, /--g-typography-font-scale-sm:\s*1\.333;/);
    assert.match(content, /--g-typography-font-scale-lg:\s*1\.5;/);
    assert.match(
      content,
      /--g-typography-font-scale-default:\s*var\(--g-typography-font-scale-sm\);/
    );
  });

  it("todomap font-size-xs through font-size-display are calc() expressions, not static rem", () => {
    for (const key of [
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "display",
    ]) {
      assert.match(
        content,
        new RegExp("--g-typography-font-size-" + key + ":\\s*calc\\("),
        `Expected --g-typography-font-size-${key} to be a calc() expression`
      );
      assert.doesNotMatch(
        content,
        new RegExp(
          "--g-typography-font-size-" + key + ":\\s*[\\d.]+rem"
        ),
        `Expected --g-typography-font-size-${key} to NOT be a static rem value`
      );
    }
  });

  it("todomap tier-2 h1/h2/h3 font-size reference calc-based font-size tokens", () => {
    // outputReferences: true means tier-2 tokens emit var() references to the tier-1 calc tokens
    assert.match(content, /--g-theme-typography-h1-font-size:\s*var\(--g-typography-font-size-/);
    assert.match(content, /--g-theme-typography-h2-font-size:\s*var\(--g-typography-font-size-/);
    assert.match(content, /--g-theme-typography-h3-font-size:\s*var\(--g-typography-font-size-/);
  });
});
