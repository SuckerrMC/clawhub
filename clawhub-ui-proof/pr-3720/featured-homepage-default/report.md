# Featured homepage default — local preparation only

Candidate f2cfb90c1f9aa97e267b87f3fca77ba234bbda79; baseline 4877d6fe473d68e2052175d6eb515d37f04a0ded. No push, PR, deployment or Featured mutation. Landing waits for pipeline deployment and Patrick's initial-selection review.

The SSR homepage listing, client fallback and return-to-Skills default now select Featured. Explicit Trending/Official/New buttons remain usable. Existing plugin tab choices and /skills?tab={trending,featured,official,new} direct navigation remain intact. Homepage tabs were local state before and remain so; no new URL contract.

Production 4 added / 13 removed (net−9); tests 26 added / 12 removed (net+14). Existing finite Featured feed and editorial ordering reused. No added options, schemas or backend code.

Proof uses real local ClawHub/Vite at http://127.0.0.1:3561 with documented public read backend wry-manatee-359 and clawhub.ai. Before/after use the same public data, anonymous browser, route, theme and viewport; no search submissions. Before selects Trending with20rows; after selects Featured with6existing rows. Existing selections are examples of current public catalog, NOT the new pipeline's recommendations or an approved shortlist.

Paired before/after-{desktop,mobile,tablet,laptop}.png cover1440x900,390x844,768x1024,1366x768. Every image personally opened and inspected. Default Featured reveals existing category controls; all viewports remain usable. before.json/after.json bind visible tabs and rows. navigation.json records22 real tab/direct-link outcomes. Empty-state images use same candidate localfrontend3560 plus disposablebackend3520/3521 without adding fixtures. Existing Trending feed is unavailable there, so it cannot prove the default change; it proves Featured's empty state remains useful. Loading/client fallback covered by focused rendered test; no loading/error/card style changed, so extra screenshot variants not material. Heavy/typical content covered by20baseline Trendingrows/6Featuredrows. No new security/auth/disabled UI states.

Validation:
- Three changed default assertions fail against original production code: /tmp/claw-895-red.log.
- Five focused files54tests pass: /tmp/claw-895-green.log.
- Required ci:static exit0: /tmp/claw-895-static.log.
- Required ci:types-build (root/schema/CLI/admin TS and productionbuild) exit0: /tmp/claw-895-types-build.log.
- Required ci:unit rerun exit0,6733passed/3skipped across507passed/1skipped files, coverage86.25% statements78.02% branches88.33% functions88.84% lines: /tmp/claw-895-unit2.log. Initial run passed alltests but had one transient Node socket setTypeOfService EINVAL in existing bootstrap descendant cleanup; retained /tmp/claw-895-unit.log; clean rerun without code/config changes passed.
- Real browser navigation passed22 tab/direct navigation checks plus2empty states: /tmp/claw-895-navigation-final.log.
- First ephemeral navigation attempt used5second expectation bound although public plugin pagination takes longer; final30second bound reached results normally. Harness exact Skills heading/tab assumptions corrected to observed 'Skills83.2K' heading and radio semantics; product source unchanged.
- Native in-app preview open/connection retried but iab unavailable; isolated Playwright used, user's Chrome never controlled.

Preview processes: local3560 session69390; publicread3561 session98892. Stop only owned frontend processes after review. Public data is read-only; shared disposable backend belongs to root.


Rebased candidate639dded6740cf8a5fa7f183bb327ec9300403b84 includes homepage capture3716. Fresh four-viewport captures and all22navigation/twoempty-state checks pass.47focusedtests,6,849unit/3skip,static/audit0andtypes/buildpass. Root personally inspected all publishedbaseline/candidateimages. Baseline was captured before this rebase; capture additions do not alter the visible baseline. No production Featured writes or marked searches occurred.
