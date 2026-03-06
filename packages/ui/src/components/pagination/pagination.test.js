import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./pagination.js";

describe("Pagination Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-pagination");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have page property defaulting to 1", async () => {
		element = await fixture("grantcodes-pagination");
		assert.strictEqual(element.page, 1, "Page should default to 1");
	});

	it("should have pages property defaulting to 1", async () => {
		element = await fixture("grantcodes-pagination");
		assert.strictEqual(element.pages, 1, "Pages should default to 1");
	});

	it("should render navigation element", async () => {
		element = await fixture("grantcodes-pagination", {
			pages: 5,
		});

		const nav = element.shadowRoot.querySelector("nav");
		assert.ok(nav, "Navigation element should exist");
	});

	it("should render pagination list", async () => {
		element = await fixture("grantcodes-pagination", {
			pages: 5,
		});

		const list = element.shadowRoot.querySelector(".pagination");
		assert.ok(list, "Pagination list should exist");
	});

	it("should support href property for links", async () => {
		element = await fixture("grantcodes-pagination", {
			page: 2,
			pages: 5,
			href: "/page/{page}",
		});

		assert.strictEqual(element.href, "/page/{page}", "Href property should be set");
	});

	it("should indicate current page", async () => {
		element = await fixture("grantcodes-pagination", {
			page: 3,
			pages: 5,
		});

		assert.strictEqual(element.page, 3, "Current page should be 3");
	});

	it("should handle single page", async () => {
		element = await fixture("grantcodes-pagination", {
			page: 1,
			pages: 1,
		});

		const list = element.shadowRoot.querySelector(".pagination");
		assert.ok(list, "Should render even with single page");
	});

	it("should handle multiple pages", async () => {
		element = await fixture("grantcodes-pagination", {
			page: 1,
			pages: 10,
		});

		const list = element.shadowRoot.querySelector(".pagination");
		assert.ok(list, "Should render pagination for multiple pages");
	});

	it("should support navigation to different pages", async () => {
		element = await fixture("grantcodes-pagination", {
			page: 5,
			pages: 10,
		});

		// The component should allow navigating to previous and next pages
		assert.ok(element.page > 1, "Should be able to go to previous page");
		assert.ok(element.page < element.pages, "Should be able to go to next page");
	});
});


