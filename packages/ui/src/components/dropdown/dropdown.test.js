import { strict as assert } from "node:assert";
import { afterEach, describe, it } from "node:test";
import { cleanup, click, fixture } from "../../test-utils/index.js";
import "./dropdown.js";

describe("Dropdown Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-dropdown");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should be closed by default", async () => {
		element = await fixture("grantcodes-dropdown");
		assert.strictEqual(element.open, false, "Should be closed by default");
	});

	it("should have bottom-start placement by default", async () => {
		element = await fixture("grantcodes-dropdown");
		assert.strictEqual(
			element.placement,
			"bottom-start",
			"Default placement should be bottom-start",
		);
	});

	it("should have trigger slot", async () => {
		element = await fixture("grantcodes-dropdown");
		const slot = element.shadowRoot.querySelector('slot[name="trigger"]');
		assert.ok(slot, "Trigger slot should exist");
	});

	it("should have menu slot", async () => {
		element = await fixture("grantcodes-dropdown");
		const slot = element.shadowRoot.querySelector('slot[name="menu"]');
		assert.ok(slot, "Menu slot should exist");
	});

	it("should render menu element", async () => {
		element = await fixture("grantcodes-dropdown");
		const menu = element.shadowRoot.querySelector(".dropdown__menu");
		assert.ok(menu, "Menu element should be rendered");
	});

	it("should have role=menu on menu", async () => {
		element = await fixture("grantcodes-dropdown");
		const menu = element.shadowRoot.querySelector(".dropdown__menu");
		assert.strictEqual(
			menu.getAttribute("role"),
			"menu",
			"Menu should have role",
		);
	});

	it("should apply placement class to menu", async () => {
		element = await fixture("grantcodes-dropdown", {
			placement: "top-end",
		});

		const menu = element.shadowRoot.querySelector(".dropdown__menu--top-end");
		assert.ok(menu, "Menu should have placement class");
	});

	it("should generate unique IDs", async () => {
		const element1 = await fixture("grantcodes-dropdown");
		const element2 = await fixture("grantcodes-dropdown");

		assert.notStrictEqual(element1.id, element2.id, "IDs should be unique");

		cleanup(element1);
		cleanup(element2);
	});
});

describe("Dropdown Item Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render dropdown item", async () => {
		element = await fixture("grantcodes-dropdown-item");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should not be disabled by default", async () => {
		element = await fixture("grantcodes-dropdown-item");
		assert.strictEqual(
			element.disabled,
			false,
			"Should not be disabled by default",
		);
	});

	it("should render with disabled class when disabled", async () => {
		element = await fixture("grantcodes-dropdown-item", {
			disabled: true,
		});

		const item = element.shadowRoot.querySelector(".dropdown-item--disabled");
		assert.ok(item, "Should have disabled class");
	});

	it("should emit select event when clicked", async () => {
		element = await fixture("grantcodes-dropdown-item");

		let selected = false;
		element.addEventListener("select", () => {
			selected = true;
		});

		const item = element.shadowRoot.querySelector(".dropdown-item");
		click(item);

		assert.ok(selected, "Select event should have fired");
	});

	it("should not emit select event when disabled", async () => {
		element = await fixture("grantcodes-dropdown-item", {
			disabled: true,
		});

		let selected = false;
		element.addEventListener("select", () => {
			selected = true;
		});

		const item = element.shadowRoot.querySelector(".dropdown-item");
		click(item);

		assert.ok(!selected, "Select event should not fire when disabled");
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-dropdown-item");
		element.textContent = "Menu Item";

		await element.updateComplete;

		assert.strictEqual(
			element.textContent,
			"Menu Item",
			"Slotted content should be rendered",
		);
	});

	it("should have dropdown-item wrapper", async () => {
		element = await fixture("grantcodes-dropdown-item");
		const item = element.shadowRoot.querySelector(".dropdown-item");
		assert.ok(item, "Dropdown item wrapper should exist");
	});
});
