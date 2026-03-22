# Testing Patterns

**Analysis Date:** 2026-03-22

## Test Framework

**Runner:**
- Node.js built-in test runner (node:test) - All packages
- Config: Inline in package.json scripts, no separate config file

**Assertion Library:**
- Node.js assert (strict mode) - `node:assert`

**Run Commands:**
```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Specific package
cd packages/ui && pnpm test:unit
```

## Test File Organization

**Location:**
- Co-located with source files - `component.test.js` alongside `component.js`
- Separate tests directory for utilities - `packages/style-dictionary/tests/`

**Naming:**
- [component].test.js - Component test files
- tokens.test.js - Utility test files

**Structure:**
```
packages/ui/src/components/button/
├── button.js
├── button.component.js
├── button.test.js
└── ...
```

## Test Structure

**Suite Organization:**
```javascript
import { describe, it, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { fixture, cleanup } from "../../test-utils/index.js";

describe("Component Name", () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it("should test behavior", async () => {
    element = await fixture("tag-name");
    // assertions
  });
});
```

**Patterns:**
- Setup: async fixture() for element creation
- Teardown: cleanup() in afterEach
- Async: await for DOM updates and fixture creation

## Mocking

**Framework:** None - No external mocking library used

**Patterns:**
- No mocking observed - Tests use real components and utilities

**What to Mock:**
- Not applicable - Integration-style testing preferred

**What NOT to Mock:**
- Web components, DOM APIs, utility functions

## Fixtures and Factories

**Test Data:**
```javascript
// Custom fixture utility
element = await fixture("grantcodes-button", {
  disabled: true,
  href: "https://example.com"
});
```

**Location:**
- packages/ui/src/test-utils/fixture.js - DOM fixture creation
- packages/ui/src/test-utils/events.js - Event helpers

## Coverage

**Requirements:** None enforced - No coverage tooling configured

**View Coverage:**
- Not available - Coverage not measured

## Test Types

**Unit Tests:**
- Component behavior testing - Properties, attributes, rendering
- Utility function testing - Token processing, color generation

**Integration Tests:**
- Web component integration - Shadow DOM, slots, events
- End-to-end not used - No E2E framework

## Common Patterns

**Async Testing:**
```javascript
it("should update when property changes", async () => {
  element = await fixture("grantcodes-button");
  element.disabled = true;
  await element.updateComplete; // Wait for Lit update
  assert.ok(button.disabled);
});
```

**Error Testing:**
- Not observed - Error conditions not extensively tested

---

*Testing analysis: 2026-03-22*</content>
<parameter name="filePath">.planning/codebase/TESTING.md