# BNB Agent SDK Security

## Security

### Wallet & key handling

- **Encrypted keys** — `EVMWalletProvider` uses Keystore V3; plaintext keys are cleared from memory after import.
- **Submit-time verification** — `submit_result()` re-verifies `FUNDED`, assignment, expiry, and `budget >= service_price` before every on-chain submission.
- **Budget protection** — Underpriced jobs are rejected with HTTP 402 at `/status`, `/job/{id}/verify`, and at submit time inside `submit_result()`.
- **Permissionless settle** — `router.settle` is callable by anyone. The SDK does not gatekeep settlement; operators run their own settle script when ready.
- **Non-pausable refund** — `claimRefund` on the kernel is intentionally not pausable and not hookable: funds can always be reclaimed past `expiredAt`.
- **Storage permissions** — `LocalStorageProvider` uses `0600`/`0700`.

### EIP-712 typed-data signing (`SigningPolicy`)

`EVMWalletProvider.sign_typed_data` is **policy-gated by default**. Without
explicit configuration, the wallet only accepts EIP-3009
`TransferWithAuthorization` / `ReceiveWithAuthorization` against
catalog-verified B402 domains: U on BSC mainnet/testnet and USD1 on BSC
mainnet. Testnet does not support USD1. All Permit variants
(ERC-2612 `Permit`, Permit2 `PermitSingle`/`PermitBatch`) are denylisted —
even if your own code mistakenly allowlists them, the denylist wins.

The threat: most ERC-20s support EIP-2612 `Permit` on-chain.
Without `SigningPolicy`, an LLM agent receiving a 402 challenge from a
malicious server could be talked into signing a Permit that grants unbounded
allowance, draining the wallet over time. The default policy refuses
unconditionally; you opt in explicitly when you know what you're signing.

**Canonical example — direct SDK usage:**

```python
from bnbagent import EVMWalletProvider, X402Signer
from bnbagent.x402 import resolve_expected_eip3009_route

U_ROUTE = resolve_expected_eip3009_route("eip155:56", "U")
U = U_ROUTE.address

# Strict default applied automatically for catalog U/USD1 EIP-3009 domains.
wallet = EVMWalletProvider(password=os.environ["WALLET_PASSWORD"])

# Pass a scoped signer (not the wallet) to your @tool functions:
signer = X402Signer(
    wallet,
    max_value_per_call={U: 1_000_000},
    session_budget={U: 50_000_000},
)

def pay_for_resource(challenge: dict, expected_to: str) -> dict:
    return signer.sign_payment(
        domain=challenge["domain"],
        types=challenge["types"],
        message=challenge["message"],
        expected_route=U_ROUTE,    # catalog-derived chain/token/method/name/version
        expected_to=expected_to,   # caller MUST commit to the payee
    )
```

`X402Signer` requires an `expected_route` from `resolve_expected_eip3009_route()`
and re-resolves it through the catalog. Before reserving budget or signing, it
binds chain, token/verifying contract, `TransferWithAuthorization`, EIP-712
name/version, and (a) byte-equal `expected_to == message['to']`
(case-insensitive). It also requires (b) `message['from'] == wallet.address`,
enforces (c) per-call `max_value`, and (d) cumulative session budget.
`expected_route` and `expected_to` MUST come from sources independent of the
402 response (configuration / on-chain registry), never from the challenge
body itself. The underlying `SigningPolicy` simultaneously enforces the
catalog domain allowlist, primary-type allowlist/denylist, and
validity-window bounds (default ≤ 600s window / ≤ 900s future).

**Extending the policy for custom contracts:**

```python
from bnbagent import EVMWalletProvider, SigningPolicy
from bnbagent.networks import BSC_MAINNET_CHAIN_ID

extended = SigningPolicy.strict_default().extend(
    domain_allowlist={(BSC_MAINNET_CHAIN_ID, "<verifying-contract>")},
)
wallet = EVMWalletProvider(
    password=os.environ["WALLET_PASSWORD"],
    signing_policy=extended,
)
```

**Capability model:** registered agent tool functions must never close over
a raw `WalletProvider` — they should receive an `X402Signer` (or any other
scoped wrapper) instead.

**Tests-only escape:** `SigningPolicy.permissive()` disables all gates and
logs a WARNING; `EVMWalletProvider._DANGEROUS_sign_typed_data_no_policy()`
bypasses the gate per-call and logs the caller's filename+line. Both are
audit-friendly; production / agent-reachable code MUST NOT call them.

**Inspecting the current policy** at runtime:

```python
wallet = EVMWalletProvider(password=...)
print(wallet.signing_policy)
# SigningPolicy(
#   domain_allowlist (3 entries):
#     - chain_id=56 verifyingContract=0xcE24439F2D9C6a2289F741120FE202248B666666
#     - chain_id=56 verifyingContract=0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d
#     - chain_id=97 verifyingContract=0x330949Aed7d00FCe0558C64ED6FeC9792616cC39
#   primary_type_allowlist=['ReceiveWithAuthorization', 'TransferWithAuthorization']
#   primary_type_denylist=['Permit', 'PermitBatch', 'PermitSingle']
#   validity: window<=600s, future<=900s, required_for=[...]
# )
```

`SigningPolicy.to_dict()` / `from_dict()` round-trip the policy through
plain dicts (JSON / TOML-friendly) so downstream tools (CLIs, deploy
manifests) can store and reload configurations declaratively.

### Decision tree — "do I need to configure anything?"

```
What are you signing?
│
├── EIP-3009 TransferWithAuthorization / ReceiveWithAuthorization
│   against catalog U on BSC mainnet (56) or testnet (97), or USD1 on BSC mainnet
│   → ✅ zero config — strict_default() already allows it
│
├── Same EIP-3009 type but a different chain / verifying contract
│   → 🟡 extend domain_allowlist with (chain_id, verifying_contract)
│
├── A custom typed-data primary type
│   (e.g. "MyOrder" / "BondQuote" / "Auction")
│   → 🟡 extend primary_type_allowlist with the type name
│      AND extend domain_allowlist with the verifying contract
│
├── EIP-2612 Permit  /  Permit2 PermitSingle/PermitBatch
│   (unbounded allowance grants)
│   → ❌ refused unconditionally (denylist takes precedence)
│      Don't sign these in agent flows.
│
├── Permit2 PermitTransferFrom / PermitBatchTransferFrom
│   (single-use signature transfer — safer subset)
│   → 🟡 opt in by extending primary_type_allowlist;
│      witness validation stays caller-side unless / until the x402
│      ecosystem standardises around Permit2
│
└── A longer validity window (e.g. 30-minute authorizations)
    → 🟡 extend max_validity_window_seconds=1800
```

| Scenario | Extension snippet |
|---|---|
| Add a verifying contract on chain 56 | `extend(domain_allowlist={(56, "<verifying-contract>")})` |
| Add a custom primary type "MyOrder" on chain 56 | `extend(domain_allowlist={(56, "<verifying-contract>")}, primary_type_allowlist={"MyOrder"})` |
| Allow a verifying contract on another chain | `extend(domain_allowlist={(chain_id, "<verifying-contract>")})` |
| Opt into Permit2 SignatureTransfer | `extend(primary_type_allowlist={"PermitTransferFrom"})` |
| Widen validity to 30 min | `extend(max_validity_window_seconds=1800)` |

Examples: see [examples/security_e2e.py](https://github.com/bnb-chain/bnbagent-sdk/blob/main/examples/security_e2e.py) (signing + recovery loop, 6 assertions)
and [examples/x402_buyer_demo.py](https://github.com/bnb-chain/bnbagent-sdk/blob/main/examples/x402_buyer_demo.py) (complete buyer flow with mock 402 server).

Full design rationale and threat model: see ADR #30 in the
[bnbchain-studio](https://github.com/bnb-chain/bnbchain-studio) repo
(`docs/decisions.md`).

---
