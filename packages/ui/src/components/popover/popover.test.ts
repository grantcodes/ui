import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
import { cleanup, click, fixture } from '../../test-utils/index.js';
import './popover.js';

function settle(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve));
}

describe('Popover Component', () => {
  let element: HTMLElement & {
    open: boolean;
    placement: string;
    updateComplete: Promise<boolean>;
  };

  afterEach(() => {
    cleanup(element);
  });

  it('has closed bottom-start defaults and public slots', async () => {
    element = await fixture('grantcodes-popover');

    assert.strictEqual(element.open, false);
    assert.strictEqual(element.placement, 'bottom-start');
    assert.ok(element.shadowRoot?.querySelector('slot[name="trigger"]'));
    assert.ok(element.shadowRoot?.querySelector('slot:not([name])'));
    assert.strictEqual(
      element.shadowRoot?.querySelector('[part="panel"]')?.getAttribute('tabindex'),
      '-1',
    );
  });

  it('reflects the committed open state and reports it after rendering', async () => {
    element = await fixture('grantcodes-popover');
    const states: boolean[] = [];
    let rendered = false;
    element.addEventListener('toggle', (event) => {
      states.push((event as CustomEvent<{ open: boolean }>).detail.open);
      rendered = !element.shadowRoot?.querySelector('[part="panel"]')?.hasAttribute('hidden');
    });

    element.open = true;
    await settle();
    await element.updateComplete;

    assert.strictEqual(element.getAttribute('open'), '');
    assert.deepStrictEqual(states, [true]);
    assert.ok(rendered);
  });

  it('coalesces rapid requests that return to the committed state', async () => {
    element = await fixture('grantcodes-popover');
    const states: boolean[] = [];
    element.addEventListener('toggle', (event) =>
      states.push((event as CustomEvent<{ open: boolean }>).detail.open),
    );

    element.open = true;
    element.open = false;
    await settle();
    await element.updateComplete;

    assert.strictEqual(element.open, false);
    assert.deepStrictEqual(states, []);
  });

  it('toggles an enabled native trigger and manages its expanded state', async () => {
    element = await fixture('grantcodes-popover');
    element.innerHTML = '<button slot="trigger">Open</button><button>First</button>';
    await element.updateComplete;
    const trigger = element.querySelector('button[slot="trigger"]') as HTMLButtonElement;

    click(trigger);
    await settle();
    await element.updateComplete;

    assert.strictEqual(element.open, true);
    assert.strictEqual(trigger.getAttribute('aria-expanded'), 'true');
    assert.strictEqual(document.activeElement, element.querySelector('button:not([slot])'));
  });

  it('does not toggle a disabled trigger', async () => {
    element = await fixture('grantcodes-popover');
    element.innerHTML = '<button slot="trigger" disabled>Open</button>';
    await element.updateComplete;

    click(element.querySelector('button') as HTMLButtonElement);
    await settle();

    assert.strictEqual(element.open, false);
  });

  it('closes on Escape, consumes the event, and restores the trigger', async () => {
    element = await fixture('grantcodes-popover');
    element.innerHTML = '<button slot="trigger">Open</button><button>First</button>';
    element.open = true;
    await settle();
    await element.updateComplete;
    const event = new window.KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Escape',
    });
    element.querySelector('button:not([slot])')?.dispatchEvent(event);
    await settle();
    await element.updateComplete;

    assert.strictEqual(element.open, false);
    assert.ok(event.defaultPrevented);
    assert.strictEqual(document.activeElement, element.querySelector('button[slot="trigger"]'));
  });

  it('preserves focus moved outside when light-dismissed', async () => {
    element = await fixture('grantcodes-popover');
    const outside = document.createElement('button');
    document.body.append(outside);
    element.innerHTML = '<button slot="trigger">Open</button><button>First</button>';
    element.open = true;
    await settle();
    await element.updateComplete;
    outside.focus();
    (element as unknown as { _handleDocumentClick(event: Event): void })._handleDocumentClick(
      new window.MouseEvent('click', { bubbles: true, composed: true }),
    );
    await settle();
    await element.updateComplete;

    assert.strictEqual(element.open, false);
    assert.strictEqual(document.activeElement, outside);
    outside.remove();
  });

  it('restores its trigger aria-expanded state on disconnect', async () => {
    element = await fixture('grantcodes-popover');
    element.innerHTML = '<button slot="trigger" aria-expanded="mixed">Open</button>';
    await element.updateComplete;
    const trigger = element.querySelector('button') as HTMLButtonElement;
    element.remove();

    assert.strictEqual(trigger.getAttribute('aria-expanded'), 'mixed');
  });
});
