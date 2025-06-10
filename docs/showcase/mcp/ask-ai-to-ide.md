---
title: Integrate BNBChain Ask AI into your IDE
---

# Quick‑Start Tutorial

Follow these steps to wire any IDE that supports the **Model Context Protocol (MCP)** to BNB Chain’s Ask AI knowledge base.

> **Time required:** ≈ 2 minutes
> **Prerequisites:**
> • IDE with MCP client (e.g. Cursor ≥ 0.23.0, VS Code extension, JetBrains plugin)
> • Optional: GitHub sign‑in for IDE cloud sync

## 1 Add the Ask AI MCP server

1. Open your IDE’s **Settings / Preferences** and locate the **MCP** section.
2. Choose **Add MCP server** (wording may vary).
3. Paste the JSON block below and save.

```json
{
  "mcpServers": {
    "bnbchain-askai-mcp": {
      "url": "https://mcp.inkeep.com/bnbchainorg/mcp",
      "id": "cm9qsf01p00bss6016ry68oil"
    }
  }
}
```

4. Reload the IDE window if the MCP client does not restart automatically.

A “connected” status should now appear next to **bnbchain‑askai‑mcp**.

---

## 2 What the MCP can do

The Ask AI MCP lets you **query** BNB Chain’s public documentation corpus in natural language and receive the most relevant passages immediately inside your editor.

* Coverage includes docs, blogs, BEPs, FAQs and more.
* Each answer is backed by source links so you can jump straight to the original material.
* No blockchain transactions are executed; this endpoint is *read‑only*.

---

## 3 Example queries

```text
What is the gas limit on BSC blocks?

Summarise BEP‑336 in two sentences.

List all fee tiers supported by opBNB.

Explain the purpose of Greenfield buckets.
```

---

## 4 Troubleshooting

| Symptom                    | Fix                                                                  |
| -------------------------- | -------------------------------------------------------------------- |
| **“Cannot reach server”**  | Check proxy/VPN; whitelist `https://mcp.inkeep.com`.                 |
| **400/401 response codes** | Verify the JSON snippet (no trailing commas).                        |
| **Long latency (> 10 s)**  | Disable any “Throttle Streaming” or similar setting in your IDE.     |
| **No answer returned**     | Ensure your query is a question; the MCP only supports text queries. |

Need more help? Ping us in **#ai‑tooling** on the BNB Chain Discord.

---

## 5 IDE‑specific guides

| IDE           | Status       | Guide (coming soon)               |
| ------------- | ------------ | --------------------------------- |
| Cursor        | Ready        | `ai/askai-cursor.md`              |
| VS Code       | Early access | `ai/askai-vscode.md`              |
| JetBrains     | Planned      | `ai/askai-jetbrains.md` (Q3 2025) |
| Other editors | MCP generic  | Use the JSON snippet above        |

Open an issue in the [docs repo](https://github.com/bnb-chain/docs-site/issues) if your favourite editor is missing.
