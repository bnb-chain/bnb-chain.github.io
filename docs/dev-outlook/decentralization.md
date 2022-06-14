---
sidebar_label: Decentralization Further
sidebar_position: 2
---

# Decentralization Further

## Candidate ValidatorSet
In order to decentralize the network further, more validators should be introduced. Besides increasing the anti-censorship, it always increases the robustness and availability of the network. BSC should survive even if more than half of the validator set were censored or taken down in a hostile way.

Meanwhile BSC has 21 active validators and many inactive validators. The inactive validators have no reward so the incentive for the runner to ensure the node quality and the delegation from the BNB holders are not enough.

BSC will introduce more validators, e.g. another 20 inactive validators, into the validator set as backups, which will be called “Candidates”.

Candidates will produce blocks and charge gas fees in BSC mainnet, but in a much less chance than the official validator set of 21 elected. The unavailable candidates will be slashed as well though in a smaller size. A decent motivation is expected to be maintained so that the candidate validators are willing to ensure the quality and help secure BSC.

In an extreme case, if a majority of the active 21 validators get attacked and offline, Candidate Validators can report to Beacon Chain about the stale blocking, resume it and eventually propose a re-election of active validator set.

## Temporary Maintenance Mode for Validators
Due to the design of ‘Parlia’ consensus, the absence of the validator, even if it is due to scheduled maintenance, will cause instability and capacity of BSC due to the extra waiting time and chain reorganization.

Here a “Temporary maintenance” mode should be introduced, which is supposed to last a few minutes to half an hour. The validator can claim to the network about its planned maintenance. Its seat will be temporarily dropped from the block producing rotation, though it will still be slashed.