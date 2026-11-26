---
title: BNB Agent Studio Security
---

# Security

BNB Agent Studio is designed around five commitments. The security model follows from architectural boundaries, not optional settings.

## Core commitments

1. **Agent project code is user-owned** — recipe-emitted files are yours; studio never silently rewrites them.
2. **Runtime custody is explicit.** Review which provider receives the credentials needed to use the selected wallet before deploying.
3. **Signing stays in bounded handlers.** Seller operations validate the job or payment before signing or doing paid work. The LLM has no general signing tool.
4. **The SDK protocol layer stays pure** — studio opinions never pollute `bnbagent-sdk`.
5. **You can jump ship** — emitted code is yours to fork; no closed-source SaaS or OAuth lock-in.

## Keystore posture

| Wallet | Local material | Deployed authority |
| --- | --- | --- |
| `evm-local` | Encrypted keystore and `WALLET_PASSWORD` | The runtime receives both through the provider's secret channel and can unlock the wallet |
| `twak` | Project-dedicated TWAK wallet state | The container receives the wallet material and credentials needed by TWAK |
| `turnkey` | Turnkey API credentials and account configuration | The runtime can request signatures under the configured Turnkey policy; the wallet key stays in Turnkey |
| `altana` | Admin keystore and bounded session file | Only `ALTANA_SESSION` is sent; the admin key and password stay local |

The keystore sits **outside** `app/agent/` (the AgentCore codeLocation) so no packaging path — including raw `agentcore deploy` — can bundle it into an artifact.

Local secrets live in workspace `.studio/.env.local`, never in `studio.toml`.
AWS uses Secrets Manager by default; Azure uses Foundry CustomKeys. BNB trial and
CreateOS runtimes run on third-party infrastructure. A runtime receiving both an
encrypted keystore and its password can use that wallet. Use a dedicated deployment
wallet and review its funding and custody limits.

Altana sessions expire and require explicit renewal or revocation. Altana can
receive paid B402 seller revenue at its admin EOA address; receiving payment does
not require the session to sign. Register the merchant for the exact payout address.

## Signing boundary

ERC-8183 signing is fixed code in `app/agent/src/signing.ts`. The single runtime:

- Resolves the configured seller price and asset and signs the `negotiate` quote without an LLM
- Verifies the signed terms and funded on-chain job in `notify_funded` before work and submission
- Keeps signing out of the LLM's tool set

X402 or MPP seller handlers settle paid B402 requests before work. Explicit FREE
mode bypasses settlement. A later work failure does not automatically refund the
payment; reconcile uncertain payment outcomes before paying again.

## SigningPolicy (EIP-712)

The local EVM wallet applies the SDK's strict signing policy:

- EIP-3009 authorizations are limited to approved network, domain, primary type, and validity bounds.
- Other wallet kinds have their own signing boundaries; receiving seller payout does not grant outbound payment authority.

Extend signing for new contracts or primary types via `app/agent/studio.toml`:

```toml
[wallet.signing]
extra_domains = []       # add only reviewed [chain_id, contract_address] pairs
extra_primary_types = [] # add only reviewed EIP-712 types
```

The outbound x402 buyer also checks host and recipient trust under
`[payments.x402]`. Prefer `bag x402 trust <merchant-url>` to inspect and pin a
merchant, then review the resulting configuration. Changing the host allowlist
alone does not authorize its signing domain or recipient.

Local and Turnkey x402 buyers use EIP-3009. Altana uses a separately armed, bounded
Permit2 Exact session; TWAK is rejected for paid Studio x402 buying. These buyer
limits do not restrict seller payout. Read the
[Altana playbook](https://github.com/bnb-chain/bnbagent-studio/blob/v0.0.16/packages/studio-cli/skills/references/bnbagent-studio-using-altana-wallet.md)
before granting or re-arming a session.

Diagnose policy issues:

```bash
bag wallet policy show
```

## MCP seller operations and read tools

The agent's MCP face exposes bounded `negotiate` and `notify_funded` operations.
They can sign and submit transactions through fixed code, so the whole face is
not read-only. Run it with `bag dev` after selecting MCP at initialization;
Studio CLI 0.0.16 has no separate `bag mcp serve` command.

The 15 functions in `@bnbagent/studio-runtime/tools` provide reads:

- Wallet address and balances (no transfer)
- Network, block, and transaction queries
- ERC-8004 and ERC-8183 job reads
- Pieverse usage visibility

`pieverseUsage` authenticates through a domain-locked SIWE message, without an
on-chain transaction. The generated LLM tool set exposes no general signing tool.

## Budget and auto-topup

`bag budget enable` opts into **wallet-funded** LLM credit renewal via x402 — it lets the Agent
auto-pay $U from your wallet when credits run low. It is **off by default**: a non-interactive
`bag init` records no `[budget]` section, so wallet-funded renewal stays off until you enable it
explicitly. Run `bag budget show` to inspect the recorded consent and caps. This is separate
from the model-credit renewal hook (`[llm.auto_renew]`, on by default), which
allocates existing Pieverse Account Balance unless wallet-funded top-ups have
been explicitly enabled through the budget policy. Wallet-funded top-ups require:

- Funded BSC **mainnet** U balance for auto-renew flows (Pieverse settles on mainnet only —
  testnet U cannot pay for LLM credits)
- Runtime credentials for a wallet that supports the Pieverse payment path; Altana cannot authenticate Pieverse SIWE

Disable wallet-funded renewal with `bag budget disable`. Altana agents should use
OpenRouter, OpenAI, or Anthropic instead of Pieverse.

## Audit log

On-chain actions are recorded in a local audit log (`bag audit ls`). Sensitive values (passwords, private keys) are never logged.

## AWS deploy responsibility

Deploying provisions resources in **your** AWS account. Published IAM reference policies are provided AS IS — you remain responsible for scoping, costs, and security. See [DISCLAIMER.md](https://github.com/bnb-chain/bnbagent-studio/blob/main/DISCLAIMER.md).

## Recommendations

- Start on **BSC testnet** until you understand the signing and deploy flow
- Run `bag doctor` before every deploy
- Use `--secrets-mode secretsmanager` (default) on any network with real funds
- Keep `.studio/`, secrets, and wallet files outside the packaged `app/agent/` code
- Review `[wallet.signing]` before extending beyond default EIP-3009 allowlist

[← BNB Agent Studio overview](index.md)
