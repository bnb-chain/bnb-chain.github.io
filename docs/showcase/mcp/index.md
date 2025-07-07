---
title: MCP - Model Context Protocol
---

# Model Context Protocol (MCP)

The **Model Context Protocol** is an open interface that lets AI agents and developer tools share a rich execution context. In practice, that means you can:

* Ask natural‑language questions about on‑chain data or documentation.
* Invoke blockchain‑aware tools (read‑only or state‑changing) without manual RPC calls.
* Plug the same back‑end into multiple IDEs, CLIs or chat front‑ends.

> **Why use it?**
> *Unified access* – instantly switch between chat, code, and terminal workflows.
> *Extensibility* – add your own prompts & tools.
> *Open source* – fork, self‑host, or just `npx` it.

---

## 1 Available MCP servers

| Name                                                          | Endpoint / Install                                      | Scope                                                             | Typical usage                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| [**bnbchain‑mcp**](https://github.com/bnb-chain/bnbchain-mcp) | `npx @bnb-chain/mcp@latest`<br/>or self-host via Docker | Full toolkit: blocks, txs, wallets, Greenfield ops & more         | Build, test, or automate on-chain actions from your IDE or scripts. |
| [**ask‑ai‑mcp**](./docs/showcase/mcp/ask-ai-to-ide.md)                        | `https://mcp.inkeep.com/bnbchainorg/mcp`                | Read-only semantic search over BNB Chain docs, BEPs, blogs & FAQs | Quick answers in chat panes or command palettes.                    |

Both servers speak the *same* MCP schema, so you can swap them in your settings with a single JSON change.

---

## 2 What can MCP do?

### Conversational queries

```text
What is BEP‑20 and how does it differ from ERC‑20?
```

Answer arrives instantly with source links.

### Tool execution (bnbchain‑mcp only)

```text
get_block_by_number number=37000000 chain=bsc
```

Returns structured JSON for the requested block. Supply a `PRIVATE_KEY` to unlock write‑capable tools such as `transfer_erc20` or `write_contract`.

### IDE‑agnostic integration

* VS Code, Cursor, JetBrains: add a **servers.mcp** entry in settings → choose the agent in your chat panel.
* Terminal lovers: `curl` or your favourite HTTP client.
* Custom apps: import `@bnb-chain/mcp` as a library.

---

## 3 Quick links & next steps

* **GitHub – bnbchain‑mcp** – source, issues, self‑hosting guide: [https://github.com/bnb-chain/bnbchain-mcp](https://github.com/bnb-chain/bnbchain-mcp)
* **Ask AI Tutorial** – connect your IDE to the read‑only doc search endpoint: `ai/askai-tutorial.md`
* **AI Agent solution page** – see how MCP fits into BNB Chain’s broader AI strategy: [https://www.bnbchain.org/en/solutions/ai-agent](https://www.bnbchain.org/en/solutions/ai-agent)

Have questions? Join **#ai‑tooling** on Discord or open a GitHub issue. PRs welcome!
