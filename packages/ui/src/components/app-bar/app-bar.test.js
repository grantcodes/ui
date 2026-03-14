import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup, click } from "../../test-utils/index.js";
import "./app-bar.js";

describe("App Bar Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-app-bar");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should not be sticky by default", async () => {
		element = await fixture("grantcodes-app-bar");
		assert.strictEqual(
			element.sticky,
			false,
			"Should not be sticky by default",
		);
	});

	it("should not be transparent by default", async () => {
		element = await fixture("grantcodes-app-bar");
		assert.strictEqual(
			element.transparent,
			false,
			"Should not be transparent by default",
		);
	});

	it("should render header element", async () => {
		element = await fixture("grantcodes-app-bar");
		const header = element.shadowRoot.querySelector("header");
		assert.ok(header, "Header element should exist");
	});

	it("should apply sticky class when sticky", async () => {
		element = await fixture("grantcodes-app-bar", {
			sticky: true,
		});

		const appBar = element.shadowRoot.querySelector(".app-bar--sticky");
		assert.ok(appBar, "Should have sticky class");
	});

	it("should apply transparent class when transparent", async () => {
		element = await fixture("grantcodes-app-bar", {
			transparent: true,
		});

		const appBar = element.shadowRoot.querySelector(".app-bar--transparent");
		assert.ok(appBar, "Should have transparent class");
	});

	it("should have logo slot", async () => {
		element = await fixture("grantcodes-app-bar");
		const logoSlot = element.shadowRoot.querySelector('slot[name="logo"]');
		assert.ok(logoSlot, "Logo slot should exist");
	});

	it("should have nav slot", async () => {
		element = await fixture("grantcodes-app-bar");
		const navSlot = element.shadowRoot.querySelector('slot[name="nav"]');
		assert.ok(navSlot, "Nav slot should exist");
	});

	it("should have actions slot", async () => {
		element = await fixture("grantcodes-app-bar");
		const actionsSlot = element.shadowRoot.querySelector(
			'slot[name="actions"]',
		);
		assert.ok(actionsSlot, "Actions slot should exist");
	});

	it("should render mobile menu button", async () => {
		element = await fixture("grantcodes-app-bar");
		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);
		assert.ok(menuButton, "Mobile menu button should exist");
	});

	it("should have mobile menu closed by default", async () => {
		element = await fixture("grantcodes-app-bar");
		assert.strictEqual(
			element._mobileMenuOpen,
			false,
			"Mobile menu should be closed by default",
		);
	});

	it("should not render mobile nav when closed", async () => {
		element = await fixture("grantcodes-app-bar");
		const mobileNav = element.shadowRoot.querySelector(".app-bar__mobile-nav");
		assert.ok(!mobileNav, "Mobile nav should not be rendered when closed");
	});

	it("should render mobile nav when opened", async () => {
		element = await fixture("grantcodes-app-bar");
		element._mobileMenuOpen = true;

		await element.updateComplete;

		const mobileNav = element.shadowRoot.querySelector(
			".app-bar__nav--mobile-open",
		);
		assert.ok(mobileNav, "Mobile nav should be rendered when open");
	});

	it("should toggle mobile menu when button is clicked", async () => {
		element = await fixture("grantcodes-app-bar");
		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);

		assert.strictEqual(element._mobileMenuOpen, false, "Should start closed");

		click(menuButton);
		await element.updateComplete;

		assert.strictEqual(
			element._mobileMenuOpen,
			true,
			"Should be open after click",
		);

		click(menuButton);
		await element.updateComplete;

		assert.strictEqual(
			element._mobileMenuOpen,
			false,
			"Should be closed after second click",
		);
	});

	it("should emit menu-toggle event when menu is toggled", async () => {
		element = await fixture("grantcodes-app-bar");

		let toggledState = null;
		element.addEventListener("menu-toggle", (e) => {
			toggledState = e.detail.open;
		});

		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);
		click(menuButton);

		await element.updateComplete;

		assert.strictEqual(
			toggledState,
			true,
			"Toggle event should fire with open state",
		);
	});

	it("should have aria-label on menu button", async () => {
		element = await fixture("grantcodes-app-bar");
		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);
		assert.ok(
			menuButton.hasAttribute("aria-label"),
			"Menu button should have aria-label",
		);
	});

	it("should have aria-expanded on menu button", async () => {
		element = await fixture("grantcodes-app-bar");
		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);
		assert.ok(
			menuButton.hasAttribute("aria-expanded"),
			"Menu button should have aria-expanded",
		);
	});

	it("should update aria-expanded when menu is toggled", async () => {
		element = await fixture("grantcodes-app-bar");
		const menuButton = element.shadowRoot.querySelector(
			".app-bar__menu-button",
		);

		assert.strictEqual(
			menuButton.getAttribute("aria-expanded"),
			"false",
			"Should be false initially",
		);

		click(menuButton);
		await element.updateComplete;

		assert.strictEqual(
			menuButton.getAttribute("aria-expanded"),
			"true",
			"Should be true when open",
		);
	});

	it("should have nav element with aria-label", async () => {
		element = await fixture("grantcodes-app-bar");
		const nav = element.shadowRoot.querySelector("nav");
		assert.ok(nav, "Nav element should exist");
		assert.ok(nav.hasAttribute("aria-label"), "Nav should have aria-label");
	});
});
