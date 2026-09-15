# Local browser-test startup proof

Baseline: `8298d86e4dac83dc377bf06f9a94de4a81644b22`.

The actual local-auth runner was exercised with Convex CLI 1.44.0 and local backend artifact `precompiled-2026-09-11-157eb19`, using isolated synthetic state. Read-only native queries observed cron definitions and executions at startup boundaries.

| Checkpoint                       | Baseline registered jobs | Fixed registered jobs |
| -------------------------------- | -----------------------: | --------------------: |
| Before applying backend settings |                       36 |                     0 |
| After applying backend settings  |                       36 |                     0 |
| Before the app build             |                       36 |                     0 |
| After the browser suite          |                        — |                     0 |

The baseline recorded 35 scheduled executions before its app build. The fix recorded zero executions throughout. A later redeploy can erase exposed cron history, so a post-build-only check is insufficient; these observations were captured during startup.

## Browser and lifecycle proof

```sh
bun scripts/run-playwright-local-auth.ts --project=chromium e2e/local-auth/malicious-skill-ban-flow.pw.test.ts
```

The unchanged browser test passed in 36.6 seconds, and the runner exited 0. After completion, the persistent launcher, Convex backend, Node executor, and log tail were gone; all isolated ports were closed. No manual cleanup was needed.

Tested source blobs:

- Runner: `780eb619e9ddd6378256c4cf3331438ea4415e9e`.
- Persistent launcher: `d6988934762dd4cf6c49b541a187de4e78c371a0`.

The final runner blob `e0e82417ee20c66029a1812f0fa02de6a8cfe30b` adds only an early Windows rejection before state isolation. The tested Linux/macOS path is unchanged.

Three process integration cases passed: successful bootstrap, failed bootstrap, and parent disconnection. Forcing the launcher to exit after successful bootstrap makes the first case fail (`expected 0 to be null`), proving that the test catches lost process ownership.

Final local validation passed: 29 focused configuration/workflow tests, three lifecycle tests, 6,695 unit tests with coverage, `ci:static`, and `ci:types-build`.

The code does not change hosted runner allocation or any runtime timeout. GitHub's moderation result remains the check for whether removing background work resolves its observed timeouts.
