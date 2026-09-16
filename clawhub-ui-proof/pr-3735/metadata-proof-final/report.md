# ClawHub UI Proof
Status: pass
Mode: `before-after`
Scenario: `/Users/patrickerichsen/Git/openclaw/inbox-zero-20260915/tranche3-mobile/.artifacts/proof-scenarios/metadata.mjs`
Baseline: `be87bfd9d3f837707e4ac2b22bcaacbb9ec9c3d0`
Candidate: `581456340d22c0aa645f1c92dccdc6346b200c88`
Runner: `local`
Provider: `local`
## Artifacts
### baseline

- Output: `/Users/patrickerichsen/Git/openclaw/inbox-zero-20260915/tranche3-mobile/.artifacts/metadata-proof-final/baseline`
- pass: source-320px - `baseline/screenshots/source-320px.png`
- pass: source-360px - `baseline/screenshots/source-360px.png`
- pass: source-390px - `baseline/screenshots/source-390px.png`
- pass: source-600px - `baseline/screenshots/source-600px.png`
- pass: source-768px - `baseline/screenshots/source-768px.png`
- pass: source-1366px - `baseline/screenshots/source-1366px.png`
- pass: source-1440px - `baseline/screenshots/source-1440px.png`
- pass: native-heavy-320px - `baseline/screenshots/native-heavy-320px.png`
- pass: native-heavy-360px - `baseline/screenshots/native-heavy-360px.png`
- pass: native-heavy-390px - `baseline/screenshots/native-heavy-390px.png`
- pass: native-heavy-600px - `baseline/screenshots/native-heavy-600px.png`
- pass: native-heavy-768px - `baseline/screenshots/native-heavy-768px.png`
- pass: native-heavy-1366px - `baseline/screenshots/native-heavy-1366px.png`
- pass: native-heavy-1440px - `baseline/screenshots/native-heavy-1440px.png`

### candidate

- Output: `/Users/patrickerichsen/Git/openclaw/inbox-zero-20260915/tranche3-mobile/.artifacts/metadata-proof-final/candidate`
- pass: source-320px - `candidate/screenshots/source-320px.png`
- pass: source-360px - `candidate/screenshots/source-360px.png`
- pass: source-390px - `candidate/screenshots/source-390px.png`
- pass: source-600px - `candidate/screenshots/source-600px.png`
- pass: source-768px - `candidate/screenshots/source-768px.png`
- pass: source-1366px - `candidate/screenshots/source-1366px.png`
- pass: source-1440px - `candidate/screenshots/source-1440px.png`
- pass: native-heavy-320px - `candidate/screenshots/native-heavy-320px.png`
- pass: native-heavy-360px - `candidate/screenshots/native-heavy-360px.png`
- pass: native-heavy-390px - `candidate/screenshots/native-heavy-390px.png`
- pass: native-heavy-600px - `candidate/screenshots/native-heavy-600px.png`
- pass: native-heavy-768px - `candidate/screenshots/native-heavy-768px.png`
- pass: native-heavy-1366px - `candidate/screenshots/native-heavy-1366px.png`
- pass: native-heavy-1440px - `candidate/screenshots/native-heavy-1440px.png`


## Comparable behavior

Both lanes are real local ClawHub instances, baseline http://127.0.0.1:35541 and candidate http://127.0.0.1:35540, using the same read-only public Convex data. No CSS overlays or fabricated UI. Routes are `/skills-sh/skills-101/superpowers/ai-video-generation` and `/chloechien511-cloud/task-orchestrator-cron-heartbeat-subagent`. Native metadata has one category and four visible topics. Screenshots cover320,360,390,600,768,1366,1440px in both lanes and were visually inspected. Avatar loading timing may differ; no avatar code changed.

Before, topics occupy a forced row at every width up to600px and taxonomy/creator-handle weights are520/560. After, source metadata fits one row at390/600px; native320px metadata shrinks from three rows to two, and600px to one. Labels/dividers remain together; no horizontal overflow. Taxonomy and handle are400; creator display name remains primary. Desktop structure is preserved.

Three categories/three topics are additionally tested as a controlled DOM stress fixture in the browser regression; these screenshots use actual unmodified catalog data. Loading/empty/error visual cases do not exercise the changed existing metadata units, so they are omitted. No interaction changed; video is unnecessary.

Validation:68 focused tests;6,962 unit tests; static and types/build; explicit schema/CLI types;18 production browser smoke tests. Current-main regression fails520vs400, candidate passes. Initial full-suite archive-fixture timeout passed focused and on a four-worker full rerun; assertions/timeouts were preserved. The original PR's incorrect inline-flex computed-style expectation is replaced by geometry; creator color assertions now await the existing hydration theme transition. Full patch and test follow-up structured reviews have no findings. The final follow-up changes only browser assertions, so screenshot UI source is unchanged.
