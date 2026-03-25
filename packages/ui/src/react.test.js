import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

describe("React Wrappers", () => {
	it("should export all component wrappers", async () => {
		const react = await import("./react.js");
		assert.ok(react.Button, "Button wrapper should be exported");
		assert.ok(react.Card, "Card wrapper should be exported");
		assert.ok(react.Dialog, "Dialog wrapper should be exported");
		assert.ok(react.Accordion, "Accordion wrapper should be exported");
		assert.ok(react.Tooltip, "Tooltip wrapper should be exported");
		assert.ok(react.Hero, "Hero wrapper should be exported");
		assert.ok(react.Container, "Container wrapper should be exported");
		assert.ok(react.Icon, "Icon wrapper should be exported");
		assert.ok(react.Loading, "Loading wrapper should be exported");
		assert.ok(react.Notice, "Notice wrapper should be exported");
	});

	it("should export at least 35 component wrappers", async () => {
		const react = await import("./react.js");
		const exportCount = Object.keys(react).length;
		assert.ok(
			exportCount >= 35,
			`Expected at least 35 exports, got ${exportCount}`,
		);
	});

	it("should export event-mapped components", async () => {
		const react = await import("./react.js");
		assert.ok(react.AppBar, "AppBar wrapper should be exported");
		assert.ok(react.Dropdown, "Dropdown wrapper should be exported");
		assert.ok(react.DropdownItem, "DropdownItem wrapper should be exported");
		assert.ok(react.Sidebar, "Sidebar wrapper should be exported");
		assert.ok(react.Toast, "Toast wrapper should be exported");
	});

	it("should export compound component wrappers", async () => {
		const react = await import("./react.js");
		assert.ok(react.Breadcrumb, "Breadcrumb wrapper should be exported");
		assert.ok(
			react.BreadcrumbItem,
			"BreadcrumbItem wrapper should be exported",
		);
		assert.ok(react.Footer, "Footer wrapper should be exported");
		assert.ok(react.FooterColumn, "FooterColumn wrapper should be exported");
		assert.ok(react.Gallery, "Gallery wrapper should be exported");
		assert.ok(react.GalleryImage, "GalleryImage wrapper should be exported");
		assert.ok(react.Tabs, "Tabs wrapper should be exported");
		assert.ok(react.Tab, "Tab wrapper should be exported");
		assert.ok(react.TabsButton, "TabsButton wrapper should be exported");
		assert.ok(
			react.ToastContainer,
			"ToastContainer wrapper should be exported",
		);
	});
});
