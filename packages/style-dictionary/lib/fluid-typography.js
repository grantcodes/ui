/**
 * Fluid typography generator.
 * Computes CSS clamp() values for each font-size token step
 * using a dual-ratio modular type scale.
 */

/**
 * Default configuration for the fluid type scale.
 * @property {number} base - Base font size in rem (1rem = 16px)
 * @property {number} ratioSm - Modular ratio at small viewport (Minor Third)
 * @property {number} ratioLg - Modular ratio at large viewport (Perfect Fourth)
 * @property {number} viewportMin - Small viewport width in px
 * @property {number} viewportMax - Large viewport width in px
 */
export const DEFAULT_FLUID_CONFIG = {
	base: 1,
	ratioSm: 1.2,
	ratioLg: 1.333,
	viewportMin: 320,
	viewportMax: 1280,
};

/**
 * Default step definitions mapping token names to scale exponents.
 * step=0 is the base (md = 1rem). Negative steps are smaller, positive are larger.
 */
export const DEFAULT_FLUID_STEPS = [
	{ name: "xs", step: -2 },
	{ name: "sm", step: -1 },
	{ name: "md", step: 0 },
	{ name: "lg", step: 1 },
	{ name: "xl", step: 2 },
	{ name: "2xl", step: 3 },
	{ name: "3xl", step: 4 },
	{ name: "4xl", step: 5 },
	{ name: "5xl", step: 6 },
	{ name: "6xl", step: 7 },
	{ name: "7xl", step: 8 },
	{ name: "8xl", step: 9 },
	{ name: "display", step: 14 },
];

const round = (n) => parseFloat(n.toFixed(4));

/**
 * Generate a fluid type scale using CSS clamp() values.
 *
 * For each step, computes min/max sizes using modular scale math:
 *   minRem = base * ratioSm^step
 *   maxRem = base * ratioLg^step
 *
 * Applies WCAG floor (0.75rem) and display cap (10rem),
 * then returns either a plain rem value or a clamp() string.
 *
 * @param {typeof DEFAULT_FLUID_CONFIG} [config] - Scale configuration
 * @param {typeof DEFAULT_FLUID_STEPS} [steps] - Step definitions
 * @returns {Record<string, string>} Map of step name to CSS value
 */
export const generateFluidScale = (
	config = DEFAULT_FLUID_CONFIG,
	steps = DEFAULT_FLUID_STEPS,
) => {
	const cfg = { ...DEFAULT_FLUID_CONFIG, ...config };
	const { base, ratioSm, ratioLg, viewportMin, viewportMax } = cfg;

	const vpMinRem = viewportMin / 16;
	const vpMaxRem = viewportMax / 16;

	const result = {};

	for (const { name, step } of steps) {
		let minRem = base * Math.pow(ratioSm, step);
		let maxRem = base * Math.pow(ratioLg, step);

		// WCAG floor: no font size below 0.75rem
		minRem = Math.max(minRem, 0.75);

		// Display cap: limit min to 4rem (mobile) and max to 10rem (desktop)
		if (name === "display") {
			minRem = Math.min(minRem, 4);
			maxRem = Math.min(maxRem, 10);
		}

		// If min >= max, no fluid range needed — return plain rem
		if (minRem >= maxRem) {
			result[name] = `${round(minRem)}rem`;
			continue;
		}

		const slope = (maxRem - minRem) / (vpMaxRem - vpMinRem);
		const intercept = minRem - slope * vpMinRem;

		result[name] = `clamp(${round(minRem)}rem, calc(${round(intercept)}rem + ${round(slope * 100)}vw), ${round(maxRem)}rem)`;
	}

	return result;
};
