# Install Binaries

This guide will explain how to install the binaries: `bnbchaind`  and `bnbcli`, onto your server. With these installed on a server, you can participate in the mainnet or testnet as a Full Node. Full Nodes of Beacon Chain  also help the network by accepting transactions from other nodes and then relaying them to the core BNB Chain network.

## Supported Platforms
We support running a full node on `Mac OS`, `Windows` and `Linux`.

Please go to [changelog](https://github.com/bnb-chain/node/releases) to get the information about the latest release of full node version.


### Option One: Download the pre-build binaries

1. Download from the [release page](https://github.com/bnb-chain/node/releases/latest) or follow below.

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/node/releases/latest |grep browser_ |grep linux_binary |cut -d\" -f4)
unzip linux_binary.zip

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/node/releases/latest |grep browser_ |grep macos_binary |cut -d\" -f4)
unzip macos_binary.zip

# Windows
wget   $(curl -s https://api.github.com/repos/bnb-chain/node/releases/latest |grep browser_ |grep windows_binary |cut -d\" -f4)
unzip windows_binary.zip
```

2. Copy the executables (i.e.bnbchaind or bnbcli) to /usr/local/bin
3. Verify that everything is OK:
```shell
$ bnbchaind version
$ bnbcli version
```

### Option Two: Build binaries on your machine

1. Execute below commands.

```bash
git clone https://github.com/bnb-chain/node.git
cd node && make build
```
Then you will get binaries in ./build/ folder.

2. Copy the executables (i.e.bnbchaind or bnbcli) to /usr/local/bin
3. Verify that everything is OK:
```shell
$ bnbchaind version
$ bnbcli version
```

## Next
Now you can join the [mainnet](join-mainnet.md), the public testnet or create you own testnet
