
# Preparing for Ecotone Breaking Changes

<div class="doc-announce-info">
    <span class="version-tag">v.9.5.28</span>
    <span class="announce-date">2024 May 12</span>
</div>

This page outlines breaking changes related to Ecotone network upgrade for wallets and front-end developers, chain operators, and node operators. If you experience difficulty at any stage of this process, please reach out to [developer support].

[developer support]: https://www.bnbchain.org

## Preparing Your Wallet or Front-End

It's strongly recommended that you use existing tooling to estimate transaction fees instead of computing them yourself. Refer to the tooling section of the Estimating Fees page for recommendations on which tooling might be best suited for your application.

If you cannot use existing tooling, use the getL1Fee function on the GasPriceOracle smart contract to compute the L1 Data Fee component of the transaction fee. This function would be automatically updated during the proposed upgrade. Avoid implementing the formula yourself, as it may change in the future.