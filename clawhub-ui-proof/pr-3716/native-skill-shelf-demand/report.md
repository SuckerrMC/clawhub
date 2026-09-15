# Native homepage skill shelf demand: before and after

The same real Chromium flow typed `lo` then `local` on the New, Featured and Official native skill shelves. The baseline at `023602c8` returned visible results but recorded no demand (82 to 82 raw observations). The candidate at `e722a70c` recorded exactly one settled intent per shelf (82 to 85).

| Shelf | Rendered results | Authoritative response | Stored result count | Stored official count |
| --- | ---: | ---: | ---: | ---: |
| New | 1 | 1 | 1 | 0 |
| Featured | 0 | 0 | 0 | 0 |
| Official | 0 | 0 | 0 | 0 |

Each recorded observation has `artifactKind=skill`, `scope=shelf` and `source=clawhub-web`. Whitespace edits, view changes and reload added no observations. Automated mounted-component coverage also checks canceled pending input; action coverage checks unmarked reads and unfiltered native search. Trending continues to filter its existing local feed and does not produce catalog-search observations.

The real additive Convex deployment preserved all 82 existing raw observations and the exact aggregate state. The shared report now includes five shelf searches for this fixture query: two earlier filtered-search observations and these three browser searches. It does not call the shelf query a catalog company opportunity. Aggregation processed five previously unaggregated rows; replay processed zero and changed no aggregate rows. The explicit test window uses tomorrow as the exclusive boundary to include today's disposable observations; the normal report still defaults to completed UTC days.

Native Convex actions have no Request abort signal: once a marked server search completes, it can be recorded even if the browser has since navigated away. Debounced input canceled before dispatch remains uncounted. Direct inspection of Convex 1.44.0 HttpClient.action confirms one fetch and no automatic retry loop. This proof does not claim HTTP cancellation parity.

Validation: paired red/green tests, 121 focused sibling tests, 6,849 unit tests passed with three existing skips, static checks and dependency audit passed with zero advisories, TypeScript and production build passed. Frozen Sol high autoreview reported no findings (confidence 0.94).

All data shown is disposable local fixture data, not production demand. The screenshots show the actual running surfaces.

## Shared report and upgrade result

```json
{
  "preservedOldRaw": 82,
  "newBrowserObservations": 3,
  "nativeVisibleCounts": [
    {
      "tab": "New",
      "count": 1,
      "response": 1,
      "official": 0
    },
    {
      "tab": "Featured",
      "count": 0,
      "response": 0,
      "official": 0
    },
    {
      "tab": "Official",
      "count": 0,
      "response": 0,
      "official": 0
    }
  ],
  "shelfSearches": 5,
  "catalogOpportunityFromShelf": false,
  "aggregateFirst": {
    "hasMore": false,
    "processed": 5
  },
  "aggregateReplay": {
    "hasMore": false,
    "processed": 0
  },
  "oldStatePreservedAtDeploy": true,
  "reportWindowNote": "Tomorrow exclusive boundary includes current-day disposable browser observations; normal default remains completed days.",
  "actionTransport": "convex1.44.0 HttpClient.action performs one fetch without retries; server action cannot observe browser abort."
}
```
