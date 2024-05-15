---
title: Data Integrity and Availability
order: 6
---

# Data Integrity and Availability
There are three crucial aspects of data management: **integrity**, **availability**, and **redundancy**. 

Below are some key points to ensure each aspect is met:
- The primary storage provider must correctly store the object uploaded by the user.
- The assigned data segments in both primary and secondary storage providers must be free of any loss, corruption, or counterfeit data.
- Erasure coding pieces in secondary providers should enable recovery of the original data in the primary storage provider.

To ensure data integrity and redundancy, checksum and redundancy setups must be established for objects. 
These setups constitute part of the objects' metadata and must be verified by the storage providers and users upon 
creating objects. The metadata will be stored on the Greenfield blockchain.

Collaboration between Greenfield and storage providers is crucial to ensure data integrity and availability, particularly in assigning data segments to primary and secondary storage providers. To increase user confidence that their data is stored as promised, Greenfield has introduced a ["Proof-of-Challenge"](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/data-availability-challenge.md) approach.

!!! info
    "Proof-of-Challenge" is proposed based on the assumptions: **Greenfield is a self-sustained, service-oriented ecosystem.**


Stakeholders can trigger challenges in various ways, such as through users or via random events on the Greenfield blockchain. 
Following a challenge, [Challenge Verifier](../introduction/introduction.md#challenge-verifier) must conduct an **off-chain audit** of challenged data from storage providers. The Verifier Consortium will vote on the challenge results, and the failed outcomes will reduce the corresponding storage providers' staked BNB. Participants who submitted the challenge and the verifier received rewards for their involvement in this process. Data that failed to pass a challenge will not face another challenge for a specific time to allow storage providers to restore the data.

[Data challenger module](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/data-availability-challenge.md) will elaborate further on challenges associated with data availability.