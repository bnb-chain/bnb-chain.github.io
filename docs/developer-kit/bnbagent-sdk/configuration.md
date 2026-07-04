---
title: BNB Agent SDK Configuration
---

## Configuration Reference

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PRIVATE_KEY` | Recommended | Auto-generate | Agent wallet private key. If provided, encrypted to `~/.bnbagent/wallets/` on first run, then removable. |
| `WALLET_PASSWORD` | Yes | — | Password to encrypt / decrypt the keystore. |
| `WALLET_ADDRESS` | No | Auto-select | Select a specific keystore when multiple exist. |
| `NETWORK` | No | `bsc-testnet` | Network name. |
| `RPC_URL` | No | Network default | Custom RPC endpoint. |
| `ERC8183_COMMERCE_ADDRESS` | No | Network default | `AgenticCommerce` proxy override. |
| `ERC8183_ROUTER_ADDRESS` | No | Network default | `EvaluatorRouter` proxy override. |
| `ERC8183_POLICY_ADDRESS` | No | Network default | Policy contract override (defaults to `OptimisticPolicy`). |
| `ERC8183_AGENT_URL` | If LocalStorageProvider | — | Agent's public base URL including `/erc8183`. Required when storage returns `file://` URLs; the SDK rewrites them to `{ERC8183_AGENT_URL}/job/{id}/response`. |
| `ERC8183_SERVICE_PRICE` | No | `1000000000000000000` (1 unit) | Minimum acceptable budget, in raw units. |
| `ERC8183_FUNDED_POLL_INTERVAL` | No | `30` | Seconds between funded-job poll passes (agent-server). |
| `ERC8183_NEGOTIATE_RATE_LIMIT` | No | `120` | Max `/negotiate` requests per window per client IP. |
| `ERC8183_NEGOTIATE_RATE_WINDOW` | No | `60` | Sliding-window length for `/negotiate` rate limit, in seconds. |
| `ERC8183_MAX_RESPONSE_BYTES` | No | `5242880` (5 MB) | Cap on `response_content` size in `submit_result`. |
| `ERC8183_MAX_METADATA_BYTES` | No | `262144` (256 KB) | Cap on serialised metadata size in `submit_result`. |
| `ERC8004_REGISTRY_ADDRESS` | No | Network default | ERC-8004 Identity Registry override. |
| `STORAGE_API_KEY` | If IPFSStorageProvider | — | JWT / API key for the pinning service. |
| `STORAGE_GATEWAY_URL` | No | Pinata default | Custom IPFS gateway. |
| `STORAGE_LOCAL_PATH` | No | `.agent-data` | Directory for local storage. |

Commerce settlement assets are resolved at runtime from the deployed kernel — not configured via env vars in these docs. See [Networks & contracts](networks.md) for where deployments are maintained upstream.

See [.env.example](https://github.com/bnb-chain/bnbagent-sdk/blob/main/.env.example) in the repository for the full surface with inline comments.

[← BNB Agent SDK overview](index.md)

---
