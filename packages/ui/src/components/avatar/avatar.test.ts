import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import './avatar.js';

describe('Avatar Component', () => {
  let element: HTMLElement;
  const query = (selector: string) => element.shadowRoot?.querySelector(selector) as HTMLElement;

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

    const initialsElement = query('.avatar__initials');
    assert.ok(initialsElement, 'Initials element should exist');
    assert.strictEqual(initialsElement.textContent, 'JD', 'Should display correct initials');
  });

  it('should handle single name', async () => {
    element = await fixture('grantcodes-avatar', {
      name: 'John',
    });

    const initialsElement = query('.avatar__initials');
    assert.strictEqual(initialsElement.textContent, 'J', 'Should display single initial');
  });

  it('should skip emoji words and keep whole graphemes in initials', async () => {
    element = await fixture('grantcodes-avatar', { name: 'Marcos 🇵🇭🇺🇸' });
    assert.strictEqual(query('.avatar__initials').textContent, 'M');

    cleanup(element);
    element = await fixture('grantcodes-avatar', { name: ' 🙂 E\u0301mile  Zola ' });
    assert.strictEqual(query('.avatar__initials').textContent, 'E\u0301Z');
  });

  it('should display image when src is provided', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      alt: 'User avatar',
    });

    const image = query('.avatar__image');
    assert.ok(image, 'Image element should exist');
    assert.strictEqual(
      image.getAttribute('style'),
      'background-image: url("https://example.com/avatar.jpg")',
    );
  });

  it('should keep the src inside the CSS url() string', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/a"b\\c\n);color:red',
    });

    assert.strictEqual(
      query('.avatar__image').getAttribute('style'),
      'background-image: url("https://example.com/a\\22 b\\5c c\\a );color:red")',
    );
  });

  it('should keep the initials under the image as the load-failure fallback', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
    });

    const initials = query('.avatar__initials');
    assert.strictEqual(initials.textContent, 'JD');
    assert.strictEqual(initials.getAttribute('aria-hidden'), 'true');
    assert.ok(
      !query('img, svg'),
      'A failed <img> or SVG <image> paints a broken-image icon over the initials; a failed background image paints nothing',
    );
  });

  it('should apply size variant', async () => {
    element = await fixture('grantcodes-avatar', {
      size: 'large',
    });

    const avatarElement = query('.avatar');
    assert.ok(avatarElement.classList.contains('avatar--large'), 'Should have large size class');
  });

  it('should support different sizes', async () => {
    const sizes = ['small', 'medium', 'large'];

    for (const size of sizes) {
      element = await fixture('grantcodes-avatar', { size });
      const avatarElement = query('.avatar');
      assert.ok(
        avatarElement.classList.contains(`avatar--${size}`),
        `Should have ${size} size class`,
      );
      cleanup(element);
    }
  });

  it('should fill the avatar box with the image', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
    });

    assert.ok(
      query('.avatar__image'),
      'Image must carry the class that sizes it to 100% of the avatar box',
    );
  });

  it('should not invent alt text when nothing is known about the avatar', async () => {
    element = await fixture('grantcodes-avatar', { src: 'https://example.com/avatar.jpg' });

    const avatar = query('.avatar');
    assert.ok(!avatar.hasAttribute('role'), 'An unknown avatar is decorative');
    assert.ok(!avatar.hasAttribute('aria-label'));
  });

  it('should use the name as the accessible name without an " avatar" suffix', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
    });

    const avatar = query('.avatar');
    assert.strictEqual(avatar.getAttribute('role'), 'img');
    assert.strictEqual(avatar.getAttribute('aria-label'), 'John Doe');
  });

  it('should prefer an explicit alt over the name as the accessible name', async () => {
    element = await fixture('grantcodes-avatar', {
      src: 'https://example.com/avatar.jpg',
      name: 'John Doe',
      alt: 'Custom alt',
    });

    const avatar = query('.avatar');
    assert.strictEqual(avatar.getAttribute('aria-label'), 'Custom alt');
  });
});
