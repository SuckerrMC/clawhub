# Skill publish draft regression proof

An existing metadata subscription refreshed while the author prepared a new release. Before, typed version1.0.2 became1.0.1 and the edited title became the original. After, both draft values remain and a single Publish click successfully publishes1.0.2 with the edited title.

The proof uses two real browser tabs with the canonical disposable local-auth runner and seeded local-abuse publisher. One tab edits the release, the other saves the skill summary through the existing Settings UI. The first tab receives that summary change, proving the actual Convex subscription refreshed. Full screenshots are unmodified captures of the running app.

Baseline:1passed17.9s. Candidate: original moderation regression36.7s plus two-tab proof18.4s,2passed56.1s. Both runners exited0 with retries disabled. No production state was changed; both temporary backends and browser processes were cleaned up.

The production repair reuses existing dirty fields for slug, title and version. Untouched suggestions still update. New rendered-route regression fails before, passes after and asserts the submitted payload. Full static, unit6697passed and TypeScript/build checks pass; independent P2 review found no actionable issue. No timeout, retry or error filtering changes.
