# Generated card native before/after proof

This extends the [initial native proof](../20260916-native-foundation/report.md) with real stored generated cards and their bundle fingerprints. It uses the same baseline main `50726e9bec5d7a7355256605eebebb6b8bf03872` and candidate integration tree `e90c6a828b7d088e1aa2191d7e89ac7fe5c9e969` (the four unchanged contributor PRs). Both phases run real local Convex functions/storage and a built ClawHub server. Exact source and local-only ingress/identity setup are described in the initial report.

Local HTTP: `http://127.0.0.1:3911/api/v1/skills/visibility-contract/card?version=VERSION` (see recorded JSON for exact fixture slug). Every successful card response is asserted to contain that version's actual stored fixture contents; 404 alone is not the positive control.

| Version | Before HTTP | After HTTP |
|---|---:|---:|
| 1.0.0 | 200 | 200 |
| 1.1.0 | 200 | 200 |
| 2.0.0 | 200 | 404 |
| 3.0.0 | 200 | 404 |

Files and both direct/hosted ZIPs show the same published/legacy compatibility and pending/blocked rejection. Owner and staff pending-file previews still succeed; anonymous and ordinary users remain denied. The extended baseline passed190 assertions, and the foundation candidate passed174 assertions, including separate status-only lifecycle observations.

The JSONs also record remaining hash/description/tag/export gaps in the foundation; those are intentionally the shared-reader follow-up, not attributed as fixed by PR3738. Production was not changed by this proof. Both owned runtimes were stopped and local fixtures cleaned up.
