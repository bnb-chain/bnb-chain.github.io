# Second Sunset Hardfork of BC Testnet

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline

The Second Sunset Hardfork will happen at:

- Testnet: June 21 2024 6:00:00 AM UTC

## Upgrade to BC Node v0.10.21 Before Hardfork

BC node need to be upgraded before the hardfork time.

- https://github.com/bnb-chain/node/releases/tag/v0.10.21

### Upgrade Instructions

As a fullnode runner, you need to take the following steps before the hardfork block height.

1) Download the new v0.10.21 binary and replace the previous version.

2) Download the new config
   file [app.toml](https://github.com/bnb-chain/node/releases/download/v0.10.21/testnet_config.zip) to replace the
   previous version or add the following under the [upgrade] module of `app.toml`.

```toml
SecondSunsetHeight = 54554742
```

3) Stop the bnbchaind process and restart it with v0.10.21.

```shell
service bnbchaind restart
```

## Key Highlight

All TimeLocks and AtomicSwaps on BC tesnet will automatically be refunded to user accounts.
All the BSC delegations will be automatically undelegated and refunded to user accounts after the unbonding period.
For more information about BNB Chain Fusion, please refer to [this](https://www.bnbchain.org/en/bnb-chain-fusion).