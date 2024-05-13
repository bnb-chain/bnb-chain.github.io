---
title: Challenge
order: 9
---

# Challenge

## Abstract
The challenge module is responsible for handling on-chain challenges that are either generated or submitted by users.

Users can submit a challenge and query the latest attested challenges through cli commands.

## Quick Start

### Submit a Challenge

When you find your stored object is tampered or missing, you can submit a challenge by the following command:

```shell
gnfd tx challenge submit ${sp-operator-address} ${bucket-name} ${object-name} ${random-index} ${segment-index} --from ${key} --node ${node} -y
```

${key} is the name of local key.

${bucket-name} and ${object-name} specify which object you want to submit challenge for.

${random-index} ${segment-index} specify which segment of the object you want to submit challenge for. If you do not know the index, you can set ${random-index} to `true`.

${node} is the rpc address of a Greenfield node.

=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```


## Detailed CLI

A user can query and interact with the `challenge` module using the CLI.

### Query

The `query` commands allow users to query `challenge` state.

```sh
gnfd query challenge --help
```

#### params

The `params` command allows users to query the current settings for the `challenge` module.

```sh
gnfd query challenge params [flags] 
```

Example:

```sh
gnfd query challenge params --node https://greenfield-chain.bnbchain.org:443
```

Example Output:

```yml
params:
  attestation_inturn_interval: "600"
  attestation_kept_count: "300"
  challenge_count_per_block: "1"
  challenge_keep_alive_period: "300"
  heartbeat_interval: "200"
  reward_submitter_ratio: "0.001000000000000000"
  reward_submitter_threshold: "1000000000000000"
  reward_validator_ratio: "0.900000000000000000"
  slash_amount_max: "100000000000000000"
  slash_amount_min: "10000000000000000"
  slash_amount_size_rate: "0.008500000000000000"
  slash_cooling_off_period: "300"
  sp_slash_counting_window: "43200"
  sp_slash_max_amount: "500000000000000000"
```

#### latest-attested-challenges  

The `latest-attested-challenges` command allows users to query the latest challenges that have been attested by validators.

Be noted, only the latest `attestation_kept_count` challenges will be returned.

```sh
gnfd query challenge latest-attested-challenges [flags]
```

Example:

```sh
gnfd query challenge latest-attested-challenges --node https://greenfield-chain.bnbchain.org:443
```

Example Output:

```yml
 - id: "400"
   result: CHALLENGE_FAILED
 - id: "461"
   result: CHALLENGE_SUCCEED
```

#### attested-challenge

The `attested-challenge` command allows users to query a specific challenge that have been attested by validators.

Be noted, for the challenge results will be pruned, only the challenge within the latest `attestation_kept_count` 
challenges will be used to serve this query.

```sh
gnfd query challenge attested-challenge [id] [flags]
```

Example:

```sh
gnfd query challenge attested-challenge 1 --node https://greenfield-chain.bnbchain.org:443
```

Example Output:

```yml
 - id: "400"
   result: CHALLENGE_FAILED
```

#### inturn-attestation-submitter

The `inturn-attestation-submitter` command allows users to query the off-chain challenger service that is currently in charge of attesting.   

```sh
gnfd query challenge inturn-attestation-submitter [flags]
```

Example:

```sh
gnfd query challenge inturn-attestation-submitter --node https://greenfield-chain.bnbchain.org:443
```

Example Output:

```yml
bls_pub_key: 828e81c5c39..
submit_interval:
  end: "1681960490"
  start: "1681960480"
```

### Transactions

The `tx` commands allow users to interact with the `challenge` module.

```sh
gnfd tx challenge [command] --help
```

#### submit

The `submit` command allows users to submit a challenge for an object stored by any storage provider.

```sh
gnfd tx challenge submit [sp-operator-address] [bucket-name] [object-name] [random-index] [segment-index] [flags]
```

Example:

```sh
gnfd tx challenge submit 0x950E2FBD285BC42E30EA69A8C1AB17EEDC70C447 ch69bd3t tq true 0 --node https://greenfield-chain.bnbchain.org:443 --from alice
```

After the tx submitted, you can find the challenge id in `greenfield.challenge.EventStartChallenge` event by accessing https://greenfield-chain.bnbchain.org:443/tx?hash=0x_prefixed_tx_hash.

Usually the challenge will be handled within minutes, and the result of the challenge can be queried using the following command. 
However, be noted, the result is not kept forever, and only the latest `attestation_kept_count` challenge results will be kept.

```shell
gnfd query challenge latest-attested-challenges --node https://greenfield-chain.bnbchain.org:443 
```

The result of the challenge can be queried by the above query commands, or using the the `AttestedChallenge`, `LatestAttestedChallenges` methods through [GRPC swagger](https://greenfield-chain.bnbchain.org/openapi).
