# Publication visibility: native before/after proof

Captured September 16, 2026. This is real local Convex HTTP, registered queries, stored blobs and a built ClawHub Nitro server; no handler/storage mocks.

- Baseline: main `50726e9bec5d7a7355256605eebebb6b8bf03872`.
- Candidate tree: `e90c6a828b7d088e1aa2191d7e89ac7fe5c9e969`, the same main plus unmodified contributor changes from PRs 3738 (`307a1a86e7bfbd658bd126ee22906c026266310f`), 3752 (`8b8ef55640c88b5f16495a986995ab09d8e57610`), 3754 (`dd144d0a04d7e58c24bb8d1ae18a34d35fa748db`), and 3756 (`130ef5ea00c4b45c2a31c21ffcdf8b422a015fde`). This is combined integration proof, not a claim that each PR fixes all routes.
- Local Convex cloud `http://127.0.0.1:3910`, HTTP `http://127.0.0.1:3911`, built ClawHub `http://127.0.0.1:3912`. Same database/fixtures across both phases. Production was not mutated.
- Fixture: a public active skill and a public clean official plugin, each with a published `1.0.0`, legacy `1.1.0` (no publicationStatus), pending `2.0.0`, and blocked `3.0.0`; latest remains published. Every version has real stored file contents. HTTP uses a synthetic local API token; these public routes must withhold submissions even from token-authenticated callers. Hosted downloads exercise actual manifest signing and Nitro verification, with locally signed ingress identity claims validated against local JWKS.
- Each phase pushes the actual functions with `bunx convex run --push --inline-query null --typecheck enable --codegen disable`, then issues the recorded HTTP requests. Hosted proof builds with `bun run build` and runs `.output/server/index.mjs`.

| Surface | Version | Before HTTP | After HTTP |
|---|---|---:|---:|
| skill-file | 1.0.0 | 200 | 200 |
| skill-file | 1.1.0 | 200 | 200 |
| skill-file | 2.0.0 | 200 | 404 |
| skill-file | 3.0.0 | 200 | 404 |
| skill-verify | 1.0.0 | 200 | 200 |
| skill-verify | 1.1.0 | 200 | 200 |
| skill-verify | 2.0.0 | 200 | 404 |
| skill-verify | 3.0.0 | 200 | 404 |
| skill-alias-metadata | 1.0.0 | 200 | 200 |
| skill-alias-metadata | 1.1.0 | 200 | 200 |
| skill-alias-metadata | 2.0.0 | 200 | 404 |
| skill-alias-metadata | 3.0.0 | 200 | 404 |
| skill-alias-file | 1.0.0 | 200 | 200 |
| skill-alias-file | 1.1.0 | 200 | 200 |
| skill-alias-file | 2.0.0 | 200 | 404 |
| skill-alias-file | 3.0.0 | 200 | 404 |
| skill-zip | 1.0.0 | 200 | 200 |
| skill-zip | 1.1.0 | 200 | 200 |
| skill-zip | 2.0.0 | 200 | 404 |
| skill-zip | 3.0.0 | 200 | 404 |
| hosted-skill-zip | 1.0.0 | 200 | 200 |
| hosted-skill-zip | 1.1.0 | 200 | 200 |
| hosted-skill-zip | 2.0.0 | 200 | 404 |
| hosted-skill-zip | 3.0.0 | 200 | 404 |
| package-file | 1.0.0 | 200 | 200 |
| package-file | 1.1.0 | 200 | 200 |
| package-file | 2.0.0 | 200 | 404 |
| package-file | 3.0.0 | 200 | 404 |
| package-zip | 1.0.0 | 200 | 200 |
| package-zip | 1.1.0 | 200 | 200 |
| package-zip | 2.0.0 | 200 | 404 |
| package-zip | 3.0.0 | 200 | 404 |

The paired JSON files contain request paths, status codes, response bodies or archive member names, byte lengths and SHA-256 digests. Pending/blocked ZIPs included withheld content before the fix; the candidate rejects them. Published/legacy ZIPs still include the expected stored files.

The native pending-file preview action succeeds for owner and staff and rejects anonymous/ordinary-user identities in both phases. Those identities use Convex local admin impersonation to exercise real server authorization; this is not browser-login/JWT-login proof.

All four original exact PR heads also passed local schema, CLI, and Convex TypeScript checks and focused HTTP/access tests. Their functional CI jobs were green; the fork Vercel preview reported team-authorization failure, so it is not the runtime proof used here.

Limits: this first fixture lacked a stored generated card, so its card responses are not positive-control card proof. Hash matching, stale tag labels and description/export projections need the shared-reader follow-up and are not claimed fixed by these four PRs. More targeted card and lifecycle proof is being captured separately.
