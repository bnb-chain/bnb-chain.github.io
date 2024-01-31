# Slash

The BNB smart chain (BSC) is a blockchain network that aims to provide fast, secure, and reliable transactions. To
achieve this, the BSC relies on a set of validators who are responsible for producing and validating blocks. Validators
stake their BNB tokens to participate in the network and earn rewards.

However, validators also face the risk of losing their stakes if they behave in ways that could harm the network's
integrity and reliability. This is where the slashing mechanism comes in. The slashing mechanism is a set of rules and
functions implemented in the `StakeHub` contract 
(which is a system contract and the address is `0x0000000000000000000000000000000000002002`) 
that penalizes validators for violating certain conditions. The
slashing mechanism is crucial for maintaining the BSC network's security, reliability, and integrity.

The slashing mechanism covers three types of offenses: downtime, double signing, and malicious voting. Each offense has
a different severity and penalty, depending on the impact it has on the network. In this document, we will explain the
slashing conditions and mechanisms for each offense in detail.

## Downtime Slash

Validators are expected to maintain high availability to ensure the network's smooth operation. Validators failing to
meet these uptime requirements are subject to slashing.

- The `StakeHub` contract tracks validator uptime by measuring the number of blocks they sign within a certain window.
- If a validator fails to sign at least a minimum percentage of blocks within the window, they are considered offline.
- If a validator is offline for an extended period, beyond the acceptable thresholds defined in the contract, they will
  have their stakes slashed by a predetermined amount.
- The penalty for downtime is less severe than for double signing but is designed to encourage validators to maintain
  the necessary infrastructure for high availability.

## Double Sign Slash

A critical offense within the BSC network is when a validator signs two different blocks at the same height. Such
actions can lead to network forks, undermining the blockchain's security and consistency.

- The `StakeHub` contract monitors for double signing by validators by comparing the signatures and hashes of the blocks
  they sign.
- If a validator is caught double signing, the contract executes a slashing function, reducing the validator's stake and
  moving them to a "jailed" state, preventing them from participating in consensus until manual intervention is taken.
- The penalty for double signing is severe, with a significant portion of the validator's stake being slashed. This acts
  as a strong deterrent against such malicious behavior.

## Malicious Vote Slash

Validators voting maliciously, such as voting for invalid transactions or blocks, pose a threat to the network's
integrity. The BSC penalizes such actions to maintain the network's security and trustworthiness.

- The `StakeHub` contract is responsible for monitoring the votes cast by validators and verifying their validity and
  consistency.
- Votes identified as malicious trigger the slashing mechanism, reducing the offender's stake and potentially jailing
  the validator, depending on the severity of the offense.
- The penalty for malicious voting varies depending on the offense's nature and severity but serves as a deterrent
  against undermining the network's operation.