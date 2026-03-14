import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import "./button.js";

describe("Button Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-button");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render button element by default", async () => {
		element = await fixture("grantcodes-button");
		const button = element.shadowRoot.querySelector("button");
		assert.ok(button, "Button element should exist");
	});

	it("should render link when href is provided", async () => {
		element = await fixture("grantcodes-button", {
			href: "https://example.com",
		});
		await element.updateComplete;

		const link = element.shadowRoot.querySelector("a");
		assert.ok(link, "Link element should exist");
		const href = link.getAttribute("href");
		assert.ok(href, "Link should have href attribute");
		assert.ok(
			href.includes("example.com") || href === "https://example.com",
			"Link href should contain example.com",
		);
	});

	it("should be disabled when disabled property is set", async () => {
		element = await fixture("grantcodes-button", {
			disabled: true,
		});

		const button = element.shadowRoot.querySelector("button");
		assert.ok(button.disabled, "Button should be disabled");
		assert.ok(
			button.hasAttribute("disabled"),
			"Button should have disabled attribute",
		);
	});

	it("should emit click event when clicked", async () => {
		element = await fixture("grantcodes-button");
		const button = element.shadowRoot.querySelector("button");

		let clicked = false;
		element.addEventListener("click", () => {
			clicked = true;
		});

		click(button);
		assert.ok(clicked, "Click event should have fired");
	});

	it("should not emit click event when disabled", async () => {
		element = await fixture("grantcodes-button", {
			disabled: true,
		});
		const button = element.shadowRoot.querySelector("button");

		let clicked = false;
		element.addEventListener("click", () => {
			clicked = true;
		});

		click(button);
		assert.ok(!clicked, "Click event should not fire when disabled");
	});

	it("should support different button types", async () => {
		const types = ["button", "submit", "reset"];

		for (const type of types) {
			const testElement = await fixture("grantcodes-button", { type });
			const button = testElement.shadowRoot.querySelector("button");
			assert.strictEqual(button.type, type, `Button type should be ${type}`);
			cleanup(testElement);
		}
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-button");
		element.textContent = "Click me";

		await element.updateComplete;

		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
	});
});
