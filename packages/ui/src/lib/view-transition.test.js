import { strict as assert } from 'node:assert';
import { afterEach, describe, it } from 'node:test';
// Side-effect import: sets up the happy-dom window and document globals.
import '../test-utils/index.js';
import { startViewTransition, canViewTransition } from './view-transition.js';

describe('startViewTransition', () => {
  const originalMatchMedia = globalThis.window?.matchMedia;
  const originalStartViewTransition = globalThis.document?.startViewTransition;

  const stubMotion = (reduce) => {
    globalThis.window.matchMedia = () => ({ matches: reduce });
  };

  afterEach(() => {
    globalThis.window.matchMedia = originalMatchMedia;
    globalThis.document.startViewTransition = originalStartViewTransition;
  });

  it('runs the update inside a transition when motion is allowed', () => {
    stubMotion(false);
    const transition = { finished: Promise.resolve() };
    let transitions = 0;
    let updates = 0;
    globalThis.document.startViewTransition = (callback) => {
      transitions++;
      callback();
      return transition;
    };

    const result = startViewTransition(() => {
      updates++;
    });

    assert.strictEqual(transitions, 1, 'Expected one view transition');
    assert.strictEqual(updates, 1, 'Expected the update to run once');
    assert.strictEqual(result, transition, 'Expected the transition to be returned');
  });

  it('runs the update directly when reduced motion is preferred', () => {
    stubMotion(true);
    let transitions = 0;
    let updates = 0;
    globalThis.document.startViewTransition = () => {
      transitions++;
      return { finished: Promise.resolve() };
    };

    const result = startViewTransition(() => {
      updates++;
    });

    assert.strictEqual(transitions, 0, 'Reduced motion must skip the transition');
    assert.strictEqual(updates, 1, 'Expected the update to run once');
    assert.strictEqual(result, null);
  });

  it('runs the update directly when the platform has no view transitions', () => {
    stubMotion(false);
    globalThis.document.startViewTransition = undefined;
    let updates = 0;

    const result = startViewTransition(() => {
      updates++;
    });

    assert.strictEqual(updates, 1, 'Expected the update to run once');
    assert.strictEqual(result, null);
  });
});

describe('canViewTransition', () => {
  const originalMatchMedia = globalThis.window?.matchMedia;
  const originalStartViewTransition = globalThis.document?.startViewTransition;

  const stubMotion = (reduce) => {
    globalThis.window.matchMedia = () => ({ matches: reduce });
  };

  afterEach(() => {
    globalThis.window.matchMedia = originalMatchMedia;
    globalThis.document.startViewTransition = originalStartViewTransition;
  });

  it('reports support when the API is present and motion is allowed', () => {
    stubMotion(false);
    globalThis.document.startViewTransition = () => ({ finished: Promise.resolve() });

    assert.strictEqual(canViewTransition(), true);
  });

  it('reports no support under reduced motion', () => {
    stubMotion(true);
    globalThis.document.startViewTransition = () => ({ finished: Promise.resolve() });

    assert.strictEqual(canViewTransition(), false);
  });

  it('reports no support when the API is missing', () => {
    stubMotion(false);
    globalThis.document.startViewTransition = undefined;

    assert.strictEqual(canViewTransition(), false);
  });
});
