/**
 * Server DOM Shim
 *
 * Patches browser globals (customElements, HTMLElement, document) for Node.js SSR
 * using @lit-labs/ssr-dom-shim (^1.3.0, direct dependency of @grantcodes/astro).
 *
 * WARNING (PITFALLS #7): These globals leak into the Node.js process and can
 * interfere with other libraries that check for window/document existence to
 * detect browser environment. The @semantic-ui/astro-lit README explicitly
 * documents this limitation.
 *
 * Phase 29 will implement:
 *   - customElements.define() patching for tag name tracking
 *   - HTMLElement shim for Lit component instantiation on server
 *   - document shim with minimal DOM API surface
 *
 * For now (placeholder): exports nothing, document the intent.
 */

export {};
