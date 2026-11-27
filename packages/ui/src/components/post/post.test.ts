import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './index.js';

describe('Post section components', () => {
  let element: any;
  const query = (selector: string) => element.shadowRoot.querySelector(selector);

  afterEach(() => cleanup(element));

  it('header exposes avatar, name and meta slots', async () => {
    element = await fixture('grantcodes-post-header');
    for (const slot of ['slot[name="avatar"]', 'slot:not([name])', 'slot[name="meta"]']) assert.ok(query(slot), slot);
  });

  it('context picks an icon for its type and leaves unknown types without one', async () => {
    element = await fixture('grantcodes-post-context', { type: 'like' });
    assert.match(query('grantcodes-icon').innerHTML, /<svg/);
    assert.ok(query('slot[name="citation"]'));

    element.type = 'unknown';
    await element.updateComplete;
    assert.equal(query('grantcodes-icon'), null);
  });

  it('content clips only when collapsible and offers the toggle only when it overflows', async () => {
    element = await fixture('grantcodes-post-content');
    assert.equal(query('.post-content__body--clipped'), null);

    element.collapsible = true;
    await element.updateComplete;
    assert.ok(query('.post-content__body--clipped'));
    assert.equal(query('grantcodes-button'), null, 'short content has no toggle');

    element._overflowing = true;
    await element.updateComplete;
    const button = query('grantcodes-button');
    assert.equal(button.getAttribute('variant'), 'outline');
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    assert.equal(button.getAttribute('aria-controls'), 'body');

    button.click();
    await element.updateComplete;
    assert.equal(query('grantcodes-button').getAttribute('aria-expanded'), 'true');
    assert.equal(query('.post-content__body--clipped'), null);
  });

  it('responses default to the list variant', async () => {
    element = await fixture('grantcodes-post-responses');
    assert.equal(element.getAttribute('variant'), 'list');
    assert.equal(query('h3'), null, 'no heading without the attribute');

    element.heading = 'Likes (2)';
    await element.updateComplete;
    assert.equal(query('h3').textContent, 'Likes (2)');
  });

  it('title renders its level as the heading element, clamped to 1–6', async () => {
    element = await fixture('grantcodes-post-title');
    assert.ok(query('h2.post-title slot'));

    element.level = 4;
    await element.updateComplete;
    assert.ok(query('h4.post-title'));

    element.level = 9;
    await element.updateComplete;
    assert.ok(query('h6.post-title'));
  });
});
