---
title: FAQs - BSC EVN
---

# FAQs

### How to get node’s NodeID?

    you can use the following command to query your enode information.
    ```bash
    ./bsc --exec "admin.nodeInfo.id" attach ./geth.ipc
    ```

### Can multiple validators share sentry nodes?

    Yes, for service providers who act as agents for multiple validators, they can use fewer sentries to achieve the same function. It is worth noting that the combination of validators and sentry is best to be in the same region machine. 

### Can a validator use multiple sentry nodes?

    Of course, multiple sentries improve redundancy and reduce message delays caused by single sentry failures. It is also recommended that validators connect to multiple fullnodes and other P2P nodes to receive more transactions and improve message redundancy.
