/**
 * SSR CONSTRUCTOR DIAGNOSTICS
 *
 * Migration-focused SSR constructor guard and message builder for
 * @grantcodes/astro.  Classifies custom element registration states
 * that map to realistic migrated-app SSR failures and builds
 * actionable, tag-aware error messages.
 *
 * Environment-split output:
 *   - Development (isDev=true):  full remediation detail with likely
 *     causes and next steps per D-01, D-02, D-03.
 *   - Production  (isDev=false): shorter output that still names the
 *     failing tag and likely-cause category per D-09, D-10.
 *
 * Design constraints (D-06, D-08):
 *   - Infers only from the tag name, constructor lookup result, and
 *     constructor shape.  Does NOT scan project config, docs, or
 *     filesystem.
 *   - Stays local to the SSR adapter.
 */

export type SsrDiagnosticCategory =
  | 'missing-registration'
  | 'invalid-constructor'
  | 'non-lit-constructor';

export interface SsrDiagnosticResult {
  eligible: boolean;
  category?: SsrDiagnosticCategory;
  message: string;
}

// ── Helpers ──────────────────────────────────

function lookupConstructor(tagName: string): typeof HTMLElement | null {
  if (typeof customElements !== 'undefined') {
    return customElements.get(tagName) || null;
  }
  return null;
}

// ── Message builders ─────────────────────────

function buildDevMessage(tagName: string, category: SsrDiagnosticCategory): string {
  switch (category) {
    case 'missing-registration':
      return (
        `[SSR Error] <${tagName}> is not a registered custom element.\n` +
        `\n` +
        `Likely causes:\n` +
        `  - The component import is missing or the element is not registered via customElements.define().\n` +
        `  - If you migrated from manual Lit SSR wiring, check that the import path is correct.\n` +
        `  - Leftover manual vite.ssr.noExternal or resolve.noExternal overrides may prevent registration.\n` +
        `\n` +
        `Next steps:\n` +
        `  - Import the component in your Astro component frontmatter.\n` +
        `  - Verify the element is registered after import.\n` +
        `  - If SSR is not needed, use client:only="lit" to render this component in the browser only.\n` +
        `\n` +
        `See MIGRATION.md for the full migration guide.`
      );

    case 'invalid-constructor':
      return (
        `[SSR Error] <${tagName}> has an invalid constructor registration.\n` +
        `\n` +
        `customElements.get('${tagName}') returned a non-constructor value.\n` +
        `\n` +
        `Likely causes:\n` +
        `  - A third-party script or leftover migration polyfill registered incorrectly.\n` +
        `  - A leftover vite.resolve.noExternal override may interfere with the element registry.\n` +
        `\n` +
        `Next steps:\n` +
        `  - Check what customElements.get('${tagName}') returns in your environment.\n` +
        `  - Review astro.config.mjs for leftover Vite overrides.\n` +
        `  - If SSR is not needed, use client:only="lit" to render this component in the browser only.\n` +
        `\n` +
        `See MIGRATION.md for the full migration guide.`
      );

    case 'non-lit-constructor':
      return (
        `[SSR Error] <${tagName}> is registered but not a Lit element.\n` +
        `\n` +
        `The constructor for <${tagName}> exists in the custom element registry ` +
        `but is not Lit-based (missing _$litElement$).\n` +
        `\n` +
        `Likely causes:\n` +
        `  - The component extends HTMLElement directly instead of LitElement.\n` +
        `  - A different web component library registered under this tag name,\n` +
        `    possibly from leftover migration dependencies.\n` +
        `\n` +
        `Next steps:\n` +
        `  - Use only LitElement-based components for SSR compatibility.\n` +
        `  - If SSR is not needed, use client:only="lit" to render this component in the browser only.\n` +
        `  - For non-Lit elements, consider Astro's built-in HTML rendering.\n` +
        `\n` +
        `See MIGRATION.md for the full migration guide.`
      );
  }
}

function buildProdMessage(tagName: string, category: SsrDiagnosticCategory): string {
  const causeHint: Record<SsrDiagnosticCategory, string> = {
    'missing-registration':
      'not imported or registered in the custom element registry',
    'invalid-constructor':
      'has an invalid or non-constructor registration',
    'non-lit-constructor':
      'registered element is not a LitElement component',
  };

  return (
    `[SSR Error] <${tagName}> cannot be SSR-rendered: ${causeHint[category]}. ` +
    `For detailed guidance, run in development mode or use client:only="lit".`
  );
}

// ── Public API ───────────────────────────────

/**
 * Build a diagnostic message for a given tag and category,
 * choosing the environment-appropriate level of detail.
 *
 * Exported separately so tests can verify the dev/prod split
 * without needing a real element registration.
 */
export function buildSsrDiagnosticMessage(
  tagName: string,
  category: SsrDiagnosticCategory,
  isDev: boolean,
): string {
  return isDev
    ? buildDevMessage(tagName, category)
    : buildProdMessage(tagName, category);
}

/**
 * Classify a custom element tag for SSR eligibility.
 *
 * Returns:
 *   - `eligible: true`  when the constructor exists and is Lit-based.
 *   - `eligible: false` with a `category` and `message` explaining
 *     the failure when registration is missing, invalid, or not Lit.
 */
export function getSsrConstructorDiagnostic(
  tagName: string,
  isDev: boolean = true,
): SsrDiagnosticResult {
  const Ctr = lookupConstructor(tagName);

  if (!Ctr) {
    return {
      eligible: false,
      category: 'missing-registration',
      message: buildSsrDiagnosticMessage(tagName, 'missing-registration', isDev),
    };
  }

  if (typeof Ctr !== 'function') {
    return {
      eligible: false,
      category: 'invalid-constructor',
      message: buildSsrDiagnosticMessage(tagName, 'invalid-constructor', isDev),
    };
  }

  if (!(Ctr as unknown as Record<string, unknown>)._$litElement$) {
    return {
      eligible: false,
      category: 'non-lit-constructor',
      message: buildSsrDiagnosticMessage(tagName, 'non-lit-constructor', isDev),
    };
  }

  return { eligible: true, message: '' };
}
