... (existing content) ...

Binance changed `/settle` to an asynchronous protocol on 2026-07-14. A parseable response with `success: false` and a non-empty `transaction` is pending, not terminal. A conforming B402 client must poll `/settle` idempotently with the same settlement payload until success or a terminal result, for at least the payment's `maxTimeoutSeconds`.

Studio uses `@bnb-chain/b402@0.2.1`. Its H02 replay guard reserves an atomic `(transfer method, network, asset, payer, nonce)` slot before `/settle`; Studio supplies a bounded process-local atomic store by default, and a store failure rejects the request before any settlement call. The default fails closed at its capacity instead of evicting replay state. Multi-instance production hosts must pass a durable shared `B402ReplayStore` as `X402Seller.create({ replayStore })`; the default only coordinates one process. Backend failures are redacted before B402 can log them.

Version 0.2.1 still performs one settle call and classifies a pending response as outcome unknown instead of polling. A timeout or broken connection is also unknown because B402 may finish later. The runtime returns a reconciliation-required error and emits a redaction-safe `X402_SETTLE_UNKNOWN` stdout marker containing only the nonce, network, payer, and a SHA-256 request digest. The matching `x402_sell_unknown` audit event contains the same identifiers. Studio does not print or persist the signed settlement payload.

Reconciliation procedure:

1. Do not replay the paid request blindly.
2. Locate the stdout marker and the matching `x402_sell_unknown` event by `request_sha256`.
3. Use the idempotency tuple `(nonce, network, payer)` and request digest to ask B402's merchant reconciliation/status channel for the outcome. Do not reconstruct or replay the signed request from logs.
4. If B402 reports a late successful settlement, record it as paid and decide operationally whether to deliver the work out of band.
5. If B402 confirms failure, mark the attempt failed. A buyer may create a new authorization with a new nonce; do not reuse the uncertain one.

... (existing content) ...