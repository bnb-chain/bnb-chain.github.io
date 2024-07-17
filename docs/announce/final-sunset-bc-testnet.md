# Final Sunset Hardfork of BC Testnet

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline

The Final Sunset Hardfork will happen at:

- Testnet: August 1 2024 6:00:00 AM UTC

## Upgrade to BC Node v0.10.23 Before Hardfork

BC node need to be upgraded before the hardfork time.

- https://github.com/bnb-chain/node/releases/tag/v0.10.23

### Upgrade Instructions

As a fullnode runner, you need to take the following steps before the hardfork block height.

1) Download the new v0.10.23 binary and replace the previous version.

2) Download the new config
   file [app.toml](https://github.com/bnb-chain/node/releases/download/v0.10.23/testnet_config.zip) to replace the
   previous version or add the following under the [upgrade] module of `app.toml`.

```toml
FinalSunsetHeight = 56218686
```

3) Stop the bnbchaind process and restart it with v0.10.23.

```shell
service bnbchaind restart
```

## Key Highlight

After Final Sunset, the cross-chain communication between the Beacon Chain and BSC will be completely stopped.
The validators in the Beacon Chain community will gradually shut down, and the entire chain will no longer accept 
new transactions or propose new blocks.
For more information about BNB Chain Fusion, please refer to [this](https://www.bnbchain.org/en/bnb-chain-fusion).