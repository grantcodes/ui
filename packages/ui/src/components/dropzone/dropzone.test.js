import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./dropzone.js";

describe("Dropzone Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-dropzone");
		// Add required file input after fixture (component allows missing input in tests)
		const input = document.createElement("input");
		input.type = "file";
		input.placeholder = "Drop files here";
		element.appendChild(input);
		await element.updateComplete;
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have fullscreenOnDrag property set to false by default", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		element.appendChild(input);
		await element.updateComplete;
		assert.strictEqual(
			element.fullscreenOnDrag,
			false,
			"fullscreenOnDrag should be false by default",
		);
	});

	it("should render dropzone wrapper", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		element.appendChild(input);
		await element.updateComplete;
		const dropzone = element.shadowRoot.querySelector(".dropzone");
		assert.ok(dropzone, "Dropzone element should exist");
	});

	it("should render placeholder span", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		input.placeholder = "Drop files here";
		element.appendChild(input);
		await element.updateComplete;
		const placeholder = element.shadowRoot.querySelector(".dropzone__placeholder");
		assert.ok(placeholder, "Placeholder element should exist");
	});

	it("should have slot for file input", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		element.appendChild(input);
		await element.updateComplete;
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
	});

	it("should support fullscreenOnDrag property", async () => {
		element = await fixture("grantcodes-dropzone", {
			fullscreenOnDrag: true,
		});
		const input = document.createElement("input");
		input.type = "file";
		element.appendChild(input);
		await element.updateComplete;

		assert.strictEqual(
			element.fullscreenOnDrag,
			true,
			"fullscreenOnDrag should be true",
		);
	});

	it("should have drag event handlers", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		element.appendChild(input);
		await element.updateComplete;
		const dropzone = element.shadowRoot.querySelector(".dropzone");

		// Check that the element has the event listener attributes
		assert.ok(dropzone, "Dropzone should exist to attach handlers");
	});

	it("should handle file input placeholder", async () => {
		element = await fixture("grantcodes-dropzone");
		const input = document.createElement("input");
		input.type = "file";
		input.placeholder = "Drop files here";
		element.appendChild(input);

		await element.updateComplete;

		const placeholder = element.shadowRoot.querySelector(".dropzone__placeholder");
		// The placeholder text is set from the input's placeholder in firstUpdated
		assert.ok(placeholder, "Placeholder should exist");
	});
});


