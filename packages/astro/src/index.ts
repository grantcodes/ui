/**
 * @grantcodes/astro — Zero-config Astro integration for @grantcodes/ui Lit web components.
 *
 * Phase 29 will implement:
 * - addRenderer() registration for Lit SSR
 * - injectScript() for DSD polyfill and hydration support
 * - updateConfig() for Vite configuration (cssImportAttributes plugin, noExternal, optimizeDeps)
 *
 * Follows the same default-export-function pattern as @grantcodes/astro-og-images.
 */

import type { AstroIntegration } from 'astro';

export default function integration(): AstroIntegration {
  return {
    name: '@grantcodes/astro',
    hooks: {},
  };
}
