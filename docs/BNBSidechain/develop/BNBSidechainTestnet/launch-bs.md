---
title: Launch BNB Sidechain
id: launch-bs
---

# Launch BNB Sidechain

## Prerequisites

Before running command you must do following steps:
* Ensure you have a dedicated machine that have at least 8 dedicated CPU core and 32GB RAM, as it needs to run 7 nodes.
* Make sure you have a wildcard domain `*.example.com` set to your machine (use a dedicated machine with a public IP).
* Modify the `config.json` file to update parameters as you need (you can find all addresses in the keystore folder).

## Config file parameters

The config file structure is as such:

* `chainId` — identifier of your chain in BNB Sidechain.
* `validators` — list of initial validator set (make sure that you have the same list in docker compose file).
* `systemTreasury` — address of system treasury that accumulates 1/16 of rewards (might be governance).
   * `consensusParams` — parameters for the consensus and staking.
   * `activeValidatorsLength` — suggested values are (3k+1, where k is honest validators, even better): 7, 13, 19, 25, 31...
   * `epochBlockInterval` — length of an epoch, specified in blocks; recommmended length is 1 day (86400/3=28800, where 3s is block time).
   * `misdemeanorThreshold` — after missing this amount of blocks per day validator losses all daily rewards (penalty).
   * `felonyThreshold` — after missing this amount of blocks per day validator goes in jail for N epochs.
   * `validatorJailEpochLength` — how many epochs validator should stay in jail (7 epochs = ~7 days).
   * `undelegatePeriod` — allow claiming funds only after 6 epochs (~7 days).
   * `minValidatorStakeAmount` — how many tokens validator must stake to create a validator (in ETH).
   * `minStakingAmount` — minimum staking amount for delegators (in ETH).
* `initialStakes` — initial stakes fot the validators (must match with validators list).
* `votingPeriod` — default voting period for the governance proposals.
* `faucet` — map with initial balances for faucet and other needs.

## Launch 

You have two launching options:

* Default option
* Without a balance loader and SSL certificates

### Default option

You can check the Makefile to choose more interesting commands, but if you just need to set up everything, just run:
```
apt update
apt install build-essential socat
git clone https://github.com/bnb-chain/bas-devnet-setup bas --recursive
cd bas
DOMAIN_NAME=dev-02.bas.ankr.com make all
```

:::tip
The variable `DOMAIN_NAME` should be set to your domain.
:::

Deployed services can be access though next endpoints:
* https://rpc.${DOMAIN_NAME} (port 8545,9546) - Web3 RPC endpoint
* https://explorer.${DOMAIN_NAME} (port 4000) - Blockchain Explorer
* https://faucet.${DOMAIN_NAME} (port 3000) - Faucet
* https://staking.${DOMAIN_NAME} (port 3001) - Staking UI

### Without a balance loader and SSL certificates 

If you want to run a node without a load balancer and SSL certificates, run:
```
make all-no-balancer
```

## Exposed ports

Docker Compose files expose next ports:
* 7432 - Blockscout PostgreSQL database
* 4000 - Blockscout Explorer
* 3000 - Faucet UI
* 3001 - Staking UI
* 8545 - RPC endpoint
* 8546 - WS endpoint
* 30303 - Bootnode
