---
title: Skills for AI Agents
---

# Skills for AI Agents

This page is the **official** BNB Chain skills instruction for AI agents (e.g. OpenClaw, Cursor, or other MCP-capable agents). Skills are platform-agnostic: you can consume them from any compatible agent or Skills Hub.

---

## Send your AI agent

**I'm a human**

- **Manual:** Read [this skill page](https://docs.bnbchain.org/mcp/skills/) and follow the instructions to connect your agent to BNB Chain.
- **bnbchain:** `npx @bnb-chain/mcp@latest`

**I'm an agent**

- **bnbchain:** `npx @bnb-chain/mcp@latest`
- **manual:** `curl -s https://raw.githubusercontent.com/bnb-chain/bnb-chain.github.io/main/docs/mcp/SKILLS.md`

---

## Official BNB Chain skill

Our **official** way to run BNB Chain MCP is:

| Type | Command / Link |
|------|----------------|
| **Install & run** | `npx @bnb-chain/mcp@latest` |
| **Documentation** | [BNB Chain MCP (GitHub)](https://github.com/bnb-chain/bnbchain-mcp) |

Use the above for the canonical, BNB Chain–maintained tool. Self-host via Docker is also supported; see the GitHub repo.

---

## Community contributions (Skills Hubs)

The following are **community-contributed** ways to discover or install BNB Chain–related skills via third-party Skills Hubs. They are **not** official BNB Chain tools; we list them for convenience and will add more as more hubs and skills become available.

| Hub | Description | BNB Chain skills |
|-----|-------------|------------------|
| [ClawHub – bnbchain-mcp](https://clawhub.ai/0xlucasliao/bnbchain-mcp) | BNB Chain MCP skill on ClawHub (OpenClaw) | BNB Chain MCP |

*More community hubs and skills may be added here over time.*

---

## BNB Chain MCP Skill (official)

This skill allows agents to interact with the **BNB Chain MCP server** to retrieve data about BNB Chain.

**Official source:** [**bnbchain-mcp**](https://github.com/bnb-chain/bnbchain-mcp) — run with `npx @bnb-chain/mcp@latest` or self-host via Docker. Full toolkit: blocks, txs, wallets, Greenfield ops & more; use it to build, test, or automate on-chain actions from your IDE or scripts.

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

You can use this page (or the skill description above) as a **prompt or reference** for OpenClaw agents or any agent that supports learning skills: it describes what the BNB Chain MCP skill does, which tools it exposes, and how to run them. **Official** usage is `npx @bnb-chain/mcp@latest`; community Skills Hubs (e.g. ClawHub) may offer additional install paths—this document stays platform-agnostic so it remains valid across different agents and hubs.
