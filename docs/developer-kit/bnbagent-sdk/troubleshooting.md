---
title: BNB Agent SDK Troubleshooting
---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `No PRIVATE_KEY and no keystore found` | No keystore in `~/.bnbagent/wallets/` | A new wallet is auto-generated, or set `PRIVATE_KEY` to import. |
| `Multiple wallets found` | Multiple keystores | Set `WALLET_ADDRESS` to pick one. |
| `WALLET_PASSWORD is required` | Missing env var | Set `WALLET_PASSWORD` in `.env`. |
| `403 Provider mismatch` | Not assigned to this job | Check `job.provider`. |
| `409 Not FUNDED` | Wrong job status | Job may already be submitted / settled. |
| `408 Job expired` | Past `expiredAt` | Create a new job; client can `claimRefund` the old one. |
| `402 Budget below service price` | `budget < ERC8183_SERVICE_PRICE` | Client must create a job with a higher budget (visible at `GET /erc8183/status`). |
| `router.settle` reverts with `policy pending` | Dispute window hasn't elapsed and no dispute was raised | Wait until `policy.check(jobId)` returns a non-PENDING verdict, then retry. |
| `voteReject` reverts with `not voter` / `not disputed` | Caller not whitelisted, or no dispute exists | Use [examples/voter/vote_reject.py](https://github.com/bnb-chain/bnbagent-sdk/tree/main/examples/voter/vote_reject.py) — it validates before sending. |

---
