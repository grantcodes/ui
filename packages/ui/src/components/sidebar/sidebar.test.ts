import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import { GrantCodesSidebarToggle } from './sidebar.js';

describe('Sidebar Component', () => {
  let element: any;

  afterEach(() => {
    cleanup(element);
  });

  it('defaults to a closed standalone drawer', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.open, false);
    assert.strictEqual(element.controlled, false);
    assert.strictEqual(element.hasAttribute('open'), false);
  });

  it('only renders the three named slots', async () => {
    element = await fixture('grantcodes-sidebar');
    const slots = [...element.shadowRoot.querySelectorAll('slot')].map((slot) => slot.name);
    assert.deepStrictEqual(slots, ['header', 'content', 'footer']);
  });

  it('does not retain legacy properties', async () => {
    element = await fixture('grantcodes-sidebar');
    assert.strictEqual(element.collapsed, undefined);
    assert.strictEqual(element.collapsible, undefined);
    assert.strictEqual(element.position, undefined);
    assert.strictEqual(element.width, undefined);
  });

  it('requests and applies standalone state changes', async () => {
    element = await fixture('grantcodes-sidebar');
    let detail: { open: boolean } | undefined;
    element.addEventListener('drawer-toggle', (event: CustomEvent<{ open: boolean }>) => {
      detail = event.detail;
    });

    element.requestOpen(true);
    await element.updateComplete;

    assert.deepStrictEqual(detail, { open: true });
    assert.strictEqual(element.open, true);
  });

  it('keeps standalone state when a request is canceled', async () => {
    element = await fixture('grantcodes-sidebar');
    element.addEventListener('drawer-toggle', (event: Event) => event.preventDefault());

    element.requestOpen(true);
    await element.updateComplete;

    assert.strictEqual(element.open, false);
  });

  it('leaves controlled state to the application', async () => {
    element = await fixture('grantcodes-sidebar', { controlled: true });
    element.requestOpen(true);
    await element.updateComplete;

    assert.strictEqual(element.open, false);
  });

  it('does not request state changes from direct property updates', async () => {
    element = await fixture('grantcodes-sidebar');
    let requests = 0;
    element.addEventListener('drawer-toggle', () => requests++);

    element.open = true;
    await element.updateComplete;

    assert.strictEqual(requests, 0);
  });

  it('uses header, content, and footer without reserving empty regions', async () => {
    element = document.createElement('grantcodes-sidebar');
    element.innerHTML = '<h2 slot="header">Together</h2><nav slot="content">Navigation</nav>';
    document.body.append(element);
    await element.updateComplete;

    assert.strictEqual(element.shadowRoot.querySelector('[part="header"]').hidden, false);
    assert.strictEqual(element.shadowRoot.querySelector('[part="content"]').hidden, false);
    assert.strictEqual(element.shadowRoot.querySelector('[part="footer"]').hidden, true);
  });

  it('shares committed state across toggles', async () => {
    element = document.createElement('grantcodes-sidebar');
    element.id = 'navigation';
    const first = document.createElement('grantcodes-sidebar-toggle') as GrantCodesSidebarToggle;
    first.setAttribute('for', 'navigation');
    first.innerHTML = '<button type="button">Open</button>';
    const second = document.createElement('grantcodes-sidebar-toggle') as GrantCodesSidebarToggle;
    second.setAttribute('for', 'navigation');
    second.innerHTML = '<button type="button">Open</button>';
    document.body.append(element, first, second);
    element._compact = true;
    await Promise.all([element.updateComplete, first.updateComplete, second.updateComplete]);

    first.querySelector('button')?.click();
    await Promise.all([element.updateComplete, first.updateComplete, second.updateComplete]);

    assert.strictEqual(element.open, true);
    assert.strictEqual(first.querySelector('button')?.getAttribute('aria-expanded'), 'true');
    assert.strictEqual(second.querySelector('button')?.getAttribute('aria-expanded'), 'true');
    assert.strictEqual(first.querySelector('button')?.getAttribute('aria-controls'), 'navigation');
  });

  it('uses the animated default button and follows committed sidebar state', async () => {
    element = document.createElement('div');
    element.innerHTML = '<grantcodes-sidebar id="animated-navigation"></grantcodes-sidebar><grantcodes-sidebar-toggle for="animated-navigation"></grantcodes-sidebar-toggle>';
    document.body.append(element);
    const sidebar = element.querySelector('grantcodes-sidebar');
    const toggle = element.querySelector('grantcodes-sidebar-toggle');
    sidebar._compact = true;
    await Promise.all([sidebar.updateComplete, toggle.updateComplete]);
    const menu = toggle.shadowRoot.querySelector('grantcodes-menu-toggle');
    await menu.updateComplete;
    const button = menu.shadowRoot.querySelector('button');
    assert.strictEqual(toggle.hidden, false);
    assert.strictEqual(button.getAttribute('aria-expanded'), 'false');
    button.click();
    await sidebar.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await menu.updateComplete;
    assert.strictEqual(sidebar.open, true);
    assert.strictEqual(button.getAttribute('aria-expanded'), 'true');
    assert.strictEqual(button.getAttribute('aria-label'), 'Close menu');
    assert.strictEqual(menu.controlsElement, sidebar);
    sidebar._handleNativeCancel(new Event('cancel', { cancelable: true }));
    await sidebar.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await menu.updateComplete;
    assert.strictEqual(button.getAttribute('aria-expanded'), 'false');
    menu.focus();
    assert.strictEqual(menu.shadowRoot.activeElement, button);
  });

  it('ignores disabled controls and missing targets', async () => {
    element = document.createElement('grantcodes-sidebar-toggle');
    element.setAttribute('for', 'missing');
    element.innerHTML = '<button type="button" disabled>Open</button>';
    document.body.append(element);
    await element.updateComplete;

    assert.strictEqual(element.hidden, true);
    element.querySelector('button')?.click();
    assert.strictEqual(element.querySelector('button')?.getAttribute('aria-expanded'), null);
  });
});
