# ClawHub UI Proof
Status: pass
Mode: `before-after`
Scenario: `/Users/patrickerichsen/Git/openclaw/clawhub-plugin-company-avatar/.artifacts/proof-scenarios/composio-avatar.mjs`
Baseline: `origin/main`
Candidate: `worktree`
Runner: `local`
Provider: `local`
## Artifacts
### baseline

- Output: `/Users/patrickerichsen/Git/openclaw/clawhub-plugin-company-avatar/.artifacts/composio-avatar-proof/baseline`
- pass: homepage-desktop - `baseline/screenshots/homepage-desktop.png`
- pass: search-desktop - `baseline/screenshots/search-desktop.png`
- pass: homepage-laptop - `baseline/screenshots/homepage-laptop.png`
- pass: search-laptop - `baseline/screenshots/search-laptop.png`
- pass: homepage-tablet - `baseline/screenshots/homepage-tablet.png`
- pass: search-tablet - `baseline/screenshots/search-tablet.png`
- pass: homepage-mobile - `baseline/screenshots/homepage-mobile.png`
- pass: search-mobile - `baseline/screenshots/search-mobile.png`

### candidate

- Output: `/Users/patrickerichsen/Git/openclaw/clawhub-plugin-company-avatar/.artifacts/composio-avatar-proof/candidate`
- pass: homepage-desktop - `candidate/screenshots/homepage-desktop.png`
- pass: search-desktop - `candidate/screenshots/search-desktop.png`
- pass: homepage-laptop - `candidate/screenshots/homepage-laptop.png`
- pass: search-laptop - `candidate/screenshots/search-laptop.png`
- pass: homepage-tablet - `candidate/screenshots/homepage-tablet.png`
- pass: search-tablet - `candidate/screenshots/search-tablet.png`
- pass: homepage-mobile - `candidate/screenshots/homepage-mobile.png`
- pass: search-mobile - `candidate/screenshots/search-mobile.png`


## Setup and validation

Baseline frontend: http://127.0.0.1:3040 at 8298d86e4d. Candidate frontend: http://127.0.0.1:3041. Both use the isolated local Convex runtime at http://127.0.0.1:3330 (HTTP actions: 3331), with candidate catalog functions deployed. The additive ownerImage field is ignored by baseline UI.

Fixture: @composio/composio, copied from public catalog metadata, including the legacy remote manifest URL and the real Composio publisher profile image. Seeded only in this disposable local database. No browser/API response stubs.

Desktop images are native browser crops of the plugin listing/search region; remaining viewports show full pages. Homepage and search at 1440x900, 1366x768, 768x1024, and 390x844 pass. The existing compact layouts hide catalog icons; visible desktop/laptop images were verified loaded.

Before: category plug glyph. After: company profile image. Bundled icon precedence, rejected remote manifest URLs, broken-image fallback, and publisher image updates/removal are covered by tests.
