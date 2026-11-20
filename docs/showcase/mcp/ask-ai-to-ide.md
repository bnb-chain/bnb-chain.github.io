---
title: Integrate BNBChain Ask AI into your IDE
---

# Quick‑Start Tutorial

Follow these steps to wire any IDE that supports the **Model Context Protocol (MCP)** to BNB Chain’s Ask AI knowledge base **and start querying documentation right away**.

> **Time required:** ≈ 2 minutes
> **Prerequisites:**
> • IDE with an MCP client (e.g. VS Code MCP extension, Cursor ≥ 0.23.0, JetBrains plugin)

---

## 1 Add the Ask AI MCP server

1. Open your IDE’s **Settings / Preferences** and find the **MCP** section.
2. Choose **Add MCP server** (wording may vary).
3. Paste the JSON block below and save.

```jsonc
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

A **Connected** status should now appear next to *bnbchain‑askai‑mcp*.

---

## 2 What the MCP can do

The Ask AI MCP lets you **query** BNB Chain’s public documentation corpus in natural language and receive the most relevant passages, with source links, inside your editor.
It is *read‑only* – no blockchain transactions are executed.

---

## 3 Run queries inside your IDE

Below are three common ways to interact with the Ask AI MCP once it is connected.

### 3.1 Chat Panels (Copilot, Cursor Chat, etc.)

1. Open your IDE’s AI/Chat pane (Copilot Chat, Cursor side‑chat, JetBrains AI Assistant…).
2. Locate the **agent / provider selector** at the top of the chat window.
3. Choose **bnbchain‑askai‑mcp**.
4. Ask questions in plain English – e.g. *“Summarise BEP‑20.”*

> **Want a detailed step-by-step walkthrough for VS Code?** Check out the companion guide: [Ask AI in VS Code](ask-ai-vs-code-guide.md) – complete with annotated screenshots.

### 3.2 Command Palette / Command Menu

| IDE           | How to open                                                 | Steps                                                                          |
| ------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **VS Code**   | <kbd>Ctrl/Cmd + Shift + P</kbd>                             | Type **“MCP: Run Query”** → pick **bnbchain‑askai‑mcp** → enter your question. |
| **Cursor**    | <kbd>Cmd + K</kbd> (mac) or <kbd>Ctrl + K</kbd> (win/linux) | Select **Ask MCP…** → choose **bnbchain‑askai‑mcp** → ask away.                |
| **JetBrains** | <kbd>Shift + Shift</kbd> then “MCP Query”                   | Pick **bnbchain‑askai‑mcp** and type a question.                               |

### 3.3 Terminal / cURL (optional)

For quick tests outside the IDE you can hit the endpoint directly:

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"What is BEP‑20?"}' \
  https://mcp.inkeep.com/bnbchainorg/mcp
```

You’ll receive a JSON response containing an `answer` field and `sources` array.

---

## 4 Example queries

```text
What is the gas limit on BSC blocks?

Summarise BEP‑336 in two sentences.

List all fee tiers supported by opBNB.

Explain the purpose of Greenfield buckets.
```

---

## 5 Troubleshooting

| Symptom                    | Fix                                                              |
| -------------------------- | ---------------------------------------------------------------- |
| **400/401 response codes** | Verify the JSON snippet (no trailing commas).                    |
| **Long latency (> 10 s)**  | Disable any *Throttle Streaming* or similar setting in your IDE. |
| **No answer returned**     | Make sure you chose **bnbchain‑askai‑mcp** and asked a question. |

Need more help? Ping us in **#ai‑tooling** on the BNB Chain Discord.

Open an issue in the [docs repo](https://github.com/bnb-chain/docs-site/issues) if your favourite editor is missing.
