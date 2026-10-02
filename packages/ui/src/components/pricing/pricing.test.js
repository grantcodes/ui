import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './pricing.js';

describe('Pricing', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('announces excluded features without adding status to included features', async () => {
    element = await fixture('grantcodes-pricing', {
      tiers: JSON.stringify([
        {
          name: 'Plan',
          features: [
            { text: 'Included feature', included: true },
            { text: 'Excluded feature', included: false },
          ],
          cta: { label: 'Choose plan', href: '/choose' },
        },
      ]),
    });

    const features = [...element.shadowRoot.querySelectorAll('.pricing__feature')];

    assert.match(features[0].textContent, /Included feature/);
    assert.equal(features[0].querySelector('.pricing__feature-status'), null);
    assert.equal(features[1].querySelector('.pricing__feature-status').textContent, 'Not included');
  });
});
