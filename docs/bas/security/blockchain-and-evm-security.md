---
sidebar_label: Blockchain and EVM Security
---

# Blockchain and EVM security

> Provided by Ankr

## Blockchain

BAS solves the blockchain security problem by using the BSC codebase for its default template applied when creating a BAS instance.

BSC is a well-tested, audited, affordable, and scalable solution, which closes all the target security and financial points. 

In its turn, BSC uses BNB Chain with Cosmos SDK under the hood and relies on its security model.

## EVM

BAS solves the virtual machine security problem by fully trusting EVM (Ethereum Virtual Machine) from the official Go-Ethereum codebase.

EVM is a well-tested product that is used by the entire blockchain community and was audited thousands of times.

BAS doesn't rely on some third-party services that can manage staking and governance for the BAS chain. 
Instead, it implements all staking- and governance-specific logic right in the smart contracts. 
It means that staking, governance, and rewards distribution are fully managed and verified by the EVM runtime environment.

To prove the absence of vulnerabilities and bugs in the code, we're passing several auditions.
So far, you can read [audit details on BAS system smart contracts](https://assets.ankr.com/bas/system_smart_contracts_security_audit.pdf).
