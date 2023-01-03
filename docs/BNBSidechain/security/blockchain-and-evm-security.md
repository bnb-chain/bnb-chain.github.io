---
sidebar_label: Blockchain and EVM Security
---

# Blockchain and EVM security

## Blockchain

BNB Sidechain solves the blockchain security problem by using the BSC code BNB Sidechain for its default template applied when creating a BNB Sidechain instance, which is audited by [Beosin](https://github.com/Ankr-network/bas-genesis-config/blob/master/audit/2022-04-27-Beosin.pdf) and Certik.

## EVM

BNB Sidechain solves the virtual machine security problem by fully trusting EVM (Ethereum Virtual Machine) from the official Go-Ethereum codebase.

EVM is a well-tested product that is used by the entire blockchain community and was audited thousands of times.

BNB Sidechain doesn't rely on some third-party services that can manage staking and governance for the BNB Sidechain chain. 
Instead, it implements all staking- and governance-specific logic right in the smart contracts. 
It means that staking, governance, and rewards distribution are fully managed and verified by the EVM runtime environment.

To prove the absence of vulnerabilities and bugs in the code, we're passing several auditions.
So far, you can read [audit details on BNB Sidechain system smart contracts](https://assets.ankr.com/bas/system_smart_contracts_security_audit.pdf).
