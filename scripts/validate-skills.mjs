#!/usr/bin/env node
/**
 * Validates bundled consumer skills under skills/<name>/SKILL.md.
 * Dependency-free: run after `pnpm build:ui` regenerates the CEM.
 *
 * Checks:
 * - YAML frontmatter name/description; folder name matches name
 * - SKILL.md stays under 500 lines
 * - relative Markdown links resolve inside the skill directory
 * - no absolute paths or parent-directory escapes in links/code paths
 * - catalogue.md mentions every CEM custom element and Astro block export
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const skillName = 'grantcodes-design-system';
const skillDir = join(skillsDir, skillName);
const errors = [];

function fail(message) {
  errors.push(message);
}

const mentions = (text, name) =>
  new RegExp(`(?<![\\w-])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).test(text);

if (!existsSync(join(skillDir, 'SKILL.md'))) {
  console.error(`Missing skills/${skillName}/SKILL.md`);
  process.exit(1);
}

const skillText = readFileSync(join(skillDir, 'SKILL.md'), 'utf8');

// --- frontmatter -----------------------------------------------------------
const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(skillText);
if (!frontmatter) {
  fail('SKILL.md: missing YAML frontmatter');
} else {
  const body = frontmatter[1];
  const name = /^name:\s*(.+)$/m.exec(body)?.[1]?.trim();
  const description = /^description:\s*(.+)$/m.exec(body)?.[1]?.trim();
  if (name !== skillName) fail(`SKILL.md: name must be "${skillName}", got ${JSON.stringify(name)}`);
  if (!description || description.length < 40) fail('SKILL.md: description missing or too short to trigger reliably');
}

const lineCount = skillText.split('\n').length;
if (lineCount > 500) fail(`SKILL.md: ${lineCount} lines exceeds the 500-line budget`);

// --- files, links, paths ---------------------------------------------------
const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else files.push(path);
  }
})(skillDir);

const markdownFiles = files.filter((file) => file.endsWith('.md'));
const inSkill = (path) => {
  const rel = relative(skillDir, resolve(path));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
};

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');
  const display = relative(root, file);

  for (const match of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    if (target.startsWith('/') || target.startsWith('~')) {
      fail(`${display}: absolute link not allowed: ${target}`);
      continue;
    }
    const resolved = resolve(dirname(file), target.split('#')[0]);
    if (!inSkill(resolved)) fail(`${display}: link escapes skill directory: ${target}`);
    else if (!existsSync(resolved)) fail(`${display}: broken relative link: ${target}`);
  }

  // Paths in code fences should not require a monorepo checkout or home dirs.
  for (const fence of text.matchAll(/```[\s\S]*?```/g)) {
    const block = fence[0];
    for (const m of block.matchAll(/(?:from\s+|import\s+['"])([^'"\n]+)['"]/g)) {
      const spec = m[1];
      if (spec.startsWith('@grantcodes/') || spec.startsWith('lit') || spec.startsWith('vite') || spec.startsWith('astro') || spec.startsWith('react') || spec.startsWith('node:')) continue;
      if (spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('~/')) {
        fail(`${display}: local/absolute module path is not portable: ${spec}`);
      }
    }
  }
}

if (!existsSync(join(skillDir, 'references', 'catalogue.md'))) {
  fail('references/catalogue.md: missing');
} else {
  const catalogue = readFileSync(join(skillDir, 'references', 'catalogue.md'), 'utf8');

  // --- CEM inventory -------------------------------------------------------
  const cemPath = join(root, 'packages/ui/custom-elements.json');
  if (!existsSync(cemPath)) {
    fail('packages/ui/custom-elements.json missing; run `pnpm build:ui` before validating');
  } else {
    let cem;
    try {
      cem = JSON.parse(readFileSync(cemPath, 'utf8'));
    } catch (error) {
      fail(`custom-elements.json is not valid JSON: ${error.message}`);
    }
    if (cem) {
      const tags = new Set();
      for (const module of cem.modules ?? []) {
        for (const declaration of module.declarations ?? []) {
          if (declaration.customElement && declaration.tagName) tags.add(declaration.tagName);
        }
      }
      if (tags.size === 0) fail('CEM contains no custom elements; refusing to validate an empty inventory');
      for (const tag of [...tags].sort()) {
        if (!mentions(catalogue, tag)) fail(`catalogue.md: missing CEM element ${tag}`);
      }

      // Registration files named in the catalogue table must exist in source
      // (published specifiers keep .js while sources may be .ts).
      for (const match of catalogue.matchAll(/\|\s*`(grantcodes-[a-z0-9-]+)`\s*\|\s*`([^`]+)`/g)) {
        const base = join(root, 'packages/ui/src', match[2]);
        const candidates = [base, base.replace(/\.js$/, '.ts')];
        if (!candidates.some(existsSync)) {
          fail(`catalogue.md: ${match[1]} import path does not exist: packages/ui/src/${match[2]}`);
        }
      }
    }
  }

  // --- Astro block exports -------------------------------------------------
  const blocksPath = join(root, 'packages/astro/src/blocks/index.ts');
  if (!existsSync(blocksPath)) {
    fail('packages/astro/src/blocks/index.ts missing; cannot verify block coverage');
  } else {
    const source = readFileSync(blocksPath, 'utf8');
    const exported = new Set();
    for (const match of source.matchAll(/export\s*\{\s*default as (\w+)\s*\}/g)) exported.add(match[1]);
    if (/export\s*\*\s+from\s+['"]\.\/schemas\/index\.ts['"]/.test(source)) {
      exported.add('blockSchema');
    }
    if (exported.size === 0) fail('No Astro block exports found; refusing to validate an empty inventory');
    for (const name of exported) {
      if (!mentions(catalogue, name)) fail(`catalogue.md: missing Astro block export ${name}`);
    }
  }
}

// --- skill size ------------------------------------------------------------
const totalBytes = files.reduce((sum, file) => sum + statSync(file).size, 0);
if (totalBytes > 400_000) fail(`Skill exceeds 400 kB (${totalBytes} bytes); trim references`);

if (errors.length) {
  console.error(`Skill validation failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Validated skills/${skillName}: ${markdownFiles.length} markdown files, ${totalBytes} bytes.`);
