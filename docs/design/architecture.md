# Architecture

## Signing policy

Signing policy is additive and explicit. A project may extend allowed EIP-712 domains...

- `erc8004` registers, resolves, and updates agent identity metadata.
- `erc8183` exposes job listing, buy, status, submit, fetch, settle, quote negotiation, funded-job verification, and revert decoding.
- `x402` has two halves. The buyer client validates and signs EIP-3009 payments behind host, recipient, asset, network, amount, and budget policy (`bag x402 trust` / `quote` / `buy`). The seller rail (`X402Seller`, `bag x402 sell init` / `sell status`) serves `/x402` with four visible states - disabled, dormant (positive price but B402 credentials absent), paid active, and FREE active. Paid requests settle through B402 before work; FREE bypasses B402 entirely. Studio records only redaction-safe identifiers and a request digest for transport failures and asynchronous pending settlements; it never prints or persists the signed settlement payload. `@bnb-chain/b402@0.2.1` guards replay slots with a bounded process-local atomic store by default and accepts an injected shared `B402ReplayStore` for multi-instance hosts; it does not yet implement B402's required idempotent pending poll.

## Platform gateway

The platform gateway publishes each agent at `{base}/v1/rt/{agentId}/…`. Buyers authenticate with OAuth2 client_credentials minted by `bag platform invoke-client new` (scope `invoke:<agentId>`); the `/x402` path is the exception - published anonymously and rate-limited per IP. Gateway traffic uses AgentCore's native path for A2A or MCP-only. Dual MCP and x402 reach the container as envelope-v1 JSON over `InvokeAgentRuntime`, and the deploy descriptor advertises the x402 need with `doc.x402 = { publicPaths: ["/x402"], tunnel: "http-envelope-v1" }`. The managed platform is the only target that ships a public anonymous URL for the rail; a self-hosted AgentCore deploy activates the rail behind the operator's own front instead. Dual A2A+MCP descriptors independently add `doc.mcp = { publicPaths: ["/mcp"], tunnel: "http-envelope-v1" }`; X402-only descriptors add `suppressProtocolFace = true`. MCP gateway support is rolling out, while A2A is the stable dual-face path.

Generated seller operations always have bounded process-local global and
trusted-caller counters. That default is a one-replica boundary, not a claim of
distributed enforcement: `setCommerceRateLimiters()` accepts application-owned
async shared implementations, and a trusted edge may enforce the equivalent
limits. Hosted or unspecified environments warn when the process-local default
is used (`bag dev` identifies itself as development). Shared checks receive an
abort signal and fail closed after five seconds; shared infrastructure remains
optional rather than a scaffold prerequisite.

## Readiness model

Findings use four levels:
...