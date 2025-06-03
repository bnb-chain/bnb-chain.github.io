---
title: Inkeep AI × Cursor Tutorial
---

# Integrating Inkeep AI with Cursor

**Inkeep AI** is a conversational knowledge‑base assistant that sits on top of Model Context Protocol (MCP). By wiring Inkeep’s hosted MCP server into your IDE, you can

* query BNB Smart Chain (BSC), opBNB, Greenfield & other EVM networks in plain English;
* access a curated knowledge base for BNB Chain docs, blogs, BEPs, and FAQs;
* run blockchain‑aware tools (block lookup, gas estimate, NFT transfers, Greenfield buckets…)
  – all without leaving your editor.

This guide shows how to connect Cursor to the **`bnbchain-aibot-mcp`** server in under two minutes.

> Looking for the self‑hosted MCP instead? See **AI › MCP**.

---

## 1  Prerequisites

| Item            | Version                            |
| --------------- | ---------------------------------- |
| Cursor IDE      | ≥ 0.23.0 (Feb 2025)                |
| Internet access | to `https://mcp.inkeep.com`        |
| Optional        | GitHub login for Cursor cloud sync |

---

## 2  Add the Inkeep MCP server

1. **Open Settings** – click the <kbd>⚙︎</kbd> icon in the top‑right corner of Cursor.
2. Select **“MCP”** from the left sidebar.
3. Click **➕ Add global MCP server**.
4. Paste the JSON below and press **Save**.

```json
{
  "mcpServers": {
    "bnbchain-aibot-mcp": {
      "url": "https://mcp.inkeep.com/bnbchainorg/mcp",
      "id": "cm9qsf01p00bss6016ry68oil"
    }
  }
}
```

5. Cursor automatically restarts the MCP client. If not, simply reload the window.

You should now see **“bnbchain-aibot-mcp”** listed as *Connected*.

---

## 3  First‑time checklist

| ✅ | Step                                                         |
| - | ------------------------------------------------------------ |
| ☐ | “Connected” badge appears under Settings → MCP               |
| ☐ | *Run* a chat command: ‑→ *“Explain the EVM concept of gas.”* |
| ☐ | Receive an answer within \~3 s                               |
| ☐ | Try a tool: ‑→ *“get\_latest\_block on BSC”*                 |

If any box stays unticked, jump to **Troubleshooting** below.

---

## 4  Example prompts

```text
Analyze address 0x28C6c06298d514Db089934071355E5743bf21d60

Compare gas costs between BSC and opBNB for ERC‑20 transfers

Upload file report.pdf to my Greenfield bucket "team‑docs"
```

Use slash‑syntax for direct tool calls:

```text
/get_native_balance address=0x… chain=bsc
```

---

## 5  Troubleshooting

| Symptom                   | Fix                                                                        |
| ------------------------- | -------------------------------------------------------------------------- |
| **“Cannot reach server”** | Check corporate proxy/VPN; ensure `https://mcp.inkeep.com` is whitelisted. |
| **400 or 401 errors**     | Verify the JSON snippet; do not add a trailing comma.                      |
| **Long latency (>10 s)**  | Open Settings → Developer → “Throttle Streaming” off.                      |
| **Tool not recognised**   | Make sure your prompt starts with the exact tool name (case‑sensitive).    |

Still stuck? Ask in the **#ai-tooling** channel on BNB Chain Discord.

---

## 6  Using Inkeep AI in other IDEs

| IDE                | Status            | Docs                                           |
| ------------------ | ----------------- | ---------------------------------------------- |
| **VS Code**        | Early access      | `ai/inkeep-vscode.md` *(coming soon)*          |
| **JetBrains**      | Planned           | `ai/inkeep-jetbrains.md` *(Q3 2025)*           |
| **Claude Desktop** | Supported via MCP | Same JSON snippet – see **AI & Tooling › MCP** |

Want another editor? Open an issue in the [docs repo](https://github.com/bnb-chain/docs-site/issues).
