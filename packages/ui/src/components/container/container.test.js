import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./container.js";

describe("Container Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-container");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render default align variant", async () => {
		element = await fixture("grantcodes-container");
		const container = element.shadowRoot.querySelector(".container");
		assert.ok(container, "Container element should exist");
	});

	it("should apply wide alignment class", async () => {
		element = await fixture("grantcodes-container", {
			align: "wide",
		});

		const container = element.shadowRoot.querySelector(".container");
		assert.ok(
			container.classList.contains("container--wide"),
			"Should have wide class",
		);
	});

	it("should apply full alignment class", async () => {
		element = await fixture("grantcodes-container", {
			align: "full",
		});

		const container = element.shadowRoot.querySelector(".container");
		assert.ok(
			container.classList.contains("container--full"),
			"Should have full class",
		);
	});

	it("should apply viewport alignment class", async () => {
		element = await fixture("grantcodes-container", {
			align: "viewport",
		});

		const container = element.shadowRoot.querySelector(".container");
		assert.ok(
			container.classList.contains("container--viewport"),
			"Should have viewport class",
		);
	});

	it("should apply nopad class when nopad is true", async () => {
		element = await fixture("grantcodes-container", {
			nopad: true,
		});

		const container = element.shadowRoot.querySelector(".container");
		assert.ok(
			container.classList.contains("container--nopad"),
			"Should have nopad class",
		);
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-container");
		element.innerHTML = "<p>Container content</p>";

		await element.updateComplete;

		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
	});
});
