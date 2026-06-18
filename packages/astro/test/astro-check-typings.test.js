/**
 * astro-check-typings.test.js
 *
 * Verifies that the generated UI component type declarations (injected via
 * injectTypes) make `astro check` accept valid component props and reject
 * invalid ones.
 *
 * Uses the same temp-project pattern as smoke.test.js.
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const monorepoRoot = path.resolve(packageRoot, "..", "..");

// --------------------------------------------------------------------------
// Helpers (same pattern as smoke.test.js)
// --------------------------------------------------------------------------

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function sanitizePkg(pkgPath, overrides) {
  const pkgJsonPath = path.join(pkgPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  if (pkg.dependencies) {
    for (const [dep, replacement] of Object.entries(overrides)) {
      if (pkg.dependencies[dep]) {
        pkg.dependencies[dep] = replacement;
      }
    }
  }
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
}

// --------------------------------------------------------------------------
// Tests
// --------------------------------------------------------------------------

describe("@grantcodes/astro astro check typings", () => {
  it("passes valid component props and rejects invalid ones", () => {
    const tempDir = path.join("/tmp", `astro-check-typings-${Date.now()}`);

    try {
      // ---- 1. Copy local packages ----
      const localPkgs = path.join(tempDir, ".local-packages");
      const astroPkg = path.join(localPkgs, "astro");
      const uiPkg = path.join(localPkgs, "ui");
      const styleDictPkg = path.join(localPkgs, "style-dictionary");

      copyDirSync(packageRoot, astroPkg);
      copyDirSync(
        path.resolve(monorepoRoot, "packages", "ui"),
        uiPkg,
      );
      copyDirSync(
        path.resolve(monorepoRoot, "packages", "style-dictionary"),
        styleDictPkg,
      );

      sanitizePkg(astroPkg, {
        "@grantcodes/ui": `file:${uiPkg}`,
        "@grantcodes/style-dictionary": `file:${styleDictPkg}`,
      });
      sanitizePkg(uiPkg, {
        "@grantcodes/style-dictionary": `file:${styleDictPkg}`,
      });

      // ---- 2. Create project ----
      fs.mkdirSync(path.join(tempDir, "src", "pages"), { recursive: true });

      // package.json
      fs.writeFileSync(
        path.join(tempDir, "package.json"),
        JSON.stringify(
          {
            name: "astro-check-typings",
            type: "module",
            dependencies: {
              astro: "^6.0.0",
              "@grantcodes/astro": `file:${astroPkg}`,
              "@grantcodes/ui": `file:${uiPkg}`,
              "@astrojs/check": "^0.9.0",
              typescript: "^5.0.0",
              lit: "^3.2.0",
            },
          },
          null,
          2,
        ),
      );

      // tsconfig.json – required by astro check
      fs.writeFileSync(
        path.join(tempDir, "tsconfig.json"),
        JSON.stringify(
          {
            extends: "astro/tsconfigs/base",
          },
          null,
          2,
        ),
      );

      // astro.config.mjs
      fs.writeFileSync(
        path.join(tempDir, "astro.config.mjs"),
        [
          `import { defineConfig } from 'astro/config';`,
          `import ui from '@grantcodes/astro';`,
          `export default defineConfig({ integrations: [ui()] });`,
        ].join("\n"),
      );

      // ---- 3. Positive fixture: valid props that should pass astro check ----
      fs.writeFileSync(
        path.join(tempDir, "src", "pages", "positive.astro"),
        [
          "---",
          "import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';",
          "import { GrantCodesPagination } from '@grantcodes/ui/components/pagination/index.js';",
          "import { GrantCodesAccordionItem } from '@grantcodes/ui/components/accordion/index.js';",
          "---",
          "<html>",
          "  <body>",
          // Button with valid props
          '    <GrantCodesButton disabled href="/test">Works</GrantCodesButton>',
          // Pagination with camelCase property-style props (constructor DX)
          "    <GrantCodesPagination previousHref='/prev' nextHref='/next' page={1} pages={5} />",
          // AccordionItem with valid props
          '    <GrantCodesAccordionItem open title="FAQ">Content</GrantCodesAccordionItem>',
          "  </body>",
          "</html>",
          "",
        ].join("\n"),
      );

      // ---- 4. Negative fixture: invalid prop that should fail astro check ----
      fs.writeFileSync(
        path.join(tempDir, "src", "pages", "negative.astro"),
        [
          "---",
          "import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';",
          "---",
          "<html>",
          "  <body>",
          // nonexistentProp is not in ButtonProps, AstroBaseAttrs, or AstroBuiltinAttributes
          '    <GrantCodesButton nonexistentProp="oops">Should Fail</GrantCodesButton>',
          "  </body>",
          "</html>",
          "",
        ].join("\n"),
      );

      // ---- 5. Known-prop-on-wrong-constructor fixture ----
      //
      // A CEM-derived prop that belongs to one component (here `page` from
      // PaginationProps) is used on a *different* component
      // (GrantCodesButton).  This does NOT error because the prop is
      // declared in the global `IntrinsicAttributes` augmentation, making
      // it additive across all components.
      //
      // This is an intentional tradeoff: the augmentation approach makes
      // valid Lit-element props pass type-checking when used on their own
      // component, at the cost of being permissively available on every
      // component.  A truly unknown prop (nonexistentProp) is still
      // rejected.  If per-component strictness is needed later, the
      // augmentation could be narrowed.
      //
      // This fixture exists to document and guard the current behaviour.
      // eslint-disable-next-line no-unused-expressions
      fs.writeFileSync(
        path.join(tempDir, "src", "pages", "wrong-constructor-known-prop.astro"),
        [
          "---",
          "import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';",
          "---",
          "<html>",
          "  <body>",
          // "page" is a Pagination prop, used here on Button as a known
          // tradeoff — must NOT produce a type error.
          "    <GrantCodesButton page={1}>Known-wide-prop</GrantCodesButton>",
          "  </body>",
          "</html>",
          "",
        ].join("\n"),
      );

      // ---- 6. Install dependencies ----
      execSync("npm install", {
        cwd: tempDir,
        stdio: "pipe",
        encoding: "utf8",
        timeout: 300000,
      });

      // ---- 7. Run astro check ----
      let checkStdout = "";
      let checkStderr = "";
      let checkExitCode = 0;

      try {
        const result = execSync("npx astro check 2>&1", {
          cwd: tempDir,
          stdio: "pipe",
          encoding: "utf8",
          timeout: 180000,
        });
        checkStdout = result.stdout || "";
        checkStderr = result.stderr || "";
      } catch (e) {
        checkStdout = e.stdout || "";
        checkStderr = e.stderr || "";
        checkExitCode = e.status;
      }

      const combinedOutput = checkStdout + checkStderr;

      console.log(`[astro-check] exit code: ${checkExitCode}`);
      console.log(`[astro-check] stdout:\n${checkStdout.slice(0, 2000)}`);
      if (checkStderr) {
        console.log(`[astro-check] stderr:\n${checkStderr.slice(0, 1000)}`);
      }

      // ---- 8. Assertions ----

      // Positive fixture: no type errors for valid prop usage
      const positiveHasError =
        combinedOutput.includes("positive.astro") &&
        (combinedOutput.includes("error") || combinedOutput.includes("Error"));
      assert.ok(
        !positiveHasError,
        `positive.astro should have NO type errors but got:\n${combinedOutput}`,
      );

      // Negative fixture: type error reported for invalid prop
      const negativeHasError =
        combinedOutput.includes("negative.astro") &&
        (combinedOutput.includes("error") || combinedOutput.includes("Error"));
      assert.ok(
        negativeHasError,
        `negative.astro SHOULD have a type error but exit code was ${checkExitCode}. Output:\n${combinedOutput}`,
      );

      // Verify the error message mentions the invalid prop name
      assert.ok(
        combinedOutput.includes("nonexistentProp"),
        `The error should mention "nonexistentProp". Output:\n${combinedOutput}`,
      );

      // Known-prop-on-wrong-constructor fixture: must NOT error (documented
      // tradeoff — the prop `page` is globally available via IntrinsicAttributes
      // augmentation).
      const wrongKnownPropHasError =
        combinedOutput.includes("wrong-constructor-known-prop.astro") &&
        (combinedOutput.includes("error") || combinedOutput.includes("Error"));
      assert.ok(
        !wrongKnownPropHasError,
        `wrong-constructor-known-prop.astro should have NO error (known tradeoff) but got:\n${combinedOutput}`,
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
