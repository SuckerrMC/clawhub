# Browser proof of pending file visibility

Real anonymous Chromium navigation through the running ClawHub Nitro proxy to native Convex HTTP and storage shows pending file contents before the fix and `Version not found` afterward. The published file remains available with identical response bytes and identical screenshots.

| Scenario | Viewport | Before | After |
|---|---|---|---|
| Pending 2.0.0 | 1440×900 | [200, pending contents](baseline-browser-files-pending-desktop.png) | [404, no contents](final-browser-files-pending-desktop.png) |
| Pending 2.0.0 | 390×844 | [200, pending contents](baseline-browser-files-pending-mobile.png) | [404, no contents](final-browser-files-pending-mobile.png) |
| Published 1.0.0 | 1440×900 | [200](baseline-browser-files-published-control-desktop.png) | [200, identical](final-browser-files-published-control-desktop.png) |
| Published 1.0.0 | 390×844 | [200](baseline-browser-files-published-control-mobile.png) | [200, identical](final-browser-files-published-control-mobile.png) |

- Baseline: `50726e9bec5d7a7355256605eebebb6b8bf03872`.
- Reviewed candidate: `04fe22d59e3d55efcec0992b442903c1be6ac6ae`.
- Pending URL: `http://127.0.0.1:3912/api/v1/skills/visibility-contract/file?path=SKILL.md&version=2.0.0&preview=1`.
- Published control: same URL with `version=1.0.0`.
- Fixture: `visibility-contract`, active public parent; pending version 2.0.0 and published version 1.0.0, both containing real stored `SKILL.md` blobs. The same documents and storage persist across the two code phases. No browser authentication or API token is used.
- Runtime: disposable anonymous Convex at 3910/3911, real built Nitro at 3912, isolated Playwright Chromium. In-app Browser was unavailable after setup/open/retry; no user Chrome tabs were used.
- Capture: unedited full browser screenshots of the native file-preview HTTP response. No generated HTML, mocked response, injected display content, or composed screenshot was used. All eight images were visually inspected.
- Reproduction: from the HTTP worktree, `PATH="$HOME/.bun/bin:$PATH" node ../browser-proof-artifacts/run.mjs baseline-browser-files=50726e9bec5d7a7355256605eebebb6b8bf03872 final-browser-files=04fe22d59e3d55efcec0992b442903c1be6ac6ae`. The harness preserves existing labels; use fresh phase labels for another run. It uses the separate detached `browser-proof` worktree and a temporary native seeding module, then removes that module, local environment, backend state, and processes.

The initial metadata probe returned 404 on the baseline, matching the existing native baseline observations. Its failed harness expectation is preserved in `run.txt` and `run-baseline-browser.json`; it is not presented as a fixed regression. The successful comparison uses the affected file preview route.

Loading, collection-empty, and content-heavy UI states do not apply to this static HTTP file-preview response. Pending/error and normal published states are captured at both requested viewports. No video is needed for this single-navigation status change. Broader publication/deletion/owner preview/ZIP coverage remains in the existing native matrix.

`manifest.json` contains sanitized exact refs, local URLs, fixture labels, HTTP statuses, response and image hashes, and inspection/cleanup receipts. `run-baseline-browser-files.json` records successful completion. All three ports are now free; the detached proof worktree is clean at the candidate commit. No integration branch, committed runtime source, production data, public GitHub state, or deployment was changed.
