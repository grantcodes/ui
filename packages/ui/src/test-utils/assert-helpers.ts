/**
 * Custom assertions for web components
 */

import { strict as assert } from 'node:assert';

/**
 * Asserts that an element has a specific attribute
 * @param {HTMLElement} element - The element to check
 * @param {string} attribute - The attribute name
 * @param {string} expectedValue - The expected attribute value (optional)
 */
export function assertAttribute(element: HTMLElement, attribute: string, expectedValue?: string) {
  const hasAttribute = element.hasAttribute(attribute);
  assert.ok(hasAttribute, `Element should have attribute "${attribute}"`);

  if (expectedValue !== undefined) {
    const actualValue = element.getAttribute(attribute);
    assert.strictEqual(
      actualValue,
      expectedValue,
      `Attribute "${attribute}" should be "${expectedValue}" but was "${actualValue}"`,
    );
  }
}

/**
 * Asserts that an element does not have a specific attribute
 * @param {HTMLElement} element - The element to check
 * @param {string} attribute - The attribute name
 */
export function assertNoAttribute(element: HTMLElement, attribute: string) {
  const hasAttribute = element.hasAttribute(attribute);
  assert.ok(!hasAttribute, `Element should not have attribute "${attribute}"`);
}

/**
 * Asserts that an element has a specific class
 * @param {HTMLElement} element - The element to check
 * @param {string} className - The class name
 */
export function assertClass(element: HTMLElement, className: string) {
  assert.ok(element.classList.contains(className), `Element should have class "${className}"`);
}

/**
 * Asserts that an element does not have a specific class
 * @param {HTMLElement} element - The element to check
 * @param {string} className - The class name
 */
export function assertNoClass(element: HTMLElement, className: string) {
  assert.ok(!element.classList.contains(className), `Element should not have class "${className}"`);
}

/**
 * Asserts that an element matches a CSS selector
 * @param {HTMLElement} element - The element to check
 * @param {string} selector - The CSS selector
 */
export function assertSelector(element: HTMLElement, selector: string) {
  assert.ok(element.matches(selector), `Element should match selector "${selector}"`);
}

/**
 * Asserts that an element contains specific text content
 * @param {HTMLElement} element - The element to check
 * @param {string} expectedText - The expected text
 */
export function assertTextContent(element: HTMLElement, expectedText: string) {
  const actualText = element.textContent?.trim();
  assert.strictEqual(
    actualText,
    expectedText,
    `Element text content should be "${expectedText}" but was "${actualText}"`,
  );
}

/**
 * Asserts that an element contains a substring in its text content
 * @param {HTMLElement} element - The element to check
 * @param {string} substring - The substring to find
 */
export function assertTextIncludes(element: HTMLElement, substring: string) {
  const text = element.textContent || '';
  assert.ok(
    text.includes(substring),
    `Element text should include "${substring}" but was "${text}"`,
  );
}

/**
 * Asserts that a shadow root contains a specific element
 * @param {HTMLElement} element - The element with shadow root
 * @param {string} selector - The CSS selector to find in shadow root
 */
export function assertShadowElement(
  element: HTMLElement & { renderRoot?: ShadowRoot | null },
  selector: string,
) {
  const shadowRoot = element.shadowRoot || element.renderRoot;
  assert.ok(shadowRoot, 'Element should have a shadow root');

  const found = shadowRoot.querySelector(selector);
  assert.ok(found, `Shadow root should contain element matching "${selector}"`);
}

/**
 * Asserts that an element has a specific ARIA attribute
 * @param {HTMLElement} element - The element to check
 * @param {string} ariaAttribute - The ARIA attribute name (e.g., 'aria-label')
 * @param {string} expectedValue - The expected value (optional)
 */
export function assertAria(element: HTMLElement, ariaAttribute: string, expectedValue?: string) {
  assertAttribute(element, ariaAttribute, expectedValue);
}

/**
 * Asserts that an element is visible (not hidden by display or visibility)
 * @param {HTMLElement} element - The element to check
 */
export function assertVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  assert.notStrictEqual(style.display, 'none', 'Element should not have display:none');
  assert.notStrictEqual(style.visibility, 'hidden', 'Element should not have visibility:hidden');
}

/**
 * Asserts that an element is hidden
 * @param {HTMLElement} element - The element to check
 */
export function assertHidden(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const isHidden =
    style.display === 'none' || style.visibility === 'hidden' || element.hidden === true;
  assert.ok(isHidden, 'Element should be hidden');
}
