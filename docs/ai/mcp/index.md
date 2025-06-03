---
title: MCP - Model Context Protocol
---

## What’s on this page?

1. Why MCP?
2. Core modules
3. Installation & config
4. IDE / client integration
5. Local development workflow
6. Prompts & tools reference
7. Supported networks
8. Contributing & license

---

## 1  Why MCP?

| Feature                        | What it means                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| **Natural‑language interface** | Ask “What’s the latest block on BSC?” instead of composing RPC calls.                        |
| **Cross‑network**              | One server speaks BSC, opBNB, Greenfield, Ethereum, Polygon, …                               |
| **Ready‑made prompts & tools** | Analyse blocks, tokens, addresses; estimate gas; transfer assets; manage Greenfield buckets. |
| **Easy IDE hooks**             | Plug into Cursor, Claude Desktop, (upcoming) VS Code & JetBrains.                            |
| **Run anywhere**               | `npx @bnb-chain/mcp` for quick use or self‑host for full control.                            |
| **MIT‑licensed**               | Open‑source & community‑driven.                                                              |

---

## 2  Core modules

```
blocks        • Inspect blockchain blocks
contracts     • Read / write smart contracts
network       • Network metadata & status
nft           • ERC‑721 / ERC‑1155 helpers
tokens        • ERC‑20 helpers & analytics
transactions  • Send, decode, analyse txs
wallet        • Key derivation & signing
common        • Shared utils & types
greenfield    • File‑storage ops on Greenfield
```

*Coming soon – Swap, Bridge, more Greenfield helpers.*

---

## 3  Installation & first run

```bash
npx -y @bnb-chain/mcp@latest --port 3001
```

| ENV           | Required?       | Purpose                             |
| ------------- | --------------- | ----------------------------------- |
| `PRIVATE_KEY` | Only for writes | Wallet key for state‑changing calls |
| `LOG_LEVEL`   | No              | DEBUG / INFO / WARN / ERROR         |
| `PORT`        | No              | Server port (or use `--port`)       |

```bash
cp .env.example .env   # customise if self‑hosting
```

---

## 4  IDE & client integration

### 4.1  Cursor

Add in **Settings → MCP → Add global server**.

**Default mode**

```json
{
  "mcpServers": {
    "bnbchain-mcp": {
      "command": "npx",
      "args": ["-y", "@bnb-chain/mcp@latest"],
      "env": { "PRIVATE_KEY": "your_private_key_here" }
    }
  }
}
```

**SSE mode**

```json
{
  "mcpServers": {
    "bnbchain-mcp": {
      "command": "npx",
      "args": ["-y", "@bnb-chain/mcp@latest", "--sse"],
      "env": { "PRIVATE_KEY": "your_private_key_here" }
    }
  }
}
```

Need Inkeep AI instead? See **AI & Tooling › Inkeep × Cursor**.

---

### 4.2  Claude Desktop

1. **Settings → Developer → Edit Config**
2. Insert:

```json
{
  "mcpServers": {
    "bnbchain-mcp": {
      "command": "npx",
      "args": ["-y", "@bnb-chain/mcp@latest"],
      "env": { "PRIVATE_KEY": "your_private_key_here" }
    }
  }
}
```

3. Save & restart.

### 4.3  Custom clients

See the `examples/` folder in the repo for TypeScript boilerplates.

---

## 5  Local development workflow

Prereqs: **bun ≥ 1.2.10** & **Node ≥ 17**

```bash
git clone https://github.com/bnb-chain/bnbchain-mcp.git
cd bnbchain-mcp
bun install          # deps
bun dev:sse          # hot‑reload server
```

Launch the test UI (ModelContextProtocol Inspector):

```bash
bun run test
```

---

## 6  Prompts & tools

### 6.1  Prompts

| Name                     | Purpose                   |
| ------------------------ | ------------------------- |
| `analyze_block`          | Detailed block breakdown  |
| `analyze_transaction`    | Inspect a transaction     |
| `analyze_address`        | Analyse wallet / contract |
| `interact_with_contract` | Guided ABI calls          |
| `explain_evm_concept`    | Plain‑English EVM topics  |
| `compare_networks`       | Compare gas, features     |
| `analyze_token`          | ERC‑20 / NFT analytics    |

### 6.2  General EVM tools

| Tool                           | Purpose               |
| ------------------------------ | --------------------- |
| `get_block_by_hash`            | Fetch block by hash   |
| `get_block_by_number`          | Fetch block by number |
| `get_latest_block`             | Current tip           |
| `get_transaction`              | Raw tx                |
| `get_transaction_receipt`      | Receipt with logs     |
| `estimate_gas`                 | Simulate tx cost      |
| `transfer_native_token`        | Send BNB/ETH/etc.     |
| `approve_token_spending`       | ERC‑20 allowance      |
| `transfer_nft`                 | ERC‑721 transfer      |
| `transfer_erc1155`             | ERC‑1155 transfer     |
| `transfer_erc20`               | ERC‑20 transfer       |
| `get_address_from_private_key` | Derive address        |
| `get_chain_info`               | Chain metadata        |
| `get_supported_networks`       | List chains           |
| `resolve_ens`                  | ENS → address         |
| `is_contract`                  | Contract vs EOA       |
| `read_contract`                | View/pure call        |
| `write_contract`               | State‑changing call   |
| `get_erc20_token_info`         | Token metadata        |
| `get_native_balance`           | Native balance        |
| `get_erc20_balance`            | ERC‑20 balance        |
| `get_nft_info`                 | ERC‑721 metadata      |
| `check_nft_ownership`          | Verify owner          |
| `get_erc1155_token_metadata`   | ERC‑1155 metadata     |
| `get_nft_balance`              | NFTs held             |
| `get_erc1155_balance`          | ERC‑1155 balance      |

### 6.3  Greenfield tools

| Tool                            | Purpose              |
| ------------------------------- | -------------------- |
| `gnfd_get_bucket_info`          | Bucket metadata      |
| `gnfd_list_buckets`             | Buckets for addr     |
| `gnfd_create_bucket`            | New bucket           |
| `gnfd_delete_bucket`            | Delete bucket        |
| `gnfd_get_object_info`          | Object metadata      |
| `gnfd_list_objects`             | Objects in bucket    |
| `gnfd_upload_object`            | Upload file          |
| `gnfd_download_object`          | Download file        |
| `gnfd_delete_object`            | Delete file          |
| `gnfd_create_folder`            | Make folder          |
| `gnfd_get_account_balance`      | Balance              |
| `gnfd_deposit_to_payment`       | Deposit funds        |
| `gnfd_withdraw_from_payment`    | Withdraw funds       |
| `gnfd_disable_refund`           | Disable refund       |
| `gnfd_get_payment_accounts`     | Payment accts        |
| `gnfd_get_payment_account_info` | Payment acct info    |
| `gnfd_create_payment`           | New payment acct     |
| `gnfd_get_payment_balance`      | Payment acct balance |

---

## 7  Supported networks

* BNB Smart Chain (mainnet & testnet)
* opBNB
* Greenfield
* Ethereum mainnet & testnets
* Polygon, Avalanche, Base, and more (see `src/evm/chains.ts`).

---

## 8  Contributing & license

* Fork → branch → commit → PR.
* Run lint & tests.

MIT © BNB Chain community.

---

## References

* [TermiX‑official/bsc‑mcp](https://github.com/TermiX-official/bsc-mcp)
* [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server)

