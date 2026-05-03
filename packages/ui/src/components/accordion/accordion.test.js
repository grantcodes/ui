import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./accordion.js";

describe("Accordion", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("renders a slot for accordion items", async () => {
		element = await fixture("grantcodes-accordion");
		const slot = element.shadowRoot.querySelector("slot:not([name])");
		assert.ok(slot, "Default slot should exist");
	});

	it("renders accordion wrapper", async () => {
		element = await fixture("grantcodes-accordion");
		const wrapper = element.shadowRoot.querySelector(".accordion");
		assert.ok(wrapper, "Accordion wrapper should exist");
	});

	it("accepts slotted accordion items", async () => {
		element = await fixture("grantcodes-accordion");
		const item = document.createElement("grantcodes-accordion-item");
		item.setAttribute("title", "FAQ");
		item.textContent = "Answer text";
		element.appendChild(item);
		await element.updateComplete;
		await item.updateComplete;

		const found = element.querySelector("grantcodes-accordion-item");
		assert.ok(found, "Slotted accordion item should be present");
		assert.strictEqual(found.getAttribute("title"), "FAQ");
		assert.strictEqual(found.textContent, "Answer text");
	});
});

describe("GrantCodesAccordionItem", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("renders a details element with summary and slot", async () => {
		element = await fixture("grantcodes-accordion-item", {
			title: "Section",
		});
		const details = element.shadowRoot.querySelector("details");
		const summary = element.shadowRoot.querySelector("summary");
		const slot = element.shadowRoot.querySelector("slot");

		assert.ok(details, "Details element should exist");
		assert.ok(summary, "Summary should exist");
		assert.ok(slot, "Slot should exist");
		assert.strictEqual(summary.textContent.trim().replace(/\s+/g, " "), "Section");
	});

	it("renders HTML content via slot", async () => {
		element = await fixture("grantcodes-accordion-item", {
			title: "Rich",
		});
		element.innerHTML = "<strong>Trusted</strong>";
		await element.updateComplete;

		const strong = element.querySelector("strong");
		assert.ok(strong, "Slotted HTML should render a strong element");
		assert.strictEqual(strong.textContent, "Trusted");
	});

	it("renders text content as escaped plain text", async () => {
		element = await fixture("grantcodes-accordion-item", {
			title: "Plain",
		});
		element.textContent = "<strong>Plain</strong>";
		await element.updateComplete;

		const strong = element.querySelector("strong");
		assert.strictEqual(strong, null, "Escaped text should not create a strong element");
		assert.strictEqual(element.textContent, "<strong>Plain</strong>");
	});

	it("supports the open attribute", async () => {
		element = await fixture("grantcodes-accordion-item", {
			title: "Open item",
			open: true,
		});
		const details = element.shadowRoot.querySelector("details");
		assert.ok(details.hasAttribute("open"), "Details should be open");
	});

	it("renders an empty slot by default", async () => {
		element = await fixture("grantcodes-accordion-item", {
			title: "Empty",
		});
		const content = element.shadowRoot.querySelector(".accordion__content");
		const slot = content.querySelector("slot");
		assert.ok(slot, "Slot should exist in content area");
	});
});
