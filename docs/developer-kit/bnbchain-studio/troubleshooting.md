---
title: BNB Agent Studio Troubleshooting
---

# Troubleshooting

Start every diagnosis with `bag doctor`. It checks both layers, config sync, import style, runtime name validity, and environment prerequisites.

```bash
bag doctor
```

## Common issues

### `bag doctor` reports network drift

`[network].default` must agree between `app/agent/studio.toml` and `app/service/studio.toml`.

```bash
bag config set network.default bsc-testnet --project-root app/agent
# mirrors to service automatically
```

### Provider address mismatch

`[wallet].address` (agent) and `[provider].address` (service) must match.

```bash
bag wallet show
bag doctor   # re-check sync
```

### Package-relative imports

AgentCore runs `main.py` as a top-level module. Use flat imports:

```python
from signing import quote    # correct
from .signing import quote   # wrong
```

`bag doctor` warns on remaining package-relative imports.

### AgentCore runtime name invalid

Runtime names must match `^[A-Za-z][A-Za-z0-9]{0,22}$`. No hyphens, underscores, or dots. Re-run `agentcore configure` with a valid name if `bag doctor` fails.

### `agentcore` not found or wrong binary

```bash
which -a agentcore
node --version    # must be ≥ 20
npm install -g @aws/agentcore
```

Ensure the npm CLI wins on PATH over any Python shim.

### Service not picking up funded jobs

1. Confirm both layers are running: `bag dev` or deployed equivalents
2. Check `app/service/studio.toml` `[agent].runtime_arn` is set after Layer A deploy
3. Verify `[payments.erc8183].poll_interval_seconds` and `auto_settle`
4. Probe health: `curl <service-url>/apex/health`

### `PolicyViolation` / `X402PolicyError` at runtime

The wallet refused an EIP-712 signature. Check:

```bash
bag wallet policy show
```

Extend `[wallet.signing]` and `[payments.x402].allowed_hosts` in `app/agent/studio.toml` if integrating a new service. See [Security](security.md).

### MCP tools return errors

- Set `WALLET_PASSWORD` in the MCP server environment
- Set CWD to workspace root or `app/agent/`
- Reload IDE after MCP config changes
- Run `bag mcp tools` to verify the server starts

### Pieverse / LLM errors

```bash
bag llm status --full
bag llm test
bag llm activate          # re-activate if key missing
```

For non-Pieverse providers, set the API key in `app/agent/.env.local`:

```bash
bag env set OPENROUTER_API_KEY sk-or-... --project-root app/agent
```

### Deploy blocked on IAM notice

First `bag deploy agent` requires explicit risk acceptance:

```bash
bag deploy agent --accept-risk
```

Or accept interactively when prompted.

### Keystore inside `app/agent/` (legacy)

Readiness check `C4` warns if the keystore is still inside `app/agent/`. Move it to workspace root `.studio/wallets/` and update paths.

## Getting help

- Run `bag doctor` and share the output
- Check the [GitHub issues](https://github.com/bnb-chain/bnbagent-studio/issues)
- Full operator guide: [GitHub — user-guide.md](https://github.com/bnb-chain/bnbagent-studio/blob/main/docs/guides/user-guide.md)

## Related

- [BNB Agent SDK troubleshooting](../bnbagent-sdk/troubleshooting.md) — protocol-level errors
- [Security](security.md) — signing policy and keystore posture

[← BNB Agent Studio overview](index.md)
