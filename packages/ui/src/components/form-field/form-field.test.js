import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, click, fixture } from '../../test-utils/index.js';
import './form-field.js';

describe('Form Field Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-form-field');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should display label text', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Username',
    });

    const labelElement = element.shadowRoot.querySelector('.form-field__label');
    assert.ok(labelElement, 'Label element should exist');
    assert.strictEqual(labelElement.textContent, 'Username', 'Label text should match');
  });

  it('should reflect label text for SSR client upgrade', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Username',
    });

    assert.strictEqual(
      element.getAttribute('label'),
      'Username',
      'Label should be serialized to an attribute for client upgrade',
    );
  });

  it('should display error message when error is set', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Email',
      error: 'Invalid email format',
    });

    const errorElement = element.shadowRoot.querySelector('.form-field__error');
    assert.ok(errorElement, 'Error element should exist');
    assert.ok(
      errorElement.textContent.includes('Invalid email format'),
      'Error message should be displayed',
    );
  });

  it('should not display error when no error is set', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Email',
    });

    const errorElement = element.shadowRoot.querySelector('.form-field__error');
    assert.ok(!errorElement, 'Error element should not exist');
  });

  it('should display help text when help is provided', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Password',
      help: 'Must be at least 8 characters',
    });

    const helpElement = element.shadowRoot.querySelector('.form-field__help');
    assert.ok(helpElement, 'Help element should exist');
    assert.strictEqual(
      helpElement.textContent,
      'Must be at least 8 characters',
      'Help text should match',
    );
  });

  it('should not display help when no help is provided', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Password',
    });

    const helpElement = element.shadowRoot.querySelector('.form-field__help');
    assert.ok(!helpElement, 'Help element should not exist when help is not provided');
  });

  it('should generate unique IDs', async () => {
    const element1 = await fixture('grantcodes-form-field');
    const element2 = await fixture('grantcodes-form-field');

    assert.notStrictEqual(element1.id, element2.id, 'IDs should be unique');

    cleanup(element1);
    cleanup(element2);
  });

  it('should not copy the host id onto the inner control', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Username';
    element.innerHTML = '<input type="text" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const input = element.querySelector('input');
    assert.notStrictEqual(
      input.id,
      element.id,
      'Inner control must not duplicate the host id',
    );
  });

  it('should have label element', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Test Field',
    });

    const label = element.shadowRoot.querySelector('label');
    assert.ok(label, 'Label element should exist');
  });

  it('should render as fieldset for grouped inputs', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Select options',
    });

    // Add nested form fields to trigger group mode
    const nestedField = document.createElement('grantcodes-form-field');
    element.appendChild(nestedField);

    await element.updateComplete;
    // This would need to check if groupInput was set, which happens in firstUpdated
  });

  it('should have slot for input elements', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Input',
    });

    const slot = element.shadowRoot.querySelector('slot');
    assert.ok(slot, 'Slot should exist for input elements');
  });

  it('should follow later error and help changes with aria-describedby', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Email';
    element.innerHTML = '<input type="text" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const input = element.querySelector('input');
    assert.ok(!input.getAttribute('aria-describedby'), 'No description before error/help');

    element.error = 'Invalid email';
    element.help = 'Use your work email';
    await element.updateComplete;

    const describedBy = input.getAttribute('aria-describedby');
    assert.ok(describedBy.includes(`${element.id}-error`), 'Error id should be described');
    assert.ok(describedBy.includes(`${element.id}-help`), 'Help id should be described');
  });

  it('should drop aria-describedby when error and help are cleared', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Email';
    element.error = 'Invalid email';
    element.innerHTML = '<input type="text" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const input = element.querySelector('input');
    assert.ok(input.getAttribute('aria-describedby'), 'Error should be described initially');

    element.error = undefined;
    await element.updateComplete;

    assert.strictEqual(
      input.hasAttribute('aria-describedby'),
      false,
      'Description should be removed when error and help are cleared',
    );
  });

  it('should keep aria-invalid in sync with the error state', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Email';
    element.innerHTML = '<input type="email" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const input = element.querySelector('input');
    assert.strictEqual(input.hasAttribute('aria-invalid'), false, 'No error, no aria-invalid');

    element.error = 'Invalid email';
    await element.updateComplete;
    assert.strictEqual(input.getAttribute('aria-invalid'), 'true', 'Error sets aria-invalid');

    element.error = undefined;
    await element.updateComplete;
    assert.strictEqual(input.hasAttribute('aria-invalid'), false, 'Clearing clears aria-invalid');
  });

  it('should hold the error message until the control is user-invalid', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Email';
    element.error = 'Invalid email';
    element.innerHTML = '<input type="email" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const error = element.shadowRoot.querySelector('.form-field__error');
    assert.ok(error, 'Error text should be rendered');
    assert.strictEqual(error.textContent.trim(), 'Invalid email', 'The "Error: " prefix is gone');
    assert.ok(error.hasAttribute('hidden'), 'Untouched control must not show the error yet');

    // happy-dom cannot put a control into :user-invalid, so the state is stubbed.
    const input = element.querySelector('input');
    input.matches = (selector) => selector === ':user-invalid';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await element.updateComplete;

    assert.strictEqual(
      element.shadowRoot.querySelector('.form-field__error').hasAttribute('hidden'),
      false,
      'Error should appear once the control is user-invalid',
    );
  });

  it('should show the error when there is no control to validate', async () => {
    element = await fixture('grantcodes-form-field', {
      label: 'Email',
      error: 'Invalid email',
    });

    const error = element.shadowRoot.querySelector('.form-field__error');
    assert.ok(error, 'Error should render without a control');
    assert.strictEqual(error.hasAttribute('hidden'), false, 'Nothing to validate, so show it');
  });
  it('should toggle a wrapped checkbox from the label text', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Accept terms';
    element.innerHTML = '<input type="checkbox" />';
    document.body.appendChild(element);
    await element.updateComplete;

    const input = element.querySelector('input');
    let changes = 0;
    input.addEventListener('change', () => {
      changes += 1;
    });

    click(element.shadowRoot.querySelector('.form-field__label'));

    assert.strictEqual(input.checked, true, 'A label click must toggle the checkbox');
    assert.strictEqual(changes, 1, 'It must behave like a real click and emit change');
  });

  it('should reveal a consumer-set error once the field is touched', async () => {
    element = document.createElement('grantcodes-form-field');
    element.label = 'Email';
    element.error = 'Invalid email';
    element.innerHTML = '<input type="text" />';
    document.body.appendChild(element);
    await element.updateComplete;

    assert.ok(
      element.shadowRoot.querySelector('.form-field__error').hasAttribute('hidden'),
      'Untouched field keeps the error hidden',
    );

    const input = element.querySelector('input');
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await element.updateComplete;

    assert.strictEqual(
      element.shadowRoot.querySelector('.form-field__error').hasAttribute('hidden'),
      false,
      'Touching the field reveals a consumer-set error without native invalidity',
    );
  });
});
