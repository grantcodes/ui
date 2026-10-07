import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, click, fixture } from '../../test-utils/index.js';
import './dropdown.js';

describe('Dropdown Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-dropdown');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should be closed by default', async () => {
    element = await fixture('grantcodes-dropdown');
    assert.strictEqual(element.open, false, 'Should be closed by default');
  });

  it('should have bottom-start placement by default', async () => {
    element = await fixture('grantcodes-dropdown');
    assert.strictEqual(
      element.placement,
      'bottom-start',
      'Default placement should be bottom-start',
    );
  });

  it('should have trigger slot', async () => {
    element = await fixture('grantcodes-dropdown');
    const slot = element.shadowRoot.querySelector('slot[name="trigger"]');
    assert.ok(slot, 'Trigger slot should exist');
  });

  it('should have menu slot', async () => {
    element = await fixture('grantcodes-dropdown');
    const slot = element.shadowRoot.querySelector('slot[name="menu"]');
    assert.ok(slot, 'Menu slot should exist');
  });

  it('should render menu element', async () => {
    element = await fixture('grantcodes-dropdown');
    const menu = element.shadowRoot.querySelector('.dropdown__menu');
    assert.ok(menu, 'Menu element should be rendered');
  });

  it('should have role=menu on menu', async () => {
    element = await fixture('grantcodes-dropdown');
    const menu = element.shadowRoot.querySelector('.dropdown__menu');
    assert.strictEqual(menu.getAttribute('role'), 'menu', 'Menu should have role');
  });

  it('should apply placement class to menu', async () => {
    element = await fixture('grantcodes-dropdown', {
      placement: 'top-end',
    });

    const menu = element.shadowRoot.querySelector('.dropdown__menu--top-end');
    assert.ok(menu, 'Menu should have placement class');
  });

  it('should generate unique IDs', async () => {
    const element1 = await fixture('grantcodes-dropdown');
    const element2 = await fixture('grantcodes-dropdown');

    assert.notStrictEqual(element1.id, element2.id, 'IDs should be unique');

    cleanup(element1);
    cleanup(element2);
  });

  it('should expose a unique anchor name for the trigger', async () => {
    const element1 = await fixture('grantcodes-dropdown');
    const element2 = await fixture('grantcodes-dropdown');

    const anchorName = element1.style.getPropertyValue('--dropdown-anchor');
    assert.match(anchorName, /^--/, 'Anchor name should be a dashed ident');
    assert.notStrictEqual(
      anchorName,
      element2.style.getPropertyValue('--dropdown-anchor'),
      'Anchor name should be unique per instance',
    );

    cleanup(element1);
    cleanup(element2);
  });

  it('should preserve two rapid trigger clicks before the transition update', async () => {
    element = await fixture('grantcodes-dropdown');
    const matchMedia = window.matchMedia;
    const startViewTransition = document.startViewTransition;
    const callbacks = [];
    const states = [];
    element.addEventListener('toggle', (event) => states.push(event.detail.open));
    window.matchMedia = () => ({ matches: false });
    document.startViewTransition = (callback) => {
      callbacks.push(callback);
      return { finished: Promise.resolve() };
    };

    try {
      const trigger = element.shadowRoot.querySelector('.dropdown__trigger');
      click(trigger);
      click(trigger);
      for (const callback of callbacks) await callback();
      await element.updateComplete;

      assert.strictEqual(element.open, false, 'Two clicks should return to closed');
      assert.deepStrictEqual(states, [true, false], 'Each click should report its intended state');
    } finally {
      window.matchMedia = matchMedia;
      document.startViewTransition = startViewTransition;
    }
  });

  it('should open through a view transition when motion is allowed', async () => {
    element = await fixture('grantcodes-dropdown');

    const originalMatchMedia = globalThis.window.matchMedia;
    let transitions = 0;
    globalThis.window.matchMedia = () => ({ matches: false });
    globalThis.document.startViewTransition = (callback) => {
      transitions++;
      callback();
      return { finished: Promise.resolve() };
    };

    element._handleTriggerClick();
    await element.updateComplete;

    globalThis.window.matchMedia = originalMatchMedia;
    globalThis.document.startViewTransition = undefined;

    assert.strictEqual(transitions, 1, 'Opening should animate');
    assert.strictEqual(element.open, true, 'The dropdown should still open');
  });

  it('should discover wrapped dynamic items and skip disabled items during keyboard navigation', async () => {
    element = await fixture('grantcodes-dropdown');
    element.innerHTML = `
      <button slot="trigger">Actions</button>
      <div slot="menu">
        <grantcodes-dropdown-item>First</grantcodes-dropdown-item>
        <grantcodes-dropdown-item disabled>Disabled</grantcodes-dropdown-item>
      </div>
    `;
    await element.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const wrapper = element.querySelector('[slot="menu"]');
    const [firstItem, disabledItem] = wrapper.children;
    const lastItem = document.createElement('grantcodes-dropdown-item');
    lastItem.textContent = 'Last';
    wrapper.append(lastItem);
    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.strictEqual(firstItem.getAttribute('role'), 'menuitem');
    assert.strictEqual(disabledItem.getAttribute('aria-disabled'), 'true');
    assert.strictEqual(lastItem.getAttribute('role'), 'menuitem');

    element.open = true;
    await element.updateComplete;
    lastItem.focus();
    lastItem.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));

    assert.strictEqual(document.activeElement, firstItem, 'ArrowDown should wrap past disabled items');
  });

  it('should activate items with Enter and restore trigger focus on Escape', async () => {
    element = await fixture('grantcodes-dropdown');
    element.innerHTML = `
      <button slot="trigger">Actions</button>
      <div slot="menu"><grantcodes-dropdown-item>First</grantcodes-dropdown-item></div>
    `;
    await element.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const trigger = element.querySelector('[slot="trigger"]');
    const item = element.querySelector('grantcodes-dropdown-item');
    let selections = 0;
    item.addEventListener('select', () => selections++);
    element.open = true;
    await element.updateComplete;

    item.focus();
    item.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    assert.strictEqual(selections, 1, 'Enter should select the focused item');

    element.open = true;
    await element.updateComplete;
    item.focus();
    document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));

    assert.strictEqual(element.open, false, 'Escape should close the menu');
    assert.strictEqual(document.activeElement, trigger, 'Escape should restore trigger focus');
  });
});

describe('Dropdown Item Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render dropdown item', async () => {
    element = await fixture('grantcodes-dropdown-item');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should not be disabled by default', async () => {
    element = await fixture('grantcodes-dropdown-item');
    assert.strictEqual(element.disabled, false, 'Should not be disabled by default');
  });

  it('should render with disabled class when disabled', async () => {
    element = await fixture('grantcodes-dropdown-item', {
      disabled: true,
    });

    const item = element.shadowRoot.querySelector('.dropdown-item--disabled');
    assert.ok(item, 'Should have disabled class');
  });

  it('should emit select event when clicked', async () => {
    element = await fixture('grantcodes-dropdown-item');

    let selected = false;
    element.addEventListener('select', () => {
      selected = true;
    });

    const item = element.shadowRoot.querySelector('.dropdown-item');
    click(item);

    assert.ok(selected, 'Select event should have fired');
  });

  it('should not emit select event when disabled', async () => {
    element = await fixture('grantcodes-dropdown-item', {
      disabled: true,
    });

    let selected = false;
    element.addEventListener('select', () => {
      selected = true;
    });

    const item = element.shadowRoot.querySelector('.dropdown-item');
    click(item);

    assert.ok(!selected, 'Select event should not fire when disabled');
  });

  it('should render slotted content', async () => {
    element = await fixture('grantcodes-dropdown-item');
    element.textContent = 'Menu Item';

    await element.updateComplete;

    assert.strictEqual(element.textContent, 'Menu Item', 'Slotted content should be rendered');
  });

  it('should have dropdown-item wrapper', async () => {
    element = await fixture('grantcodes-dropdown-item');
    const item = element.shadowRoot.querySelector('.dropdown-item');
    assert.ok(item, 'Dropdown item wrapper should exist');
  });
});
