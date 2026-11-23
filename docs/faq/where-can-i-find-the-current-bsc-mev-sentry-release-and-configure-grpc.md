---
title: "Where can I find the current BSC MEV Sentry release and configure gRPC? - BSC FAQs"
---

### Where can I find the current BSC MEV Sentry release and configure gRPC?

Check the [BSC MEV Sentry releases](https://github.com/bnb-chain/bsc-mev-sentry/releases) for the current version and upgrade notes. As of November 23, 2026, v1.8.1 is the latest release.

Version 1.8.1 adds gRPC forwarding for BEP-675 `SendBidBlock` between the builder, MEV Sentry and validator. The existing JSON-RPC APIs remain supported. To enable gRPC, configure `GRPCListenAddr` for the sentry endpoint and `GRPCURL` for each target validator, as described in the [v1.8.1 release notes](https://github.com/bnb-chain/bsc-mev-sentry/releases/tag/v1.8.1).

Refer to the current [bsc-mev-info validator configuration](https://github.com/bnb-chain/bsc-mev-info) for public endpoint examples. Do not include a private host in public configuration. Test your configuration after updating it.

---

Applies to: BSC MEV Sentry
