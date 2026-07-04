---
title: BNB Agent SDK Architecture
---

# Architecture

This document describes the high-level architecture of the BNB Agent SDK.
If you want to familiarize yourself with the codebase, this is a good place
to start.

## Bird's Eye View

BNB Agent SDK is a Python toolkit for building **on-chain AI agents** on
BNB Chain. It provides wallet management, a plugin module system, off-chain
storage abstraction, and built-in support for the following protocols:

- **ERC-8004** — On-chain identity registry for AI agents (register, discover,
  resolve endpoints).
- **ERC-8183 Protocol** — a three-layer agentic commerce stack:
  - **AgenticCommerce** (ERC-8183 kernel) — job lifecycle + escrow
    (create / setBudget / fund / submit / complete / reject / claimRefund).
  - **EvaluatorRouter** — routing layer that doubles as `job.evaluator`
    and `job.hook`. Binds `jobId → policy` on `registerJob`, pulls verdicts
    on the permissionless `settle`.
  - **OptimisticPolicy** — reference UMA-style policy. Silence past the
    dispute window is implicit approval; a client can raise a dispute
    that the whitelisted voters resolve by `voteReject` reaching quorum.

The SDK is organized as a **plugin system**: each protocol is a self-contained
module that can be used independently or composed via the `BNBAgent` facade.
New protocols can be added as modules without modifying the SDK core.
Wallet signing and off-chain storage are abstracted behind provider interfaces,
making the SDK backend-agnostic.

```
                    ┌─────────────┐
                    │  BNBAgent   │  optional facade (main.py)
                    │  from_env() │
                    └──────┬──────┘
                           │ discovers & initializes
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┐ ┌───▼────┐ ┌────▼─────┐
        │  erc8004  │ │  erc8183  │ │ wallets  │
        │  Identity │ │  v1    │ │ Signing  │
        └─────┬─────┘ └───┬────┘ └────┬─────┘
              │           │           │
              └────┬──────┘           │
                   │                  │
            ┌──────▼──────┐    ┌──────▼──────┐
            │    core     │    │ storage_    │
            │ (infra)     │    │ providers   │
            └─────────────┘    └─────────────┘
```

Arrows point **downward** — upper layers depend on lower layers, never the
reverse. `erc8183` depends on `erc8004` (for agent discovery). Both protocol
modules depend on `core` for transaction management.

## Code Map

### `bnbagent/` — Main Package

| File | Purpose |
|------|---------|
| `__init__.py` | Tier 1 public API (re-exports from subpackages) |
| `main.py` | `BNBAgent` — optional high-level facade over the module system |
| `config.py` | `BNBAgentConfig`, `NetworkConfig`, `NETWORKS` registry, `resolve_network()` |
| `constants.py` | Global constants (`SCAN_API_URL`) |
| `exceptions.py` | `BNBAgentError` hierarchy |

### `bnbagent/core/` — Internal Infrastructure

Not part of the public API. Provides shared plumbing for protocol modules.

| File | Purpose |
|------|---------|
| `module.py` | `BNBAgentModule` ABC and `ModuleInfo` dataclass |
| `registry.py` | `ModuleRegistry` — discovery (built-in + entry points), dependency validation, topological initialization |
| `contract_mixin.py` | `ContractClientMixin` — shared base for `CommerceClient`, `RouterClient`, `PolicyClient`, `MinimalERC20Client` (tx signing, nonce management, retry with backoff) |
| `nonce_manager.py` | `NonceManager` — per-account thread-safe nonce tracking with chain re-sync |
| `multicall.py` | `multicall_read()` — Multicall3 batch view helper |
| `paymaster.py` | `Paymaster` — ERC-4337 gas sponsorship client |
| `abi_loader.py` | ABI file loading from bundled JSON |

### `bnbagent/erc8004/` — ERC-8004 Identity Registry

| File | Purpose |
|------|---------|
| `agent.py` | `ERC8004Agent` — high-level SDK: `register_agent()`, `get_agent_info()`, `get_all_agents()` |
| `contract.py` | `ContractInterface` — low-level web3 contract calls |
| `models.py` | `AgentEndpoint` dataclass |
| `constants.py` | `get_erc8004_config()` — per-network contract addresses |
| `module.py` | `ERC8004Module` plugin |

### `bnbagent/erc8183/` — ERC-8183 Protocol

High-level facade over three contracts. Most callers only touch `ERC8183Client`.

| File | Purpose |
|------|---------|
| `client.py` | `ERC8183Client` — facade over Commerce / Router / Policy; floor-based `fund` approval; cached `payment_token` / `token_decimals` / `token_symbol`; high-level wrappers for `create_job`, `register_job`, `set_budget`, `fund`, `submit`, `settle`, `dispute`, `vote_reject`, `claim_refund` |
| `commerce.py` | `CommerceClient` — low-level wrapper for `AgenticCommerceUpgradeable` |
| `router.py` | `RouterClient` — low-level wrapper for `EvaluatorRouterUpgradeable` |
| `policy.py` | `PolicyClient` — low-level wrapper for `OptimisticPolicy` (dispute / voteReject / check / voter admin) |
| `../erc20/client.py` | `MinimalERC20Client` — used by `ERC8183Client` for ERC-20 reads (decimals/symbol/balanceOf/allowance/approve) |
| `types.py` | `JobStatus`, `Verdict`, `REASON_APPROVED`, `REASON_REJECTED`, `Job` dataclass |
| `config.py` | `ERC8183Config` — unified config (wallet_provider + storage + contract overrides) |
| `negotiation.py` | `NegotiationHandler`, structured description schema, quote expiry |
| `schema.py` | `DeliverableManifest`, `JobDescription`, `SCHEMA_VERSION` — on-chain description and off-chain deliverable JSON |
| `constants.py` | `get_erc8183_config()` — per-network defaults |
| `module.py` | `ERC8183Module` plugin |

### `bnbagent/erc8183/server/` — FastAPI Integration

| File | Purpose |
|------|---------|
| `routes.py` | `create_erc8183_app()` FastAPI factory; `ERC8183State`; `/erc8183/job/{id}`, `/erc8183/negotiate`, `/erc8183/status`, `/erc8183/health`; funded-job background poll loop when `on_job` is provided |
| `job_ops.py` | `ERC8183JobOps` — async wrapper over `ERC8183Client`; incremental scan for newly funded jobs; `submit_result` for deliverable submission |

### `bnbagent/wallets/` — Wallet Providers

| File | Purpose |
|------|---------|
| `wallet_provider.py` | `WalletProvider` ABC — `address`, `sign_transaction()`, `sign_message()` |
| `evm_wallet_provider.py` | `EVMWalletProvider` — Keystore V3 encryption (scrypt + AES-128-CTR) |
| `mpc_wallet_provider.py` | `MPCWalletProvider` — stub for future MPC signer support |

### `bnbagent/storage/` — Storage Providers

| File | Purpose |
|------|---------|
| `storage_provider.py` | `StorageProvider` ABC — async `upload()`, `download()`, `exists()`, `compute_hash()` |
| `local_storage_provider.py` | `LocalStorageProvider` — filesystem (`file://` URLs); owns its own `from_env()` |
| `ipfs_storage_provider.py` | `IPFSStorageProvider` — IPFS pinning via HTTP API (Pinata-compatible); owns its own `from_env()` |
| `sync_utils.py` | `upload_sync()` — synchronous bridge |

### `examples/`

| Directory | Role | What it demonstrates |
|-----------|------|----------------------|
| `client/` | Client | 5 stand-alone scripts — happy / dispute-reject / stalemate-expire / never-submit / cancel-open |
| `voter/` | Voter | `voteReject` script + `Disputed` event watcher |
| `agent-server/` | Provider | FastAPI agent with funded-job poll loop and a public `/negotiate` quote endpoint |

### `tests/` — Test Suite

`pytest` + `pytest-mock` + `pytest-asyncio`. Tests mock web3 and external
services; no live chain calls in CI.

## Public API

**Tier 1** — importable directly from `bnbagent`:

```python
from bnbagent import (
    BNBAgent, BNBAgentConfig, NetworkConfig, BNBAgentError,
    ERC8004Agent, AgentEndpoint,
    WalletProvider, EVMWalletProvider,
    ERC8183Client, JobStatus, Verdict,
)
```

**Tier 2** — import from subpackages:

```python
from bnbagent.erc8183 import (
    ERC8183Client, CommerceClient, RouterClient, PolicyClient,
    JobStatus, Verdict, Job,
)
from bnbagent.erc8183.server import create_erc8183_app, ERC8183JobOps
from bnbagent.erc8183.config import ERC8183Config
from bnbagent.storage import LocalStorageProvider, IPFSStorageProvider
```

## Module System

The SDK uses a plugin architecture. Every protocol is a `BNBAgentModule`
subclass discovered and managed by `ModuleRegistry`.

**Lifecycle:**

1. `discover()` — imports built-in modules (`erc8004`, `erc8183`) + scans
   `bnbagent.modules` entry-point group for third-party plugins
2. `validate_dependencies()` — ensures all declared dependencies are present
3. `_topological_sort()` — orders modules so dependencies initialize first
4. `initialize_all(config)` — calls `module.initialize()` in order
5. `shutdown_all()` — cleanup in reverse order

**Extending:** implement `BNBAgentModule`, expose a `create_module()` factory,
and register via `pyproject.toml` entry points:

```toml
[project.entry-points."bnbagent.modules"]
my_module = "my_package:create_module"
```

## Configuration

```
NetworkConfig (NETWORKS dict in config.py)
  ├── bsc-testnet  (chain_id=97)  — active, ERC-8183 + ERC-8004 deployed
  └── bsc-mainnet  (chain_id=56)  — active, ERC-8183 + ERC-8004 deployed

resolve_network(name) + env var overrides
  ↓ (clients assert w3.eth.chain_id == nc.chain_id at init — wrong RPC → ValueError)
BNBAgentConfig
  ├── wallet_provider  (explicit or auto-wrapped from private_key)
  ├── settings         (general key-value)
  └── modules          (namespaced: {"erc8183": {"commerce_address": "<override>"}})
```

**Environment variable overrides** (module-scoped):

| Variable | Scope | Overrides |
|----------|-------|-----------|
| `RPC_URL` | global (`resolve_network`) | `rpc_url` |
| `ERC8183_COMMERCE_ADDRESS` | `ERC8183Config.effective_network` | `commerce_contract` |
| `ERC8183_ROUTER_ADDRESS` | `ERC8183Config.effective_network` | `router_contract` |
| `ERC8183_POLICY_ADDRESS` | `ERC8183Config.effective_network` | `policy_contract` |
| `ERC8004_REGISTRY_ADDRESS` | `get_erc8004_config` | `registry_contract` |

`resolve_network()` itself only honours `RPC_URL`. Contract-address overrides
are applied by each module's own config loader — keeps each module's env
surface self-contained and obvious from the prefix.

When `network=NetworkConfig(...)` is passed directly (instead of a preset
name), env overrides are **not** applied — the object is used as-is.

Commerce settlement assets are resolved at runtime from the deployed kernel
via `ERC8183Client` — not duplicated in this documentation.

Both `BNBAgentConfig` and `ERC8183Config` support the convenience pattern:
pass `private_key` + `wallet_password` and the config auto-wraps them into
an `EVMWalletProvider`, then **clears both the plaintext key and password**
from the config object (the provider keeps its own password copy).

## Invariants

These properties hold across the codebase and should be preserved:

- **No plaintext secrets in config after construction.** `__post_init__()` wraps
  `private_key` into a `WalletProvider` and zeros both the `private_key` and
  `wallet_password` string fields (the provider retains its own password copy).
- **Modules never import each other directly.** Inter-module communication
  goes through the registry or shared config. Module dependencies are declared
  in `ModuleInfo.dependencies` and enforced at initialization.
- **`ContractClientMixin` prefers `wallet_provider` over raw `private_key`.**
- **Storage providers are async.** Synchronous callers use `upload_sync()`
  to avoid blocking the event loop.
- **Nonce management is per-account singleton.** `NonceManager.for_account()`
  ensures one manager per address to prevent collisions in concurrent code.
- **Retry with backoff on rate limits (429) and nonce conflicts.** Up to 5
  retries with exponential backoff. Nonce errors trigger chain re-sync.
- **Settlement assets are dynamically fetched.** They are never part of
  `NetworkConfig` or `ERC8183Config` — see [Networks & contracts](networks.md).

## Data Flows

### Agent Registration (ERC-8004)

```
ERC8004Agent.register_agent(name, endpoint, ...)
  → ContractInterface.register(...)
    → ContractClientMixin._send_tx()
      → WalletProvider.sign_transaction()
      → web3.eth.send_raw_transaction()
  → On-chain: IdentityRegistry stores agent metadata
```

### ERC-8183 Job Lifecycle

Happy path (silence approve):

```
1. Discover provider             →  ERC8004Agent.get_all_agents()
2. Negotiate price (off-chain)   →  NegotiationHandler (HTTP)
3. createJob(provider, router)   →  ERC8183Client.create_job(...)       Open
4. registerJob(jobId, policy)    →  ERC8183Client.register_job(...)     Open
5. setBudget(jobId, amount)      →  ERC8183Client.set_budget(...)       Open
6. approve(commerce, amount) +
   fund(jobId, amount)           →  ERC8183Client.fund(...)             Funded
                                    (floor-based auto-approval)
7. Provider submit(deliverable)  →  ERC8183Client.submit(...)           Submitted
8. Wait dispute window           →  time passes
9. router.settle(jobId, "")      →  ERC8183Client.settle(...)           Completed
   (permissionless; any party can call from their own wallet)
```

Dispute branches:

- Client calls `ERC8183Client.dispute(jobId)` during the window → voters cast
  `ERC8183Client.vote_reject(jobId)` → once `rejectVotes >= quorum`, `settle`
  moves the job to **REJECTED** and refunds the client.
- No quorum ever reached → `settle` stays blocked; once `expiredAt` passes,
  anyone calls `ERC8183Client.claim_refund(jobId)` → **EXPIRED**.

`claimRefund` is non-pausable and non-hookable by design — the universal
escape hatch at expiry.

### Server Request Flow (FastAPI)

```
HTTP request
  → Route handler (routes.py)
  → ERC8183JobOps (async) → asyncio.to_thread() → ERC8183Client (sync/web3)
  → Response

Background tasks (when on_job is provided)
  - Funded-job poll loop: scan Commerce for newly FUNDED jobs assigned to
    this provider, dispatch each through on_job → submit_result. The SDK
    does NOT auto-settle: settle is permissionless and runs as a separate
    operator script (see examples/agent-server/scripts/settle.py).
```

## Exception Hierarchy

```
BNBAgentError
├── ConfigurationError   — missing/invalid config
├── ContractError        — transaction reverts, gas failures
├── NetworkError         — RPC errors, rate limits, timeouts
├── ABILoadError         — ABI file not found or invalid JSON
├── StorageError         — upload/download failures
├── JobError             — invalid job state, unauthorized access
└── NegotiationError     — price validation, unsupported terms
```

## Extension Points

- **Custom WalletProvider** — subclass `WalletProvider` to support HSMs,
  multisig, or MPC signers.
- **Custom StorageProvider** — implement the `StorageProvider` ABC for
  alternative backends (S3, Arweave, etc.).
- **Custom Module** — extend `BNBAgentModule` and register via entry points
  to add new protocol support without modifying the SDK.

## Dependencies

| Category | Packages |
|----------|----------|
| Core | `web3 ≥ 6.15`, `eth-account ≥ 0.10`, `python-dotenv ≥ 1.0`, `requests ≥ 2.31` |
| Server (optional) | `fastapi ≥ 0.104`, `uvicorn ≥ 0.24` |
| IPFS (optional) | `httpx ≥ 0.25` |
| Dev | `pytest`, `pytest-mock`, `pytest-asyncio`, `ruff` |
