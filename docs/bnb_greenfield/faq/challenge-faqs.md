---
title: Challenger FAQ
description: An explanation of BNB Greenfield Challenger 
keywords: [BNB Greenfield validators, BNB Greenfield Challengers]
---

# Challenger FAQ

### Who is running Challenger?

Greenfield Blockchain Validators are running [Challengers](https://docs.bnbchain.org/greenfield-docs/docs/guide/greenfield-blockchain/run-node/run-testnet-relayer-and-challenger#preparation-1 ) for the network.

### How are challenges generated?
There are two ways to trigger challenges.
* Submit by users
* Randomly auto-generated via protocol

Check the details [here](https://docs.bnbchain.org/greenfield-docs/docs/guide/greenfield-blockchain/modules/data-availability-challenge#submitted-challenges)

### How much is slashed by a successful challenge?

Slash amount = `slash_amount_size_rate` * object size in GB

* if amount > slash_amount_max, the final amount is `slash_amount_max`
* if amount < slash_amount_min, the final amount is `slash_amount_min`,

Query this [API](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/challenge-params) to get the parameters. 

### How to query the status of a challenge?
Listen to the latest challenges with this [API](
https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/latest-attested-challenges).   
The challenge result is not saved on chain forever, only the latest `attestation_kept_count` will be kept on chain. The EventAttestChallenge will also be emitted for succeed challenges or heartbeat challenges.

Then, use this [API](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/attested-challenge) to query details. 

### How to avoid a successful challenge?
* Backup your database regularly
Keep [Challenger](https://docs.bnbchain.org/greenfield-docs/docs/guide/storage-provider/modules/downloader#challengepiecetask) service running to answer to challenges

