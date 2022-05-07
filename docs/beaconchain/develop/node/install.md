# Install Binaries

This guide will explain how to install the binaries: `bnbchaind`  and `bnbcli`, onto your server. With these installed on a server, you can participate in the mainnet or testnet as a Full Node. Full Nodes of Beacon Chain  also help the network by accepting transactions from other nodes and then relaying them to the core Binance network.

## Supported Platforms
We support running a full node on `Mac OS`, `Windows` and `Linux`.

1. Download Binary

Open the following page and download the binaries for your platform, as well as configuration files for mainnet or testnet .
```bash
https://github.com/bnb-chain/node/releases
```

Please go to [changelog](https://github.com/bnb-chain/node/releases) to get the information about the latest release of full node version.

Go to directory according to the network you want to join in.<br/>
Replace the `network` variable with `testnet` or `prod` in the following command:

```bash
upzip linux_binary.zip
```

2. Copy the executables (i.e.`bnbchaind` or `bnbcli`) to `/usr/local/bin`

## Next
Now you can join the [mainnet](join-mainnet.md), the public testnet or create you own testnet
