# Codebase Concerns

**Analysis Date:** 2026-03-22

## Tech Debt

**Style Dictionary Configuration Complexity:**
- Issue: `packages/style-dictionary/config.js` is 509 lines, handling multiple themes, transformations, and configurations in a single file
- Files: `packages/style-dictionary/config.js`
- Impact: Difficult to maintain, debug, and extend; risk of bugs when adding new themes or transforms
- Fix approach: Break into smaller modules (theme configs, transformers, utilities)

**Storybook Configuration Uncertainty:**
- Issue: Unclear TODO comment in Storybook preview configuration
- Files: `packages/ui/.storybook/preview.js`
- Impact: May indicate incomplete or questionable layout configuration
- Fix approach: Review and clarify the layout setting or remove if resolved

## Known Bugs

**No major bugs identified in codebase scan**

## Security Considerations

**No immediate security risks identified**
- Note: No hardcoded secrets or environment variables found in source code

## Performance Bottlenecks

**Large Style Dictionary Build:**
- Problem: Complex configuration with multiple theme processing may slow builds
- Files: `packages/style-dictionary/config.js`
- Cause: Single large file handling all transformations and theme logic
- Improvement path: Modularize configuration and consider caching build outputs

## Fragile Areas

**Untested Components:**
- Files: `packages/ui/src/components/accordion/`, `packages/ui/src/components/cta/`, `packages/ui/src/components/feature-list/`, `packages/ui/src/components/hero/`, `packages/ui/src/components/logo-cloud/`, `packages/ui/src/components/media-text/`, `packages/ui/src/components/newsletter/`, `packages/ui/src/components/pricing/`, `packages/ui/src/components/stats/`, `packages/ui/src/components/testimonials/`
- Why fragile: 12 out of 35 components lack test coverage
- Safe modification: Add comprehensive tests before making changes
- Test coverage: Approximately 65% component coverage

## Scaling Limits

**Monorepo Build Complexity:**
- Current capacity: 4 packages with Turbo orchestration
- Limit: May become complex with many interdependent packages
- Scaling path: Consider separate CI/CD pipelines per package if monorepo grows significantly

## Dependencies at Risk

**Style Dictionary Version:**
- Risk: Using older Style Dictionary version (v3.x)
- Impact: May miss performance improvements, new features, security fixes
- Migration plan: Evaluate upgrade to v4.x when stable

## Missing Critical Features

**Component Test Coverage Gaps:**
- Problem: Multiple production components lack automated tests
- Blocks: Safe refactoring and maintenance of core UI components
- Priority: High - affects reliability and development velocity

## Test Coverage Gaps

**UI Component Testing:**
- What's not tested: 12 components including common ones like stats, pricing, testimonials
- Files: See "Fragile Areas" section above
- Risk: Regression bugs in user-facing components
- Priority: High

---

*Concerns audit: 2026-03-22*</content>
<parameter name="filePath">.planning/codebase/CONCERNS.md