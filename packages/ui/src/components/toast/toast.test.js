import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import "./toast.js";

describe("Toast Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-toast");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have info variant by default", async () => {
		element = await fixture("grantcodes-toast");
		assert.strictEqual(
			element.variant,
			"info",
			"Default variant should be info",
		);
	});

	it("should have 5000ms duration by default", async () => {
		element = await fixture("grantcodes-toast");
		assert.strictEqual(
			element.duration,
			5000,
			"Default duration should be 5000ms",
		);
	});

	it("should have top-right position by default", async () => {
		element = await fixture("grantcodes-toast");
		assert.strictEqual(
			element.position,
			"top-right",
			"Default position should be top-right",
		);
	});

	it("should be dismissible by default", async () => {
		element = await fixture("grantcodes-toast");
		assert.strictEqual(
			element.dismissible,
			true,
			"Should be dismissible by default",
		);
	});

	it("should render toast with correct variant class", async () => {
		element = await fixture("grantcodes-toast", {
			variant: "success",
		});

		const toast = element.shadowRoot.querySelector(".toast--success");
		assert.ok(toast, "Toast should have success variant class");
	});

	it("should render title when provided", async () => {
		element = await fixture("grantcodes-toast", {
			title: "Test Title",
		});

		const title = element.shadowRoot.querySelector(".toast__title");
		assert.ok(title, "Title element should exist");
		assert.strictEqual(
			title.textContent,
			"Test Title",
			"Title text should match",
		);
	});

	it("should not render title when not provided", async () => {
		element = await fixture("grantcodes-toast");

		const title = element.shadowRoot.querySelector(".toast__title");
		assert.ok(!title, "Title element should not exist");
	});

	it("should render dismiss button when dismissible", async () => {
		element = await fixture("grantcodes-toast", {
			dismissible: true,
		});

		const closeButton = element.shadowRoot.querySelector(".toast__close");
		assert.ok(closeButton, "Close button should exist");
	});

	it("should not render dismiss button when not dismissible", async () => {
		element = await fixture("grantcodes-toast", {
			dismissible: false,
		});

		const closeButton = element.shadowRoot.querySelector(".toast__close");
		assert.ok(!closeButton, "Close button should not exist");
	});

	it("should have role=status", async () => {
		element = await fixture("grantcodes-toast");

		const toast = element.shadowRoot.querySelector(".toast");
		assert.strictEqual(
			toast.getAttribute("role"),
			"status",
			"Should have status role",
		);
	});

	it("should have aria-live=polite", async () => {
		element = await fixture("grantcodes-toast");

		const toast = element.shadowRoot.querySelector(".toast");
		assert.strictEqual(
			toast.getAttribute("aria-live"),
			"polite",
			"Should have aria-live polite",
		);
	});

	it("should render icon based on variant", async () => {
		element = await fixture("grantcodes-toast", {
			variant: "success",
		});

		const icon = element.shadowRoot.querySelector(".toast__icon");
		assert.ok(icon, "Icon should exist");
	});

	it("should emit dismiss event when dismissed", async () => {
		element = await fixture("grantcodes-toast", {
			dismissible: true,
			duration: 0, // Disable auto-dismiss
		});

		let dismissed = false;
		element.addEventListener("dismiss", () => {
			dismissed = true;
		});

		const closeButton = element.shadowRoot.querySelector(".toast__close");
		click(closeButton);

		// Wait a bit for animation
		await new Promise((resolve) => setTimeout(resolve, 350));

		assert.ok(dismissed, "Dismiss event should have fired");
	});

	it("should support all variant types", async () => {
		const variants = ["info", "success", "warning", "error"];

		for (const variant of variants) {
			element = await fixture("grantcodes-toast", { variant });
			const toast = element.shadowRoot.querySelector(`.toast--${variant}`);
			assert.ok(toast, `Toast should have ${variant} variant class`);
			cleanup(element);
		}
	});
});

describe("Toast Container Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render toast container", async () => {
		element = await fixture("grantcodes-toast-container");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have top-right position by default", async () => {
		element = await fixture("grantcodes-toast-container");
		assert.strictEqual(
			element.position,
			"top-right",
			"Default position should be top-right",
		);
	});

	it("should render container with correct position class", async () => {
		element = await fixture("grantcodes-toast-container", {
			position: "bottom-left",
		});

		const container = element.shadowRoot.querySelector(
			".toast-container--bottom-left",
		);
		assert.ok(container, "Container should have bottom-left position class");
	});

	it("should have slot for toast items", async () => {
		element = await fixture("grantcodes-toast-container");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist for toast items");
	});

	it("should support all position types", async () => {
		const positions = [
			"top-left",
			"top-center",
			"top-right",
			"bottom-left",
			"bottom-center",
			"bottom-right",
		];

		for (const position of positions) {
			element = await fixture("grantcodes-toast-container", { position });
			const container = element.shadowRoot.querySelector(
				`.toast-container--${position}`,
			);
			assert.ok(container, `Container should have ${position} position class`);
			cleanup(element);
		}
	});
});
