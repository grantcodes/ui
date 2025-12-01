import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./badge.js";

describe("Badge Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-badge");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have neutral variant by default", async () => {
		element = await fixture("grantcodes-badge");
		assert.strictEqual(element.variant, "neutral", "Default variant should be neutral");
	});

	it("should have outline style by default", async () => {
		element = await fixture("grantcodes-badge");
		assert.strictEqual(element.style, "outline", "Default style should be outline");
	});

	it("should render badge with correct variant class", async () => {
		element = await fixture("grantcodes-badge", {
			variant: "primary",
		});

		const badge = element.shadowRoot.querySelector(".badge--primary");
		assert.ok(badge, "Badge should have primary variant class");
	});

	it("should render badge with correct style class", async () => {
		element = await fixture("grantcodes-badge", {
			style: "outline",
		});

		const badge = element.shadowRoot.querySelector(".badge--outline");
		assert.ok(badge, "Badge should have outline style class");
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-badge");
		element.textContent = "Badge Text";

		await element.updateComplete;

		assert.strictEqual(element.textContent, "Badge Text", "Slotted content should be rendered");
	});

	it("should support all variant types", async () => {
		const variants = ["primary", "success", "warning", "error", "info", "neutral"];

		for (const variant of variants) {
			element = await fixture("grantcodes-badge", { variant });
			const badge = element.shadowRoot.querySelector(`.badge--${variant}`);
			assert.ok(badge, `Badge should have ${variant} variant class`);
			cleanup(element);
		}
	});

	it("should support all style types", async () => {
		const styles = ["outline", "soft"];

		for (const style of styles) {
			element = await fixture("grantcodes-badge", { style });
			const badge = element.shadowRoot.querySelector(`.badge--${style}`);
			assert.ok(badge, `Badge should have ${style} style class`);
			cleanup(element);
		}
	});
});


