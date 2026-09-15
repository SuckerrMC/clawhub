# Featured homepage default — held draft PR 3720

Baseline: `4877d6fe473d68e2052175d6eb515d37f04a0ded`. Candidate: `639dded6740cf8a5fa7f183bb327ec9300403b84`, based on homepage collection PR3716. Production code +4/−13; tests +26/−12.

The server-rendered homepage, client fallback, and return-to-Skills view select Featured. Explicit Trending, Official and New navigation and `/skills?tab=` links remain usable. No selections, ranking algorithm, configuration or backend state changed. Merge/deployment are held until the intelligence pipeline is deployed and Patrick has reviewed its first real production selection.

Real isolated Playwright browsers exercised the local frontend at127.0.0.1:3561 using the public read-only production catalog. The baseline selects Trending with20rows; candidate selects Featured with6existing rows. Those existing public selections are not the pipeline’s new recommendations. No search was submitted or marked. Baseline capture preceded the collection rebase, whose search-intent additions do not change this visible baseline.

Paired baseline/candidate screenshots cover desktop1440×900, mobile390×844, tablet768×1024 and laptop1366×768. Root personally inspected all eight. Full navigation evidence is in summary.json:22 tab/direct-link outcomes; returning to Skills selects Featured. Two candidate empty-state images under candidate/empty-{desktop,mobile}.png use the separate disposable backend at3520/3521 through frontend3560; both were personally inspected. That backend’s unavailable Trending feed cannot prove the default transition, so the paired public-data captures own that comparison.

Loading/client fallback is covered by rendered tests. Existing error/card styling, permission states and controls are unchanged; extra variants do not exercise this default-only change. Typical/content-heavy paths use6Featured/20Trending rows. The in-app browser was unavailable; isolated Playwright was used without controlling the user’s Chrome.

At the candidate SHA:47focusedtests,6,849unit tests(3skipped), static/audit0, TypeScript and productionbuild pass. Fresh browser validation after rebase passes all22navigationchecks and both empty states. No source/config/assertion/timeout changes were made to obtain these results. Previous true-before regression evidence is retained locally in /tmp/claw-895-red.log; the three changed default assertions fail against original production code.
