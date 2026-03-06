import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import "./dialog.js";

describe("Dialog Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-dialog");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should be closed by default", async () => {
		element = await fixture("grantcodes-dialog");
		assert.strictEqual(element.open, false, "Dialog should be closed by default");
	});

	it("should render dialog element", async () => {
		element = await fixture("grantcodes-dialog");
		const dialog = element.shadowRoot.querySelector("dialog");
		assert.ok(dialog, "Dialog element should exist");
	});

	it("should open when open property is set to true", async () => {
		element = await fixture("grantcodes-dialog", {
			open: true,
		});

		await element.updateComplete;

		// Note: In tests, showModal() might not work as expected without a browser environment
		assert.strictEqual(element.open, true, "Open property should be true");
	});

	it("should be dismissible by default", async () => {
		element = await fixture("grantcodes-dialog");
		assert.strictEqual(element.dismissible, true, "Should be dismissible by default");
	});

	it("should render dismiss button when dismissible", async () => {
		element = await fixture("grantcodes-dialog", {
			dismissible: true,
		});

		const dismissButton = element.shadowRoot.querySelector(".dialog__dismiss");
		assert.ok(dismissButton, "Dismiss button should exist");
	});

	it("should not render dismiss button when not dismissible", async () => {
		element = await fixture("grantcodes-dialog", {
			dismissible: false,
		});

		const dismissButton = element.shadowRoot.querySelector(".dialog__dismiss");
		assert.ok(!dismissButton, "Dismiss button should not exist");
	});

	it("should have header slot", async () => {
		element = await fixture("grantcodes-dialog");
		const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
		assert.ok(headerSlot, "Header slot should exist");
	});

	it("should have footer slot", async () => {
		element = await fixture("grantcodes-dialog");
		const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
		assert.ok(footerSlot, "Footer slot should exist");
	});

	it("should have default content slot", async () => {
		element = await fixture("grantcodes-dialog");
		const slot = element.shadowRoot.querySelector('slot.dialog__content');
		assert.ok(slot, "Content slot should exist");
	});

	it("should close when dismiss button is clicked", async () => {
		element = await fixture("grantcodes-dialog", {
			open: true,
			dismissible: true,
		});

		const dismissButton = element.shadowRoot.querySelector(".dialog__dismiss");
		click(dismissButton);

		await element.updateComplete;

		assert.strictEqual(element.open, false, "Dialog should be closed");
	});
});


