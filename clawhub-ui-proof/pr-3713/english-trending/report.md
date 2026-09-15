# English-only Trending proof

Real ClawHub at `http://127.0.0.1:13320/skills?tab=trending`, backed by an isolated local Convex deployment on ports 33210/33211. Chromium desktop 1440×900 and mobile 390×844; identical fixture and scroll offsets before/after. Baseline backend from main `8e9bc81bb6`; candidate from `codex/english-only-trending`.

The fixture copies the names, descriptions, publishers, and 24-hour metrics of the first 100 public production Trending records captured September 15, 2026. One English listing by `chenqg618` verifies the filter depends on language rather than publisher. Fixture dates make all 101 records native Trending candidates; local ordering is consequently not an exact production rank replay.

| Behavior | Before | After |
| --- | --- | --- |
| Materialized listings | 101 | 36 |
| Chinese examples from the reported screenshot | Visible | Absent |
| Indonesian RouterOS listing | Visible | Absent |
| English listing by chenqg618 | Eligible | Eligible |
| HTTP first page | 20 records | 20 records |
| Load more, desktop and mobile | Available | Reaches remaining 16 English records |
| All descriptions changed to Spanish | — | HTTP 200 with empty items and no cursor; real empty state renders |
| Database reads during materialization | 202 | 202 |
| Database writes during materialization | 210 | 78 |

The candidate also served the existing v4 snapshot immediately: 36 English records returned, before a rebuild, with its original stored total of 101. Rebuilding produced v5 with the correct total of 36. No extra database reads were introduced in materialization.

Language means the combined public title and description detected as English by pinned franc-min 6.2.0. This is a heuristic for listing text, not inspection of the full SKILL.md. Unidentified or ambiguous text is omitted.

Temporary fixture functions were removed before publication. Source files and raw local/production responses remain in the local evidence directory.
