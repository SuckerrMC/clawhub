# Background intelligence report proof

Real running ClawHub frontend: http://localhost:3538/management?view=search-insights. Native local Convex: ports 3692/3693. Signed in through the existing local Admin persona. Screenshots are browser captures, not rendered mockups.

The candidate preserves the complete cohort for both catalogs: 100 search rows, 300 current-result identities, and 100 separate adoption identities; 400 eligible candidates, with eight proposed. All fixture names explicitly identify local report test data. These are validation fixtures, not production recommendations.

Both catalogs passed browser checks at 390×844, 768×1024, 1366×768 and 1440×900. No JavaScript errors or horizontal page overflow. Selected captures show controls, evidence and candidate cards across the four viewport sizes.

Native HTTP admission returned 202 in 269–297ms, showed one running report while the other remained queued, and returned completed reports in 427–710ms under the unchanged 15-second request deadline. Full report content matched the existing synchronous builder, excluding generation/check timestamps. This verifies the background protocol and content preservation; it is not a production speed measurement.

The production baseline skill report took 27.254 seconds through the existing privileged read-only action; the normal 15-second HTTP request timed out. Production validation of the candidate follows deployment.

Registered regression tests cover queue/retry/terminal outcomes, private evidence bounds/expiry, current eligibility, missing/removed generation recovery, filter races and UTC day rollover. The old implementation fails the new background-admission and rollover/recovery reproductions. API and CLI reads left local search observations, aggregate state, classifications, Featured badges and digest rows unchanged; hashes are included in summary.json.

No production Featured selection or digest was published by this proof.
