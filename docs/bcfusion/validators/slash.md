# Slash

The BNB smart chain (BSC) is a blockchain network that aims to provide fast, secure, and reliable transactions. To
achieve this, the BSC relies on a set of validators who are responsible for producing and validating blocks. Validators
stake their BNB tokens to participate in the network and earn rewards.

However, validators also face the risk of losing their stakes if they behave in ways that could harm the network's
integrity and reliability. This is where the slashing mechanism comes in. The slashing mechanism is a set of rules and
functions implemented in the `SlashIndicator` contract
(which is a system contract and the address is `0x0000000000000000000000000000000000001001`)
that penalizes validators for violating certain conditions. The `SlashIndicator` contract will also calls
the `StakeHub` contract,
another system contract with address `0x0000000000000000000000000000000000002002`, for slashing.

The slashing mechanism covers three types of offenses: downtime, double signing, and malicious voting. Each offense has
a different severity and penalty, depending on the impact it has on the network. In this document, we will explain the
slashing conditions and mechanisms for each offense in detail.

## Downtime Slash

Validators are expected to maintain high availability to ensure the network's smooth operation. Validators failing to
meet these uptime requirements are subject to slashing.

- A internal contract tracks validator uptime by measuring the number of blocks they sign within a certain window.
- If a validator fails to sign at least a minimum number of blocks within the window, they are considered offline and
  will be slashed for 10BNB and be moved to a "jailed" state for 2 days.

## Double Sign Slash

A critical offense within the BSC network is when a validator signs two different blocks at the same height. Such
actions can lead to network forks, undermining the blockchain's security and consistency.
Anyone can send a `submitDoubleSignEvidence` transaction to the `SlashIndicator` contract,
specifying the following information:

- **Header 1**: A header of BSC with a the validator's signed signature.
- **Header 2**: Another header of BSC signed by the validator. The two headers have the same height.

- The off-chain services monitor for double signing by validators by comparing the signatures and hashes of the blocks
  they sign.
- If a validator is caught double signing, the contract executes a slashing function, reducing the validator's stake for
  200BNB and moving them to a "jailed" state for 30 days, preventing them from participating in consensus until manual
  intervention is taken.

## Malicious Vote Slash

Validators who violates the [fast finality vote rules](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md)
will be also slashed.
Anyone can send a `submitFinalityViolationEvidence` transaction to the `SlashIndicator` contract,
specifying the following information:

- **Evidence**: The evidence proves the valiator violates the fast finality rules.

- The off-chain services monitor fast finality vote data to identify malicious votes.
- If a validator is caught for malicious vote, the validator will be slashed for 200BNB and move to "jailed" status for
  30 days.
