import { describe, it } from "node:test";
import assert from "node:assert";
import {
	generateFluidScale,
	DEFAULT_FLUID_CONFIG,
	DEFAULT_FLUID_STEPS,
} from "../lib/fluid-typography.js";

describe("generateFluidScale", () => {
	it("returns keys for all DEFAULT_FLUID_STEPS names", () => {
		const result = generateFluidScale();
		const keys = Object.keys(result);
		const expectedKeys = DEFAULT_FLUID_STEPS.map((s) => s.name);
		assert.deepStrictEqual(keys, expectedKeys);
	});

	it("md step returns '1rem' (step=0, no fluid needed)", () => {
		const result = generateFluidScale();
		assert.strictEqual(result["md"], "1rem");
	});

	it("xl step returns a clamp() string", () => {
		const result = generateFluidScale();
		assert.match(result["xl"], /^clamp\(.+,.+,.+\)$/);
	});

	it("all values are either plain rem or clamp()", () => {
		const result = generateFluidScale();
		const remOrClamp = /^(\d+(\.\d+)?rem|clamp\(.+,.+,.+\))$/;
		for (const [name, value] of Object.entries(result)) {
			assert.match(
				value,
				remOrClamp,
				`Step "${name}" value "${value}" is not a valid rem or clamp() string`,
			);
		}
	});

	it("WCAG: all clamp min values >= 0.75rem", () => {
		const result = generateFluidScale();
		for (const [name, value] of Object.entries(result)) {
			if (value.startsWith("clamp(")) {
				const minMatch = value.match(/^clamp\((\d+(\.\d+)?)rem/);
				assert.ok(minMatch, `Could not parse min from clamp for step "${name}"`);
				const minVal = parseFloat(minMatch[1]);
				assert.ok(
					minVal >= 0.75,
					`Step "${name}" min ${minVal}rem is below WCAG floor of 0.75rem`,
				);
			}
		}
	});

	it("display max <= 10rem", () => {
		const result = generateFluidScale();
		const displayValue = result["display"];
		if (displayValue.startsWith("clamp(")) {
			const maxMatch = displayValue.match(/,\s*(\d+(\.\d+)?)rem\)$/);
			assert.ok(maxMatch, "Could not parse max from display clamp");
			const maxVal = parseFloat(maxMatch[1]);
			assert.ok(
				maxVal <= 10,
				`Display max ${maxVal}rem exceeds cap of 10rem`,
			);
		}
	});

	it("display min <= 4rem (mobile cap)", () => {
		const result = generateFluidScale();
		const displayValue = result["display"];
		if (displayValue.startsWith("clamp(")) {
			const minMatch = displayValue.match(/^clamp\((\d+(\.\d+)?)rem/);
			assert.ok(minMatch, "Could not parse min from display clamp");
			const minVal = parseFloat(minMatch[1]);
			assert.ok(
				minVal <= 4,
				`Display min ${minVal}rem exceeds mobile cap of 4rem`,
			);
		}
	});

	it("same ratioSm/ratioLg returns plain rem for non-display steps (no fluid)", () => {
		const cfg = { ...DEFAULT_FLUID_CONFIG, ratioSm: 1.333, ratioLg: 1.333 };
		const result = generateFluidScale(cfg);
		for (const [name, value] of Object.entries(result)) {
			// display always has asymmetric caps (min 4rem, max 10rem) so it produces
			// a clamp() even when ratios are equal — that's intentional
			if (name === "display") continue;
			assert.match(
				value,
				/^\d+(\.\d+)?rem$/,
				`Step "${name}" should be plain rem when ratios are equal, got "${value}"`,
			);
		}
	});
});
