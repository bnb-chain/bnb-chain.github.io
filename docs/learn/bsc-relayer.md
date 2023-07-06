# BSC Relayer
Relayers are responsible for submitting Cross-Chain Communication Packages between the two blockchains, BNB Smart Chain (BSC) and BNB Beacon Chain (BC). Due to the heterogeneous parallel chain structure, two different types of Relayers are created.

Relayers for BC-to-BSC communication referred to as **BSC Relayers** are a standalone process that can be run by anyone, and anywhere, except that Relayers must register themselves onto BSC and deposit a certain amount of BNB. Only relaying requests from the registered Relayers will be accepted by BSC.

**GitHub Implementation link:** <https://github.com/bnb-chain/bsc-relayer>

**Config Files:** <https://github.com/bnb-chain/bsc-relayer-config>
