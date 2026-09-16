# Final publication visibility landing head

The final candidate is `8fac071cc08628959a73b0961e052ce29659a47e`. Its only change after the reviewed/proven runtime `04fe22d59e3d55efcec0992b442903c1be6ac6ae` is a released-CLI browser test correction (`+4/-3`, one file). All ten changed production modules are byte-identical; see [runtime equivalence](landing-runtime-equivalence.json).

The [187-assertion native proof](https://github.com/openclaw/clawhub/blob/34a123bbe37cb47fcb1f9af1c48cc76903181021/visibility/20260916-native-reviewed/report.md) and [eight actual browser captures](https://github.com/openclaw/clawhub/blob/8e24b81f42baf1a3fd343243d03d69a0239ce022/visibility/20260916-browser/report.md) remain applicable.

## Released CLI before/after

[Linux CI before](https://github.com/openclaw/clawhub/actions/runs/35146838733/job/104968283614) published the skill successfully but failed an obsolete error-message expectation. Both retained [network traces](ci-old-cli-failure-trace-summary.json) confirm that anonymous pending metadata returns404 with `Skill not found`.

The corrected test requires that exact404 response before security checks and after an incomplete TruffleHog-only completion. It still requires successful released-CLI skill and plugin publication, rejection of incomplete security checks, and public200 after both checks complete.

After the test correction, the real local Convex/Nitro scenario passes on its first attempt: **1passed in15.8seconds, exit0**. [Sanitized output](old-cli-native-after-sanitized.txt) and [receipt](old-cli-repair-proof.json) record the command/runtime and cleanup. Expected missing-clawscan errors exercise the incomplete-check negative control; SIGTERM is successful runtime cleanup. No timeout or production source changed. The coordinator reviewed this small test delta with no findings; the runtime retains the prior clean structured review.
