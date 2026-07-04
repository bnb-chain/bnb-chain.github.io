---
title: BNB Agent SDK Quickstart
---

## Quick Start: Register an Agent (ERC-8004)

Register your AI agent on-chain with a unique identity. This is a one-time setup.

### Prerequisites

- Python 3.10+
- A private key (generate one or use an existing wallet)

```python
import os
from dotenv import load_dotenv
from bnbagent import ERC8004Agent, AgentEndpoint, EVMWalletProvider

load_dotenv()

wallet = EVMWalletProvider(
    password=os.getenv("WALLET_PASSWORD"),
    private_key=os.getenv("PRIVATE_KEY"),  # only needed on first run
)

sdk = ERC8004Agent(network="bsc-testnet", wallet_provider=wallet)

agent_uri = sdk.generate_agent_uri(
    name="my-ai-agent",
    description="AI agent for document processing",
    endpoints=[
        AgentEndpoint(
            name="ERC-8183",
            endpoint="https://my-agent.example.com/erc8183/status",
            version="0.1.0",
        ),
    ],
)

result = sdk.register_agent(agent_uri=agent_uri)
print(f"Agent registered! ID: {result['agentId']}, TX: {result['transactionHash']}")
```

---

---

## Quick Start: Run an ERC-8183 Agent Server

Set up an agent server that accepts jobs, processes work, and gets paid.

### Prerequisites

- `pip install "bnbagent[server,ipfs]"`
- A `.env` file with your credentials (see [examples/agent-server/.env.example](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/agent-server/.env.example))

### Option 1: Standalone App (`create_erc8183_app`)

```python
# agent.py
from bnbagent.erc8183.server import create_erc8183_app

def execute_job(job: dict) -> str:
    """Called automatically for each FUNDED job. Return the deliverable string."""
    return f"Processed: {job['description']}"

app = create_erc8183_app(on_job=execute_job)
# Routes at /erc8183/negotiate, /erc8183/status, /erc8183/job/{id}, etc.
```

```bash
# .env
WALLET_PASSWORD=your-secure-password
PRIVATE_KEY=<hex-private-key>                  # first run only; encrypted to ~/.bnbagent/wallets/
ERC8183_AGENT_URL=http://localhost:8003/erc8183  # required for LocalStorageProvider (default)
ERC8183_SERVICE_PRICE=1000000000000000000        # 1 token (18 decimals)
# To use IPFS instead, swap to IPFSStorageProvider in your service code and set:
# STORAGE_API_KEY=your-pinning-service-jwt
# Optional knobs (see env-var table below for full reference):
# ERC8183_FUNDED_POLL_INTERVAL=30      # default poll cadence (s)
# ERC8183_NEGOTIATE_RATE_LIMIT=120     # /negotiate per-IP request budget
# ERC8183_NEGOTIATE_RATE_WINDOW=60     # rate-limit window (s)
# ERC8183_MAX_RESPONSE_BYTES=5242880   # response_content cap (5 MB)
# ERC8183_MAX_METADATA_BYTES=262144    # metadata cap (256 KB)
```

```bash
uvicorn agent:app --port 8003
```

`create_erc8183_app()` handles: wallet keystore, periodic on-chain poll for newly FUNDED jobs assigned to this provider, on-chain verification, calling your handler, uploading the deliverable to storage, and submitting on-chain. Jobs with `budget < service_price` are rejected with HTTP 402. Settle is permissionless — run a separate operator script to call `router.settle(jobId)` once the dispute window elapses.

### Option 2: Mount on Existing App (sub-app)

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from bnbagent.erc8183.server import create_erc8183_app

def execute_job(job: dict) -> str:
    return f"Processed: {job['description']}"

erc8183_app = create_erc8183_app(on_job=execute_job, prefix="")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await erc8183_app.state.startup()
    yield

app = FastAPI(lifespan=lifespan)
app.mount("/erc8183", erc8183_app)
```

Starlette does not propagate lifespan events into mounted sub-apps; call `erc8183_app.state.startup()` from your parent lifespan to launch the funded-job poll loop.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/erc8183/negotiate` | Price negotiation (off-chain). Returns a structured quote. Rate-limited per client IP. |
| `GET`  | `/erc8183/job/{id}` | Job details from the Commerce kernel. |
| `GET`  | `/erc8183/job/{id}/response` | Stored deliverable for a submitted job. |
| `GET`  | `/erc8183/job/{id}/verify` | Verify a job is `FUNDED`, assigned to this provider, not expired, budget ok. |
| `GET`  | `/erc8183/status` | Agent wallet, service price, decimals, network info. |
| `GET`  | `/erc8183/health` | Liveness check. |

### `on_job` Callback

```python
# Sync or async, with or without per-job metadata:
def on_job(job: dict) -> str: ...
async def on_job(job: dict) -> str: ...
def on_job(job: dict) -> tuple[str, dict]: ...
async def on_job(job: dict) -> tuple[str, dict]: ...
```

`job` contains: `jobId`, `description`, `budget`, `client`, `provider`, `evaluator`, `status` (always `FUNDED`), `expiredAt`, `hook`.

### Settle

`router.settle(jobId)` is permissionless — any party can finalise a submitted job once its dispute window elapses. The SDK does not run an in-server settle loop; operators are expected to run a separate script that polls verdicts and calls `ERC8183Client.settle(jobId)` when ready.

---

---

## Quick Start: Use `ERC8183Client` from a Client

`ERC8183Client` is the high-level facade over the ERC-8183 contract stack. Most callers only use the top-level methods; the sub-clients `erc8183.commerce`, `erc8183.router`, `erc8183.policy` are exposed for advanced use.

```python
from bnbagent.erc8183 import ERC8183Client, JobStatus
from bnbagent.wallets import EVMWalletProvider

wallet = EVMWalletProvider(password="your-password", private_key="<hex-private-key>")
erc8183 = ERC8183Client(wallet, network="bsc-testnet")

# Settlement-asset helpers (decimals / balance resolved from network presets).
print("decimals:", erc8183.token_decimals())
print("balance:", erc8183.token_balance())

# Happy-path lifecycle.
budget = 1 * (10 ** erc8183.token_decimals())
expired_at = int(time.time()) + 65 * 60

res = erc8183.create_job(provider=provider_addr, expired_at=expired_at, description="task")
job_id = res["jobId"]

erc8183.register_job(job_id)                    # bind default policy (OptimisticPolicy)
erc8183.set_budget(job_id, budget)
erc8183.fund(job_id, budget)                    # floor-based auto-approve (default cap from SDK)

# ... provider submits ...

erc8183.settle(job_id)                          # permissionless; anyone can call
assert erc8183.get_job_status(job_id) == JobStatus.COMPLETED
```

### `fund(job_id, amount, approve_floor=None)`

- **`approve_floor=None`** (default) — Approve `max(amount, 100 * 10**decimals)`. Residual allowance stays bounded (≤100 tokens), but small budgets don't repeatedly re-approve. Saves gas across job streams.
- **`approve_floor=0`** — Approve exactly `amount` (most conservative).
- **`approve_floor=X`** — Approve `max(amount, X)` (custom floor).

If the current allowance already covers `amount`, no approve is sent at all.

### Disputes

```python
erc8183.dispute(job_id)        # client only; within dispute window
erc8183.vote_reject(job_id)    # whitelisted voter only; after dispute
erc8183.claim_refund(job_id)   # anyone, after expiredAt, no settlement reached
```

See [examples/client/](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/client/) for the five canonical flows (happy, dispute-reject, stalemate-expire, never-submit, cancel-open).

---
