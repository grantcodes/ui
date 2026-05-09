import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const monorepoPackages = path.resolve(packageRoot, "..");
const monorepoRoot = path.resolve(monorepoPackages, "..");

function findCommand(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: "pipe" });
    return cmd;
  } catch {
    return null;
  }
}

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

describe("@grantcodes/astro smoke test", () => {
  it("builds a minimal Astro project with DSD output", () => {
    const tempDir = path.join("/tmp", `astro-smoke-test-${Date.now()}`);
    let html = "";

    try {
      const localPkgs = path.join(tempDir, ".local-packages");
      const astroPkg = path.join(localPkgs, "astro");
      const uiPkg = path.join(localPkgs, "ui");
      const styleDictPkg = path.join(localPkgs, "style-dictionary");

      copyDirSync(packageRoot, astroPkg);
      copyDirSync(path.resolve(monorepoRoot, "packages", "ui"), uiPkg);
      copyDirSync(
        path.resolve(monorepoRoot, "packages", "style-dictionary"),
        styleDictPkg
      );

      sanitizePkg(astroPkg, {
        "@grantcodes/ui": `file:${uiPkg}`,
        "@grantcodes/style-dictionary": `file:${styleDictPkg}`,
      });
      sanitizePkg(uiPkg, {
        "@grantcodes/style-dictionary": `file:${styleDictPkg}`,
      });

      fs.mkdirSync(path.join(tempDir, "src", "pages"), { recursive: true });

      fs.writeFileSync(
        path.join(tempDir, "package.json"),
        JSON.stringify(
          {
            name: "astro-smoke-test",
            type: "module",
            dependencies: {
              astro: "^6.0.0",
              "@grantcodes/astro": `file:${astroPkg}`,
              "@grantcodes/ui": `file:${uiPkg}`,
              lit: "^3.2.0",
            },
          },
          null,
          2
        )
      );

      fs.writeFileSync(
        path.join(tempDir, "astro.config.mjs"),
        `import { defineConfig } from 'astro/config';\n` +
          `import ui from '@grantcodes/astro';\n` +
          `export default defineConfig({\n` +
          `  integrations: [ui()],\n` +
          `});\n`
      );

      fs.writeFileSync(
        path.join(tempDir, "src", "pages", "index.astro"),
        `---\n` +
          `import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';\n` +
          `---\n` +
          `<html>\n` +
          `  <body>\n` +
          `    <GrantCodesButton>Smoke Test</GrantCodesButton>\n` +
          `  </body>\n` +
          `</html>\n`
      );

      const pkgManager = "npm";

      execSync(`${pkgManager} install`, {
        cwd: tempDir,
        stdio: "pipe",
        encoding: "utf8",
        timeout: 120000,
      });

      execSync("npx astro build", {
        cwd: tempDir,
        stdio: "pipe",
        encoding: "utf8",
        timeout: 120000,
      });

      html = fs.readFileSync(path.join(tempDir, "dist", "index.html"), "utf8");
      assert.match(html, /<template shadowroot="open" shadowrootmode="open">/);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
