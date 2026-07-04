---
title: BNB Agent Studio Deployment
---

# Deployment

A v1 seller deploys as **two artifacts** — Layer A (Agent) to AWS Bedrock AgentCore, Layer B (Service) to EC2/Fargate. Use the bundled IDE skills (`bnbagent-studio-use-aws-agentcore`, `bnbagent-studio-deploying-service-to-ec2`) for guided deploys, or run the commands below directly.

On-chain deployments: [apex-contracts#deployments](https://github.com/bnb-chain/apex-contracts#deployments).

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| AgentCore CLI | `npm i -g @aws/agentcore` (Node ≥ 20) |
| AWS account | You provision resources in your own account under IAM policies you review |
| `agentcore configure` | One-time setup — writes `agentcore/agentcore.json` |
| IAM policies | Reference configs: [least-privilege guide](https://github.com/bnb-chain/bnbagent-studio/blob/main/docs/guides/least-privilege-iam.md), [policy JSON](https://github.com/bnb-chain/bnbagent-studio/blob/main/docs/guides/iam-policies.md) |

> Deploying provisions AWS resources in your account. Review [DISCLAIMER.md](https://github.com/bnb-chain/bnbagent-studio/blob/main/DISCLAIMER.md) before first deploy.

## Deploy flow

```bash
bag deploy prepare                       # readiness sweep (BLOCKED/CRITICAL/WARNING)
bag deploy agent                         # Layer A → AgentCore
bag deploy package                       # Layer B zip → dist/<name>-service-<sha>.zip
# upload + systemd on EC2 (see deploying-service-to-ec2 skill)
bag deploy verify --endpoint <public-url>   # probe layers + register ERC-8004 endpoint
bag deploy status                        # dashboard: liveness, inventory, cost estimate
```

## Layer A — Agent (AgentCore)

```bash
bag deploy agent
```

- Thin-wraps `agentcore deploy` (run `agentcore configure` first)
- Default `--secrets-mode secretsmanager` pushes keystore to AWS Secrets Manager as `WALLET_KEYSTORE_JSON` — **never** in the CodeZip
- Testnet-only `--secrets-mode envvars` inlines secrets in `agentcore.json` — refused on mainnet
- First deploy gates on explicit IAM risk acceptance (interactive or `--accept-risk`)
- Records `runtime_arn` in `app/service/studio.toml` `[agent]` section

**Multi-environment:** pass agentcore's `--target` through: `bag deploy agent -- --target prod`. Studio records one target per workspace — deploying multiple targets overwrites recorded state.

**Redeploy:** every `bag deploy agent` re-runs `agentcore deploy` (CDK). First run is slow (~4–6 min); subsequent runs use cache.

### Keystore posture

The encrypted keystore lives at workspace root `.studio/wallets/`, **outside** `app/agent/` (the AgentCore codeLocation). No packaging path — including a raw `agentcore deploy` — can bundle it. At deploy, it is injected via Secrets Manager.

## Layer B — Service (EC2)

```bash
bag deploy package
```

Produces a zip rooted at `app/service/` (so `service.py` is at zip top level) plus a `.sha256` sidecar. Excludes:

- `.venv/`, `__pycache__/`, `.git/`, `.studio/`, `dist/`
- **All `.env*`** — the keyless host must not receive Agent secrets

Hand the zip to the EC2 deploy skill. The Service reads the Agent runtime ARN from `app/service/studio.toml` `[agent].runtime_arn` and calls `InvokeAgentRuntime` for every signing operation.

**Fast redeploy:** Layer B supports code-only updates — `scp` + `systemctl restart` without full reprovision.

## Readiness checks

`bag deploy prepare` runs checks including:

- `studio.toml` parseable on both layers
- AgentCore runtime name valid
- Flat imports (no package-relative imports in emitted code)
- Network and provider address sync between layers
- Legacy keystore inside `app/agent/` (warn only)

Opt-in cross-layer check:

```bash
bag deploy prepare --include-service-preflight
```

Simulates Layer B EC2 provisioning IAM actions via `iam:SimulatePrincipalPolicy` — surfaces permission issues before Agent deploy completes.

## Post-deploy verification

```bash
bag deploy verify --endpoint https://my-service.example.com
```

- Probes Layer A liveness via AgentCore
- Probes Layer B `/apex/health`
- Registers the Service public URL as the ERC-8004 endpoint

## Operations

```bash
bag deploy status              # liveness + resource inventory + cost estimate
bag deploy status --no-probe   # skip HTTP probes
bag deploy logs --layer agent  # CloudWatch tail
bag deploy logs --layer service  # SSH + journalctl
bag deploy destroy             # dry-run teardown plan; --execute for Layer A only
```

`bag deploy destroy` prints Layer B teardown as `aws` CLI commands but **never** executes them — you run those manually.

## ERC-8004 registration

After deploy, buyers discover your agent via ERC-8004. `bag deploy verify` registers the endpoint, or run manually:

```bash
bag erc8004 register --endpoint https://my-service.example.com/apex/
bag erc8004 show
```

## Local mirror

`bag dev` is the local mirror of the two-artifact deploy:

| Local | Deployed |
|-------|----------|
| Agent `:8080` | AgentCore runtime |
| Service `:8003` | EC2 `/apex/*` |
| `STORAGE_LOCAL_PATH` | S3 / IPFS |

[← BNB Agent Studio overview](index.md)
