# Verify Merkle Tree Proofs

The [BEP299](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-299.md) describes how to recover 
the bound BEP2/BEP8 on the BSC afer the fusion. One of the most important steps is to generate and verify 
the Beacon Chain merkle tree proofs. If a wrong merkle tree root is generated, the bound BEP2/BEP8 
cannot be recovered and there will a huge financial loss.

Therefore, the communities are encouraged to use the following tools to verify the proofs and report any issues.

To do the verification, please follow the detailed steps in the following links:

* https://github.com/bnb-chain/node-dump/blob/master/Readme.md

* https://github.com/bnb-chain/node-dump/blob/master/docs/verification.md