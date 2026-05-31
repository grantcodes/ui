import { afterEach, describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { cleanup, fixture } from "../../test-utils/index.js";
import "./person.js";

describe("Person Component", () => {
	let element;

	afterEach(() => {
		cleanup(element);
	});

	it("should render name and details", async () => {
		element = await fixture("grantcodes-person", {
			name: "Jane Doe",
			role: "Designer",
			company: "GrantCodes",
		});

		assert.strictEqual(
			element.shadowRoot.querySelector(".person__name")?.textContent,
			"Jane Doe",
		);
		assert.strictEqual(
			element.shadowRoot.querySelector(".person__details")?.textContent,
			"Designer, GrantCodes",
		);
	});

	it("should omit details when role and company are missing", async () => {
		element = await fixture("grantcodes-person", {
			name: "Jane Doe",
		});

		assert.equal(
			element.shadowRoot.querySelector(".person__details"),
			null,
		);
	});
});
