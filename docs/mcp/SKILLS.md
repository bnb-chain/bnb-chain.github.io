---
title: Skills for AI Agents
---

# Skills for AI Agents

This page describes **skills** that AI agents (e.g. OpenClaw, Cursor, or other MCP-capable agents) can use to interact with BNB Chain. Skills are platform-agnostic: you can consume them from any compatible agent or Skills Hub.

---

## Skills Hubs

Skills may be published and discovered through one or more **Skills Hubs**. You can install or reference BNB Chain skills from these hubs (more may be added over time):

| Hub | Description | BNB Chain skills |
|-----|-------------|------------------|
| [ClawHub – bnbchain-mcp](https://clawhub.ai/0xlucasliao/bnbchain-mcp) | Official BNB Chain MCP skill on ClawHub | BNB Chain MCP |

---

## BNB Chain MCP Skill

This skill allows agents to interact with the **BNB Chain MCP server** to retrieve data about BNB Chain.

**Source:** [**bnbchain-mcp**](https://github.com/bnb-chain/bnbchain-mcp) — run with `npx @bnb-chain/mcp@latest` or self-host via Docker. Full toolkit: blocks, txs, wallets, Greenfield ops & more; use it to build, test, or automate on-chain actions from your IDE or scripts.

### How to use

The BNB Chain MCP server runs locally. You interact with it using the `mcp-client` script bundled with the skill (when installed from a Skills Hub), or via your agent’s MCP integration.

**Commands (when using the bundled client script):**

```bash
python3 skills/bnbchain-mcp/scripts/mcp-client.py <tool_name> [arguments]
```

List available tools:

```bash
python3 skills/bnbchain-mcp/scripts/mcp-client.py list_tools
```

### Available tools

Currently supported tools in **bnbchain-mcp**:

| Tool | Description | Example args |
|------|-------------|--------------|
| `get_token_price` | Get token price in USD | `{"symbol": "BNB"}` |
| `get_defi_rates` | Get lending/borrowing rates for a protocol | `{"protocol": "venus"}` |
| `search_documentation` | Search official BNB Chain docs | `{"query": "validators"}` |
| `get_recent_git_diffs` | Get recent git diffs for a repo | `{"repo_name": "bnb-chain/bsc"}` |
| `get_smart_contract_source` | Get source code for a contract | `{"contract_address": "0x..."}` |

### Setup

The MCP server must be running for this skill to work.

If the server is not running, start it (this is usually handled by the MCP or agent infrastructure): `uv run bnbchain-mcp` (requires `uv` and the `bnbchain-mcp` package).

### Examples

Get the price of BNB:

```bash
python3 skills/bnbchain-mcp/scripts/mcp-client.py get_token_price --args '{"symbol": "BNB"}'
```

Search documentation:

```bash
python3 skills/bnbchain-mcp/scripts/mcp-client.py search_documentation --args '{"query": "staking"}'
```

---

## Using this page as a prompt

You can use this page (or the skill description above) as a **prompt or reference** for OpenClaw agents or any agent that supports learning skills: it describes what the BNB Chain MCP skill does, which tools it exposes, and how to run them. Skills Hubs (such as ClawHub) may provide installable packages and platform-specific instructions; this document stays platform-agnostic so it remains valid across different agents and hubs.
