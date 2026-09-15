# English-only Trending production verification

- Deployed SHA: `22cc45be4fc35bde47bd3149cf2361e4a74682aa`; target: backend.
- Test: https://github.com/openclaw/clawhub/actions/runs/35017938403
- Production: https://github.com/openclaw/clawhub/actions/runs/35018649450
- Live route: https://clawhub.ai/skills?tab=trending
- API verification: 1230 listings across 13 pages; zero non-English listing detections, zero non-Latin titles, zero duplicate IDs, and neither reported Chinese expense-check listing present.
- Desktop 1440×900 and mobile 390×844 browser checks passed; screenshots inspected.

Verification ran against compatible snapshot `skills-1789497605244` (skills-trending-v4). Its stored count is 1638; live eligibility returns 1230 rows. The new filters take effect on cached snapshots immediately. A production refresh was requested and continued in backend batch processing after the CLI connection ended; snapshot rebuilding is independent of the verified live filtering.

The language rule evaluates listing title and description, not the full SKILL.md. The pinned detector must identify English; titles cannot contain non-Latin letters. Accents, numbers, punctuation, and symbols are permitted. Publisher identity, geography, and viewer locale are not inputs.
