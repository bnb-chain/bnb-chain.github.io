... (existing content) ...

## 26. x402 settlement is asynchronous; pending is not terminal

x402 request payment and ERC-8183 escrow are composable rails, not two names for the same thing.

The seller settles the buyer's authorization before starting paid work. A later work timeout or failure retains the payment and returns an error with the receipt where available. An uncertain settlement is recorded out of band as `x402_sell_unknown`; operators must reconcile `(nonce, network, payer)` and must never retry settlement blindly.

Binance made `/settle` asynchronous on 2026-07-14. A parseable `success: false` response with transaction evidence is pending and requires an idempotent poll with the same settlement payload; that is distinct from a blind transport retry. Studio with `@bnb-chain/b402@0.2.1` still classifies pending as unknown and does not perform the required poll. Treat this as a known production-readiness gap, not as the intended final protocol behavior.

## 27. The x402 public face needs a front; the rail runs on any AgentCore target

... (existing content) ...