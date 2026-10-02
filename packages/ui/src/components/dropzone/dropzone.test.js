import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup } from '../../test-utils/index.js';
import './dropzone.js';

async function createDropzone({ fullscreenOnDrag = false, placeholder = 'Drop files here' } = {}) {
  const dropzone = document.createElement('grantcodes-dropzone');
  dropzone.fullscreenOnDrag = fullscreenOnDrag;

  const input = document.createElement('input');
  input.type = 'file';
  input.placeholder = placeholder;
  dropzone.appendChild(input);
  document.body.appendChild(dropzone);
  await dropzone.updateComplete;

  return dropzone;
}

describe('Dropzone Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('renders the supplied file input placeholder', async () => {
    element = await createDropzone({ placeholder: 'Select files to upload' });

    assert.equal(
      element.shadowRoot.querySelector('.dropzone__placeholder').textContent,
      'Select files to upload',
    );
  });

  it('renders fullscreen state while a drag is active and clears it when leaving', async () => {
    element = await createDropzone({ fullscreenOnDrag: true });

    document.dispatchEvent(new Event('dragenter'));
    await element.updateComplete;
    assert.ok(element.shadowRoot.querySelector('.dropzone--fullscreen'));

    document.dispatchEvent(new Event('dragleave'));
    await element.updateComplete;
    assert.equal(element.shadowRoot.querySelector('.dropzone--fullscreen'), null);
  });

  it('clears fullscreen state when files are dropped', async () => {
    element = await createDropzone({ fullscreenOnDrag: true });

    document.dispatchEvent(new Event('dragenter'));
    await element.updateComplete;
    document.dispatchEvent(new Event('drop'));
    await element.updateComplete;

    assert.equal(element.shadowRoot.querySelector('.dropzone--fullscreen'), null);
  });

  it('clears fullscreen state after the drag timeout', async () => {
    const originalSetTimeout = globalThis.setTimeout;
    let timeoutCallback;
    globalThis.setTimeout = (callback) => {
      timeoutCallback = callback;
      return 1;
    };

    try {
      element = await createDropzone({ fullscreenOnDrag: true });
      document.dispatchEvent(new Event('dragenter'));
      await element.updateComplete;
      timeoutCallback();
      await element.updateComplete;

      assert.equal(element.shadowRoot.querySelector('.dropzone--fullscreen'), null);
    } finally {
      globalThis.setTimeout = originalSetTimeout;
    }
  });
});
