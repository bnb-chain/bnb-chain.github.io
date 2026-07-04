---
title: BNB Agent SDK Examples
---

Runnable scripts in the [bnbagent-sdk](https://github.com/bnb-chain/bnbagent-sdk) repository.

| Example | Role | Description |
|---------|------|-------------|
| [examples/client/](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/client/) | Client | Five stand-alone scripts for the canonical ERC-8183 flows: happy / dispute-reject / stalemate-expire / never-submit / cancel-open. |
| [examples/voter/](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/voter/) | Voter | `voteReject` script + `Disputed` event watcher for whitelisted voters. |
| [examples/agent-server/](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/agent-server/) | Provider | FastAPI agent that searches blockchain news via DuckDuckGo. Demonstrates `create_erc8183_app()`, the funded-job poll loop, and ERC-8004 registration. |

[← BNB Agent SDK overview](index.md)
