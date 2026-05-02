import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./accordion.js";

describe("Accordion Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("renders htmlContent as trusted HTML", async () => {
		element = await fixture("grantcodes-accordion", {
			items: [{ title: "Rich", htmlContent: "<strong>Trusted</strong>" }],
		});

		const content = element.shadowRoot.querySelector(".accordion__content");
		const strong = content.querySelector("strong");

		assert.ok(strong, "Trusted HTML should render a strong element");
		assert.strictEqual(strong.textContent, "Trusted");
	});

	it("keeps content as escaped plain text", async () => {
		element = await fixture("grantcodes-accordion", {
			items: [{ title: "Plain", content: "<strong>Plain</strong>" }],
		});

		const content = element.shadowRoot.querySelector(".accordion__content");

		assert.strictEqual(content.querySelector("strong"), null);
		assert.strictEqual(content.textContent, "<strong>Plain</strong>");
	});

	it("uses htmlContent before content when both are present", async () => {
		element = await fixture("grantcodes-accordion", {
			items: [
				{
					title: "Both",
					content: "<em>Unsafe fallback</em>",
					htmlContent: "<strong>Trusted wins</strong>",
				},
			],
		});

		const content = element.shadowRoot.querySelector(".accordion__content");
		const strong = content.querySelector("strong");

		assert.ok(strong, "htmlContent should render a strong element");
		assert.strictEqual(strong.textContent, "Trusted wins");
		assert.strictEqual(content.querySelector("em"), null);
		assert.equal(content.textContent.includes("Unsafe fallback"), false);
	});

	it("treats empty htmlContent as present for precedence", async () => {
		element = await fixture("grantcodes-accordion", {
			items: [
				{
					title: "Empty trusted",
					content: "Plain fallback",
					htmlContent: "",
				},
			],
		});

		const content = element.shadowRoot.querySelector(".accordion__content");

		assert.strictEqual(content.textContent, "");
		assert.equal(content.textContent.includes("Plain fallback"), false);
	});
});
