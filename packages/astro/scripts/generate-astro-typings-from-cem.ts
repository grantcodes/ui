// generate-astro-typings-from-cem.ts
//
// Reads packages/ui/custom-elements.json and emits
// packages/astro/src/generated/ui-component-props.d.ts
//
// The generated file provides Astro-compatible type declarations for direct
// SSR constructor imports from @grantcodes/ui/components/ path.
//
// Run: pnpm --filter @grantcodes/astro exec tsx scripts/generate-astro-typings-from-cem.ts

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, "..");
const MONOREPO_ROOT = resolve(PACKAGE_ROOT, "..", "..");
const CEM_PATH = resolve(MONOREPO_ROOT, "packages", "ui", "custom-elements.json");
const OUTPUT_PATH = resolve(PACKAGE_ROOT, "src", "generated", "ui-component-props.d.ts");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CemAttribute {
  name: string;
  type?: { text?: string };
  description?: string;
  default?: string;
  fieldName?: string;
}

interface CemClassDeclaration {
  kind: "class";
  name: string;
  tagName?: string;
  customElement?: boolean;
  definitionPath?: string;
  modulePath?: string;
  attributes?: CemAttribute[];
  members?: Array<{
    kind: "field" | "method";
    name: string;
    privacy?: string;
    type?: { text?: string };
    attribute?: string;
    default?: string;
  }>;
}

interface CemExport {
  kind: "js" | "custom-element-definition";
  name: string;
  declaration?: {
    name: string;
    module: string;
  };
}

interface CemModule {
  kind: "javascript-module";
  path: string;
  declarations: CemClassDeclaration[];
  exports: CemExport[];
}

interface CemDocument {
  schemaVersion: string;
  modules: CemModule[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Map CEM type.text to a safe TypeScript type string.
function cemTypeToTs(typeText: string | undefined): string {
  if (!typeText || typeText.trim() === "") return "string";

  const t = typeText.trim();

  // Exact match for simple types
  const simple: Record<string, string> = {
    boolean: "boolean",
    string: "string",
    number: "number",
    object: "Record<string, unknown>",
    null: "unknown",
    undefined: "undefined",
  };
  if (simple[t] !== undefined) return simple[t];

  // JS String built-in
  if (t === "String") return "string";

  // Array patterns
  if (t.endsWith("[]")) return "unknown[]";
  if (t === "Array" || t === "any[]") return "unknown[]";

  // Literal unions like 'primary' | 'success' — keep as-is (valid TS)
  if (/^'[^']*'(?:\s*\|\s*'[^']*')*$/.test(t)) return t;

  // Complex unions that aren't literal unions — unsafe
  if (t.includes("|") && !t.includes("'")) return "unknown";

  // DOM type references
  if (/^HTMLElement/.test(t) || /^HTML[A-Z]/.test(t)) return "unknown";
  if (t.includes("TemplateResult") || t.includes("CustomEvent")) return "unknown";

  // Simple PascalCase identifiers — treat as unknown (likely a complex type)
  if (/^[A-Z][A-Za-z0-9_]+$/.test(t)) return "unknown";

  return "unknown";
}

// Clean a CEM member name: strip surrounding double quotes that Lit uses for
// hyphenated property names (e.g. `"days-label"` → `days-label`).
function cleanMemberName(raw: string): string {
  let s = raw.trim();
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  return s;
}

// Derive constructor-import props from a CEM class declaration.
//
// Astro templates pass props as JS property names (camelCase from Lit @property
// fields), NOT HTML attribute names (kebab-case).  We therefore prioritise
// CEM `members` over `attributes`, and add kebab-case aliases only when they
// differ from the JS property name, so consumers can use either style.
function deriveProps(decl: CemClassDeclaration): Record<string, string> {
  const props: Record<string, string> = {};
  const seen = new Set<string>();

  // 1. Public member fields → JS property names (constructor-import DX)
  if (decl.members) {
    for (const m of decl.members) {
      if (m.kind !== "field") continue;
      if (m.privacy !== "public") continue;

      const propName = cleanMemberName(m.name);
      if (!propName || propName.startsWith("_") || seen.has(propName)) continue;
      seen.add(propName);
      props[propName] = cemTypeToTs(m.type?.text);

      // Also emit the kebab-case HTML attribute name as an optional alias
      // when it differs from the JS property name.
      const attrName = m.attribute ? cleanMemberName(m.attribute) : undefined;
      if (attrName && attrName !== propName && !seen.has(attrName)) {
        seen.add(attrName);
        props[attrName] = cemTypeToTs(m.type?.text);
      }
    }
  }

  // 2. Attributes not already covered by a member → still expose them
  if (decl.attributes) {
    for (const attr of decl.attributes) {
      const name = cleanMemberName(attr.name);
      if (!name || name.startsWith("_") || seen.has(name)) continue;

      // If the attribute's fieldName matches a member we already processed,
      // skip it — we already have the JS property name.
      if (attr.fieldName && seen.has(cleanMemberName(attr.fieldName))) continue;
      seen.add(name);
      props[name] = cemTypeToTs(attr.type?.text);
    }
  }

  return props;
}

// Escape a prop name for use in a .d.ts interface (kebab-case gets quoted).
function escapePropName(name: string): string {
  if (name.includes("-")) return `"${name}"`;
  return name;
}

// Normalize a CEM module path (stripping leading "/").
function normPath(p: string): string {
  return p.replace(/^\/+/, "");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  console.log(`[generate] Reading CEM: ${CEM_PATH}`);
  const cemRaw = readFileSync(CEM_PATH, "utf-8");
  const cem: CemDocument = JSON.parse(cemRaw);

  // ---- Build lookup maps ----

  // Map from module path -> module
  const modByPath = new Map<string, CemModule>();
  for (const mod of cem.modules) {
    if (mod.kind === "javascript-module") {
      modByPath.set(normPath(mod.path), mod);
    }
  }

  // Map from class declaration name -> CemClassDeclaration
  const classByName = new Map<string, CemClassDeclaration>();
  for (const mod of cem.modules) {
    if (mod.kind !== "javascript-module") continue;
    for (const decl of mod.declarations) {
      if (decl.kind === "class" && decl.customElement) {
        classByName.set(decl.name, decl);
      }
    }
  }

  // ---- Resolve exports of each index.js module ----

  // For a given module, recursively resolve all named export names
  // (skipping "*" wildcard re-exports by following them).
  function resolveExports(modPath: string): Set<string> {
    const result = new Set<string>();
    const visited = new Set<string>();
    const queue = [normPath(modPath)];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);

      const mod = modByPath.get(current);
      if (!mod) continue;

      for (const exp of mod.exports) {
        if (exp.kind !== "js") continue;

        if (exp.name === "*") {
          // Follow the wildcard to the target module
          if (exp.declaration?.module) {
            queue.push(normPath(exp.declaration.module));
          }
        } else if (exp.name === "default") {
          // "default" export: follow to the class it references
          if (exp.declaration?.name && classByName.has(exp.declaration.name)) {
            result.add(exp.declaration.name);
          }
        } else {
          // Named export (e.g. "GrantCodesButton")
          result.add(exp.name);
        }
      }
    }

    return result;
  }

  // ---- Collect public entrypoints ----

  interface ComponentEntry {
    importSpec: string;
    className: string;
    props: Record<string, string>;
    isPrimary: boolean; // whether this class is the default export
  }

  const entries: ComponentEntry[] = [];

  for (const mod of cem.modules) {
    if (mod.kind !== "javascript-module") continue;
    const p = normPath(mod.path);

    // Only public entrypoints under src/components/*/index.js
    if (!/^src\/components\/[^/]+\/index\.js$/.test(p)) continue;

    // Skip internal modules
    if (/\/internal\//.test(p)) continue;

    const importSpec = p.replace(/^src\/components\//, "@grantcodes/ui/components/");

    // Resolve all exported names from this module
    const exportedNames = resolveExports(p);

    if (exportedNames.size === 0) continue;

    // Determine the default export class name — only when the outer entrypoint
    // module itself exports `default`.  Do NOT fall back to a single named
    // export: many components (button, app-bar, pagination, …) use wildcard
    // re-exports without a default, and claiming a default they don't have
    // misleads consumers.
    let defaultClassName: string | undefined;
    for (const exp of mod.exports) {
      if (exp.kind === "js" && exp.name === "default") {
        if (exp.declaration?.name && exportedNames.has(exp.declaration.name)) {
          defaultClassName = exp.declaration.name;
        }
      }
    }

    for (const className of exportedNames) {
      const decl = classByName.get(className);
      if (!decl) {
        console.warn(`[generate] WARNING: class "${className}" referenced by ${p} but not found in CEM declarations`);
        continue;
      }
      entries.push({
        importSpec,
        className,
        props: deriveProps(decl),
        isPrimary: className === defaultClassName,
      });
    }
  }

  // ---- Generate output ----

  // Collect ALL unique props across all components for the IntrinsicAttributes
  // augmentation (see rationale below).
  const allGlobalProps = new Map<string, string>();
  for (const entry of entries) {
    for (const [key, tsType] of Object.entries(entry.props)) {
      if (!allGlobalProps.has(key)) {
        allGlobalProps.set(key, tsType);
      }
    }
  }
  // Add common HTML global attributes that users pass in Astro templates
  // but which are not derived from the CEM (they are added to every element
  // via Astro's static analysis / JSX).
  const htmlGlobals: Record<string, string> = {
    class: "string",
    id: "string",
    style: "string | Record<string, unknown>",
    slot: "string",
    title: "string",
    lang: "string",
    hidden: "boolean | string",
    tabindex: "number | string",
  };
  for (const [key, tsType] of Object.entries(htmlGlobals)) {
    if (!allGlobalProps.has(key)) {
      allGlobalProps.set(key, tsType);
    }
  }

  const lines: string[] = [
    "// -------------------------------------------------------------------------",
    "// Auto-generated from packages/ui/custom-elements.json",
    "// Do not edit by hand. Regenerate with:",
    "//   pnpm --filter @grantcodes/astro exec tsx scripts/generate-astro-typings-from-cem.ts",
    "// -------------------------------------------------------------------------",
    "",
    "// No top-level imports — this file must be fully self-contained so TypeScript",
    "// can resolve it regardless of module-resolution mode.",
    "",
    "// Astro's JSX type system checks framework-component props against an",
    "// intersection of the component's own type AND JSX.IntrinsicAttributes.",
    "// IntrinsicAttributes is very narrow by default, so valid Lit-element",
    "// props (disabled, previousHref, ...) would fail the intersection.",
    "// We augment IntrinsicAttributes with every known component prop so the",
    "// intersection succeeds. Each prop is optional, so HTML elements that",
    "// do not support a given prop are unaffected (their own type does not",
    "// include it and IntrinsicAttributes is additive).",
    'declare namespace astroHTML.JSX {',
    '  interface IntrinsicAttributes {',
  ];
  // Emit all known component props into IntrinsicAttributes
  for (const [key, tsType] of [...allGlobalProps.entries()].sort()) {
    lines.push(`    ${escapePropName(key)}?: ${tsType};`);
  }
  lines.push("  }");
  lines.push("}");
  lines.push("");
  lines.push("// -------------------------------------------------------------------------");
  lines.push("// Component type declarations");
  lines.push("// -------------------------------------------------------------------------");
  lines.push("");

  // Group by importSpec
  const grouped = new Map<string, ComponentEntry[]>();
  for (const entry of entries) {
    if (!grouped.has(entry.importSpec)) grouped.set(entry.importSpec, []);
    grouped.get(entry.importSpec)!.push(entry);
  }

  for (const [importSpec, group] of [...grouped.entries()].sort()) {
    lines.push(`declare module "${importSpec}" {`);
    lines.push("");

    for (const entry of group) {
      const propsName = `${entry.className.replace(/^GrantCodes/, "")}Props`;
      const keys = Object.keys(entry.props);

      lines.push(`  export interface ${propsName} {`);
      if (keys.length === 0) {
        lines.push("    [key: string]: unknown;");
      } else {
        for (const key of keys) {
          lines.push(`    ${escapePropName(key)}?: ${entry.props[key]};`);
        }
      }
      lines.push("  }");
      lines.push("");

      lines.push(`  export function ${entry.className}(props: ${propsName} & import("astro").AstroBuiltinAttributes): any;`);
      lines.push("");
    }

    // Default export — only emit when the entrypoint actually provides one
    const hasDefault = group.some((g) => g.isPrimary);
    if (hasDefault) {
      const primary = group.find((g) => g.isPrimary)!;
      lines.push(`  export default ${primary.className};`);
    }

    // Named exports
    for (const entry of group) {
      lines.push(`  export { ${entry.className} };`);
    }
    lines.push("}");
    lines.push("");
  }

  writeFileSync(OUTPUT_PATH, lines.join("\n"), "utf-8");
  console.log(`[generate] Wrote ${OUTPUT_PATH}`);
  console.log(`[generate] ${entries.length} constructors across ${grouped.size} modules`);
}

main();
