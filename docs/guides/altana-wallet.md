# Altana wallet

Altana is an opt-in custody mode. The trusted operator keeps an encrypted admin keystore under the workspace `.studio/wallets/` directory; the running Agent receives one bounded, expiring session instead. Generic message signing is not exposed. ERC-8183 quotes use the session's quote-only signer and require the configured on-chain quote checker approval.

Generated projects pin the reviewed integration target
`@altananetwork/sdk@0.7.1`. Doctor, deploy readiness, and runtime loading reject
a different installed version. Treat a pin change as a security change and
repeat source review, SDK type-compatibility tests, and Altana testnet E2E
before updating it.

Projects created with `@bnbagent/sdk` older than 0.5.4 must upgrade that
dependency before upgrading Studio Runtime. SDK 0.5.4 replaces target-wide
Altana calls with selector-bound permissions, removes session-key ERC-20
`approve`, and requires the administrator to provision a bounded Commerce
allowance. Deploy readiness rejects the older permission shape. Run
`pnpm add @bnbagent/sdk@0.5.4`, then `bag wallet session grant --force` and
redeploy.

Altana currently supports only the canonical ERC-8183 Commerce/Router/Policy stack. `bag doctor` and deploy readiness reject an Altana project with an active ERC-8183 rail when custom `ERC8183_*_ADDRESS` overrides are selected, because its session permissions and quote-checker approval remain bound to the canonical contracts.

Deployment ships ONLY the serialized session, injected as the `ALTANA_SESSION` runtime secret — the same channel `bag dev` uses. The admin keystore and `WALLET_PASSWORD` never leave the operator machine. Deploy readiness fails on a missing, expired, or address-mismatched session, on a group/world-readable session file, on a session file inside the packaged artifact root, or when the project-local `@altananetwork/sdk` cannot be resolved; it warns when the session expires within 7 days.

... (existing content) ...

```bash
bag wallet session grant \
  --yes
```

Use `--no-register` only when registry visibility is not wanted. The command writes `.studio/wallets/altana-session.json` with owner-only permissions, provisions a Commerce allowance no higher than the session's U-token cap, then approves the ERC-8183 quote checker. Every relay-backed management write must return `CONFIRMED`; `PENDING` and other statuses fail closed and preserve the session file. If either setup step fails, repair both without paying for another grant:

```bash
bag wallet session grant --approve-only
```

Only one local session is supported. `--approve-only`, runtime loading, and deploy readiness reject a pre-0.5.4 target-wide session; use `--force` to replace it. Replacement is fail-closed: `--force` first zeros the old Commerce allowance, then must receive confirmed revocation before a new one is granted.

## Inspect, run, and revoke

... (existing content) ...

```bash
bag dev
bag wallet session revoke --yes
```

`status` reads only public envelope metadata; it does not deserialize or print the session signer. Revocation zeros the Commerce allowance before revoking on-chain and removes the local file only after both operations succeed. `bag dev --container` injects the serialized session as `ALTANA_SESSION`; it never injects the admin keystore or password.

## Deploy and renew

... (existing content) ...