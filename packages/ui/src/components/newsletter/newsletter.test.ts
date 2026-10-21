import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './newsletter.js';

describe('Newsletter Component', () => {
  let element: any;

  afterEach(() => {
    cleanup(element);
  });

  it('submits a valid email through its native submit button', async () => {
    element = await fixture('grantcodes-newsletter');

    const form = element.shadowRoot.querySelector('form');
    const input = element.shadowRoot.querySelector('input');
    const submit = element.shadowRoot.querySelector('button[type="submit"]');
    let submitted = false;

    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      submitted = true;
    });
    input.value = 'reader@example.com';
    submit.click();

    assert.ok(submitted, 'A valid email should submit the form');
  });

  it('prevents submit when the email is invalid', async () => {
    element = await fixture('grantcodes-newsletter');

    const form = element.shadowRoot.querySelector('form');
    const input = element.shadowRoot.querySelector('input');
    const submit = element.shadowRoot.querySelector('button[type="submit"]');
    let submitted = false;

    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      submitted = true;
    });
    input.value = 'not-an-email';
    submit.click();

    assert.equal(submitted, false, 'An invalid email must not submit the form');
  });
});
