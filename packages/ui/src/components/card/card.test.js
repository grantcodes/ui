import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./card.js";

describe("Card Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-card");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have default slot", async () => {
		element = await fixture("grantcodes-card");
		const slot = element.shadowRoot.querySelector("slot:not([name])");
		assert.ok(slot, "Default slot should exist");
	});

	it("should have header slot", async () => {
		element = await fixture("grantcodes-card");
		const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
		assert.ok(headerSlot, "Header slot should exist");
	});

	it("should have footer slot", async () => {
		element = await fixture("grantcodes-card");
		const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
		assert.ok(footerSlot, "Footer slot should exist");
	});

	it("should render card wrapper", async () => {
		element = await fixture("grantcodes-card");
		const card = element.shadowRoot.querySelector(".card");
		assert.ok(card, "Card wrapper should exist");
	});

	it("should support slotted content", async () => {
		element = await fixture("grantcodes-card");
		const content = document.createElement("p");
		content.textContent = "Card content";
		element.appendChild(content);

		await element.updateComplete;

		assert.strictEqual(
			element.querySelector("p").textContent,
			"Card content",
			"Slotted content should be present",
		);
	});
});


