---
title: Quick Guide - BNB Greenfield Develop
description: Quick guide for BNB Greenfield developers. You will understand what you need to build your project.
keywords: [BNB Greenfield development, data storage development]
order: 8
---

Here’s a quick guide to get you from zero to hero. This doc provides a guide to the following ideas:

* Greenfield & Programmability concepts

* Understand what you need to build your project

* Access resources to get you started

## Greenfield & Programmability Concepts

### Greenfield 101

Read Greenfield Overview [here](../introduction.md)

### Uniform Address Format

Greenfield defines its [account](../core-concept/accounts.md) in the same format as BSC and Ethereum. It starts with ECDSA secp256k1 curve for keys and is compliant with [EIP84](https://github.com/ethereum/EIPs/issues/84) for full [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) paths.


### Account Operation

Create a greenfield account, deposit BNB, and program [token transfers](../getting-started/token-transfer.md).

* [GO-SDK Example](https://github.com/bnb-chain/greenfield-go-sdk/blob/master/examples/basic.go)
* [JS-SDK Example](https://docs.bnbchain.org/greenfield-js-sdk/api/account)


### Data storage

Create a public bucket to upload and share objects.

* [Greenfield CLI Example](./tutorials/file-management-overview.md)
* [GO-SDK Example 1](tutorials/app/file-management/basic-file-management.md) and [GO-SDK Example 2](https://github.com/bnb-chain/greenfield-go-sdk/blob/v1.1.1/examples/storage.go)
* [JS-SDK Bucket API](https://docs.bnbchain.org/greenfield-js-sdk/api/bucket) and [JS-SDK Object API](https://docs.bnbchain.org/greenfield-js-sdk/api/object)



### Permission control

Create a private bucket and share it with specific individuals.

* [Greenfield CLI Example](./tutorials/access-control/cmd-access-control.md)
* [GO-SDK Example](https://github.com/bnb-chain/greenfield-go-sdk/blob/v1.1.1/examples/permission.go)
* [JS-SDK Example](https://docs.bnbchain.org/greenfield-js-sdk/api/bucket#putbucketpolicy-) and [JS-SDK API](https://docs.bnbchain.org/greenfield-js-sdk/api/object#putobjectpolicy-)

### Enhanced permission control

- Create a group, add members, and share the private bucket.

	* [GO-SDK Example](https://github.com/bnb-chain/greenfield-go-sdk/blob/v1.1.1/examples/group.go)
	* [JS-SDK Group API](https://docs.bnbchain.org/greenfield-js-sdk/api/group)

- Resource management with smart contracts: Understand the concepts of [resource mirroring](../for-developers/cross-chain-integration/mirror-concept.md)

### Cross-chain Programmability

- Understand the [programmability concepts](../core-concept/programmability.md)
- Understand [mirror resource from Greenfield to EVM chains](./cross-chain-integration/mirror-concept.md)
- Understand [program resource through Smart Contract](./cross-chain-integration/interface.md)
- Follow Smart Contract SDK [tutorial](tutorials/access-control/cross-chain-access-control-by-cmd.md)
- Showcase: [Data Marketplace](tutorials/app/data-marketplace.md)


## Developer Starter Kit

### API

- [Greenfield Chain API Docs](https://greenfield.bnbchain.org/openapi)
- [Greenfield SP API Docs](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/docs/storage-provider-rest-api)

### SDK

- [Greenfield Go SDK](apis-and-sdks/sdk-go.md), more details refer to [Go SDK Docs](https://pkg.go.dev/github.com/bnb-chain/greenfield-go-sdk).
- [Greenfield Javascript SDK](apis-and-sdks/sdk-js.md), more details refer to [JS SDK Docs](https://docs.bnbchain.org/greenfield-js-sdk/).

## Setup

- [Key management](../core-concept/accounts.md#key-management)
- [Transfer](../getting-started/token-transfer.md) between greenfield address
- [Token bridge](https://dcellar.io/wallet)

### Developer Resource

- [Developer Tooling](https://www.bnbchain.org/en/dev-tools?chain=greenfield)

- Explore datasets with [explorer](https://greenfieldscan.com/) or [dcellar.io ](https://dcellar.io/)

- [RPC list](network-endpoint/endpoints.md)

- [Bundle service](https://docs.nodereal.io/docs/greenfield-bundle-service)

- [Web hosting](https://docs.4everland.org/hositng/what-is-hosting/greenfield-hosting#id-4everland-greenfield-hosting)

- Data Marketplace boilerplate
  	- [Frontend](https://github.com/bnb-chain/greenfield-data-marketplace-frontend)
    - [Smart Contracts](https://github.com/bnb-chain/greenfield-data-marketplace-contracts)

### Storage onramp

[https://dcellar.io/](https://dcellar.io/)

