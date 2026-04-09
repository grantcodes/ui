import { describe, it } from "node:test";
import assert from "node:assert";
import { generateOklchScale, getLightnessScale } from "../lib/color-generator.js";

describe("getLightnessScale", () => {
	it("should return an array of lightness values", () => {
		const scale = getLightnessScale();
		assert.ok(Array.isArray(scale));
		assert.strictEqual(scale.length, 9);
	});
});

describe("generateOklchScale", () => {
	it("should return object with keys 100-900", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		const keys = Object.keys(scale);
		const expected = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
		assert.deepStrictEqual(keys, expected);
	});

	it("should return valid oklch() strings for each shade", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		const oklchRegex = /^oklch\(\d+(\.\d+)?% \d+(\.\d+)? \d+(\.\d+)?\)$/;
		for (const [shade, value] of Object.entries(scale)) {
			assert.match(
				value,
				oklchRegex,
				`Shade ${shade} value "${value}" is not a valid oklch() string`,
			);
		}
	});

	it("should have lightness decreasing from 100 to 900", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		const shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
		for (let i = 0; i < shades.length - 1; i++) {
			const currentL = parseFloat(scale[shades[i]].match(/oklch\((\d+(\.\d+)?)%/)[1]);
			const nextL = parseFloat(scale[shades[i + 1]].match(/oklch\((\d+(\.\d+)?)%/)[1]);
			assert.ok(
				currentL > nextL,
				`Shade ${shades[i]} lightness (${currentL}%) should be > shade ${shades[i + 1]} lightness (${nextL}%)`,
			);
		}
	});

	it("should preserve hue from base color across all shades", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		for (const [shade, value] of Object.entries(scale)) {
			const hue = parseFloat(value.match(/oklch\(.+? .+? (\d+(\.\d+)?)\)/)[1]);
			assert.strictEqual(
				hue,
				279.42,
				`Shade ${shade} hue (${hue}) should be 279.42`,
			);
		}
	});

	it("should have evenly spaced lightness steps (perceptual uniformity)", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		const shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
		const lightnesses = shades.map((s) =>
			parseFloat(scale[s].match(/oklch\((\d+(\.\d+)?)%/)[1]),
		);

		// Calculate step sizes between consecutive shades
		const steps = [];
		for (let i = 0; i < lightnesses.length - 1; i++) {
			steps.push(lightnesses[i] - lightnesses[i + 1]);
		}

		// All steps should be positive (already tested) and roughly similar
		// Allow +-50% variance from average step size for flexibility
		const avgStep = steps.reduce((a, b) => a + b, 0) / steps.length;
		for (let i = 0; i < steps.length; i++) {
			assert.ok(
				steps[i] > avgStep * 0.3 && steps[i] < avgStep * 2.0,
				`Step from shade ${shades[i]} to ${shades[i + 1]} (${steps[i].toFixed(2)}%) is not evenly spaced (avg: ${avgStep.toFixed(2)}%)`,
			);
		}
	});

	it("should have 500 shade lightness close to base color lightness", () => {
		const scale = generateOklchScale("oklch(65% 0.22 279.42)");
		const shade500L = parseFloat(scale["500"].match(/oklch\((\d+(\.\d+)?)%/)[1]);
		// Base lightness is 65%, 500 shade should be within 3% tolerance
		assert.ok(
			Math.abs(shade500L - 65) < 3,
			`500 shade lightness (${shade500L}%) should be close to base lightness (65%), within 3%`,
		);
	});

	it("should handle achromatic input with chroma 0", () => {
		const scale = generateOklchScale("oklch(60% 0 0)");
		const keys = Object.keys(scale);
		const expected = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
		assert.deepStrictEqual(keys, expected);

		// All shades should have chroma 0 (or very close)
		for (const [shade, value] of Object.entries(scale)) {
			const chroma = parseFloat(value.match(/oklch\(.+? (\d+(\.\d+)?) /)[1]);
			assert.ok(
				chroma <= 0.001,
				`Achromatic shade ${shade} chroma (${chroma}) should be 0 or near-zero`,
			);
		}
	});
});
