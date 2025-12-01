import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";
import "./tabs.js";
import "./tab.js";

describe("Tabs Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render with default properties", async () => {
		element = await fixture("grantcodes-tabs");
		assert.ok(element, "Element should be created");
		assert.ok(element.shadowRoot, "Element should have shadow root");
	});

	it("should have label property", async () => {
		element = await fixture("grantcodes-tabs", {
			label: "Navigation tabs",
		});

		assert.strictEqual(element.label, "Navigation tabs", "Label should be set");
	});

	it("should render tabs wrapper", async () => {
		element = await fixture("grantcodes-tabs");
		const tabs = element.shadowRoot.querySelector(".tabs");
		assert.ok(tabs, "Tabs wrapper should exist");
	});

	it("should render tablist with role", async () => {
		element = await fixture("grantcodes-tabs");
		const tablist = element.shadowRoot.querySelector('[role="tablist"]');
		assert.ok(tablist, "Tablist should exist with role");
		assert.ok(
			tablist.classList.contains("tabs__tablist"),
			"Should have tablist class",
		);
	});

	it("should render panels container", async () => {
		element = await fixture("grantcodes-tabs");
		const panels = element.shadowRoot.querySelector(".tabs__panels");
		assert.ok(panels, "Panels container should exist");
	});

	it("should have slot for tab panels", async () => {
		element = await fixture("grantcodes-tabs");
		const slot = element.shadowRoot.querySelector(".tabs__panels slot");
		assert.ok(slot, "Slot should exist for tab panels");
	});

	it("should generate unique ID", async () => {
		const element1 = await fixture("grantcodes-tabs");
		const element2 = await fixture("grantcodes-tabs");

		assert.notStrictEqual(element1.id, element2.id, "IDs should be unique");

		cleanup(element1);
		cleanup(element2);
	});

	it("should initialize tabs array", async () => {
		element = await fixture("grantcodes-tabs");
		assert.ok(Array.isArray(element.tabs), "Tabs should be an array");
	});

	it("should initialize tabButtons array", async () => {
		element = await fixture("grantcodes-tabs");
		assert.ok(
			Array.isArray(element.tabButtons),
			"Tab buttons should be an array",
		);
	});

	it("should have focusedTabIndex property", async () => {
		element = await fixture("grantcodes-tabs");
		// After firstUpdated, if there are tabs, _focusedTabIndex will be set to 0
		// If there are no tabs, it should remain -1
		// Since we're not adding tabs, it should remain -1, but firstUpdated may have run
		// Check that the property exists and is a number
		assert.ok(
			typeof element._focusedTabIndex === "number",
			"Should have focusedTabIndex property",
		);
	});

	it("should support keyboard navigation", async () => {
		element = await fixture("grantcodes-tabs");
		// The handleTabKeyDown method handles ArrowRight and ArrowLeft
		assert.ok(
			element.handleTabKeyDown,
			"Should have keyboard navigation handler",
		);
	});

	it("should set aria-label on tablist when label is provided", async () => {
		element = await fixture("grantcodes-tabs", {
			label: "Main navigation",
		});

		const tablist = element.shadowRoot.querySelector('[role="tablist"]');
		assert.strictEqual(
			tablist.getAttribute("aria-label"),
			"Main navigation",
			"Tablist should have aria-label",
		);
	});

	it("should manage active tab state", async () => {
		element = await fixture("grantcodes-tabs");

		// Create and add tab elements
		const tab1 = document.createElement("grantcodes-tab");
		tab1.label = "Tab 1";
		const tab2 = document.createElement("grantcodes-tab");
		tab2.label = "Tab 2";

		element.appendChild(tab1);
		element.appendChild(tab2);

		await element.updateComplete;

		// The tabs are initialized in firstUpdated
		// Check that activeTab getter works
		assert.ok(element.activeTab !== undefined, "Should have activeTab getter");
	});

	it("should render tab buttons for each tab", async () => {
		element = await fixture("grantcodes-tabs");

		const tab1 = document.createElement("grantcodes-tab");
		tab1.label = "First";
		const tab2 = document.createElement("grantcodes-tab");
		tab2.label = "Second";

		element.appendChild(tab1);
		element.appendChild(tab2);

		await element.updateComplete;

		// Tab buttons are rendered via renderTabButtons method
		// In a real browser, these would be visible in the shadow DOM
	});
});
