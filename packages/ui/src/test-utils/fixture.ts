/**
 * Test utilities for creating and cleaning up web component fixtures
 */
import { Window } from 'happy-dom';

// Initialize happy-dom window
const window = new Window();
// SAFETY: happy-dom's Document is structurally compatible for the DOM APIs used here,
// but it is not the lib.dom Document type.
const document: Document = window.document as unknown as Document;

// Set up global objects for web components
Object.assign(globalThis, {
  window,
  document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  CustomEvent: window.CustomEvent,
  Event: window.Event,
});

// Polyfill requestAnimationFrame for test environment
if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    // SAFETY: Node's setTimeout returns Timeout, but the DOM signature requires a numeric id.
    return setTimeout(callback, 0) as unknown as number;
  };
  globalThis.cancelAnimationFrame = (id: number) => {
    // SAFETY: frame ids created above are Node Timeout handles at runtime.
    clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
  };
}

function isUpdatable(
  element: HTMLElement,
): element is HTMLElement & { updateComplete: Promise<unknown> } {
  return 'updateComplete' in element;
}

/**
 * Creates a web component instance and appends it to the document body
 * @param {string} tagName - The custom element tag name
 * @param {Object} props - Properties to set on the element
 * @returns {Promise<HTMLElement>} The created element after it's connected
 */
export async function fixture<T extends HTMLElement = HTMLElement>(
  tagName: string,
  props: Record<string, unknown> = {},
): Promise<T> {
  // SAFETY: callers pick the element type via the generic; createElement cannot map a tag to a class.
  const element = document.createElement(tagName) as T;

  // Set properties
  Object.assign(element, props);

  // Append to body
  document.body.appendChild(element);

  // Wait for element to be fully connected and updated
  await new Promise((resolve) => setTimeout(resolve, 0));

  // If it's a LitElement, wait for updateComplete
  if (isUpdatable(element)) {
    await element.updateComplete;
  }

  return element;
}

/**
 * Removes an element from the DOM
 * @param {HTMLElement} element - The element to remove
 */
export function cleanup(element: HTMLElement) {
  if (element?.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Removes all elements matching the selector from the document
 * @param {string} selector - CSS selector for elements to remove
 */
export function cleanupAll(selector = '*') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
}
