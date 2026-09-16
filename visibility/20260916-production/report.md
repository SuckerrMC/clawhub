# Publication visibility: production release

The shared registry reader repair is deployed to production at `2c901bdf46ef9a75a1702616e6c0f3c5b9361be3` (backend target).

[Deploy Test](https://github.com/openclaw/clawhub/actions/runs/35149974374) and [production deployment](https://github.com/openclaw/clawhub/actions/runs/35150332560) succeeded at that exact SHA. Production Convex contract, rollout pause/restoration verification and HTTP smoke passed. The live public backend query reported the same SHA before and after the comparison.

## Live before/after

**45 HTTP requests and 180 passing assertions.** Three frozen published releases exercise metadata, versions, file, verify, hash, latest tag, hosted ZIP and skill aliases, plus missing version/tag/hash selectors.

| Observation | Before deployment | After deployment |
| --- | --- | --- |
| Unknown file tag, all three skills | 200; silently serves latest file | 404 |
| Pinned SKILL.md and package-alias file | 200 | 200; identical byte digests |
| Pinned hosted ZIP | 200; complete readable archive | 200; identical member paths, sizes and digests |
| Existing verify decisions and hash resolution | Existing responses | Preserved |
| Missing version / missing hash | 404 / 200 with no match | Preserved |

Pins: `chenqg618/sku-profit-check-free@1.0.1`, `aisenseapi/aamio@0.5.1`, `bonniegeng-max/video-digest@2.0.5`. The first skill's observed latest tag changed to 1.0.2; this is recorded as drift and does not change the pinned-content result. ZIP members are compared because container timestamps can vary. Existing verify responses with `ok:false` are preserved, not represented as scan approvals.

[Before receipt](before.json), [after receipt](after.json), and [release/run binding](release.json) contain the exact observations. These published controls do not establish absence of unpublished production records. Pending/blocked, lifecycle, parent binding, owner/staff and stored-card behavior were exercised through real local fixtures.

## Source and validation

Merged contributor PRs: [#3738](https://github.com/openclaw/clawhub/pull/3738), [#3752](https://github.com/openclaw/clawhub/pull/3752), [#3754](https://github.com/openclaw/clawhub/pull/3754), [#3756](https://github.com/openclaw/clawhub/pull/3756). Shared checked reads, hash selection, tag/description/export hardening and compatibility checks landed in [#3764](https://github.com/openclaw/clawhub/pull/3764). Four linked issues closed.

The actual merged tree matches the locally validated integration tree: **7,149 unit tests passed, 3 skipped**, static/type/build gates passed, and **187 native assertions passed**. [Combined proof and review](https://github.com/openclaw/clawhub/blob/a54e4c2917d776983292146bfef069783a388f37/visibility/20260916-main-integration/report.md), [browser before/after captures](https://github.com/openclaw/clawhub/blob/8e24b81f42baf1a3fd343243d03d69a0239ce022/visibility/20260916-browser/report.md), and [final PR CI](https://github.com/openclaw/clawhub/actions/runs/35148733082).

Merged commits:

```text
7725f32bf07d fix: hide unpublished skill versions from public file routes (#3738)
008788a25013 fix: hide unpublished package releases from public file routes (#3752)
1807e0308fe2 fix: packages skill-version alias serves unpublished metadata (#3754)
7b6d8e676597 fix: hide unpublished skill versions on the verify API (#3756)
2c901bdf46ef fix: enforce publication visibility across registry reads (#3764)
```

The release changes public selection behavior; it does not repair historical parent pointers or authorize broader visibility-policy claims. Newly reported revoke/quarantine fallback and current-authorization work remains a separate next tranche.
