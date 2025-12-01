/**
 * Test utilities for event testing
 */

/**
 * Creates and dispatches a custom event on an element
 * @param {HTMLElement} element - The element to dispatch the event on
 * @param {string} eventName - The name of the event
 * @param {Object} detail - Event detail object
 * @returns {boolean} Returns true if the event was not cancelled
 */
export function dispatchEvent(element, eventName, detail = {}) {
	const event = new CustomEvent(eventName, {
		detail,
		bubbles: true,
		composed: true,
		cancelable: true,
	});
	return element.dispatchEvent(event);
}

/**
 * Waits for an event to be dispatched on an element
 * @param {HTMLElement} element - The element to listen on
 * @param {string} eventName - The name of the event to wait for
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise<Event>} Resolves with the event object
 */
export function waitForEvent(element, eventName, timeout = 3000) {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			element.removeEventListener(eventName, handler);
			reject(
				new Error(`Event "${eventName}" did not fire within ${timeout}ms`),
			);
		}, timeout);

		const handler = (event) => {
			clearTimeout(timeoutId);
			element.removeEventListener(eventName, handler);
			resolve(event);
		};

		element.addEventListener(eventName, handler);
	});
}

/**
 * Simulates a click on an element
 * @param {HTMLElement} element - The element to click
 */
export function click(element) {
	element.click();
}

/**
 * Simulates a keyboard event on an element
 * @param {HTMLElement} element - The element to dispatch the event on
 * @param {string} key - The key to press (e.g., 'Enter', 'Escape')
 * @param {string} type - The event type ('keydown', 'keyup', 'keypress')
 */
export function keyboard(element, key, type = "keydown") {
	const event = new KeyboardEvent(type, {
		key,
		bubbles: true,
		composed: true,
		cancelable: true,
	});
	element.dispatchEvent(event);
}

/**
 * Simulates focus on an element
 * @param {HTMLElement} element - The element to focus
 */
export function focus(element) {
	element.focus();
	element.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
}

/**
 * Simulates blur on an element
 * @param {HTMLElement} element - The element to blur
 */
export function blur(element) {
	element.blur();
	element.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
}
