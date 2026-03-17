---
title: FAQs - BSC EVN
---

# FAQs

### Q1: How to get node’s NodeID?

you can use the following command to query your enode information.
```bash
./bsc --exec "admin.nodeInfo.id" attach ./geth.ipc
```

### Q2: Can multiple validators share sentry nodes?

Yes, for service providers who act as agents for multiple validators, they can use fewer sentries to achieve the same function. It is worth noting that the combination of validators and sentry is best to be in the same region machine. 

### Q3: Can a validator use multiple sentry nodes?

Of course, multiple sentries improve redundancy and reduce message delays caused by single sentry failures. It is also recommended that validators connect to multiple fullnodes and other P2P nodes to receive more transactions and improve message redundancy.

### Q4: How to register other key ecosystem player into EVN network
As only validator can register evn nodeid, so they can ask validator's help to register for them. It could be useful for some key users like mev-builders, infra providers... But there is a limitation on the number of evn nodeids that each validator can register, by default it is 5, but it can be changed by governance.
