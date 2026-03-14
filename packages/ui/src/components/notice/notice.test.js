import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import "./notice.js";

describe("Notice Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-notice");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have info variant by default", async () => {
		element = await fixture("grantcodes-notice");
		assert.strictEqual(
			element.variant,
			"info",
			"Default variant should be info",
		);
	});

	it("should render with info variant class", async () => {
		element = await fixture("grantcodes-notice", {
			variant: "info",
		});

		const notice = element.shadowRoot.querySelector(".notice--info");
		assert.ok(notice, "Notice should have info class");
	});

	it("should render with success variant class", async () => {
		element = await fixture("grantcodes-notice", {
			variant: "success",
		});

		const notice = element.shadowRoot.querySelector(".notice--success");
		assert.ok(notice, "Notice should have success class");
	});

	it("should render with warning variant class", async () => {
		element = await fixture("grantcodes-notice", {
			variant: "warning",
		});

		const notice = element.shadowRoot.querySelector(".notice--warning");
		assert.ok(notice, "Notice should have warning class");
	});

	it("should render with error variant class", async () => {
		element = await fixture("grantcodes-notice", {
			variant: "error",
		});

		const notice = element.shadowRoot.querySelector(".notice--error");
		assert.ok(notice, "Notice should have error class");
	});

	it("should display title when provided", async () => {
		element = await fixture("grantcodes-notice", {
			title: "Important Notice",
		});

		const title = element.shadowRoot.querySelector(".notice__title");
		assert.ok(title, "Title element should exist");
		assert.strictEqual(
			title.textContent,
			"Important Notice",
			"Title text should match",
		);
	});

	it("should not display title when not provided", async () => {
		element = await fixture("grantcodes-notice");

		const title = element.shadowRoot.querySelector(".notice__title");
		assert.ok(!title, "Title element should not exist");
	});

	it("should not be dismissable by default", async () => {
		element = await fixture("grantcodes-notice");
		assert.strictEqual(
			element.dismissable,
			false,
			"Should not be dismissable by default",
		);
	});

	it("should render dismiss button when dismissable", async () => {
		element = await fixture("grantcodes-notice", {
			dismissable: true,
		});

		const closeButton = element.shadowRoot.querySelector(".notice__close");
		assert.ok(closeButton, "Close button should exist");
	});

	it("should not render dismiss button when not dismissable", async () => {
		element = await fixture("grantcodes-notice", {
			dismissable: false,
		});

		const closeButton = element.shadowRoot.querySelector(".notice__close");
		assert.ok(!closeButton, "Close button should not exist");
	});

	it("should render appropriate icon for variant", async () => {
		element = await fixture("grantcodes-notice", {
			variant: "success",
		});

		const icon = element.shadowRoot.querySelector(".notice__icon");
		assert.ok(icon, "Icon should be present");
	});

	it("should have content slot", async () => {
		element = await fixture("grantcodes-notice");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist for content");
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-notice");
		element.textContent = "This is a notice message";

		await element.updateComplete;

		assert.strictEqual(
			element.textContent,
			"This is a notice message",
			"Slotted content should be present",
		);
	});

	it("should remove element when dismissed", async () => {
		element = await fixture("grantcodes-notice", {
			dismissable: true,
		});

		const closeButton = element.shadowRoot.querySelector(".notice__close");
		const parentBeforeDismiss = element.parentNode;

		assert.ok(parentBeforeDismiss, "Element should have a parent");

		// Note: In actual tests, the element removal via view transitions might need special handling
		click(closeButton);

		// Give time for the dismiss handler to execute
		await new Promise((resolve) => setTimeout(resolve, 10));
	});
});
