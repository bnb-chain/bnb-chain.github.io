---
sidebar_label: Using Venly  
hide_table_of_contents: false  
sidebar_position: 4
---

# Using Venly NFT-API to Mint NFTs on BSC

![Minting NFTs on Binance Smart Chain](https://github.com/bnb-chain/bnb-chain.github.io/assets/139292301/04e09159-9c6d-46c0-991b-4f56d064ccb7)

## What we cover in this guide

In this guide, we will explain how to authenticate to our API service, create a contract on the BSC testnet, and create/mint your first NFT on Binance Smart Chain (testnet). We will walk you through several endpoints to help you get started.

## Prerequisites

1. You need a Venly business account, if you don't have one, click [here](https://portal.venly.io) to register in our Developer Portal, or follow our step-by-step guide, [Getting Started with Venly](https://venly.readme.io/docs/getting-started).
2. You need an active **trial** or **paid subscription** of the NFT-API. You can start a 30-day free trial for the NFT-API.
3. You need your **Client ID** and **Client Secret** which can be obtained from the Portal.

> All the API calls for this guide run on a sandbox environment. You can test and experiment with API calls without causing any harm to the actual blockchain or data.

There are several ways to run API calls, but for this guide, you can use the [API-Reference](https://docs.venly.io/reference) or [Postman](https://www.postman.com/) to execute the different endpoints.

## 1\. Authenticating

To obtain a bearer token and authorize all API calls, you will need your Client ID and Client Secret. These credentials are necessary for authentication purposes.

> [Click here to learn how to retrieve a bearer token and authenticate API calls.](https://docs.venly.io/reference/how-to-get-bearer-token)

Please note that the base path for all NFT API endpoints is **`https://nft-api-sandbox.venly.io`**

## 2\. Creating a Contract on the BSC Testnet Chain

Let's start by defining your first contract. This contract will represent a collection for the NFTs. We will create a contract on the **BSC**  testnet chain.

> As the API calls are running in a sandbox environment, the contract will be created on a testnet chain. In this example we will create an NFT contract on the BSC testnet chain.

### Request Endpoint: [reference](https://docs.venly.io/reference/deploycontract-1)

```https
 POST /api/v2/contracts/deployments
```

### Request Body:

| Parameter     | Description                                                             | Type   | Required |
| :------------ | :---------------------------------------------------------------------- | :----- | :------- |
| `name`        | The name of your NFT collection/contract                                | String | ✅        |
| `description` | The description of your NFT collection/contract                         | String | ✅        |
| `image`       | The image URL for your NFT collection/contract that will be displayed   | String | ✅        |
| `externalUrl` | This can be any link such as a link to your website, landing page, etc. | String | ✅        |
| `chain`       | This is the blockchain on which you want to create the contract on      | String | ✅        |

```json
{
  "name": "NFT Collection",
  "description": "Sample description",
  "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
  "externalUrl": "www.venly.io",
  "chain": "BSC"
}
```

### Response Body:

> Save the `result.id` from the response body. This is the **Deployment ID** used to track the status of the contract creation request.

```json
{
    "success": true,
    "result": {
        "name": "NFT Collection",
        "description": "Sample description",
        "id": "5da1e825-ecfb-484a-9638-9fab7caee7fd",
        "secretType": "BSC",
        "symbol": "NFCO",
        "externalUrl": "www.venly.io",
        "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
        "media": [],
        "transactionHash": "0x84af5436ac576d576459730adf109a0aa04af6e93f2d565351ad5040662b23e0",
        "status": "PENDING",
        "storage": {
            "type": "cloud",
            "location": "https://metadata-qa.venly.io/metadata/contracts/11794"
        },
        "contractUri": "https://metadata-qa.venly.io/metadata/contracts/11794",
        "external_link": "www.venly.io"
    }
}
```

## 3\. Check the status of the contract/collection

This endpoint is used to check the status of a contract/collection on v2. The `{deploymentId}` in the path is for tracking the status of contract creation. It is in the response body of the create contract/collection endpoint as **result.`id`**.

### Request Endpoint: [reference](https://docs.venly.io/reference/getcontract_1-1)

```https
GET /api/v2/contracts/deployments/{deploymentId}
```

### Example Request

```https
GET /api/v2/contracts/deployments/5da1e825-ecfb-484a-9638-9fab7caee7fd
```

### Response Body

> In the response body look for the **result.`status`** parameter. It can have three possible values:
> 
> - `SUCCEEDED`
> - `PENDING`
> - `FAILED`

```json
{
    "success": true,
    "result": {
        "name": "NFT Collection",
        "description": "Sample description",
        "address": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
        "id": "5da1e825-ecfb-484a-9638-9fab7caee7fd",
        "secretType": "BSC",
        "symbol": "NFCO",
        "externalUrl": "www.venly.io",
        "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
        "media": [],
        "transactionHash": "0x84af5436ac576d576459730adf109a0aa04af6e93f2d565351ad5040662b23e0",
        "status": "SUCCEEDED",
        "storage": {
            "type": "cloud",
            "location": "https://metadata-qa.venly.io/metadata/contracts/11794"
        },
        "contractUri": "https://metadata-qa.venly.io/metadata/contracts/11794",
        "external_link": "www.venly.io"
    }
}
```

## 4\. Creating Token-type

Next, we will create a token-type which serves as a template for minting NFTs. This means you just have to define the NFT template once with parameters like its name, image, attributes, etc, and then you can mint multiple NFTs directly to your end-users wallets. 

Defining token types helps structure the information such as [attributes ](https://docs.venly.io/docs/nft-attributes)and [animationUrls](https://docs.venly.io/docs/animation-media).

### Request Endpoint: [reference](https://docs.venly.io/reference/createtokentype)

```https HTTP
POST /api/v2/token-types/creations
```

### Request Body:

| Parameter               | Description                                                            | Type             | Required |
| :---------------------- | :--------------------------------------------------------------------- | :--------------- | :------- |
| `secretType`            | The blockchain of the contract                                         | String           | ✅        |
| `contractAddress`       | The contract address under which you want to create the token-type     | String           | ✅        |
| `creations`             | An array of objects that can define one or multiple token-type details | Array of objects | ✅        |
| `creations.name`        | The name of the token-type                                             | String           | ✅        |
| `creations.description` | The description of the token-type                                      | String           | ❌        |
| `creations.image`       | The image URL for the token-type that will be displayed                | String           | ❌        |

```json
{
  "secretType": "BSC",
  "contractAddress": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
  "creations": [
    {
      "name": "BSC Token-type",
      "description": "Venly",
      "image": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png"
    }
  ]
}
```

### Response Body:

> - Save the `result.creations.id` from the response body. This is the token **Creation ID** and it's used to track the status of the token-type creation request.
> - The `status` attribute indicates the token-type creation status.

```json
{
    "success": true,
    "result": {
        "creations": [
            {
                "id": "3dda6999-3110-400c-8564-0bfbe0bb604d",
                "status": "PENDING",
                "tokenTypeId": 1,
                "metadata": {
                    "name": "BSC Token-type",
                    "description": "Venly",
                    "image": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
                    "imagePreview": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
                    "imageThumbnail": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
                    "animationUrls": [],
                    "attributes": [
                        {
                            "type": "system",
                            "name": "tokenTypeId",
                            "value": "1",
                            "traitType": "Token Type ID",
                            "trait_type": "Token Type ID"
                        }
                    ],
                    "contract": {
                        "address": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
                        "name": "NFT Collection",
                        "symbol": "NFCO",
                        "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                        "imageUrl": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                        "image_url": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                        "description": "Sample description",
                        "externalLink": "www.venly.io",
                        "external_link": "www.venly.io",
                        "externalUrl": "www.venly.io",
                        "external_url": "www.venly.io",
                        "media": [],
                        "type": "ERC_1155"
                    },
                    "fungible": false
                }
            }
        ]
    }
}
```

## 5\. Check the status of token-type

This endpoint is used to check the status of token-type creation. The `{creationId}` in the path is for tracking the status of token-type creation. It is in the response body of the create token-type endpoint as **result.`id`**.

### Request Endpoint: [reference](https://docs.venly.io/reference/gettokentype)

```https
GET /api/v2/token-types/creations/{creationId}
```

### Example Request

```https
GET /api/v2/token-types/creations/3dda6999-3110-400c-8564-0bfbe0bb604d
```

### Response Body

> In the response body look for the **result.`status`** parameter. It can have three possible values:
> 
> - `SUCCEEDED`
> - `PENDING`
> - `FAILED`

```json
{
    "success": true,
    "result": {
        "id": "3dda6999-3110-400c-8564-0bfbe0bb604d",
        "status": "SUCCEEDED",
        "transactionHash": "0x630765e565958fc5cd845f58db9753f34b87f3e0bc8b5a74e85d52b4e4655d9a",
        "tokenTypeId": 1,
        "mints": [],
        "metadata": {
            "name": "BSC Token-type",
            "description": "Venly",
            "image": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imagePreview": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imageThumbnail": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "animationUrls": [],
            "attributes": [
                {
                    "type": "system",
                    "name": "tokenTypeId",
                    "value": "1",
                    "traitType": "Token Type ID",
                    "trait_type": "Token Type ID"
                }
            ],
            "contract": {
                "address": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
                "name": "NFT Collection",
                "symbol": "NFCO",
                "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "imageUrl": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "image_url": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "description": "Sample description",
                "externalLink": "www.venly.io",
                "external_link": "www.venly.io",
                "externalUrl": "www.venly.io",
                "external_url": "www.venly.io",
                "media": [],
                "type": "ERC_1155"
            },
            "fungible": false
        }
    }
}
```

## 6\. Minting an NFT on BSC Testnet Chain

### Request Endpoint: [reference](https://docs.venly.io/reference/minttokens)

```https HTTP
 POST /api/v2/contracts/deployments
```

### Request Body:

| Parameter              | Param Type | Description                                                                                                 | Type             | Required |
| :--------------------- | :--------- | :---------------------------------------------------------------------------------------------------------- | :--------------- | :------- |
| `contractAddress`      | Body       | The contract address                                                                                        | String           | ✅        |
| `secretType`           | Body       | The blockchain of the contract                                                                              | String           | ✅        |
| `tokenTypeId`          | Body       | This is the `ID` of the **token-type**. You can get it from the response body when you create a token-type. | String           | ✅        |
| `destinations`         | Body       | The array which includes all the wallet addresses and the number of NFTs to mint per wallet address         | Array of objects | ✅        |
| `destinations.address` | Body       | The wallet address to mint and send the NFT                                                                 | String           | ✅        |
| `destinations.amount`  | Body       | The number of NFTs you want to mint and send                                                                | Integer          | ✅        |

```json
{
  "contractAddress": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
  "secretType": "BSC",
  "tokenTypeId": "1",
  "destinations": [
    {
      "address": "0xcdA9e3959E7f9c58D2a2088b8F7C9F1C60B1Bd24",
      "amount": 1
    }
  ]
}
```

> - Make sure the destinations.`address` (_wallet address_) has the same chain as the contract. In this case, it should be a **BSC** wallet(Binance Smart Chain).
> - **NOTE**: The `contractAddress`, `secretType` (_blockchain_), and the `tokenTypeId` are defined in the request body.

### Response Body:

> - Under the `mints` array, you can find the `id` (_mintId_) for each minted NFT listed with the wallet address. This unique `id` can be used to track the status of the mint request.
> - The `status` attribute indicates the on-chain token mint status.

```json
{
    "success": true,
    "result": {
        "mints": [
            {
                "id": "778a3b09-64a8-45d9-a581-7716020f7fda",
                "createdOn": "2024-04-25T10:38:37.215647494",
                "status": "PENDING",
                "destination": {
                    "address": "0xcdA9e3959E7f9c58D2a2088b8F7C9F1C60B1Bd24",
                    "amount": 1
                }
            }
        ],
        "metadata": {
            "name": "BSC Token-type",
            "description": "Venly",
            "image": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imagePreview": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imageThumbnail": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "animationUrls": [],
            "attributes": [
                {
                    "type": "system",
                    "name": "tokenTypeId",
                    "value": "1",
                    "traitType": "Token Type ID",
                    "trait_type": "Token Type ID"
                }
            ],
            "contract": {
                "address": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
                "name": "NFT Collection",
                "symbol": "NFCO",
                "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "imageUrl": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "image_url": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "description": "Sample description",
                "externalLink": "www.venly.io",
                "external_link": "www.venly.io",
                "externalUrl": "www.venly.io",
                "external_url": "www.venly.io",
                "media": [],
                "type": "ERC_1155"
            },
            "fungible": false
        }
    }
}
```

## 7\. Check the status of NFT mints

This endpoint is used to check the status of NFT mints. The `{mintId}` in the path is for tracking the status of the NFT mint. It is in the response body of the Mint Fungible or Non-Fungible Tokens endpoint as **result.mints.`id`**.

### Request Endpoint: [reference](https://docs.venly.io/reference/gettokenmint)

```https
GET /api/v2/tokens/mints/{mintId}
```

### Example Request

```https
GET /api/v2/tokens/mints/778a3b09-64a8-45d9-a581-7716020f7fda
```

### Response Body

> - You can get the `tokenId` in the response body.
> - In the response body look for the **result.`status`** parameter. It can have three possible values:
>   - `SUCCEEDED`
>   - `PENDING`
>   - `FAILED`

```json
{
    "success": true,
    "result": {
        "id": "778a3b09-64a8-45d9-a581-7716020f7fda",
        "tokenId": 2,
        "createdOn": "2024-04-25T10:38:37.215647",
        "status": "SUCCEEDED",
        "transactionHash": "0x22b6d453691997893494a8444adb04e1c0af2a410b0b8128b80346f377d644b7",
        "destination": {
            "address": "0xcdA9e3959E7f9c58D2a2088b8F7C9F1C60B1Bd24",
            "amount": 1
        },
        "metadata": {
            "name": "BSC Token-type",
            "description": "Venly",
            "image": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imagePreview": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "imageThumbnail": "https://ideogram.ai/api/images/direct/pzyvhW2yS4uHoC8ntu3K1w.png",
            "animationUrls": [],
            "attributes": [
                {
                    "type": "system",
                    "name": "tokenTypeId",
                    "value": "1",
                    "traitType": "Token Type ID",
                    "trait_type": "Token Type ID"
                },
                {
                    "type": "property",
                    "name": "mintNumber",
                    "value": "1",
                    "traitType": "Mint Number",
                    "trait_type": "Mint Number"
                }
            ],
            "contract": {
                "address": "0xc155ce47013a73d49ff5f5ebb74c520bcdbff9d6",
                "name": "NFT Collection",
                "symbol": "NFCO",
                "image": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "imageUrl": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "image_url": "https://techround.co.uk/wp-content/uploads/2022/01/Venly-logo.png",
                "description": "Sample description",
                "externalLink": "www.venly.io",
                "external_link": "www.venly.io",
                "externalUrl": "www.venly.io",
                "external_url": "www.venly.io",
                "media": [],
                "type": "ERC_1155"
            },
            "fungible": false
        }
    }
}
```

## Minted NFT Preview

![BSC NFT Minted preview on Venly Wallet](https://github.com/bnb-chain/bnb-chain.github.io/assets/139292301/33f72434-8551-45e7-9d89-0e54e43c3fc0)

## Resources:
- [Dynamic NFTs](https://docs.venly.io/docs/dynamic-nfts-api-flow)
- [Mass Minting](https://docs.venly.io/docs/mass-minting)
- [Webhooks](https://docs.venly.io/docs/webhooks-nft-api)
