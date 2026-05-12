import { describe, it } from 'node:test';
import assert from 'node:assert';

// ═══════════════════════════════════════════════════════════
// Server-side DOM shim setup (mirrors shims/server-shim.ts
// in plain JavaScript so Node 26's TS parser is not needed)
// ═══════════════════════════════════════════════════════════
import { customElements as litCE, HTMLElement as litShimHTMLElement } from '@lit-labs/ssr-dom-shim';

if (typeof globalThis.document !== 'undefined' && globalThis.document) {
  globalThis.document.currentScript = null;
}

globalThis.HTMLElement = litShimHTMLElement;

globalThis.customElements = litCE;

const litCeDefine = globalThis.customElements.define.bind(globalThis.customElements);
globalThis.customElements.define = function shimDefine(tagName, Ctr) {
  Ctr[Symbol.for('tagName')] = tagName;
  return litCeDefine(tagName, Ctr);
};
// ═══════════════════════════════════════════════════════════

// Modules under test
import { getSsrConstructorDiagnostic, buildSsrDiagnosticMessage } from '../src/ssr/constructor-diagnostics.ts';
import { renderToStaticMarkup, check } from '../src/ssr/lit-renderer.ts';

// ──────────────────────────────────────────────
// Task 1: Diagnostic contract
// ──────────────────────────────────────────────
describe('SSR constructor diagnostic contract', () => {
  it('detects missing registration and names the tag with migration guidance', () => {
    const result = getSsrConstructorDiagnostic('unknown-custom-element');

    assert.strictEqual(result.eligible, false);
    assert.strictEqual(result.category, 'missing-registration');
    assert.ok(result.message.includes('unknown-custom-element'),
      'dev message must name the failing tag');
    assert.ok(result.message.includes('client:only'),
      'dev message must mention client:only as intentional alternative');
    assert.ok(result.message.includes('import') || result.message.includes('registration'),
      'dev message must reference missing import or registration');
  });

  it('detects registered non-Lit constructors with tag-aware SSR ineligibility message', () => {
    const tagName = 'non-lit-ssr-test';
    class NonLit extends HTMLElement {}
    customElements.define(tagName, NonLit);

    const result = getSsrConstructorDiagnostic(tagName);

    assert.strictEqual(result.eligible, false);
    assert.strictEqual(result.category, 'non-lit-constructor');
    assert.ok(result.message.includes(tagName),
      'message must name the failing tag');
  });

  it('production diagnostic is shorter than dev but names tag and cause category', () => {
    const tagNameForMsg = 'some-component';
    const devMsg = buildSsrDiagnosticMessage(tagNameForMsg, 'missing-registration', true);
    const prodMsg = buildSsrDiagnosticMessage(tagNameForMsg, 'missing-registration', false);

    assert.ok(prodMsg.length < devMsg.length,
      'production message must be shorter than development message');
    assert.ok(prodMsg.includes(tagNameForMsg),
      'production message must name the failing tag');
    assert.ok(prodMsg.includes('register') || prodMsg.includes('import'),
      'production message must reference the cause category');
  });
});

// ──────────────────────────────────────────────
// Task 2: Render path wiring
// ──────────────────────────────────────────────
describe('SSR render path pre-check', () => {
  it('renderToStaticMarkup throws before LitElementRenderer for missing tag', async () => {
    await assert.rejects(
      () => renderToStaticMarkup('completely-unknown-tag-xyz'),
      /completely-unknown-tag-xyz/,
      'must throw a tag-aware error for missing registrations'
    );
  });

  it('renders valid Lit element with Declarative Shadow DOM output', async () => {
    const { LitElement, html } = await import('lit');
    const tagName = 'test-ssr-valid-lit';

    class TestValidLit extends LitElement {
      render() {
        return html`<p>SSR works</p>`;
      }
    }
    customElements.define(tagName, TestValidLit);

    const result = await renderToStaticMarkup(tagName, { class: 'test' });

    assert.ok(result.html.includes(tagName),
      'output must contain the component tag');
    assert.ok(result.html.includes('<template shadowroot=') ||
      result.html.includes('<template shadowrootmode=') ||
      result.html.includes('shadowroot'),
      'output must include Declarative Shadow DOM');
  });

  it('render path throws instead of auto-downgrading to placeholder markup', async () => {
    await assert.rejects(
      () => renderToStaticMarkup('does-not-exist-never-registered'),
      (err) => {
        assert.ok(err instanceof Error, 'must throw an Error instance');
        assert.ok(
          err.message.includes('does-not-exist-never-registered'),
          'error must include the failing tag'
        );
        // The guard must not silently produce placeholder/downgrade rendering
        assert.ok(
          !err.message.toLowerCase().includes('placeholder'),
          'must not mention placeholder as a fallback option in the error'
        );
        return true;
      }
    );
  });
});

// ──────────────────────────────────────────────
// check() consistency
// ──────────────────────────────────────────────
describe('check() consistency', () => {
  it('returns false for unregistered tag', async () => {
    const result = await check('never-registered-check');
    assert.strictEqual(result, false);
  });

  it('returns false for registered non-Lit element', async () => {
    const tagName = 'non-lit-check-test';
    class NonLitCheck extends HTMLElement {}
    customElements.define(tagName, NonLitCheck);

    const result = await check(tagName);
    assert.strictEqual(result, false);
  });

  it('returns true for valid Lit element', async () => {
    const { LitElement, html } = await import('lit');
    const tagName = 'valid-lit-check-test';

    class ValidLitCheck extends LitElement {
      render() {
        return html`<p>ok</p>`;
      }
    }
    customElements.define(tagName, ValidLitCheck);

    const result = await check(tagName);
    assert.strictEqual(result, true);
  });
});
