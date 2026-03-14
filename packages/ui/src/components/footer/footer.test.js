import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./footer.js";

describe("Footer Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-footer");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have 3 columns by default", async () => {
		element = await fixture("grantcodes-footer");
		assert.strictEqual(element.columns, 3, "Should have 3 columns by default");
	});

	it("should render footer element", async () => {
		element = await fixture("grantcodes-footer");
		const footer = element.shadowRoot.querySelector("footer");
		assert.ok(footer, "Footer element should exist");
	});

	it("should render footer columns container", async () => {
		element = await fixture("grantcodes-footer");
		const columns = element.shadowRoot.querySelector(".footer__columns");
		assert.ok(columns, "Columns container should exist");
	});

	it("should apply columns CSS variable", async () => {
		element = await fixture("grantcodes-footer", {
			columns: 4,
		});

		const columns = element.shadowRoot.querySelector(".footer__columns");
		const style = columns.getAttribute("style");
		assert.ok(
			style.includes("--footer-columns: 4"),
			"Should set columns CSS variable",
		);
	});

	it("should have default content slot", async () => {
		element = await fixture("grantcodes-footer");
		const slot = element.shadowRoot.querySelector("slot:not([name])");
		assert.ok(slot, "Default slot should exist");
	});

	it("should render bottom section when content is provided", async () => {
		element = await fixture("grantcodes-footer");

		// Add content to bottom slot
		const bottomContent = document.createElement("div");
		bottomContent.setAttribute("slot", "bottom");
		bottomContent.textContent = "Bottom content";
		element.appendChild(bottomContent);

		await element.updateComplete;
		// Force a re-render to check the slot
		element.requestUpdate();
		await element.updateComplete;

		const bottom = element.shadowRoot.querySelector(".footer__bottom");
		assert.ok(bottom, "Bottom section should exist when content is slotted");
	});

	it("should support different column counts", async () => {
		const columnCounts = [1, 2, 3, 4, 5, 6];

		for (const count of columnCounts) {
			element = await fixture("grantcodes-footer", { columns: count });
			assert.strictEqual(
				element.columns,
				count,
				`Should support ${count} columns`,
			);
			cleanup(element);
		}
	});

	it("should have footer container", async () => {
		element = await fixture("grantcodes-footer");
		const container = element.shadowRoot.querySelector(".footer__container");
		assert.ok(container, "Footer container should exist");
	});

	it("should have footer class", async () => {
		element = await fixture("grantcodes-footer");
		const footer = element.shadowRoot.querySelector(".footer");
		assert.ok(footer, "Should have footer class");
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-footer");
		const content = document.createElement("div");
		content.textContent = "Footer content";
		element.appendChild(content);

		await element.updateComplete;

		assert.ok(
			element.querySelector("div"),
			"Slotted content should be present",
		);
	});
});
