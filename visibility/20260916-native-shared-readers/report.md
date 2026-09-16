# Shared publication readers: native regression proof

The final candidate passes **180 assertions** against actual local Convex queries/HTTP/storage and a built ClawHub Nitro server. It exercises103 ordinary HTTP requests,21 lifecycle HTTP requests,4 anonymous hash queries and4 preview identities. The owned runtime completed and cleaned up. No production fixtures or data were changed.

- Before: `e90c6a828b7d088e1aa2191d7e89ac7fe5c9e969`, main plus the four contributor fixes now merged as PRs3738,3752,3754,3756. Their native before/after proof is in the [initial report](../20260916-native-foundation/report.md) and [stored-card report](../20260916-native-cards/report.md).
- After runtime tree: `1825162199` (shared-reader candidate; later test-only fixture updates and rebasing onto merged main preserve runtime contents).
- Local cloud `http://127.0.0.1:3910`, Convex HTTP `http://127.0.0.1:3911`, built ClawHub `http://127.0.0.1:3912`. Both phases use the same deterministic fixture shape, real stored contents, and locally validated ingress identity. Production was untouched.
- Clean official Convex codegen runs before adding the temporary fixture module. Actual functions are pushed with typechecking enabled before requests. Nitro builds from the candidate and verifies actual signed archive manifests.

The fixture deliberately gives a version a latest pointer and cached summary while it is published, then changes only its publication status to pending and blocked. This tests stale/inconsistent projections; it does not claim ordinary pending publication normally advances the latest pointer. The stored content retains its fixture marker so withheld-byte checks are comparable.

| Fixture transition | Surface | Before | After |
|---|---|---|---|
| pending-stale-summary | skill-root: stored description returned | true | false |
| pending-stale-summary | skill-export: archive content | 1 release(s), withheld bytes true | 0 release(s), withheld bytes false |
| pending-stale-summary | package-export: archive content | 1 release(s), withheld bytes true | 0 release(s), withheld bytes false |
| blocked-stale-summary | skill-root: stored description returned | true | false |
| blocked-stale-summary | skill-export: archive content | 1 release(s), withheld bytes true | 0 release(s), withheld bytes false |
| blocked-stale-summary | package-export: archive content | 1 release(s), withheld bytes true | 0 release(s), withheld bytes false |

Public root/tag/list responses stop exposing withheld metadata while keeping the parent and approved tags visible. Pending and blocked hash fingerprints return no match; published and legacy fingerprints still resolve. A missing requested tag returns 404 instead of silently falling back to latest. Owner-deleted skill files/cards/verify/ZIPs are unavailable, and exact metadata preserves its 404 contract.

All explicit pending/blocked file/card/verify/metadata/alias/package/ZIP routes return 404. Published and legacy files, generated cards, direct ZIPs and hosted ZIPs remain 200 with their actual fixture bytes. Malicious skill downloads remain 403 while published verification/metadata remains inspectable; a pending package scan remains downloadable when publication is approved. Owner/staff pending-file previews succeed while anonymous and ordinary-user previews are denied. Identity previews use local admin impersonation of native server identity, not a browser login proof.

Before/after JSONs include exact paths, response bodies or archive members, response hashes, status codes, and every passing assertion. The full unit suite additionally covers wrong-parent pointers, public-parent policy, private owner access, older approved hash matches behind withheld candidates, and wrapped-trigger browse invalidation.

Final review candidate: `8b7341e202e10c093da14c5740c947ba42c74b15`. [Runtime equivalence manifest](runtime-equivalence.json) verifies every changed runtime file is byte-identical to the native-tested tree.
