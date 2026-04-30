import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.resolve(__dirname, "..", "package.json");
const pkgRoot = path.dirname(pkgPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const exports = pkg.exports;

// All 34 component CSS files expected to exist on disk
// These are resolved via the ./components/* wildcard export
const expectedComponentCss = [
	"accordion/accordion.css",
	"app-bar/app-bar.css",
	"avatar/avatar.css",
	"badge/badge.css",
	"breadcrumb/breadcrumb.css",
	"button/button.css",
	"button-group/button-group.css",
	"card/card.css",
	"code-preview/code-preview.css",
	"container/container.css",
	"cta/cta.css",
	"dialog/dialog.css",
	"dropdown/dropdown.css",
	"dropzone/dropzone.css",
	"feature-list/feature-list.css",
	"footer/footer.css",
	"footer/footer-column.css",
	"form-field/form-field.css",
	"gallery/gallery.css",
	"hero/hero.css",
	"icon/icon.css",
	"loading/loading.css",
	"logo-cloud/logo-cloud.css",
	"media-text/media-text.css",
	"newsletter/newsletter.css",
	"notice/notice.css",
	"pagination/pagination.css",
	"pricing/pricing.css",
	"sidebar/sidebar.css",
	"stats/stats.css",
	"tabs/tabs.css",
	"testimonials/testimonials.css",
	"toast/toast.css",
	"tooltip/tooltip.css",
];

describe("package.json exports", () => {
	describe("component CSS files exist (resolved via ./components/* wildcard)", () => {
		for (const cssFile of expectedComponentCss) {
			it(`src/components/${cssFile} exists on disk`, () => {
				const fullPath = path.resolve(pkgRoot, "src", "components", cssFile);
				assert.ok(
					fs.existsSync(fullPath),
					`CSS file does not exist: ${fullPath}`,
				);
			});
		}

		it("has ./components/* wildcard export that covers CSS files", () => {
			assert.ok(
				exports["./components/*"],
				"Missing ./components/* wildcard export",
			);
		});
	});

	describe("focus-ring shared styles export", () => {
		it("has export for ./styles/focus-ring.css", () => {
			assert.ok(
				exports["./styles/focus-ring.css"] !== undefined,
				"Missing export for ./styles/focus-ring.css",
			);
		});

		it("./styles/focus-ring.css points to an existing file", () => {
			const exportValue = exports["./styles/focus-ring.css"];
			const filePath =
				typeof exportValue === "string" ? exportValue : exportValue?.import;
			assert.ok(filePath, "No file path found for ./styles/focus-ring.css");
			const fullPath = path.resolve(pkgRoot, filePath);
			assert.ok(fs.existsSync(fullPath), `File does not exist: ${fullPath}`);
		});
	});

	describe("existing exports preserved", () => {
		it("has root export (.)", () => {
			assert.ok(exports["."], "Missing root export");
			assert.ok(exports["."].import, "Missing root import");
		});

		it("has ./icons export", () => {
			assert.ok(exports["./icons"], "Missing ./icons export");
		});

		it("has ./styles/base.css export", () => {
			assert.ok(
				exports["./styles/base.css"],
				"Missing ./styles/base.css export",
			);
		});

		it("has ./styles/themes/* export", () => {
			assert.ok(
				exports["./styles/themes/*"],
				"Missing ./styles/themes/* export",
			);
		});

		it("has ./components/* wildcard export", () => {
			assert.ok(
				exports["./components/*"],
				"Missing ./components/* wildcard export",
			);
		});

		it("has ./fonts/* export", () => {
			assert.ok(exports["./fonts/*"], "Missing ./fonts/* export");
		});
	});
});
