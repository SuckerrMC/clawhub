# Uploaded Summary regression proof

An author had previously edited their published summary in Settings. In the new-version form they upload SKILL.md with a new description, then change Version to 1.0.2.

Before, Summary visibly reverts to “Published description from the previous release.” The form still says the text was pulled from SKILL.md. A single Publish click saves that stale text, verified by reopening Settings. After, the form and saved Settings both contain “Uploaded description for the new release.”

These are unmodified 1280 × 2348 captures from the real production app build and disposable local Convex backend at http://127.0.0.1:4194, using the existing local-abuse publisher and canonical signed-in browser runner. Baseline test: 21.9s; candidate: 29.8s. Both run with zero retries, both runners exit 0, and all owned ports close afterward. Security checks use the existing local mock scanner; no production state was changed.

The Summary prefill now has one effect: uploaded description takes precedence over existing metadata while untouched, and manual edits remain authoritative. The version/title/slug dirty-field guards remain in place. Extended existing route regression covers uploaded, manually edited, and cleared summary values after metadata refresh, including the submitted payload. Before fix, the uploaded case fails at the first Version edit. After: 72 skill/plugin publish route tests pass; full unit 6701 passed / 3 skipped, full static and app/schema/CLI TypeScript pass, independent review has no actionable findings through P2. Production delta: 5 added / 11 removed.

Source nuance: when the old summary was derived verbatim from old frontmatter, the existing backend can recognize and replace that reused derived value. The prior owner-edited fixture is intentional: that value is publisher-authored and preserved by the backend, so the frontend's stale submission has a persisted effect.

Named follow-up: a pending generated Changelog can replace manually typed text. This was observed in both captures and predates this change: src/routes/skills/publish.tsx resolves the preview by request ID, while the manual Changelog onChange does not invalidate that request. Keep that separate from this reviewed Summary repair; no backend or generation policy changes here.
