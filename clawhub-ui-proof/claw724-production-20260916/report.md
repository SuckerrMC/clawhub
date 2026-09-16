# Production browser proof — CLAW-724

[Public homepage](https://clawhub.ai/) · [Production intelligence dashboard](https://clawhub.ai/management?view=search-insights&endDay=1789516800000)

Actual anonymous production capture at **2026-09-16 21:39:04 UTC** against backend `2c901bdf46ef9a75a1702616e6c0f3c5b9361be3`:

- Featured is selected on initial desktop 1440×900 and mobile 390×844 loads.
- All **16 approved skill IDs, order and versions** match the saved publication; all public link identities match too.
- The previous **seven plugin identities, order, versions and categories** remain unchanged.
- **14 tab checks** pass: skills Featured/Trending/Official/New and plugins Featured/Official/New on both viewports, including return to the exact Featured order.
- No browser errors, horizontal overflow, authentication, search input, or mutation/action requests in this proof. No local fixture was changed.

## Comparable screenshots

| Surface | Before | After |
|---|---|---|
| Homepage desktop | [Trending default](baseline/homepage-default-desktop.png) | [Featured default](candidate/homepage-default-desktop.png) |
| Homepage mobile | [Trending default](baseline/homepage-default-mobile.png) | [Featured default](candidate/homepage-default-mobile.png) |
| Skills desktop | [Seven skills](baseline/featured-skills-desktop.png) | [All sixteen approved skills](candidate/featured-skills-desktop.png) |
| Skills mobile | [Seven skills](baseline/featured-skills-mobile.png) | [All sixteen approved skills](candidate/featured-skills-mobile.png) |
| Plugins desktop | [Seven plugins](baseline/featured-plugins-desktop.png) | [Same seven plugins](candidate/featured-plugins-desktop.png) |
| Plugins mobile | [Seven plugins](baseline/featured-plugins-mobile.png) | [Same seven plugins](candidate/featured-plugins-mobile.png) |

The old homepage default frames were captured at 20:51:54/59Z with frontend asset `index-C8dXnhX9.js`. The frontend rolled out during baseline capture: settled seven-item Featured lists were captured at 20:52:55–20:53:07Z using new asset `index-CylYQN_0.js` and old backend `25b2bb65`. Final production capture uses that same frontend and the verified new backend after publication. This is a deployment timeline, not a claim that every before image predates the merge.

[Sanitized exact identities and navigation receipt](summary.json). Navigation images are in [navigation/](navigation/). Full-page skill images include every card and the Featured tab; clipped listing screenshots with the sticky header covering controls are deliberately not used here.

The following is the inspected, redacted selection report supplied by the publication owner. It includes aggregate evidence and remaining limitations, without raw search text or staff authentication data.

---

# CLAW-724 — production selection evidence

[Production intelligence dashboard](https://clawhub.ai/management?view=search-insights&endDay=1789516800000) · [Public homepage](https://clawhub.ai/)

**16 approved skills are published. The plugin proposal has 13 eligible entries and 3 pending reservations; its publication remains held and the previous seven public plugins remain unchanged.**

Approved measurement period: **August 17, 2026 00:00 UTC inclusive through September 16, 2026 00:00 UTC exclusive**.

Counts are recorded install events, not unique users or proof of successful runtime installation. Telemetry sorts by 30-day installs, final-seven-day installs, then stable identity. Editorial plugins retain their explicitly approved positions; they do not receive a telemetry score bonus.

## Plugins

Production report: 13 ready of 16 places; 3 pending editorial reservations.

No new selection has been published for this catalog. All eight editorial reservations are saved as editable data at revision 1.

| Position | Artifact | Basis | 30-day installs | Final 7 days | Reason |
|---|---|---|---:|---:|---|
| 1 | [tokenjuice](https://clawhub.ai/plugins/%40openclaw%2Ftokenjuice) · `2026.9.3` | editorial | 40 | 17 | Compress noisy command output before it consumes context. |
| 2 | Memory Wiki — pending | Editorial | — | — | no-public-version |
| 3 | [Lobster](https://clawhub.ai/plugins/%40openclaw%2Flobster) · `2026.9.3` | editorial | 39 | 9 | Reusable workflows that pause for approval and resume. |
| 4 | [Diffs](https://clawhub.ai/plugins/%40openclaw%2Fdiffs) · `2026.9.3` | editorial | 43 | 8 | Show changes with visual comparisons and shareable output. |
| 5 | Logbook — pending | Editorial | — | — | no-public-version |
| 6 | [Google Meet](https://clawhub.ai/plugins/%40openclaw%2Fgoogle-meet) · `2026.9.4` | editorial | 22 | 4 | Let an agent join meetings. |
| 7 | [Voice Call](https://clawhub.ai/plugins/%40openclaw%2Fvoice-call) · `2026.9.4` | editorial | 21 | 3 | Let an agent make phone calls and hold conversations. |
| 8 | 1Password — pending | Editorial | — | — | no-public-version |
| 9 | [Tavily OpenClaw plugin](https://clawhub.ai/plugins/%40openclaw%2Ftavily-plugin) · `2026.9.4` | telemetry | 64 | 13 | 64 installs in 30 completed UTC days; 13 in the final 7 days. |
| 10 | [OpenClaw Firecrawl Plugin](https://clawhub.ai/plugins/%40openclaw%2Ffirecrawl-plugin) · `2026.9.4` | telemetry | 45 | 11 | 45 installs in 30 completed UTC days; 11 in the final 7 days. |
| 11 | [OpenClaw Parallel Plugin](https://clawhub.ai/plugins/%40openclaw%2Fparallel-plugin) · `2026.9.3` | telemetry | 39 | 5 | 39 installs in 30 completed UTC days; 5 in the final 7 days. |
| 12 | [OpenClaw DuckDuckGo Plugin](https://clawhub.ai/plugins/%40openclaw%2Fduckduckgo-plugin) · `2026.9.3` | telemetry | 34 | 7 | 34 installs in 30 completed UTC days; 7 in the final 7 days. |
| 13 | [Expedia Travel](https://clawhub.ai/plugins/%40expediagroup%2Fexpedia-openclaw) · `1.0.4` | telemetry | 34 | 3 | 34 installs in 30 completed UTC days; 3 in the final 7 days. |
| 14 | [Memory LanceDB](https://clawhub.ai/plugins/%40openclaw%2Fmemory-lancedb) · `2026.9.4` | telemetry | 33 | 10 | 33 installs in 30 completed UTC days; 10 in the final 7 days. |
| 15 | [PixVerse](https://clawhub.ai/plugins/%40openclaw%2Fpixverse-provider) · `2026.9.3` | telemetry | 33 | 4 | 33 installs in 30 completed UTC days; 4 in the final 7 days. |
| 16 | [Diagnostics OpenTelemetry](https://clawhub.ai/plugins/%40openclaw%2Fdiagnostics-otel) · `2026.9.3` | telemetry | 32 | 4 | 32 installs in 30 completed UTC days; 4 in the final 7 days. |

Complete numeric adoption scan: 24,140 raw rows, 354 identities with recorded installs. Current metadata was inspected for 300 ranked identities. The report’s `truncated` flag describes metadata inspection; it does not mean the numeric population was truncated.

Collected from 2026-09-16 21:33:22 UTC; generated 2026-09-16 21:33:25 UTC. Ranking `featured-installs-30d-v1`; snapshot `plugin:1789516800000:1789594402709`. Imported rows: 0.

Search collection began 2026-09-15 21:05:41 UTC; latest reported data 2026-09-16 21:16:46 UTC. Earlier days do not have a full search history. Search-result associations are demand context, not artifact-specific demand or ranking inputs.

## Skills

Production report: 16 ready of 16 places; 0 pending editorial reservations.

Saved publication: **16 items**, at 2026-09-16 21:35:54 UTC; report `n178mgfwkqxcmh7rvdgs1acvs98egv3j`, evidence hash `797509113fa2e9194216c5515dacc75cce4b05c36f9f4c394a6350e9a160dbfa`.

| Position | Artifact | Basis | 30-day installs | Final 7 days | Reason |
|---|---|---|---:|---:|---|
| 1 | [Tavily Search · @jacky1n7](https://clawhub.ai/jacky1n7/skills/openclaw-tavily-search) · `0.2.1` | telemetry | 43 | 5 | 43 installs in 30 completed UTC days; 5 in the final 7 days. |
| 2 | [Skill Vetter · @spclaudehome](https://clawhub.ai/spclaudehome/skills/skill-vetter) · `1.0.0` | telemetry | 25 | 6 | 25 installs in 30 completed UTC days; 6 in the final 7 days. |
| 3 | [Planning with files · @othmanadi](https://clawhub.ai/othmanadi/skills/planning-with-files) · `3.18.0` | telemetry | 20 | 4 | 20 installs in 30 completed UTC days; 4 in the final 7 days. |
| 4 | [Find Skills Skill · @fangkelvin](https://clawhub.ai/fangkelvin/skills/find-skills-skill) · `1.0.0` | telemetry | 20 | 0 | 20 installs in 30 completed UTC days; 0 in the final 7 days. |
| 5 | [Word / DOCX · @ivangdavila](https://clawhub.ai/ivangdavila/skills/word-docx) · `1.0.2` | telemetry | 17 | 4 | 17 installs in 30 completed UTC days; 4 in the final 7 days. |
| 6 | [Proactive Agent Lite · @bestrocky](https://clawhub.ai/bestrocky/skills/proactive-agent-lite) · `1.0.0` | telemetry | 17 | 2 | 17 installs in 30 completed UTC days; 2 in the final 7 days. |
| 7 | [Calendar · @haidiantoutou](https://clawhub.ai/haidiantoutou/skills/calendar) · `1.0.0` | telemetry | 16 | 6 | 16 installs in 30 completed UTC days; 6 in the final 7 days. |
| 8 | [ponytail · @dietrichgebert](https://clawhub.ai/dietrichgebert/skills/ponytail) · `4.9.0` | telemetry | 16 | 5 | 16 installs in 30 completed UTC days; 5 in the final 7 days. |
| 9 | [Weather · @steipete](https://clawhub.ai/steipete/skills/weather) · `1.0.0` | telemetry | 15 | 5 | 15 installs in 30 completed UTC days; 5 in the final 7 days. |
| 10 | [Excel / XLSX · @ivangdavila](https://clawhub.ai/ivangdavila/skills/excel-xlsx) · `1.0.2` | telemetry | 14 | 3 | 14 installs in 30 completed UTC days; 3 in the final 7 days. |
| 11 | [Tavily AI Search · @bert-builder](https://clawhub.ai/bert-builder/skills/tavily) · `1.0.0` | telemetry | 14 | 1 | 14 installs in 30 completed UTC days; 1 in the final 7 days. |
| 12 | [Gog · @steipete](https://clawhub.ai/steipete/skills/gog) · `1.0.0` | telemetry | 13 | 6 | 13 installs in 30 completed UTC days; 6 in the final 7 days. |
| 13 | [Tavily Search · @matthew77](https://clawhub.ai/matthew77/skills/liang-tavily-search) · `1.0.1` | telemetry | 13 | 2 | 13 installs in 30 completed UTC days; 2 in the final 7 days. |
| 14 | [Qmd · @steipete](https://clawhub.ai/steipete/skills/qmd) · `1.0.0` | telemetry | 13 | 1 | 13 installs in 30 completed UTC days; 1 in the final 7 days. |
| 15 | [Pdf · @awspace](https://clawhub.ai/awspace/skills/pdf) · `0.1.0` | telemetry | 12 | 5 | 12 installs in 30 completed UTC days; 5 in the final 7 days. |
| 16 | [Superpowers Dev Workflow · @wlshlad85](https://clawhub.ai/wlshlad85/skills/superpowers) · `1.0.0` | telemetry | 12 | 3 | 12 installs in 30 completed UTC days; 3 in the final 7 days. |

Complete numeric adoption scan: 2,220,919 raw rows, 6,684 identities with recorded installs. Current metadata was inspected for 200 ranked identities. The report’s `truncated` flag describes metadata inspection; it does not mean the numeric population was truncated.

Collected from 2026-09-16 21:33:33 UTC; generated 2026-09-16 21:34:40 UTC. Ranking `featured-installs-30d-v1`; snapshot `skill:1789516800000:1789594413545`. Imported rows: 0.

Search collection began 2026-09-15 21:16:49 UTC; latest reported data 2026-09-16 21:16:46 UTC. Earlier days do not have a full search history. Search-result associations are demand context, not artifact-specific demand or ranking inputs.

This production scan contains 59 fewer raw skill-day rows than the earlier independent census (2,220,978). The cause is not established. All 16 approved identities, order, versions and install counts are unchanged, and the number of install-bearing identities remains 6,684.

## Deployment and verification

Production source: `2c901bdf46ef9a75a1702616e6c0f3c5b9361be3`. [Test passed](https://github.com/openclaw/clawhub/actions/runs/35150371860), [backend deployment passed](https://github.com/openclaw/clawhub/actions/runs/35150332560), and [matching Vercel deployment succeeded](https://vercel.com/openclaw-foundation/clawhub/BY1SmyYawkkoZtEMeorKd9yroRWQ).

The workflow’s same production frontend suites passed when run directly: four HTTP checks and 15 public browser checks; six authenticated checks skipped because browser login state was unavailable. The separately queued frontend verification workflow was cancelled after these direct checks; it is not reported as passing.

Independent production browser/API verification matches all 16 skill identities and ordering; the seven previous plugin identities are unchanged. Fresh desktop/mobile captures show Featured as the homepage default. The publication audit records one skill publication from seven previous members to sixteen; one separate editorial audit records eight reservations. Digest rows before and after: zero.

## Remaining limits

- Memory Wiki, Logbook and 1Password require canonical publication and official-install qualification. Pending reservations are not public cards.
- The live OpenClaw gateway upgrade remains held by unfinished tasks tracked in CLAW-915.
- Authenticated staff API/CLI and anonymous public-browser proof are separate; no authenticated production dashboard screenshot is claimed.
- No digest was sent during this dry run. Real Discord rendering remains unverified.
- Future recommendation runs remain advisory and require Patrick’s approval before publication.
