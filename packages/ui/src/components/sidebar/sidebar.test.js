import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, click, fixture } from '../../test-utils/index.js';
import './sidebar.js';

describe('Sidebar Component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('should render with default properties', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.ok(element, 'Element should be created');
    assert.ok(element.shadowRoot, 'Element should have shadow root');
  });

  it('should have left position by default', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.position, 'left', 'Should have left position by default');
  });

  it('should not be collapsed by default', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.collapsed, false, 'Should not be collapsed by default');
  });

  it('should be collapsible by default', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.collapsible, true, 'Should be collapsible by default');
  });

  it('should have default width', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.width, '280px', 'Should have default width');
  });

  it('should render aside element', async () => {
    element = await fixture('grantcodes-sidebar');
    const aside = element.shadowRoot.querySelector('aside');
    assert.ok(aside, 'Aside element should exist');
  });

  it('should apply left position class', async () => {
    element = await fixture('grantcodes-sidebar', {
      position: 'left',
    });

    const sidebar = element.shadowRoot.querySelector('.sidebar--left');
    assert.ok(sidebar, 'Should have left position class');
  });

  it('should apply right position class', async () => {
    element = await fixture('grantcodes-sidebar', {
      position: 'right',
    });

    const sidebar = element.shadowRoot.querySelector('.sidebar--right');
    assert.ok(sidebar, 'Should have right position class');
  });

  it('should apply collapsed class when collapsed', async () => {
    element = await fixture('grantcodes-sidebar', {
      collapsed: true,
    });

    const sidebar = element.shadowRoot.querySelector('.sidebar--collapsed');
    assert.ok(sidebar, 'Should have collapsed class');
  });

  it('should render toggle button when collapsible', async () => {
    element = await fixture('grantcodes-sidebar', {
      collapsible: true,
    });

    const toggle = element.shadowRoot.querySelector('.sidebar__toggle');
    assert.ok(toggle, 'Toggle button should exist');
  });

  it('should not render toggle button when not collapsible', async () => {
    element = await fixture('grantcodes-sidebar', {
      collapsible: false,
    });

    const toggle = element.shadowRoot.querySelector('.sidebar__toggle');
    assert.ok(!toggle, 'Toggle button should not exist');
  });

  it('should toggle collapsed state when button is clicked', async () => {
    element = await fixture('grantcodes-sidebar', {
      collapsible: true,
    });

    const toggle = element.shadowRoot.querySelector('.sidebar__toggle');

    assert.strictEqual(element.collapsed, false, 'Should start not collapsed');

    click(toggle);
    await element.updateComplete;

    assert.strictEqual(element.collapsed, true, 'Should be collapsed after click');
  });

  it('should emit toggle event when collapsed state changes', async () => {
    element = await fixture('grantcodes-sidebar', {
      collapsible: true,
    });

    let toggledState = null;
    element.addEventListener('toggle', (e) => {
      toggledState = e.detail.collapsed;
    });

    const toggle = element.shadowRoot.querySelector('.sidebar__toggle');
    click(toggle);

    await element.updateComplete;

    assert.strictEqual(toggledState, true, 'Toggle event should fire with collapsed state');
  });

  it('should apply custom width', async () => {
    element = await fixture('grantcodes-sidebar', {
      width: '350px',
    });

    const aside = element.shadowRoot.querySelector('aside');
    const style = aside.getAttribute('style');
    assert.ok(style.includes('--sidebar-width: 350px'), 'Should set custom width');
  });

  it('should have mobile toggle button', async () => {
    element = await fixture('grantcodes-sidebar');
    const mobileToggle = element.shadowRoot.querySelector('.sidebar__mobile-toggle');
    assert.ok(mobileToggle, 'Mobile toggle button should exist');
  });

  it('should have content container', async () => {
    element = await fixture('grantcodes-sidebar');
    const content = element.shadowRoot.querySelector('.sidebar__content');
    assert.ok(content, 'Content container should exist');
  });

  it('should have slot for content', async () => {
    element = await fixture('grantcodes-sidebar');
    const slot = element.shadowRoot.querySelector('slot');
    assert.ok(slot, 'Slot should exist for content');
  });

  it('should toggle mobile drawer when mobile toggle is clicked', async () => {
    element = await fixture('grantcodes-sidebar');
    const mobileToggle = element.shadowRoot.querySelector('.sidebar__mobile-toggle');

    assert.strictEqual(element._drawerOpen, false, 'Drawer should start closed');

    click(mobileToggle);
    await element.updateComplete;

    assert.strictEqual(element._drawerOpen, true, 'Drawer should be open after click');
  });

  it('should emit drawer-toggle event', async () => {
    element = await fixture('grantcodes-sidebar');

    let drawerState = null;
    element.addEventListener('drawer-toggle', (e) => {
      drawerState = e.detail.open;
    });

    const mobileToggle = element.shadowRoot.querySelector('.sidebar__mobile-toggle');
    click(mobileToggle);

    await element.updateComplete;

    assert.strictEqual(drawerState, true, 'Drawer toggle event should fire');
  });

  it('should render overlay when drawer is open', async () => {
    element = await fixture('grantcodes-sidebar');
    element._drawerOpen = true;

    await element.updateComplete;

    const overlay = element.shadowRoot.querySelector('.sidebar__overlay');
    assert.ok(overlay, 'Overlay should exist when drawer is open');
  });

  it('should not render overlay when drawer is closed', async () => {
    element = await fixture('grantcodes-sidebar');
    const overlay = element.shadowRoot.querySelector('.sidebar__overlay');
    assert.ok(!overlay, 'Overlay should not exist when drawer is closed');
  });

  it('should preserve rapid collapse and drawer toggles before the transition update', async () => {
    element = await fixture('grantcodes-sidebar');
    const matchMedia = window.matchMedia;
    const startViewTransition = document.startViewTransition;
    const callbacks = [];
    const collapsedStates = [];
    const drawerStates = [];
    element.addEventListener('toggle', (event) => collapsedStates.push(event.detail.collapsed));
    element.addEventListener('drawer-toggle', (event) => drawerStates.push(event.detail.open));
    window.matchMedia = () => ({ matches: false });
    document.startViewTransition = (callback) => {
      callbacks.push(callback);
      return { finished: Promise.resolve() };
    };

    try {
      const collapse = element.shadowRoot.querySelector('.sidebar__toggle');
      const drawer = element.shadowRoot.querySelector('.sidebar__mobile-toggle');
      click(collapse);
      click(collapse);
      click(drawer);
      click(drawer);
      for (const callback of callbacks) await callback();
      await element.updateComplete;

      assert.strictEqual(element.collapsed, false, 'Two clicks should return to expanded');
      assert.strictEqual(element._drawerOpen, false, 'Two clicks should return to closed');
      assert.deepStrictEqual(collapsedStates, [true, false]);
      assert.deepStrictEqual(drawerStates, [true, false]);
    } finally {
      window.matchMedia = matchMedia;
      document.startViewTransition = startViewTransition;
    }
  });

  it('should run the collapse inside a view transition when motion is allowed', async () => {
    element = await fixture('grantcodes-sidebar', { collapsible: true });

    const originalMatchMedia = globalThis.window.matchMedia;
    let transitions = 0;
    globalThis.window.matchMedia = () => ({ matches: false });
    globalThis.document.startViewTransition = (callback) => {
      transitions++;
      callback();
      return { finished: Promise.resolve() };
    };

    click(element.shadowRoot.querySelector('.sidebar__toggle'));
    await element.updateComplete;

    globalThis.window.matchMedia = originalMatchMedia;
    globalThis.document.startViewTransition = undefined;

    assert.strictEqual(transitions, 1, 'The collapse should animate');
    assert.strictEqual(element.collapsed, true, 'The collapse should still apply');
  });
});
