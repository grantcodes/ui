import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './button-group.js';

describe('Button Group Component', () => {
  let element: any;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-button-group');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should render button group wrapper', async () => {
    element = await fixture('grantcodes-button-group');
    const group = element.shadowRoot.querySelector('.button-group');
    assert.ok(group, 'Button group wrapper should exist');
  });

  it('should have slot for buttons', async () => {
    element = await fixture('grantcodes-button-group');
    const slot = element.shadowRoot.querySelector('slot');
    assert.ok(slot, 'Slot should exist for buttons');
  });

  it('should support multiple slotted buttons', async () => {
    element = await fixture('grantcodes-button-group');

    const button1 = document.createElement('button');
    button1.textContent = 'Button 1';
    const button2 = document.createElement('button');
    button2.textContent = 'Button 2';
    const button3 = document.createElement('button');
    button3.textContent = 'Button 3';

    element.appendChild(button1);
    element.appendChild(button2);
    element.appendChild(button3);

    await element.updateComplete;

    assert.strictEqual(element.children.length, 3, 'Should have three buttons');
  });

  it('defaults to a joined horizontal group without adding a tab stop', async () => {
    element = await fixture('grantcodes-button-group');
    assert.equal(element.variant, 'joined');
    assert.equal(element.orientation, 'horizontal');
    assert.equal(element.getAttribute('role'), 'group');
    assert.equal(element.hasAttribute('tabindex'), false);
    assert.ok(element.shadowRoot.querySelector('[part="base"]'));
  });

  it('preserves author semantics and accessible naming', async () => {
    element = document.createElement('grantcodes-button-group');
    element.setAttribute('role', 'navigation');
    element.setAttribute('aria-label', 'Reader navigation');
    document.body.appendChild(element);
    await element.updateComplete;
    assert.equal(element.getAttribute('role'), 'navigation');
    assert.equal(element.getAttribute('aria-label'), 'Reader navigation');
    element.setAttribute('aria-labelledby', 'reader-heading');
    await element.updateComplete;
    assert.equal(element.getAttribute('aria-labelledby'), 'reader-heading');
  });

  it('reflects layout properties and responds to attribute changes', async () => {
    element = await fixture('grantcodes-button-group', {
      variant: 'spaced',
      orientation: 'vertical',
    });
    assert.equal(element.getAttribute('variant'), 'spaced');
    assert.equal(element.getAttribute('orientation'), 'vertical');
    element.setAttribute('variant', 'joined');
    element.setAttribute('orientation', 'horizontal');
    await element.updateComplete;
    assert.equal(element.variant, 'joined');
    assert.equal(element.orientation, 'horizontal');
  });

  it('should group buttons together visually', async () => {
    element = await fixture('grantcodes-button-group');
    const group = element.shadowRoot.querySelector('.button-group');
    assert.ok(group, 'Button group should provide visual grouping');
  });
});
