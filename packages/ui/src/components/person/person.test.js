import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './person.js';

describe('Person Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render name and details', async () => {
    element = await fixture('grantcodes-person', {
      name: 'Jane Doe',
      role: 'Designer',
      company: 'GrantCodes',
    });

    assert.strictEqual(element.shadowRoot.querySelector('.person__name')?.textContent, 'Jane Doe');
    assert.strictEqual(
      element.shadowRoot.querySelector('.person__details')?.textContent,
      'Designer, GrantCodes',
    );
  });

  it('should omit details when role and company are missing', async () => {
    element = await fixture('grantcodes-person', {
      name: 'Jane Doe',
    });

    assert.equal(element.shadowRoot.querySelector('.person__details'), null);
  });

  it('should render content in the description slot', async () => {
    element = await fixture('grantcodes-person', {
      name: 'Jane Doe',
    });

    const description = document.createElement('span');
    description.setAttribute('slot', 'description');
    description.textContent = 'A short bio about Jane';
    element.appendChild(description);

    await element.updateComplete;

    const slot = element.shadowRoot.querySelector('slot[name="description"]');
    assert.ok(slot, 'description slot should exist');

    const assignedNodes = slot.assignedNodes({ flatten: true });
    const hasText = assignedNodes.some(
      (node) => node.textContent && node.textContent.includes('A short bio about Jane'),
    );
    assert.ok(hasText, 'description slot should contain the projected text');
  });
});
