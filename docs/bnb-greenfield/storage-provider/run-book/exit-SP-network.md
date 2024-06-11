---
title: Exit Greenfield SP Network
---

This guide provides step-by-step instructions for SPs to exit the Greenfield NextWork on the Mainnet or Testnet, along with 
the necessary actions to be performed by both the exiting SP and the successor SP(s).

- [How to exit Greenfield network](#how-to-exit-greenfield-network)
  - [1. Declare the exit](#1-declare-the-exit)
  - [2. Data recovery](#2-data-recovery)
    - [2.1 ReserveSwapIn](#21-reserveswapin)
    - [2.2 Data Recovery](#22-data-recovery)
    - [2.3 CompleteSwapIn](#23-completeswapin)
  - [3. Finalize the Exit](#3-finalize-the-exit)

## How to exit Greenfield network
When an SP decides to exit the Greenfield network, there are three main steps to go through, involving both the exiting SP and other SPs in the network:

1. Declare the exit
2. Data recovery by successor SP(s)
3. Finalize the exit

### 1. Declare the exit 

The exiting SP needs to initiate an `StorageProviderExit` transaction to Greenfield blockchain, which will turn its status to `STATUS_GRACEFUL_EXITING`.

To exit the network, you can use the following commands based on the desired network:

=== "Mainnet"

    ```
    rpcAddr = "https://greenfield-chain.bnbchain.org:443"
    chainId = "greenfield_1017-1"
    ```

=== "Testnet"

    ```
    rpcAddr = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    chainId = "greenfield_5600-1"
    ```


Command for storage provider to exit:
```shell
gnfd-sp spExit [command options] [arguments...]
```
Example:
```shell
./build/bin/gnfd-sp spExit --config ./config.toml
```

### 2. Data recovery

For SPs interested in becoming successors, you need to perform the following data recovery steps:

#### 2.1 ReserveSwapIn

The perspective successor SP needs to determine Global Virtual group(GVG) and Global Virtual Group Family(VGF) that exiting SP has, 
This information can be obtained from [GreenfieldScan](https://greenfieldscan.com/account/0x2901fddef924f077ec6811a4a6a1cb0f13858e8f?tab=gvg) or by using the provided CLI.

Usage:
```shell
# List the GVG that the exit SP act as secondary SP
./gnfd-sp query-gvg-by-sp [command options] [arguments...]
# List the GVG Family that the exit SP act as primary SP
./gnfd-sp query-vgf-by-sp [command options] [arguments...]
```
Example:
```shell
# List the GVG that the exit SP(id=1) act as secondary SP
./gnfd-sp query-gvg-by-sp --config ./config.toml -sp 1
# List the GVG Family that the exit SPP(id=1) act as primary SP
./gnfd-sp query-vgf-by-sp --config ./config.toml -sp 1
```

Once the successor SP has obtained the necessary information, it needs to reserve the position in the exit SP's GVG Family or GVG.

Usage:
```shell
# Reserve the exit SP's position in GVG family or GVG
./gnfd-sp swapIn [command options] [arguments...]
```

Example:
```shell
# Reserve the exit SP's(id=1) position in GVG family(id=1)
./gnfd-sp swapIn --config ./config.toml -f 1 -sp 1
# Reserve the exit SP's(id=1) position in GVG(id=1)
./gnfd-sp swapIn --config ./config.toml --gid 1 -sp 1
```

#### 2.2 Data Recovery

The data recovery process is triggered by the successor SP using the following commands:

Usage:
```shell
./gnfd-sp recover-vgf [command options] [arguments...]
./gnfd-sp recover-gvg [command options] [arguments...]
```
Example:
```shell
# To recover the exit SP's data in the VGF(id=1) as a primary SP:
./gnfd-sp recover-vgf --config /config/config.toml -f 1
# To recover the exit SP's data in the GVG(id=1) as a secondary SP:
./gnfd-sp swapIn --config ./config.toml --gid 1
```
Once the recovery job is triggered, it will run in the background in the SP Manager module. The progress can be queried using the following command:

Usage:
```shell
./gnfd-sp query-recover-p [command options] [arguments...]
```
Example:
```shell
# Query the GVG family(id=1) recover progress 
./gnfd-sp recover-vgf --config /config/config.toml -f 1
# Query the GVG(id=1) recover progress
./gnfd-sp recover-vgf --config /config/config.toml --gid 1
```

#### 2.3 CompleteSwapIn

Upon completion of the data recovery process and successful verification, the successor SP needs to send a `CompleteSwapIn`
transaction to the Greenfield blockchain, it will be automatically conducted before the recover process concludes,
This will finalize the recovery process and allow the successor SP to take over the position in the GVG Family or GVG.

!!! note
    It is crucial to note that under no circumstances should the `CompleteSwapIn` be triggered manually if the successor SP 
    has not completed the data recovery process but acknowledges it. Doing so may result in data availability challenges and 
    potential loss of funds. 

### 3. Finalize the Exit
Once the successor SP has completed the data recovery process and taken over the position in the GVG Family or GVG, by checking the 
GVG statistic of exitting SP, confirm that there are no more GVGs associated with it. Anyone in Greenfield network can 
send a `CompleteStorageProviderExit` transaction to the Greenfield blockchain to finalize its exit from the network.
Below shows the CLI triggered by exiting SP itself.

Usage:
```shell
./gnfd-sp completeSpExit [command options] [arguments...]
```

Example:
```shell
./gnfd-sp completeSpExit --config /config/config.toml
```

