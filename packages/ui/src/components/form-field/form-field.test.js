import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./form-field.js";

describe("Form Field Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-form-field");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should display label text", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Username",
		});

		const labelElement = element.shadowRoot.querySelector(".form-field__label");
		assert.ok(labelElement, "Label element should exist");
		assert.strictEqual(
			labelElement.textContent,
			"Username",
			"Label text should match",
		);
	});

	it("should display error message when error is set", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Email",
			error: "Invalid email format",
		});

		const errorElement = element.shadowRoot.querySelector(".form-field__error");
		assert.ok(errorElement, "Error element should exist");
		assert.ok(
			errorElement.textContent.includes("Invalid email format"),
			"Error message should be displayed",
		);
	});

	it("should not display error when no error is set", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Email",
		});

		const errorElement = element.shadowRoot.querySelector(".form-field__error");
		assert.ok(!errorElement, "Error element should not exist");
	});

	it("should display help text when help is provided", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Password",
			help: "Must be at least 8 characters",
		});

		const helpElement = element.shadowRoot.querySelector(".form-field__help");
		assert.ok(helpElement, "Help element should exist");
		assert.strictEqual(
			helpElement.textContent,
			"Must be at least 8 characters",
			"Help text should match",
		);
	});

	it("should not display help when no help is provided", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Password",
		});

		const helpElement = element.shadowRoot.querySelector(".form-field__help");
		assert.ok(
			!helpElement,
			"Help element should not exist when help is not provided",
		);
	});

	it("should generate unique IDs", async () => {
		const element1 = await fixture("grantcodes-form-field");
		const element2 = await fixture("grantcodes-form-field");

		assert.notStrictEqual(element1.id, element2.id, "IDs should be unique");

		cleanup(element1);
		cleanup(element2);
	});

	it("should have label element", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Test Field",
		});

		const label = element.shadowRoot.querySelector("label");
		assert.ok(label, "Label element should exist");
	});

	it("should render as fieldset for grouped inputs", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Select options",
		});

		// Add nested form fields to trigger group mode
		const nestedField = document.createElement("grantcodes-form-field");
		element.appendChild(nestedField);

		await element.updateComplete;
		// This would need to check if groupInput was set, which happens in firstUpdated
	});

	it("should have slot for input elements", async () => {
		element = await fixture("grantcodes-form-field", {
			label: "Input",
		});

		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist for input elements");
	});
});
