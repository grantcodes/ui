# External Integrations

**Analysis Date:** 2026-03-22

## APIs & External Services

**None detected** - This is a component library and static site with no external API integrations.

## Data Storage

**Databases:**
- None - Static content only, no database requirements

**File Storage:**
- Local filesystem only - Assets served from public/ directories

**Caching:**
- None - Static content served directly

## Authentication & Identity

**Auth Provider:**
- None - Public component library, no authentication required

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Console logging in development - No production logging configured

## CI/CD & Deployment

**Hosting:**
- Static hosting platforms (Vercel, Netlify, etc.) for Astro app
- npm registry for package publishing

**CI Pipeline:**
- GitHub Actions - Located at `.github/workflows/ci.yaml`
  - Runs on pull requests to main branch
  - Tests: linting and unit tests
  - Builds: Full build verification
- Node.js 22 in CI (GitHub Actions)

## Environment Configuration

**Required env vars:**
- None for packages
- NPM_TOKEN - Required for publishing releases (stored in GitHub secrets)

**Secrets location:**
- GitHub repository secrets: NPM_TOKEN for npm publishing

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-03-22*</content>
<parameter name="filePath">/home/grantcodes/projects/ui/.planning/codebase/INTEGRATIONS.md