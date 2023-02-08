---
sidebar_label: Decentralized Storage
sidebar_position: 2
hide_table_of_contents: false
---

# Potential UseCase: Decentralized Storage

BNB Greenfield should first be a convenient, decentralized storage infrastructure with decent service quality.

## Web Hosting and Personal Cloud Drive

Since BNB Greenfield provides APIs and concepts that are very similar to AWS S3, it is not hard for users to deploy their websites easily onto it and manage convenient billing via BNB.

With a sophisticated client application, users can also create their own network drive with their addresses. They can upload and download their files, photos, and videos via their desktop and mobile devices and
categorize these data with different buckets. The data can be encrypted with their private keys and restricted access to themselves only.

A good feature of Greenfield as cloud storage is that it allows community-sponsored data storage. The data owner can put an object public, while other users can sponsor the storage and download bandwidth
as they wish. This is not something that can be easily done with the current centralized cloud providers. Open-source software mirrors can be set up on Greenfield. Websites for social good can be run more easily.

## Data Availability Layer for Public Blockchain

The data availability layer is a hot topic in 2022 for a few reasons:

**1.** Layer 1 data, both block data, and state data has accumulated too much;

**2.** Layer 2 rollup solutions require low-cost, trustless, or close to trustless storage for the rollup data;

**3.** modularized blockchains hope a standalone data layer can scale the total capacity up.

### Layer 1 Blockchain Data Swapping

BNB Chain ecosystem, especially BSC itself, is particularly interested in the #1 and #2. Among all public general blockchains, BSC is the largest computing blockchain in terms of state data, unique addresses,
smart contracts, total transactions, and daily active users. The total historic data of BSC was already more than several dozen terabytes in 2022.

Among all these data, some are stale, dead, or dormant. They will never be used or only be used in rare cases. They should not always take up space together with other active data or bring in performance pressure.

Similar to modern PC operating systems, such stale data should be swapped out to long-term and cheaper storage, such as Greenfield. Special transactions, EVM opCode, and corresponding economics can be
introduced to achieve the consensus to swap these data out. When any user or smart contract wants to operate on these swap-out data, an error of "page fault" will be triggered and users should explicitly swap in
the data from Greenfield back to BSC. These ideas are being considered by BSC Core Dev already.

### Data Availability Layer for the Layer 2 Rollups

Similar to Ethereum, BSC also welcomes Layer 2 Rollups as the solution to scale the total computing power and ledger size. Storing data on BSC is cheaper than Ethereum, but it can be much more effective if there is
a common storage infrastructure that is reliable and verifiable. Such infrastructure and corresponding data availability layer management can significantly reduce the cost of the rollups.

### Snapshots and Block Data Backups

Data storage for the long term was not a topic that was seriously considered when blockchain was invented. However, it has become a problem today. Most developers prefer to run a blockchain node from a snapshot, instead of running for months from the genesis. Many networks, including Ethereum, have been researching that the block and historic data that has existed for more than a certain time should be allowed to drop. The community needs a publicly accessible and credible data source to read these very old data and recent snapshots. BNB Greenfield can be a good option. Its sponsorship feature is natural for this data of
social good.