import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './countdown.js';

describe('Countdown Component', () => {
  let element: HTMLElement;

  afterEach(() => {
    cleanup(element);
  });

  it('renders all units and translated labels when seconds are shown', async () => {
    element = await fixture('grantcodes-countdown', {
      target: '2050-01-01T00:00:00Z',
      'show-seconds': true,
      'days-label': 'long translated days label',
      'hours-label': 'long translated hours label',
      'minutes-label': 'long translated minutes label',
      'seconds-label': 'long translated seconds label',
    });

    const units = element.shadowRoot?.querySelectorAll('.countdown__unit');
    const labels = [...(element.shadowRoot?.querySelectorAll('.countdown__label') ?? [])];

    assert.strictEqual(units?.length, 4);
    assert.deepStrictEqual(
      labels.map((label) => label.textContent),
      [
        'long translated days label',
        'long translated hours label',
        'long translated minutes label',
        'long translated seconds label',
      ],
    );
  });
});
