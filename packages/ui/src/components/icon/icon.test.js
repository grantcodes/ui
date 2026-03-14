import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./icon.js";

describe("Icon Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-icon");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have icon wrapper span", async () => {
		element = await fixture("grantcodes-icon");
		const iconSpan = element.shadowRoot.querySelector(".icon");
		assert.ok(iconSpan, "Icon span should exist");
	});

	it("should have slot for SVG content", async () => {
		element = await fixture("grantcodes-icon");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
	});

	it("should render slotted SVG content", async () => {
		element = await fixture("grantcodes-icon");
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width", "24");
		svg.setAttribute("height", "24");
		element.appendChild(svg);

		await element.updateComplete;

		const slottedSvg = element.querySelector("svg");
		assert.ok(slottedSvg, "SVG should be slotted");
		assert.strictEqual(slottedSvg.getAttribute("width"), "24");
	});

	it("should accept any SVG as slot content", async () => {
		element = await fixture("grantcodes-icon");
		element.innerHTML =
			'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';

		await element.updateComplete;

		const svg = element.querySelector("svg");
		assert.ok(svg, "SVG should be present");
		assert.ok(svg.querySelector("circle"), "SVG content should be preserved");
	});
});
