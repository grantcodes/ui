import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./button-group.js";

describe("Button Group Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-button-group");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render button group wrapper", async () => {
		element = await fixture("grantcodes-button-group");
		const group = element.shadowRoot.querySelector(".button-group");
		assert.ok(group, "Button group wrapper should exist");
	});

	it("should have slot for buttons", async () => {
		element = await fixture("grantcodes-button-group");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist for buttons");
	});

	it("should support multiple slotted buttons", async () => {
		element = await fixture("grantcodes-button-group");

		const button1 = document.createElement("button");
		button1.textContent = "Button 1";
		const button2 = document.createElement("button");
		button2.textContent = "Button 2";
		const button3 = document.createElement("button");
		button3.textContent = "Button 3";

		element.appendChild(button1);
		element.appendChild(button2);
		element.appendChild(button3);

		await element.updateComplete;

		assert.strictEqual(element.children.length, 3, "Should have three buttons");
	});

	it("should group buttons together visually", async () => {
		element = await fixture("grantcodes-button-group");
		const group = element.shadowRoot.querySelector(".button-group");
		assert.ok(group, "Button group should provide visual grouping");
	});
});


