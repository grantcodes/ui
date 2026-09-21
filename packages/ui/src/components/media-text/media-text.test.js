import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './media-text.js';

const mediaJson = (media) => JSON.stringify(media);

describe('Media Text Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-media-text');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should apply dimensions and eager loading to the image', async () => {
    element = await fixture('grantcodes-media-text', {
      media: mediaJson({ src: '/a.jpg', alt: 'A', width: 1200, height: 800 }),
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('width'), '1200', 'Image width should be set');
    assert.strictEqual(img.getAttribute('height'), '800', 'Image height should be set');
    assert.strictEqual(
      img.getAttribute('loading'),
      'eager',
      'Media must not be lazy by default so above-the-fold images are not deferred',
    );
  });

  it('should honour an explicit lazy loading hint', async () => {
    element = await fixture('grantcodes-media-text', {
      media: mediaJson({ src: '/a.jpg', alt: 'A', loading: 'lazy' }),
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('loading'), 'lazy');
  });

  it('should apply dimensions and poster to the video', async () => {
    element = await fixture('grantcodes-media-text', {
      media: mediaJson({
        kind: 'video',
        src: '/a.mp4',
        alt: 'A video',
        poster: '/poster.jpg',
        width: 1280,
        height: 720,
      }),
    });

    const video = element.shadowRoot.querySelector('video');
    assert.strictEqual(video.getAttribute('width'), '1280');
    assert.strictEqual(video.getAttribute('height'), '720');
    assert.strictEqual(video.getAttribute('poster'), '/poster.jpg');
  });

  it('should omit dimensions when the media object does not declare them', async () => {
    element = await fixture('grantcodes-media-text', {
      media: mediaJson({ src: '/a.jpg', alt: 'A' }),
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.hasAttribute('width'), false);
    assert.strictEqual(img.hasAttribute('height'), false);
  });
});
