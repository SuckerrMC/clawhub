# Expected merge result native validation

All **187 native assertions passed** on local commit `a1cb5b376d5c564dbf60345b2eddaaa5efd1ae60`, produced by integrating main `a5b31b2f3353fda19ee808ef71ffa3f5cbc7bc44`. This is expected merge-result evidence; the remote pull request remains at head prefix `8fac`. The parent will guard main and verify that the actual GitHub merged tree exactly equals this locally validated result. No equivalence between the two different source trees is claimed.

The candidate-only run used the existing before evidence and exercised 103 HTTP observations, four hash queries, four native identity previews, three publication lifecycle stages, and both hidden and malware parent states through real local Convex/storage and built Nitro. Every recorded assertion passed. The task-local harness condition includes `final-main-integration` in the seven parent-visibility checks, so the full 187-assertion matrix ran.

Evidence: `final-main-integration.json`, `run-final-main-integration.json`, and `final-main-integration-receipt.json`. Exit 0; run complete and cleanup true. Artifact SHA-256: `e3d445cd96b451d4a44e94b712ff7d0bda3f0caaaa4cc591832f62fcfd619fcb`.

Cleanup was independently verified: ports 3910/3911/3912 are free, the dedicated proof worktree is clean at a1cb5b376d5, and the temporary seed module, local environment file, and backend state are removed. No source/codegen commit or public write was made. Prior browser captures remain explicitly bound to their recorded historical candidate; this run does not rebind those screenshots.
