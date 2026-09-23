import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
// Side-effect import: sets up the happy-dom window and document globals.
import './test-utils/index.js';
import './components/dropdown/dropdown.js';
import './components/form-field/form-field.js';
import './components/tabs/tabs.js';
import './components/tooltip/tooltip.js';

// A custom element that gains an attribute in its constructor is never upgraded by
// document.createElement in a real browser: the element stays inert.
const TAGS = [
  'grantcodes-dropdown',
  'grantcodes-form-field',
  'grantcodes-tabs',
  'grantcodes-tooltip',
];

describe('component construction', () => {
  for (const tag of TAGS) {
    it(`should construct ${tag} without touching its attributes`, () => {
      const element = document.createElement(tag);

      assert.strictEqual(
        element.getAttribute('id'),
        null,
        `${tag} set an attribute during construction, so browsers will not upgrade it`,
      );
    });
  }
});
