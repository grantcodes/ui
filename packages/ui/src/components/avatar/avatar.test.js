import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './avatar.js';

describe('Avatar Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-avatar');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should display initials when name is provided', async () => {
    element = await fixture('grantcodes-avatar', {
      name: 'John Doe',
    });

    const initialsElement = element.shadowRoot.querySelector('.avatar__initials');
    assert.ok(initialsElement, 'Initials element should exist');
    assert.strictEqual(initialsElement.textContent, 'JD', 'Should display correct initials');
  });

  it('should handle single name', async () => {
    element = await fixture('grantcodes-avatar', {
      name: 'John',
    });

    const initialsElement = element.shadowRoot.querySelector('.avatar__initials');
    assert.strictEqual(initialsElement.textContent, 'J', 'Should display single initial');
  });

  it('should display image when src is provided', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      alt: 'User avatar',
    });

    const imgElement = element.shadowRoot.querySelector('img');
    assert.ok(imgElement, 'Image element should exist');
    assert.strictEqual(imgElement.src, 'https://example.com/avatar.jpg');
    assert.strictEqual(imgElement.alt, 'User avatar');
  });

  it('should apply size variant', async () => {
    element = await fixture('grantcodes-avatar', {
      size: 'large',
    });

    const avatarElement = element.shadowRoot.querySelector('.avatar');
    assert.ok(avatarElement.classList.contains('avatar--large'), 'Should have large size class');
  });

  it('should support different sizes', async () => {
    const sizes = ['small', 'medium', 'large'];

    for (const size of sizes) {
      element = await fixture('grantcodes-avatar', { size });
      const avatarElement = element.shadowRoot.querySelector('.avatar');
      assert.ok(
        avatarElement.classList.contains(`avatar--${size}`),
        `Should have ${size} size class`,
      );
      cleanup(element);
    }
  });

  it('should defer the avatar image and reserve its square box', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('loading'), 'lazy', 'Avatars are off the critical path');
    assert.strictEqual(img.getAttribute('decoding'), 'async');
    assert.ok(Number(img.getAttribute('width')) > 0, 'Width should be set to avoid CLS');
    assert.strictEqual(
      img.getAttribute('width'),
      img.getAttribute('height'),
      'Avatar images are square',
    );
  });

  it('should not invent alt text when nothing is known about the avatar', async () => {
    element = await fixture('grantcodes-avatar', { src: 'https://example.com/avatar.jpg' });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('alt'), '', 'An unknown avatar is decorative');
  });

  it('should use the name as alt text without an " avatar" suffix', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('alt'), 'John Doe');
  });

  it('should prefer an explicit alt over the name', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
      alt: 'Custom alt',
    });

    const img = element.shadowRoot.querySelector('img');
    assert.strictEqual(img.getAttribute('alt'), 'Custom alt');
  });
});
