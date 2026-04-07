import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./gallery.js";
import "./gallery-image.js";

describe("Gallery Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-gallery");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should render gallery wrapper", async () => {
		element = await fixture("grantcodes-gallery");
		const gallery = element.shadowRoot.querySelector(".gallery");
		assert.ok(gallery, "Gallery element should exist");
	});

	it("should have slot for gallery items", async () => {
		element = await fixture("grantcodes-gallery");
		const slot = element.shadowRoot.querySelector("slot");
		assert.ok(slot, "Slot should exist");
		assert.ok(
			slot.classList.contains("gallery__slot"),
			"Slot should have gallery__slot class",
		);
	});

	it("should support multiple image slots", async () => {
		element = await fixture("grantcodes-gallery");

		const img1 = document.createElement("img");
		img1.src = "image1.jpg";
		const img2 = document.createElement("img");
		img2.src = "image2.jpg";

		element.appendChild(img1);
		element.appendChild(img2);

		await element.updateComplete;

		assert.strictEqual(element.children.length, 2, "Should have two images");
	});

	it("should initialize images array", async () => {
		element = await fixture("grantcodes-gallery");
		assert.ok(Array.isArray(element.images), "Images should be an array");
		assert.strictEqual(
			element.images.length,
			0,
			"Images array should be empty initially",
		);
	});

	describe("Gallery filmstrip variant", () => {
		let element;

		afterEach(() => {
			cleanup(element);
		});

		it("should have filmstrip property default to false", async () => {
			element = await fixture("grantcodes-gallery");
			assert.strictEqual(element.filmstrip, false, "filmstrip should default to false");
		});

		it("should reflect filmstrip attribute when property is set", async () => {
			element = await fixture("grantcodes-gallery");
			element.filmstrip = true;
			await element.updateComplete;
			assert.ok(
				element.hasAttribute("filmstrip"),
				"filmstrip attribute should be reflected",
			);
		});
	});
});
