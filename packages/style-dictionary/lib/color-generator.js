import Color from "colorjs.io";

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

/**
 * Generate a full 100-900 oklch color scale from a single base color.
 * 500 is anchored to the base color's lightness. Lighter shades space evenly
 * toward ~95%, darker shades space evenly toward ~20%.
 * Chroma scales proportionally — reduces away from the base lightness to
 * avoid oversaturation at light end and muddiness at dark end.
 * Hue is preserved exactly across all shades.
 *
 * @param {string} baseColorStr - An oklch color string, e.g. "oklch(65% 0.22 279.42)"
 * @returns {Record<string, string>} Object with keys "100"-"900" and oklch string values
 */
const generateOklchScale = (baseColorStr) => {
	const base = new Color(baseColorStr);
	const baseL = base.oklch.l; // 0-1 range
	const baseC = base.oklch.c;
	const baseH = base.oklch.h;
	// Treat NaN hue (achromatic colors) as 0
	const hue = Number.isNaN(baseH) ? 0 : baseH;

	const MAX_L = 0.95;
	const MIN_L = 0.20;

	// Build lightness array: 100-400 evenly from MAX_L to just above baseL,
	// 500 = baseL, 600-900 evenly from just below baseL to MIN_L
	const lighterCount = 4; // shades 100-400
	const darkerCount = 4; // shades 600-900
	const lighterStep = (MAX_L - baseL) / lighterCount;
	const darkerStep = (baseL - MIN_L) / darkerCount;

	const lightnessMap = {};
	// 100-400: lighter shades
	for (let i = 0; i < lighterCount; i++) {
		const shade = (i + 1) * 100; // 100, 200, 300, 400
		lightnessMap[shade] = MAX_L - i * lighterStep;
	}
	// 500: anchor
	lightnessMap[500] = baseL;
	// 600-900: darker shades
	for (let i = 0; i < darkerCount; i++) {
		const shade = 600 + i * 100; // 600, 700, 800, 900
		lightnessMap[shade] = baseL - (i + 1) * darkerStep;
	}

	const scale = {};
	for (const [shade, l] of Object.entries(lightnessMap)) {
		// Scale chroma: reduce proportionally to distance from base lightness
		const dist = Math.abs(l - baseL);
		const chromaScale = Math.max(0, 1 - dist * 1.2);
		const c = baseC * chromaScale;

		const lPercent = (l * 100).toFixed(2);
		const cFormatted = c.toFixed(4);
		const hFormatted = hue.toFixed(2);

		scale[shade] = `oklch(${lPercent}% ${cFormatted} ${hFormatted})`;
	}

	return scale;
};

export { getLightnessScale, generateOklchScale };
