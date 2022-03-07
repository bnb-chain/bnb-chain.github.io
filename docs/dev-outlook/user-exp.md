---
sidebar_label: User Experience
sidebar_position: 2
---
# Imporvements for better User Experience

## User Experience
Besides the limitation of the block gas limit cap, the other major factor that can impact BSC capacity is the rate of fork. Fork and re-organization of the blockchain can be very costly for both validators and fullnode.

## Fast Finality
Although BSC is designed to produce blocks every 3 seconds, it is recommended to wait until more than half of the validator set has produced new blocks on the block before the block can be confirmed in a probabilistic manner. This will cost at least 3x11 = 33 seconds after the block is visible on the network.

As the validator set is well known every 24 hours, BSC can get a faster consensus on the longest chain based on the “attestation” from more than a certain percentage of the validator set considering it is the longest chain.

This essentially requires altering the “Parlia” consensus mechanism of BSC. A BEP candidate has been proposed by the community at [[WIP] BEP-97: Introduce Fast Finality Mechanism by KeefeL · Pull Request #126 · binance-chain/BEPs · GitHub](https://github.com/binance-chain/BEPs/pull/126) 