/**
 * Test utilities for creating and cleaning up web component fixtures
 */
import { Window } from "happy-dom";

// Initialize happy-dom window
const window = new Window();
const document = window.document;

// Set up global objects for web components
globalThis.window = window;
globalThis.document = document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.customElements = window.customElements;
globalThis.CustomEvent = window.CustomEvent;
globalThis.Event = window.Event;

// Polyfill requestAnimationFrame for test environment
if (!globalThis.requestAnimationFrame) {
	globalThis.requestAnimationFrame = (callback) => {
		return setTimeout(callback, 0);
	};
	globalThis.cancelAnimationFrame = (id) => {
		clearTimeout(id);
	};
}

/**
 * Creates a web component instance and appends it to the document body
 * @param {string} tagName - The custom element tag name
 * @param {Object} props - Properties to set on the element
 * @returns {Promise<HTMLElement>} The created element after it's connected
 */
export async function fixture(tagName, props = {}) {
	const element = document.createElement(tagName);

	// Set properties
	for (const [key, value] of Object.entries(props)) {
		element[key] = value;
	}

	// Append to body
	document.body.appendChild(element);

	// Wait for element to be fully connected and updated
	await new Promise((resolve) => setTimeout(resolve, 0));

	// If it's a LitElement, wait for updateComplete
	if (element.updateComplete) {
		await element.updateComplete;
	}

	return element;
}

/**
 * Removes an element from the DOM
 * @param {HTMLElement} element - The element to remove
 */
export function cleanup(element) {
	if (element?.parentNode) {
		element.parentNode.removeChild(element);
	}
}

/**
 * Removes all elements matching the selector from the document
 * @param {string} selector - CSS selector for elements to remove
 */
export function cleanupAll(selector = "*") {
	const elements = document.querySelectorAll(selector);
	elements.forEach((el) => {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	});
}
