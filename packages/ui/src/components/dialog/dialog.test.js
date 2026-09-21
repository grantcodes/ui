import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, click, fixture } from '../../test-utils/index.js';
import './dialog.js';

describe('Dialog Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-dialog');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should be closed by default', async () => {
    element = await fixture('grantcodes-dialog');
    assert.strictEqual(element.open, false, 'Dialog should be closed by default');
  });

  it('should render dialog element', async () => {
    element = await fixture('grantcodes-dialog');
    const dialog = element.shadowRoot.querySelector('dialog');
    assert.ok(dialog, 'Dialog element should exist');
  });

  it('should open when open property is set to true', async () => {
    element = await fixture('grantcodes-dialog', {
      open: true,
    });

    await element.updateComplete;

    // Note: In tests, showModal() might not work as expected without a browser environment
    assert.strictEqual(element.open, true, 'Open property should be true');
  });

  it('should be dismissible by default', async () => {
    element = await fixture('grantcodes-dialog');
    assert.strictEqual(element.dismissible, true, 'Should be dismissible by default');
  });

  it('should render dismiss button when dismissible', async () => {
    element = await fixture('grantcodes-dialog', {
      dismissible: true,
    });

    const dismissButton = element.shadowRoot.querySelector('.dialog__dismiss');
    assert.ok(dismissButton, 'Dismiss button should exist');
  });

  it('should not render dismiss button when not dismissible', async () => {
    element = await fixture('grantcodes-dialog', {
      dismissible: false,
    });

    const dismissButton = element.shadowRoot.querySelector('.dialog__dismiss');
    assert.ok(!dismissButton, 'Dismiss button should not exist');
  });

  it('should have header slot', async () => {
    element = await fixture('grantcodes-dialog');
    const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
    assert.ok(headerSlot, 'Header slot should exist');
  });

  it('should have footer slot', async () => {
    element = await fixture('grantcodes-dialog');
    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
    assert.ok(footerSlot, 'Footer slot should exist');
  });

  it('should have default content slot', async () => {
    element = await fixture('grantcodes-dialog');
    const slot = element.shadowRoot.querySelector('slot.dialog__content');
    assert.ok(slot, 'Content slot should exist');
  });

  it('should hide the header when nothing is slotted into it', async () => {
    element = await fixture('grantcodes-dialog');
    const header = element.shadowRoot.querySelector('.dialog__header');
    assert.ok(header, 'Header element should exist');
    assert.ok(header.hasAttribute('hidden'), 'Header should be hidden without slotted content');
  });

  it('should render the header when content is slotted into it', async () => {
    element = document.createElement('grantcodes-dialog');
    element.innerHTML = '<h2 slot="header">Dialog Header</h2>';
    document.body.appendChild(element);
    await element.updateComplete;

    const header = element.shadowRoot.querySelector('.dialog__header');
    assert.ok(header, 'Header element should exist');
    assert.ok(
      !header.hasAttribute('hidden'),
      'Header should be visible when content is slotted into it',
    );
  });

  it('should hide the footer when nothing is slotted into it', async () => {
    element = await fixture('grantcodes-dialog');
    const footer = element.shadowRoot.querySelector('.dialog__footer');
    assert.ok(footer, 'Footer element should exist');
    assert.ok(footer.hasAttribute('hidden'), 'Footer should be hidden without slotted content');
  });

  it('should render the footer when content is slotted into it', async () => {
    element = document.createElement('grantcodes-dialog');
    element.innerHTML = '<div slot="footer">Actions</div>';
    document.body.appendChild(element);
    await element.updateComplete;

    const footer = element.shadowRoot.querySelector('.dialog__footer');
    assert.ok(footer, 'Footer element should exist');
    assert.ok(
      !footer.hasAttribute('hidden'),
      'Footer should be visible when content is slotted into it',
    );
  });

  it('should close when dismiss button is clicked', async () => {
    element = await fixture('grantcodes-dialog', {
      open: true,
      dismissible: true,
    });

    const dismissButton = element.shadowRoot.querySelector('.dialog__dismiss');
    click(dismissButton);

    await element.updateComplete;

    assert.strictEqual(element.open, false, 'Dialog should be closed');
  });
});
