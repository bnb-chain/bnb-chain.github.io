---
sidebar_label: BSC Relayer Guides
hide_table_of_contents: false
sidebar_position: 2
---

# BSC Relayer Guides

## Prepare Fund

1. Make sure that you have enough BNB in your account. You can get from [faucet](https://testnet.binance.org/faucet-smart)

If you haven't created your account yet, please follow these [guides](wallet/metamask.md) to create one first.

* **100BNB** for relayer register
* More than **50BNB** for transaction fee

!!! Tip
		Currently the bsc-relayer code is not fully prepared. Some features like `db persistence`, `alert`, `prometheus monitor` are still under development. So please don’t modify the configuration about db_config, alert_config, instrumentation_config, admin_config

## Steps to Install BSC Relayer

1.Build from source code

Make sure that you have installed [Go 1.13+](https://golang.org/doc/install) and have added `GOPATH` to `PATH` environment variable

```bash
git clone https://github.com/bnb-chain/bsc-relayer
# Enter the folder bsc was cloned into
cd bsc-relayer
# Comile and install bsc
make build
```

or you can download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc-relayer/releases/tag/v1.1.0)

## Get Example Config File

Get example config from this url: <https://github.com/bnb-chain/bsc-relayer/blob/master/config/config.json>

Edit`config.json` and fill your BSC private key to bsc_config.private_key, example private key: `AFD8C5D83F148065176268A9D1EE375A10CEE1E74D15985D4CC63E467EC34DA5`

* Beacon Chain Configuration:
	* `mnemonic`: Paste the recovery phrase here. Since bsc-relayer will automaticly submit `double-sign` evidence, if it's committed, the reward will be sent to this address
* BNB Smart Chain Configuration:
*

## Start Relayer

You can start Locally

```shell
./bsc-relayer --config-type local --config-path config.json
```

Output:

```
(base) huangsuyudeMacBook-Pro:mac huangsuyu$ bsc-relayer --config-type local --config-path config.json
2020-05-27 17:01:16 INFO main Start relayer
2020-05-27 17:01:16 INFO SyncProtocol Sync cross chain protocol from https://github.com/bnb-chain/bsc-relayer-config.git
2020-05-27 17:01:18 INFO RegisterRelayerHub This relayer has already been registered
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 1, next deliver sequence 55 on BSC, next sequence 55 on BC
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 2, next deliver sequence 1273 on BSC, next sequence 1273 on BC
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 3, next deliver sequence 6 on BSC, next sequence 6 on BC
2020-05-27 17:01:19 INFO CleanPreviousPackages channelID: 8, next deliver sequence 5 on BSC, next sequence 5 on BC
2020-05-27 17:01:19 INFO RelayerDaemon Start relayer daemon
2020-05-27 17:01:19 INFO Serve start admin server at 0.0.0.0:8080
```

Or, dynamic Sync Cross Chain Protocol Configuration from <https://github.com/bnb-chain/bsc-relayer-config>

* Edit config.json and change "cross_chain_config.protocol_config_type" to "remote". Then relayer will dynamically sync cross chain protocol configuration from this repository: <https://github.com/bnb-chain/bsc-relayer-config>
* Start relayer service

```shell
./bsc-relayer --config-type local --config-path config.json
```

### Verify Status

You could call [RelayerHub Contract](https://bscscan.com/address/0x0000000000000000000000000000000000001006) to verify that your relayer is registered. Go to [read contract](https://bscscan.com/address/0x0000000000000000000000000000000000001006#readContract) and call **isRelayer** function. If it returns **true**, then your relayer is working properly.

## Relayer Rewards

1. You can witness the distribution of relayer rewards in the log of system contract:  <https://bscscan.com/address/0x0000000000000000000000000000000000001005#events>. According to the design of [Relayer Incentive](learn/incentives.md), the rewards will be distributed every 1000 data packages. The total accumulated rewards can be read from [contract](https://bscscan.com/address/0x0000000000000000000000000000000000001005#readContract)the value of `_collectedRewardForHeaderRelayer` and `_collectedRewardForTransferRelayer`.

2. Query your relayer's status

The total accumulated relayed count can be read from [contract](https://bscscan.com/address/0x0000000000000000000000000000000000001005#readContract)the value of `_transferRelayersSubmitCount`


## Stop Relayer

To get your locked **100BNB** back, you need to call [RelayerHub Contract](https://bscscan.com/address/0x0000000000000000000000000000000000001006) to unregister your relayer. The fee is **0.1BNB**

* Go to MyEtherWallet and [interact with contract](https://www.myetherwallet.com/interface/interact-with-contract)
* Fill in the contract addresss: **0x0000000000000000000000000000000000001006** with [abi](relayerhub.abi) interface
* Call **unregister** function and leave value in ETH as 0
* Sign your transaction in **MetaMask**
