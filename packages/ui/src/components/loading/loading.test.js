import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './loading.js';

describe('Loading Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-loading');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should have loading wrapper span', async () => {
    element = await fixture('grantcodes-loading');
    const loadingSpan = element.shadowRoot.querySelector('.loading');
    assert.ok(loadingSpan, 'Loading span should exist');
  });

  it('should have slot for content', async () => {
    element = await fixture('grantcodes-loading');
    const slot = element.shadowRoot.querySelector('slot');
    assert.ok(slot, 'Slot should exist');
  });

  it('should render slotted content', async () => {
    element = await fixture('grantcodes-loading');
    element.textContent = 'Loading...';

    await element.updateComplete;

    assert.strictEqual(element.textContent, 'Loading...', 'Slotted text should be present');
  });

  it('should support custom loading indicators', async () => {
    element = await fixture('grantcodes-loading');
    const spinner = document.createElement('div');
    spinner.className = 'custom-spinner';
    element.appendChild(spinner);

    await element.updateComplete;

    const customSpinner = element.querySelector('.custom-spinner');
    assert.ok(customSpinner, 'Custom spinner should be slotted');
  });

  it('should expose status semantics', async () => {
    element = await fixture('grantcodes-loading');

    const span = element.shadowRoot.querySelector('.loading');
    assert.strictEqual(span.getAttribute('role'), 'status', 'Loading should be a status region');
    assert.strictEqual(
      span.getAttribute('aria-label'),
      'Loading',
      'Status region needs a fallback name',
    );
    assert.strictEqual(element.getAttribute('aria-busy'), 'true', 'Host should be marked busy');
  });

  it('should let slotted text name the status region', async () => {
    element = document.createElement('grantcodes-loading');
    element.textContent = 'Loading images';
    document.body.appendChild(element);
    await element.updateComplete;

    const span = element.shadowRoot.querySelector('.loading');
    assert.strictEqual(
      span.hasAttribute('aria-label'),
      false,
      'Slotted text already names the status region',
    );
  });
});
