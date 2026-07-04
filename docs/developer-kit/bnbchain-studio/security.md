---
title: BNB Agent Studio Security
---

# Security

BNB Agent Studio is designed around five commitments. The security model follows from architectural boundaries, not optional settings.

## Core commitments

1. **Agent project code is user-owned** — recipe-emitted files are yours; studio never silently rewrites them.
2. **Private keys live only in user-controlled environments** — the keystore never leaves your Agent via public channels; the keyless Service never holds it.
3. **MCP is read-only** — no signing, no on-chain state change (exception: domain-locked SIWE `personal_sign`, never persisted).
4. **The SDK protocol layer stays pure** — studio opinions never pollute `bnbagent-sdk`.
5. **You can jump ship** — emitted code is yours to fork; no closed-source SaaS or OAuth lock-in.

## Keystore posture

| Location | Who reads it | Deploy path |
|----------|--------------|-------------|
| Workspace root `.studio/wallets/` | Layer A Agent only | Injected via AWS Secrets Manager (`WALLET_KEYSTORE_JSON`) |
| `app/service/` | Never | Service zip excludes all `.env*` and keystore paths |

The keystore sits **outside** `app/agent/` (the AgentCore codeLocation) so no packaging path — including raw `agentcore deploy` — can bundle it into an artifact.

`WALLET_PASSWORD` lives in environment variables only (`.env.local` for local dev, Secrets Manager injection for deploy). It is never written to `studio.toml`.

## Signing boundary

All on-chain signing is **fixed entrypoint code** in `app/agent/signing.py` — never an LLM-callable tool. The Agent:

- Receives action envelopes (`quote` / `fulfill` / `settle`) from the keyless Service
- Clamps prices to `[min_price, max_price]` in `studio.toml` before signing
- Re-validates chain state before every submission

The keyless Service can only *request* signatures via `InvokeAgentRuntime`; it cannot sign directly.

## SigningPolicy (EIP-712)

`EVMWalletProvider.sign_typed_data` is policy-gated by default:

- **Allowed by default:** EIP-3009 `TransferWithAuthorization` / `ReceiveWithAuthorization` against network-default deployments
- **Denied by default:** ERC-2612 `Permit`, Permit2 `PermitSingle`/`PermitBatch` — even if your code mistakenly allowlists them

Extend signing for new contracts or primary types via `app/agent/studio.toml`:

```toml
[wallet.signing]
extra_domains = [...]
extra_primary_types = [...]
```

Also configure `[payments.x402].allowed_hosts` before the x402 buyer fetches from new servers. Both gates require editing toml + restart.

Diagnose policy issues:

```bash
bag wallet policy show
```

## MCP read-only guarantee

The MCP server (`bag mcp serve`) exposes 15 tools — all read-only:

- Wallet address and balances (no transfer)
- Network, block, and transaction queries
- ERC-8004 and ERC-8183 job reads
- Pieverse usage visibility

`WALLET_PASSWORD` is used only to resolve the keystore address for balance queries — the MCP server **never signs**.

## Budget and auto-topup

`bag budget enable` opts into automatic LLM credit renewal via x402. Requires:

- Funded mainnet wallet balance for auto-renew flows
- `WALLET_PASSWORD` injected at Agent runtime deploy time

Without runtime password injection, the Agent falls back to manual `bag llm allocate`. Disable with `bag budget disable`.

## Audit log

On-chain actions are recorded in a local audit log (`bag audit ls`). Sensitive values (passwords, private keys) are never logged.

## AWS deploy responsibility

Deploying provisions resources in **your** AWS account. Published IAM reference policies are provided AS IS — you remain responsible for scoping, costs, and security. See [DISCLAIMER.md](https://github.com/bnb-chain/bnbagent-studio/blob/main/DISCLAIMER.md).

## Recommendations

- Start on **BSC testnet** until you understand the signing and deploy flow
- Run `bag doctor` before every deploy
- Use `--secrets-mode secretsmanager` (default) on any network with real funds
- Keep the Service zip free of Agent secrets — `bag deploy package` enforces this
- Review `[wallet.signing]` before extending beyond default EIP-3009 allowlist

[← BNB Agent Studio overview](index.md)
