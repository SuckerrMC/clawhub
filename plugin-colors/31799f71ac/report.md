# Plugin artwork color proof

The baseline applies `grayscale(1) brightness(1.18)` to plugin logos. Candidate `31799f71ac` renders those same images with `filter: none`. All published screenshots were visually inspected.

Real ClawHub frontends: baseline `8298d86e4d` at http://127.0.0.1:3108; candidate `31799f71ac` at http://127.0.0.1:3107. Both use the same anonymous public catalog backend (`wry-manatee-359`) and hosted icon endpoints; no fixture interception or synthetic pages. The featured records are Composio, Firecrawl, HeyGen, Lobster, Memory LanceDB, tokenjuice, and Diffs. Live download counts can change independently of this CSS patch.

Routes: `/` → Plugins → Featured; `/plugins?view=grid`.

Proof matrix: dark desktop 1440×1000, dark laptop 1366×768, light desktop 1440×1000, tablet 768×1024, mobile 390×844. Typical featured list and dense catalog grid captured before/after. The existing responsive layout hides icons on the mobile/tablet homepage and on mobile browse; these comparisons verify preservation of that layout, not visible color restoration. Loading/empty states have no plugin artwork, so they are outside this filter-only change. Signed-in dashboard containers received the same selector exclusion and were source-reviewed, but were not separately browser-captured.

Capture: `node /tmp/clawhub-plugin-color-proof/capture.mjs baseline` (expected color failures) and `node /tmp/clawhub-plugin-color-proof/capture.mjs candidate` (all checks pass). Computed-style observations are retained in summary.json.

Validation: `bun run ci:static`, `bun run ci:unit` (6,692 passed), `bun run ci:types-build`, and autoreview passed. Existing plugin-detail/Versions browser test passed. A current-flow browser check opening the search control, searching, clearing, opening a plugin, and switching to Versions passed. The legacy catalog search test fails on both baseline and candidate because it attempts to fill the collapsed search field without opening it; its old clear-button selector is also stale. No layout or search behavior changes are included.
