... (existing content) ...

- Altana bounded-session custody with session-only deploys on every provider: `bag deploy` ships only the serialized `ALTANA_SESSION` secret, readiness validates the session (expiry CRITICAL plus a 7-day warning), and renewal is re-grant plus redeploy; the admin keystore never leaves the operator machine.
- Azure AI Foundry deploy adapter (container-only, delegated to the pinned `@bnbagent/deploy-cli`) with readiness, smoke, logs, status, and teardown.
- npm release/build-smoke workflow, distribution leak checks, and package lockstep enforcement.
- stable `@bnbagent/sdk@0.5.4` integration with canonical ERC-8183 zero-price funding.
- migration behavior-equivalence audit, followed by retirement of the temporary ledger once its cases moved into the package Vitest suites.

## External verification

... (existing content) ...