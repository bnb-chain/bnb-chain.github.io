---
title: BNB Agent Studio Troubleshooting
---

# Troubleshooting

Start every diagnosis with `bag doctor`. It checks the single runtime's config,
wallet, network, dependencies, and readiness conditions.

```bash
bag doctor
```

## Common issues

### `bag doctor` reports network drift

`[network].default` in `app/agent/studio.toml` must match the network your wallet and
deploy target expect.

```bash
bag config set network.default bsc-testnet --project-root app/agent
```

### Wallet address or Altana session mismatch

`[wallet].address` must match the selected wallet and, for Altana, its session's
admin address. There is no Service `[provider].address` to synchronize.

```bash
bag wallet show
bag doctor
```

For Altana, also run `bag wallet session status`. Paid B402 seller payout is
supported; ensure the merchant credentials were registered for the configured
`pay_to` or default wallet address. Outbound Altana buying requires separate
session setup. Altana cannot use Pieverse SIWE; select OpenRouter, OpenAI, or
Anthropic instead. See [Configuration](configuration.md).

### Generated code will not build

The generated project is a pnpm workspace. Make sure Corepack and pnpm 10 are active,
then reinstall from the workspace root before re-running `bag dev`.

### AgentCore runtime name invalid

Runtime names must match `^[A-Za-z][A-Za-z0-9]{0,22}$`. No hyphens, underscores, or
dots. Use a valid project name such as `weatheragent` at `bag init`; Studio renders
the deployment descriptor itself.

### Wrong Node version

```bash
node --version    # must be >= 22
```

The AWS CLI is **not** required to deploy — it is used only by the fail-open, read-only
AgentCore quota check in `bag deploy prepare`.

### Funded jobs are not being picked up

1. Confirm the runtime is up: `bag dev`, or `bag deploy status --provider <target>`
2. Verify `[payments.erc8183]` and `[payments.seller]` in `app/agent/studio.toml`
3. Confirm the buyer sent `notify_funded`; the runtime verifies the funded job before work
4. Remember `settle` is manual — `bag erc8183 settle <jobId>`

### `PolicyViolation` / `X402PolicyError` at runtime

The wallet refused an EIP-712 signature. Check:

```bash
bag wallet policy show
```

Review `[wallet.signing]` and the outbound `[payments.x402]` host and recipient
trust in `app/agent/studio.toml`. Use `bag x402 trust <merchant-url>` to inspect and
pin the intended merchant. Wallet capabilities differ; expanding an allowlist does
not make an unsupported signing method available. See [Security](security.md).

### MCP tools return errors

- Select MCP at initialization and run the seller with `bag dev`
- Use workspace root or `app/agent/` as the working directory
- Check wallet-specific runtime credentials and `bag doctor`
- For MCP-only, connect to `http://localhost:8000/mcp`; A2A+MCP uses the dual entrypoint on port `9000`
- Azure deployment rejects MCP entrypoints; there is no `bag mcp tools` command in 0.0.16

### Pieverse / LLM errors

```bash
bag llm status --full
bag llm test
bag llm activate          # re-activate if key missing
```

For non-Pieverse providers, enter the API key privately in workspace
`.studio/.env.local`. Studio loads this file automatically; do not paste secrets
into chat or command-line arguments. Check presence without exposing the value:

```bash
bag env get OPENROUTER_API_KEY --project-root app/agent
```

### Deploy blocked on IAM notice

The first deployment can require explicit provider-risk acceptance:

```bash
bag deploy --provider aws --accept-risk
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
