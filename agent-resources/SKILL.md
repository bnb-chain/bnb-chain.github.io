---
name: bnb-chain-docs
description: Find BNB Chain documentation, configure BSC and opBNB development networks, and choose Greenfield SDK, MCP, and agent tooling guides.
metadata:
  author: BNB Chain
  version: "1.0"
---

# BNB Chain documentation

Use this skill when answering questions about BNB Smart Chain (BSC), opBNB,
BNB Greenfield, or BNB Chain developer and agent tooling.

## Discover documentation

1. Fetch [llms.txt](https://docs.bnbchain.org/llms.txt) and choose pages relevant to the request.
2. Fetch the linked Markdown pages. Prefer individual pages over the complete
   [llms-full.txt](https://docs.bnbchain.org/llms-full.txt) snapshot for focused tasks.
3. Cite the relevant documentation page in your answer. Read network configuration,
   endpoint, and contract-address references before using their values.

## Choose the network and guide

- **BSC:** EVM smart contracts, JSON-RPC, wallets, staking, validators, and governance.
  Start with the [BSC quick guide](https://docs.bnbchain.org/bnb-smart-chain/developers/quick-guide/).
- **opBNB:** OP Stack Layer 2 development and bridging from BSC.
  Start with the [opBNB quick guide](https://docs.bnbchain.org/bnb-opbnb/developers/quick-guide/).
- **Greenfield:** Object storage, access control, and cross-chain programmability.
  Start with the [Greenfield quick guide](https://docs.bnbchain.org/bnb-greenfield/for-developers/get-started-dev/).
- **Developer Kit:** Official SDKs and AI agent tooling.
  Use the [Developer Kit](https://docs.bnbchain.org/developer-kit/) to choose an SDK or integration.

Before preparing a runnable example, identify the chain, mainnet or testnet,
programming language, wallet address if needed, and intended operation. Use the
matching network reference and faucet guide. Testnet tokens have no monetary value.

## Connect documentation search through MCP

The public Ask AI MCP searches documentation and returns source passages. It is
read-only and needs no wallet key. Discover its HTTP endpoint at
[.well-known/mcp.json](https://docs.bnbchain.org/.well-known/mcp.json), or follow the
[Ask AI setup guide](https://docs.bnbchain.org/developer-kit/ask-ai/).

Example MCP client configuration:

```json
{
  "mcpServers": {
    "bnbchain-askai": {
      "url": "https://api.superintern.ai/agent/async/mcp/mcp"
    }
  }
}
```

For blockchain tools, the separate [BNB Chain MCP](https://github.com/bnb-chain/bnbchain-mcp)
runs locally with `npx -y @bnb-chain/mcp@latest`. It includes tools that can change
on-chain state. Read its setup instructions before connecting it. Do not request
private keys in chat; configure signing credentials in the local server environment
only when the requested workflow requires them. Review the network and transaction
preview with the user before submitting a transaction.

## Install the broader official skills

For executable workflows covering BNB Chain development and operations, consult
[the official skills repository](https://github.com/bnb-chain/bnbchain-skills) and
the [skills guide](https://docs.bnbchain.org/developer-kit/mcp/skills/).

```bash
npx skills add bnb-chain/bnbchain-skills
```
