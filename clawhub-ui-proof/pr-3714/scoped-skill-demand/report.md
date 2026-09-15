# Manual skill demand: real browser and additive upgrade proof

Baseline ran the existing application at http://127.0.0.1:3534 against its own disposable backend. Candidate ran at http://127.0.0.1:3535 against the same preserved backend (3524/3525). The native fixture returned one public skill and the header returned three plugins. Screenshots are from actual Chromium pages, personally inspected.

Before: header and native Skills page returned skills but created no skill observations. After: one settled header intent sent one marked skill request (limit4, response1) and one plugin request (limit4, response3); one settled native Skills intent sent one marked skill request (limit25, response1). Whitespace edits, footer/full-page resubmission and reload added no markers. Later standalone screenshot capture generated another legitimate header intent after the recorded backend snapshot; it is not included in the snapshot totals.

The backend was upgraded in place with75 preexisting raw observations,20 daily aggregates, the original aggregate cursor/state, and unrelated global stats. All were byte-for-byte preserved. New skill observations advanced the same cursor and set skill coverage only when collection began; a replay added no aggregate counts. The original72 synthetic historical records and three pre-upgrade browser records remain legacy scope.

Two separate explicit filtered HTTP proof searches produced zero visible results and two shelf observations; generic and spoofed-source searches added none. Authenticated per-kind/per-scope HTTP reports matched the real CLI JSON rows/counts. Anonymous requests returned401, invalid artifact kinds returned400, and staff responses retained private,no-store. Tomorrow's exclusive UTC boundary was deliberately selected to include the current-day disposable observations; normal reports still default to completed UTC days.

Backend snapshot:

```json
{
  "beforeRaw": 75,
  "afterRaw": 80,
  "baselineRawPreserved": true,
  "dailyPreserved": true,
  "unrelatedStatsPreserved": true,
  "stateIdentityPreserved": true,
  "sharedCursorAdvanced": true,
  "replayAddedZero": true,
  "skillCoverageStart": 1789501982690,
  "requests": [
    {
      "suffix": "q=local&category=development&searchSource=clawhub-web",
      "status": 200,
      "count": 0,
      "official": 0
    },
    {
      "suffix": "q=local",
      "status": 200,
      "count": 1,
      "official": 0
    },
    {
      "suffix": "q=local&searchSource=spoofed",
      "status": 200,
      "count": 1,
      "official": 0
    }
  ],
  "reportCounts": {
    "plugin:catalog": 1,
    "plugin:shelf": 0,
    "plugin:legacy": 35,
    "skill:catalog": 2,
    "skill:shelf": 2,
    "skill:legacy": 0
  },
  "anonymousStatus": 401,
  "invalidKindStatus": 400,
  "cliParity": true,
  "endDay": 1789516800000,
  "windowNote": "Tomorrow exclusive boundary deliberately includes current-day disposable browser observations; production default remains completed UTC days.",
  "beforeProbeRaw": 79,
  "proofNote": "Two separate explicit filtered HTTP proof searches were made across the first assertion calibration and final run, explaining skill:shelf=2. The browser trace itself contains exactly two skill intents and one plugin intent. A later settled-header screenshot generated one additional independent manual intent per catalog after this snapshot."
}
```

Commands: real Chromium browser harness; `convex data`, `convex run searchInsights:aggregateInternal`; authenticated HTTP and actual admin CLI; `bun run ci:static`, `bun run ci:unit` (6845 passed,3 skipped), `bun run ci:types-build`, `bun run ci:packages`. Sol high autoreview returned no findings (confidence0.84); all four commits stayed identical through rebase by git range-diff.
