import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./breadcrumb.js";

describe("Breadcrumb Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render breadcrumb container", async () => {
		element = await fixture("grantcodes-breadcrumb");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render nav element with aria-label", async () => {
		element = await fixture("grantcodes-breadcrumb");
		const nav = element.shadowRoot.querySelector("nav");
		assert.ok(nav, "Nav element should exist");
		assert.strictEqual(
			nav.getAttribute("aria-label"),
			"Breadcrumb",
			"Should have breadcrumb aria-label",
		);
	});

	it("should render ordered list", async () => {
		element = await fixture("grantcodes-breadcrumb");
		const list = element.shadowRoot.querySelector("ol");
		assert.ok(list, "Ordered list should exist");
		assert.ok(
			list.classList.contains("breadcrumb__list"),
			"Should have breadcrumb__list class",
		);
	});

	it("should have default separator", async () => {
		element = await fixture("grantcodes-breadcrumb");
		assert.strictEqual(element.separator, "/", "Default separator should be /");
	});

	it("should have slot for breadcrumb items", async () => {
		element = await fixture("grantcodes-breadcrumb");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist for breadcrumb items");
	});
});

describe("Breadcrumb Item Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render breadcrumb item", async () => {
		element = await fixture("grantcodes-breadcrumb-item");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render as link when href is provided", async () => {
		element = await fixture("grantcodes-breadcrumb-item", {
			href: "/test",
		});

		const link = element.shadowRoot.querySelector(".breadcrumb__link");
		assert.ok(link, "Link should exist");
		assert.strictEqual(
			link.getAttribute("href"),
			"/test",
			"Href should be set",
		);
	});

	it("should render as span when no href", async () => {
		element = await fixture("grantcodes-breadcrumb-item");

		const span = element.shadowRoot.querySelector(".breadcrumb__text");
		assert.ok(span, "Span should exist");
	});

	it("should render as span when current", async () => {
		element = await fixture("grantcodes-breadcrumb-item", {
			href: "/test",
			current: true,
		});

		const span = element.shadowRoot.querySelector(".breadcrumb__text");
		const link = element.shadowRoot.querySelector(".breadcrumb__link");
		assert.ok(span, "Span should exist for current page");
		assert.ok(!link, "Link should not exist for current page");
	});

	it("should have current attribute when current is true", async () => {
		element = await fixture("grantcodes-breadcrumb-item", {
			current: true,
		});

		const item = element.shadowRoot.querySelector(".breadcrumb__item");
		assert.ok(
			item.hasAttribute("data-current"),
			"Should have data-current attribute",
		);
	});

	it("should not have current attribute when current is false", async () => {
		element = await fixture("grantcodes-breadcrumb-item", {
			current: false,
		});

		const item = element.shadowRoot.querySelector(".breadcrumb__item");
		assert.ok(
			!item.hasAttribute("data-current"),
			"Should not have data-current attribute",
		);
	});

	it("should render list item", async () => {
		element = await fixture("grantcodes-breadcrumb-item");
		const item = element.shadowRoot.querySelector("li");
		assert.ok(item, "List item should exist");
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-breadcrumb-item");
		element.textContent = "Home";

		await element.updateComplete;

		assert.strictEqual(
			element.textContent,
			"Home",
			"Slotted content should be rendered",
		);
	});

	it("should not be current by default", async () => {
		element = await fixture("grantcodes-breadcrumb-item");
		assert.strictEqual(
			element.current,
			false,
			"Should not be current by default",
		);
	});

	it("should have empty href by default", async () => {
		element = await fixture("grantcodes-breadcrumb-item");
		assert.strictEqual(element.href, "", "Href should be empty by default");
	});
});
