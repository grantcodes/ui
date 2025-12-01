/**
 * Generate a unique ID with optional prefix
 * @param {string | undefined} prefix - Optional prefix for the ID
 * @returns {string} Generated unique ID
 */
function generateId(prefix) {
	return `${prefix || "id"}-${Math.random().toString(36).substr(2, 9)}`;
}

export { generateId };
