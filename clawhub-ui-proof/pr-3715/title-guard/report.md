# English Trending title check

Real ClawHub at http://127.0.0.1:13320/skills?tab=trending with the isolated local Convex backend on ports 33210/33211. Identical 101-record fixture, including 100 captured public Trending records and one English record by chenqg618. Chromium at 1440×900 and 390×844. Both captures load the second page and use the same scroll position.

Before (4877d6fe473d), the combined text detector admits `中文公文写作` because its description is English: “Draft or review Chinese official work documents.” After, the title script check excludes it. English descriptions, accented Latin titles, publisher independence, pagination, and cached v4/v5 snapshot compatibility remain covered by the focused tests.

The original unfiltered fixture contains 101 listings. The combined-text filter retains 36; the completed filter retains 35. Baseline and candidate source inputs and activity metrics are identical.

Validation: 63 focused tests, 6,737 passing unit tests, static checks, types/build, local Convex codegen, automated Codex review, and TruffleHog all passed.
