# Real Convex weekly producer upgrade proof — 2026-09-15

Result: PASS, process exit 0. Disposable anonymous local Convex backend on cloud port 39570 / site port 39571. One persistent store was used before deployment, after deployment, and after a process restart. No production writes, no Featured changes, no provider calls, and no delivery transport calls.

## Exact source and runtime

- Before: original ClawHub PR 3633 producer `cdf4be4b735bd24980fa8874e756b2c51e87820b`.
- After: ClawHub PR 3718 `27d1a247b64f0a633678881c4895e0746382cf6b`.
- Separate clone: a task-owned disposable clone; no shared preview or source checkout was modified.
- Real Convex backend + real production actions/mutations; the checked-in local Playwright Convex bootstrap was used. CLI 1.44.0; Bun 1.4.0; macOS.
- All delivery/provider credentials were removed from the child process environment. The fresh backend had none; all three recorded state snapshots confirm both credential flags are false.
- `searchDigestDelivery.ts:8` returns `missing_hermit_configuration` before `fetch`. `searchIntentClassifier.ts:76` returns `missing_provider_configuration` before `fetch`. The fixture uses local queries only and has no installed catalog records requiring external metadata. Dependency installation/bootstrap is outside the no-provider/no-delivery claim.

## Actual observed sequence

1. Deploy original producer. Seed four synthetic plugin observations in the week ending August 31. Run the actual `searchWeeklyDigest:deliverInternal`: freezes a v1 `plugin_search_weekly` payload with totalSearches=4, records delivery failure `missing_hermit_configuration`.
2. For a separate week ending September 7, use the actual `claimInternal` and `savePayloadInternal` with a copied legacy payload plus one deterministic available classifier fixture. Actual deliver action replays the stored payload. This supplies a nonempty original classification row without calling a paid provider.
3. Deploy the exact candidate over the same store. Actual deliver action for September 7 reuses the frozen legacy payload without rebuilding or changing the legacy classification row.
4. Seed four plugin and four skill observations in the week ending September 14. Actual candidate deliver action creates `search_intelligence_weekly_v2`, with plugin=4 and skill=4, and persists separate plugin/skill classification-run records. Both explicitly record `missing_provider_configuration`, expectedQualified=1. Delivery again stops before fetch.
5. In a fourth week ending August 24, pass deterministic available classification fixtures for the same query in both catalogs through the real fenced claim/save mutation. Stored rows remain distinct by artifactKind and carry scope=catalog. Actual deliver action replays this payload.
6. Stop and restart the backend without deleting its store. Read back all records, then actually replay both the legacy September 7 and fresh v2 September 14 weeks. Frozen payload hashes remain unchanged; all classification rows and an unrelated user sentinel survive.

Payload SHA256 (JSON byte representation returned by the real Convex client):

- Populated legacy: `c0aa1fffea38bcf218dc8308c30c12603284beebc85068e02192d3a421f7f472`
- Actual fresh v2: `5d755ee6a9977e2a9eabc7cb65192685bb154963f30bbe9ab13a328c4ffa7e01`

The after-restart snapshot contains four digest rows, three classification rows, and six classification-run records. A separate comparison also verified both original weeks survived deployment unchanged, all four payloads survived restart unchanged, and every classification row and the unrelated user sentinel remained identical. Owned listeners were shut down after the run.

## Proof boundary and fixtures

The local-only helper seeds observations, inspects bounded tables, and adjusts only retry eligibility/status to exercise retries without waiting. It does not write payloads or classifications directly. Those go through the real `savePayloadInternal` ownership boundary; actual build and replay run through `deliverInternal`. The original and candidate production modules were not patched or mocked.

Successful LLM output is a deterministic fixture, not live provider evidence. The candidate's complete actual action exercises the unavailable-provider path and records that non-outcome durably. The populated v1/v2 fixture payloads exist only to exercise ledger and classification persistence; they are not claimed as fresh recommendation builds. No Discord create/readback, permissions, or ambiguous-send recovery was tested. That independent live delivery proof remains explicitly unperformed.

## Artifacts

- `transcript.json`: compact sequence and checks.
- `before-upgrade.json`, `after-upgrade.json`, `after-restart.json`: complete bounded local state snapshots with synthetic data only.
- `ledger-proof.mts`, `claw893LedgerProof.ts`: orchestration and transparent local fixture helper, retained for review; neither is a production change.
- Full stdout: retained locally; the complete redacted event transcript and state snapshots are embedded in `summary.json`.

The harness was run once from the original commit in a fresh clone/store. To reproduce, prepare another empty clone/store at the original SHA, copy both helper files, choose unused local ports and update the helper guard/output paths, install the exact lockfile, then run `bun ledger-proof.mts`. Do not rerun the harness against the retained candidate store: it intentionally preserves the proof data.

## Source blob mapping

The exact Git blobs inspected at both revisions are embedded in `summary.json`. These allow the release owner to match the proof to a mechanically rebased head without implying that an untested source change was executed.

## Reproducible harness

The following is the executed orchestration with only host-specific Bun/PATH and temporary directory paths replaced. Start from a fresh clone at the original SHA. Copy the helper below into `convex/claw893LedgerProof.ts`; keep the existing local Convex bootstrap from that revision. Use unused ports and update the local-only guard if necessary. Do not run this against a shared or production backend.

```ts
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { ConvexHttpClient } from 'convex/browser';

const root = process.cwd();
const out = '/tmp/claw893-producer-proof-output';
mkdirSync(out, { recursive: true });
const cloud = 'http://127.0.0.1:39570';
const site = 'http://127.0.0.1:39571';
const beforeSha = 'cdf4be4b735bd24980fa8874e756b2c51e87820b';
const afterSha = '27d1a247b64f0a633678881c4895e0746382cf6b';
const env = { ...process.env, CONVEX_AGENT_MODE: 'anonymous', HTTP_SERVER_TIMEOUT_SECONDS: '900', npm_config_prefer_offline: 'true', CLAWHUB_DISABLE_CRONS: '1', SITE_URL: site, CONVEX_SITE_URL: site };
for (const key of ['CONVEX_DEPLOY_KEY', 'CONVEX_DEPLOYMENT', 'OPENAI_API_KEY', 'CLAWHUB_HERMIT_TOKEN', 'CLAWHUB_BAN_APPEALS_TOKEN', 'HERMIT_CONTENT_RIGHTS_BASE_URL']) delete env[key];
const events: unknown[] = [];
const log = (event: unknown) => { events.push(event); console.log(JSON.stringify(event)); writeFileSync(out + '/transcript.json', JSON.stringify(events, null, 2) + '\n'); };
function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, env, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(command + ' exit ' + code)));
  });
}
let backend: ReturnType<typeof spawn> | undefined;
let client: ConvexHttpClient;
async function start() {
  backend = spawn('bun', ['scripts/playwright-local-convex.ts', 'convex', 'dev', '--typecheck', 'disable', '--codegen', 'disable', '--local-cloud-port', '39570', '--local-site-port', '39571', '--skip-push'], { cwd: root, env, detached: true, stdio: ['ignore', 'inherit', 'inherit', 'ipc'] });
  await new Promise<void>((resolve, reject) => {
    backend!.once('error', reject);
    backend!.once('message', (message: any) => message.status === 'ready' ? resolve() : reject(new Error(message.message)));
  });
  const config = JSON.parse(readFileSync(root + '/.convex/local/default/config.json', 'utf8'));
  env.CONVEX_DEPLOYMENT = 'anonymous:' + config.deploymentName;
  client = new ConvexHttpClient(cloud);
  (client as any).setAdminAuth(config.adminKey);
  const response = await fetch(cloud + '/api/update_environment_variables', {
    method: 'POST', headers: { Authorization: 'Convex ' + config.adminKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ changes: [{ name: 'CLAWHUB_DISABLE_CRONS', value: '1' }, { name: 'SITE_URL', value: site }, { name: 'CLAWHUB_SKILLS_SH_ROLLOUT_MODE', value: 'test' }] }),
  });
  if (!response.ok) throw new Error('Local environment setup ' + response.status);
  log({ event: 'backend-started', deploymentName: config.deploymentName, cloud, site });
}
async function stop() {
  if (!backend?.pid) return;
  const pid = backend.pid;
  process.kill(-pid, 'SIGTERM');
  await new Promise(resolve => setTimeout(resolve, 1500));
  try { process.kill(-pid, 'SIGKILL'); } catch {}
  backend = undefined;
}
const push = () => run('bunx', ['convex', 'run', '--push', '--inline-query', 'null', '--typecheck', 'disable', '--codegen', 'disable']);
const mutate = (name: string, args: any) => client.mutation(name as any, args);
const action = (name: string, args: any) => client.action(name as any, args);
const inspect = () => client.query('claw893LedgerProof:inspect' as any, {});
const digestAt = (state: any, weekEnd: number) => state.digests.find((row: any) => row.weekEnd === weekEnd);
const sha = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const assert = (condition: unknown, message: string) => { if (!condition) throw new Error(message); };
const day = 86_400_000;
const legacyActionWeek = Date.parse('2026-08-31T00:00:00Z');
const legacyFixtureWeek = Date.parse('2026-09-07T00:00:00Z');
const freshWeek = Date.parse('2026-09-14T00:00:00Z');
const availableFixtureWeek = Date.parse('2026-08-24T00:00:00Z');
const observations = (week: number, kinds: string[], scoped = false) => kinds.flatMap(artifactKind => Array.from({ length: 4 }, () => ({ artifactKind, normalizedQuery: 'claw893 ledger fixture', observedAt: week - day, source: 'clawhub-web', resultCount: 0, officialResultCount: 0, ...(scoped ? { scope: 'catalog' } : {}) })));
const classification = () => ({ status: 'available', model: 'local-deterministic-fixture', modelVersion: 'fixture-v1', expectedQualified: 1, truncated: false, rows: [{ query: 'claw893 ledger fixture', intentKind: 'company_product', companyProductName: 'Local Ledger Fixture', confidence: 0.95 }] });
async function replay(weekEnd: number, label: string) {
  await mutate('claw893LedgerProof:eligibilityTime', { weekEnd, due: true });
  const result = await action('searchWeeklyDigest:deliverInternal', { weekEnd });
  await mutate('claw893LedgerProof:eligibilityTime', { weekEnd, due: false });
  const state: any = await inspect();
  assert(digestAt(state, weekEnd).failureCode === 'missing_hermit_configuration', label + ' must exit before fetch');
  log({ event: label, result, status: digestAt(state, weekEnd).status, attempts: digestAt(state, weekEnd).attempts, payloadHash: sha(digestAt(state, weekEnd).payload), failureCode: digestAt(state, weekEnd).failureCode });
  return state;
}
try {
  await start();
  await push();
  await mutate('claw893LedgerProof:seed', { observations: observations(legacyActionWeek, ['plugin']) });
  const oldResult = await action('searchWeeklyDigest:deliverInternal', { weekEnd: legacyActionWeek });
  await mutate('claw893LedgerProof:eligibilityTime', { weekEnd: legacyActionWeek, due: false });
  let state: any = await inspect();
  assert(digestAt(state, legacyActionWeek).payload.kind === 'plugin_search_weekly', 'Original action freezes v1');
  assert(digestAt(state, legacyActionWeek).failureCode === 'missing_hermit_configuration', 'Original action must not fetch');
  log({ event: 'original-real-action', commit: beforeSha, result: oldResult, kind: digestAt(state, legacyActionWeek).payload.kind, searches: digestAt(state, legacyActionWeek).payload.totalSearches, failureCode: digestAt(state, legacyActionWeek).failureCode });
  const claim: any = await mutate('searchWeeklyDigest:claimInternal', { weekEnd: legacyFixtureWeek });
  const legacyPayload = JSON.parse(JSON.stringify(digestAt(state, legacyActionWeek).payload));
  legacyPayload.weekEnd = legacyFixtureWeek;
  legacyPayload.weekStart = legacyFixtureWeek - 7 * day;
  legacyPayload.dashboardUrl = site + '/management?view=search-insights&endDay=' + legacyFixtureWeek;
  legacyPayload.classificationStatus = 'available';
  legacyPayload.companyOpportunities = [{ query: 'claw893 ledger fixture', searches: 4, officialGaps: 4, previousSearches: 0, searchUrl: site + '/plugins?q=claw893%20ledger%20fixture', confidence: 0.95, companyProductName: 'Local Ledger Fixture' }];
  await mutate('searchWeeklyDigest:savePayloadInternal', { weekEnd: legacyFixtureWeek, attempt: claim.attempt, payload: legacyPayload, classification: classification() });
  state = await replay(legacyFixtureWeek, 'original-populated-legacy-frozen-replay');
  writeFileSync(out + '/before-upgrade.json', JSON.stringify(state, null, 2) + '\n');
  const legacyHash = sha(digestAt(state, legacyFixtureWeek).payload);
  const oldRows = state.classifications.filter((r: any) => r.weekEnd === legacyFixtureWeek);
  assert(oldRows.length === 1, 'Real original save persisted classification row');
  const oldRowsHash = sha(oldRows);
  const sentinelHash = sha(state.sentinel);
  await run('git', ['checkout', '--detach', afterSha]);
  await push();
  state = await replay(legacyFixtureWeek, 'candidate-legacy-frozen-replay');
  assert(sha(digestAt(state, legacyFixtureWeek).payload) === legacyHash, 'Frozen v1 payload byte representation unchanged');
  assert(sha(state.classifications.filter((r: any) => r.weekEnd === legacyFixtureWeek)) === oldRowsHash, 'Legacy classification row unchanged');
  await mutate('claw893LedgerProof:seed', { observations: observations(freshWeek, ['plugin', 'skill'], true) });
  const freshResult = await action('searchWeeklyDigest:deliverInternal', { weekEnd: freshWeek });
  await mutate('claw893LedgerProof:eligibilityTime', { weekEnd: freshWeek, due: false });
  state = await inspect();
  const fresh = digestAt(state, freshWeek);
  assert(fresh.payload?.kind === 'search_intelligence_weekly_v2', 'Candidate real action freezes v2');
  assert(fresh.failureCode === 'missing_hermit_configuration', 'Candidate real action must not fetch');
  const runs = state.classificationRuns.filter((r: any) => r.weekEnd === freshWeek);
  assert(runs.length === 2 && new Set(runs.map((r: any) => r.artifactKind)).size === 2, 'Candidate action saves both catalog runs');
  log({ event: 'candidate-real-fresh-action', commit: afterSha, result: freshResult, kind: fresh.payload.kind, catalogCounts: Object.fromEntries(Object.entries(fresh.payload.catalogs).map(([key, value]: any) => [key, value.totalSearches])), classificationRuns: runs.map((r: any) => ({ artifactKind: r.artifactKind, status: r.status, expectedQualified: r.expectedQualified, failureCode: r.failureCode })), failureCode: fresh.failureCode });
  const freshHash = sha(fresh.payload);
  const fixtureClaim: any = await mutate('searchWeeklyDigest:claimInternal', { weekEnd: availableFixtureWeek });
  const fixturePayload = JSON.parse(JSON.stringify(fresh.payload));
  fixturePayload.weekEnd = availableFixtureWeek;
  fixturePayload.weekStart = availableFixtureWeek - 7 * day;
  fixturePayload.dashboardUrl = site + '/management?view=search-insights&endDay=' + availableFixtureWeek;
  for (const catalog of Object.values(fixturePayload.catalogs) as any[]) catalog.classificationStatus = 'available';
  const availableSave = await mutate('searchWeeklyDigest:savePayloadInternal', { weekEnd: availableFixtureWeek, attempt: fixtureClaim.attempt, payload: fixturePayload, catalogClassifications: ['plugin', 'skill'].map(artifactKind => ({ ...classification(), artifactKind, rows: classification().rows.map(row => ({ ...row, scope: 'catalog' })) })) });
  state = await replay(availableFixtureWeek, 'candidate-deterministic-classification-fixture-replay');
  const bothRows = state.classifications.filter((r: any) => r.weekEnd === availableFixtureWeek);
  assert(bothRows.length === 2 && new Set(bothRows.map((r: any) => r.artifactKind)).size === 2, 'Same query persists separately in both catalogs');
  log({ event: 'candidate-fenced-available-classifications', result: availableSave, rows: bothRows.map((r: any) => ({ query: r.query, artifactKind: r.artifactKind, scope: r.scope, intentKind: r.intentKind })) });
  writeFileSync(out + '/after-upgrade.json', JSON.stringify(state, null, 2) + '\n');
  const bothRowsHash = sha(bothRows);
  await stop();
  await start();
  state = await inspect();
  assert(sha(state.sentinel) === sentinelHash, 'Unrelated state survives restart');
  assert(sha(digestAt(state, legacyFixtureWeek).payload) === legacyHash, 'Legacy payload survives restart');
  assert(sha(digestAt(state, freshWeek).payload) === freshHash, 'Actual v2 payload survives restart');
  assert(sha(state.classifications.filter((r: any) => r.weekEnd === availableFixtureWeek)) === bothRowsHash, 'Both catalog classification rows survive restart');
  state = await replay(legacyFixtureWeek, 'restarted-legacy-replay');
  state = await replay(freshWeek, 'restarted-v2-replay');
  assert(sha(digestAt(state, legacyFixtureWeek).payload) === legacyHash && sha(digestAt(state, freshWeek).payload) === freshHash, 'Restarted replays use unchanged frozen payloads');
  assert(!state.credentialsPresent.hermit && !state.credentialsPresent.provider, 'No provider/delivery credential available');
  writeFileSync(out + '/after-restart.json', JSON.stringify(state, null, 2) + '\n');
  log({ event: 'proof-passed', legacyHash, freshHash, unchangedLegacyClassificationHash: oldRowsHash, unchangedBothCatalogClassificationHash: bothRowsHash, unchangedSentinelHash: sentinelHash, credentialsPresent: state.credentialsPresent, deliveryTransport: 'No transport invoked: missing_hermit_configuration is returned before fetch', classifier: 'Actual action unavailable without credentials; available rows use deterministic local fixtures through the real save mutation' });
} finally { await stop(); }

```

### Temporary local fixture helper

```ts
import { v } from 'convex/values';
import { internalMutation, internalQuery } from './functions';

function localOnly() {
  if (!/^http:\/\/127\.0\.0\.1:39570$/.test(process.env.CONVEX_SITE_URL ?? '')) {
    // The site listener is distinct from the cloud listener below.
    if (process.env.CONVEX_SITE_URL !== 'http://127.0.0.1:39571') throw new Error('Local ledger proof only');
  }
}
export const seed = internalMutation({
  args: { observations: v.array(v.any()) },
  handler: async (ctx, args) => {
    localOnly();
    for (const observation of args.observations) await ctx.db.insert('pluginSearchObservations', observation);
    let sentinel = await ctx.db.query('users').withIndex('handle', q => q.eq('handle', 'claw893-ledger-sentinel')).unique();
    if (!sentinel) await ctx.db.insert('users', { handle: 'claw893-ledger-sentinel', displayName: 'Unrelated local continuity fixture' });
    return { inserted: args.observations.length };
  },
});
export const eligibilityTime = internalMutation({
  args: { weekEnd: v.number(), due: v.boolean() },
  handler: async (ctx, args) => {
    localOnly();
    const row = await ctx.db.query('searchWeeklyDigests').withIndex('by_weekEnd', q => q.eq('weekEnd', args.weekEnd)).unique();
    if (!row) throw new Error('Missing local fixture week');
    await ctx.db.patch(row._id, { status: 'failed', claimedUntil: 0, nextAttemptAt: args.due ? 0 : Date.now() + 3_600_000 });
    return { adjustedEligibilityOnly: true };
  },
});
export const inspect = internalQuery({
  args: {},
  handler: async (ctx) => {
    localOnly();
    const sentinel = await ctx.db.query('users').withIndex('handle', q => q.eq('handle', 'claw893-ledger-sentinel')).unique();
    return {
      digests: await ctx.db.query('searchWeeklyDigests').take(10),
      classifications: await ctx.db.query('searchWeeklyClassifications').take(50),
      classificationRuns: await ctx.db.query('searchClassificationRuns').take(50),
      sentinel: sentinel ? { id: sentinel._id, displayName: sentinel.displayName } : null,
      credentialsPresent: {
        hermit: Boolean(process.env.CLAWHUB_HERMIT_TOKEN || process.env.CLAWHUB_BAN_APPEALS_TOKEN),
        provider: Boolean(process.env.OPENAI_API_KEY),
      },
    };
  },
});

```
