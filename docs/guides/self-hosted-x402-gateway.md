... (existing content) ...

Binance changed `/settle` on 2026-07-14. A response with `success: false` and a non-empty `transaction` is pending, not a terminal failure. A conforming B402 client polls `/settle` with the same settlement payload until success or a terminal result, for at least the payment's `maxTimeoutSeconds`.

Studio uses `@bnb-chain/b402` `0.2.1`, including replay-slot protection, performs one settle call, and classifies a pending response as outcome unknown for manual reconciliation. The Relay is a byte forwarder and does not correct that client behavior. Do not describe the current Studio runtime as fully compatible with slow asynchronous settlements, and do not use the current path for mainnet acceptance until the runtime adds the required idempotent pending poll.

This does not authorize blind retry after a timeout or broken connection. Pending polling starts only after B402 returned a parseable pending response with transaction evidence, and it reuses the same settlement payload.

... (existing content) ...