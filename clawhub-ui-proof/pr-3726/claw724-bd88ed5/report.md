# CLAW-724 complete Featured selection: browser proof

Baseline `59a90cc9eba6835cc564924f351666e7d923c369` → candidate `bd88ed5cc44d5c2242eb636b1f6dfd994cef555b`. Both real local Convex runtimes and Chromium runs passed.

The same local-only fixture produces seven addition-only cards on the original code. The candidate proposes the full eight-place plugin set: one retained item, seven additions, two proposed removals, and an Emerging label supported by the fixture’s recent publication and positive adoption. The empty skills catalog explicitly reports eight open places. These are labeled local test fixtures, not production recommendations.

Both runs use `/management?view=search-insights`, the `local-admin` dev persona, light theme, all search scopes, both sources and the seven-day window. Baseline frontend used port 3548 / Convex 3546–3547; candidate used frontend 3539 / Convex 3544–3545. The fixture helper source is byte-identical. Only this test helper was overlaid on baseline; its product modules stayed at 59a90. Runtime-generated snapshot IDs and timestamps naturally differ.

| State | Viewport | Before | After | Verified |
| --- | --- | --- | --- | --- |
| lineup | 1440×900 | [Before](baseline/featured-lineup-desktop.png) | [After](candidate/featured-lineup-desktop.png) | 7-card shortlist → complete 8 with retain/add/remove evidence; no horizontal overflow |
| lineup | 1366×768 | [Before](baseline/featured-lineup-laptop.png) | [After](candidate/featured-lineup-laptop.png) | 7-card shortlist → complete 8 with retain/add/remove evidence; no horizontal overflow |
| lineup | 768×1024 | [Before](baseline/featured-lineup-tablet.png) | [After](candidate/featured-lineup-tablet.png) | 7-card shortlist → complete 8 with retain/add/remove evidence; no horizontal overflow |
| lineup | 390×844 | [Before](baseline/featured-lineup-mobile.png) | [After](candidate/featured-lineup-mobile.png) | 7-card shortlist → complete 8 with retain/add/remove evidence; no horizontal overflow |
| empty | 1440×900 | [Before](baseline/featured-empty-desktop.png) | [After](candidate/featured-empty-desktop.png) | Empty catalog → explicit 8-place shortfall; no horizontal overflow |
| empty | 1366×768 | [Before](baseline/featured-empty-laptop.png) | [After](candidate/featured-empty-laptop.png) | Empty catalog → explicit 8-place shortfall; no horizontal overflow |
| empty | 768×1024 | [Before](baseline/featured-empty-tablet.png) | [After](candidate/featured-empty-tablet.png) | Empty catalog → explicit 8-place shortfall; no horizontal overflow |
| empty | 390×844 | [Before](baseline/featured-empty-mobile.png) | [After](candidate/featured-empty-mobile.png) | Empty catalog → explicit 8-place shortfall; no horizontal overflow |

## Native publication assertions

- Report viewing left the exact current Featured membership unchanged.
- Actual moderator mutations filled the plugin catalog to 8; the ninth addition was rejected by Convex.
- Reapplying Featured to `plugin:lineup-tool-0` retained timestamp `1789528265433` exactly.
- Full before/after membership receipt and capture scripts are embedded in `summary.json`.
- No production writes or digest delivery occurred.

## Reproduction

Run the existing `scripts/run-playwright-local-auth.ts` helper with `--project=chromium --reporter=list,json --retries=0 e2e/local-auth/featured-lineup-proof.pw.test.ts` in each isolated checkout. Use the respective `PLAYWRIGHT_LOCAL_AUTH_CONVEX_URL`, `PLAYWRIGHT_LOCAL_AUTH_CONVEX_SITE_URL`, `PLAYWRIGHT_PORT`, and `PLAYWRIGHT_JSON_OUTPUT_NAME` controls. The capture-only cases embedded in `summary.json` extend the existing committed local-auth case; no new test framework or product code is required.

The full eight-card catalog covers the content-heavy state. Loading and error rendering are unchanged and outside this proposal-content change. Every published screenshot was inspected from the actual browser output. Mutable build caches were physically separated for the final runs; an earlier shared-cache baseline build was discarded after module MIME errors and is not included in this proof.
