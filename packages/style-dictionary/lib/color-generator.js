/**
 * Get a scale of lightness values
 * @param {number} min - The minimum lightness value
 * @param {number} max - The maximum lightness value
 * @param {number} steps - The number of steps in the scale
 * @returns {number[]} - The lightness steps
 */
const getLightnessScale = (min = 26, max = 97, steps = 9) => {
	const step = (max - min) / steps;
	return Array.from({ length: steps }, (_, i) => Math.round(min + step * i));
};

export { getLightnessScale };
