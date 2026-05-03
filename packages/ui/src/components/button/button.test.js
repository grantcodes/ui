import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import { GrantCodesButton } from "./button.component.js";
import "./button.js";

describe("Button Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-button");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render button element by default", async () => {
		element = await fixture("grantcodes-button");
		const button = element.shadowRoot.querySelector("button");
		assert.ok(button, "Button element should exist");
	});

	it("should render link when href is provided", async () => {
		element = await fixture("grantcodes-button", {
			href: "https://example.com",
		});
		await element.updateComplete;

		const link = element.shadowRoot.querySelector("a");
		assert.ok(link, "Link element should exist");
		const href = link.getAttribute("href");
		assert.ok(href, "Link should have href attribute");
		assert.ok(
			href.includes("example.com") || href === "https://example.com",
			"Link href should contain example.com",
		);
	});

	it("should be disabled when disabled property is set", async () => {
		element = await fixture("grantcodes-button", {
			disabled: true,
		});

		const button = element.shadowRoot.querySelector("button");
		assert.ok(button.disabled, "Button should be disabled");
		assert.ok(
			button.hasAttribute("disabled"),
			"Button should have disabled attribute",
		);
	});

	it("should emit click event when clicked", async () => {
		element = await fixture("grantcodes-button");
		const button = element.shadowRoot.querySelector("button");

		let clicked = false;
		element.addEventListener("click", () => {
			clicked = true;
		});

		click(button);
		assert.ok(clicked, "Click event should have fired");
	});

	it("should not emit click event when disabled", async () => {
		element = await fixture("grantcodes-button", {
			disabled: true,
		});
		const button = element.shadowRoot.querySelector("button");

		let clicked = false;
		element.addEventListener("click", () => {
			clicked = true;
		});

		click(button);
		assert.ok(!clicked, "Click event should not fire when disabled");
	});

	it("should support different button types", async () => {
		const types = ["button", "submit", "reset"];

		for (const type of types) {
			const testElement = await fixture("grantcodes-button", { type });
			const button = testElement.shadowRoot.querySelector("button");
			assert.strictEqual(button.type, type, `Button type should be ${type}`);
			cleanup(testElement);
		}
	});

	it("should render slotted content", async () => {
		element = await fixture("grantcodes-button");
		element.textContent = "Click me";

		await element.updateComplete;

		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
	});
});

describe("Form Context", () => {
	let element;
	let form;

	afterEach(() => {
		cleanup(element);
		cleanup(form);
	});

	it("should render button inside a form element", async () => {
		form = document.createElement("form");
		document.body.appendChild(form);

		element = document.createElement("grantcodes-button");
		form.appendChild(element);
		await element.updateComplete;

		const button = element.shadowRoot.querySelector("button");
		assert.ok(button, "Button should exist in shadow DOM when inside form");
		const link = element.shadowRoot.querySelector("a");
		assert.strictEqual(link, null, "Should not render a link when inside form");
	});

	it("should use type='button' as default on internal button", async () => {
		element = await fixture("grantcodes-button");

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(button.type, "button", "Default type should be 'button'");
	});

	it("should reflect type='submit' on internal button", async () => {
		element = await fixture("grantcodes-button", { type: "submit" });

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(button.type, "submit", "Internal button type should be 'submit'");
	});

	it("should reflect type='reset' on internal button", async () => {
		element = await fixture("grantcodes-button", { type: "reset" });

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(button.type, "reset", "Internal button type should be 'reset'");
	});

	it("should reflect name property on internal button", async () => {
		element = await fixture("grantcodes-button", { name: "myButton" });

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(
			button.getAttribute("name"),
			"myButton",
			"Internal button name attribute should be 'myButton'",
		);
	});

	it("should reflect value property on internal button", async () => {
		element = await fixture("grantcodes-button", { value: "send" });

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(
			button.getAttribute("value"),
			"send",
			"Internal button value attribute should be 'send'",
		);
	});

	it("should reflect disabled property on internal button", async () => {
		element = await fixture("grantcodes-button", { disabled: true });

		const button = element.shadowRoot.querySelector("button");
		assert.strictEqual(button.disabled, true, "Internal button should be disabled");
		assert.ok(
			button.hasAttribute("disabled"),
			"Internal button should have disabled attribute",
		);
	});

	it("should render as link not button when href is set", async () => {
		element = await fixture("grantcodes-button", {
			href: "https://example.com",
		});
		await element.updateComplete;

		const button = element.shadowRoot.querySelector("button");
		const link = element.shadowRoot.querySelector("a");
		assert.strictEqual(button, null, "Should not render a button when href is set");
		assert.ok(link, "Should render a link when href is set");
		const href = link.getAttribute("href");
		assert.ok(
			href === "https://example.com" || href.includes("example.com"),
			"Link href should contain example.com",
		);
	});
});

describe("FACE Infrastructure", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should declare formAssociated as true", () => {
		assert.strictEqual(
			GrantCodesButton.formAssociated,
			true,
			"GrantCodesButton.formAssociated should be true",
		);
	});

	it("should have internals property after construction", async () => {
		element = await fixture("grantcodes-button");
		// internals may be null in happy-dom (attachInternals throws), but the
		// property must exist — it was assigned in the constructor's try/catch.
		assert.ok(
			"internals" in element,
			"Element should have internals property",
		);
		// In happy-dom: element.internals === null (expected — DOM shim limitation)
		// In real browser: element.internals instanceof ElementInternals
	});

	it("should reflect form attribute when set as property", async () => {
		element = await fixture("grantcodes-button", {
			form: "myForm",
		});
		await element.updateComplete;

		assert.strictEqual(
			element.getAttribute("form"),
			"myForm",
			"form attribute should reflect property value 'myForm'",
		);
		assert.strictEqual(
			element.form,
			"myForm",
			"element.form property should be 'myForm'",
		);
	});

	it("should not have form attribute by default", async () => {
		element = await fixture("grantcodes-button");
		await element.updateComplete;

		const formAttr = element.getAttribute("form");
		assert.ok(
			formAttr === null || formAttr === "",
			"form attribute should be null or empty by default",
		);
	});

	it("should still reflect type='submit' on internal button after FACE changes", async () => {
		element = await fixture("grantcodes-button", { type: "submit" });

		const button = element.shadowRoot.querySelector("button");
		assert.ok(button, "Internal button should exist");
		assert.strictEqual(
			button.type,
			"submit",
			"Internal button type should still be 'submit' after FACE wiring",
		);
	});

	it("should still render as link not button when href is set", async () => {
		element = await fixture("grantcodes-button", {
			href: "https://example.com",
		});
		await element.updateComplete;

		const button = element.shadowRoot.querySelector("button");
		const link = element.shadowRoot.querySelector("a");
		assert.strictEqual(button, null, "Should not render a button when href is set");
		assert.ok(link, "Should render a link when href is set");
	});
});
