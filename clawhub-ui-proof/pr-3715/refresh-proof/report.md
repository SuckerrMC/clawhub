# Refreshed English-only Trending verification

The production refresh has completed. The live API now serves snapshot `skills-1789504804874`, ranking version `skills-trending-v6`, generated at 20:40:04 UTC and completed at 20:57:05 UTC on September 15, 2026.

- All 2,731 visible listings across 28 pages passed the title and description language checks: 1,743 native ClawHub listings and 988 skills.sh imports.
- Zero rejected language detections, zero non-Latin titles, zero duplicate IDs, and neither reported Chinese expense-check listing present.
- Snapshot metadata reports 2,743 stored rows. Current visibility and language eligibility are rechecked during reads, so the visible count can be lower.
- Live desktop (1440×900) and mobile (390×844) screenshots were captured from https://clawhub.ai/skills?tab=trending and inspected.
- Current backend SHA `13f6c44a4bad038fd909f74268e25fd499dd390c`, deployed at 21:16:12 UTC, includes the English-only filter release `22cc45be4fc35bde47bd3149cf2361e4a74682aa`; Git ancestry and the current helper source were verified.

Verification was read-only. No further code change or deployment was needed. The filter evaluates public listing titles and descriptions; it does not classify full SKILL.md bodies. Publisher identity and geography are not inputs.

Original before/after proof: https://github.com/openclaw/clawhub/pull/3713#issuecomment-5687076420
Title edge-case proof: https://github.com/openclaw/clawhub/pull/3715#issuecomment-5687395364
