# Best Practice for Storing NFT

## Overview

BNB Greenfield is an innovative blockchain and storage platform that seeks to unleash the power of decentralized technology on data ownership and the data economy.
Greenfield stands out from existing centralized and decentralized storage systems and is best suitable for NFT storage due to its critical designs:

- Decentralized storage which enables user to access anywhere anytime
- NFT metadata is mutable on Greenfield without changing any data on the NFT smart contract, while Arweave and IPFS is immutable.
- Competitive price( check [price calculator ](https://dcellar.io/pricing-calculator))

## NFT Storage on Greenfield

Most NFTs will need some kind of structured metadata to describe the token's essential properties. Many encodings and data formats can be used, but the de-facto standard is to store metadata as a JSON object.

Here's an example of some JSON metadata for an NFT:

```json
{

 "name": "Tenset Zealy Reward #99",

 "description": "This Tenset NFT is a token of appreciation for your outstanding contribution to the Tenset community. You've earned your place in the top 100, and this NFT is a testament to your dedication.",

 "image": "https://greenfield-sp.bnbchain.org/view/zealy-rewards/zealy-reward.jpg"

}
```
There are many ways to structure metadata for an NFT. The example above uses the schema defined in the [ERC-721 ](https://eips.ethereum.org/EIPS/eip-721)standard.

### Store NFT Images on Greenfield

Storing the NFT media on Greenfield is better than storing an HTTP gateway URL, since it's not tied to a specific gateway provider.

Once NFT media are uploaded on Greenfield, it will generate an unique URL for each media, which can be put into NFT metadata.

Here's an example of media Stored on Greenfield:

https://greenfield-sp.bnbchain.org/view/zealy-rewards/zealy-reward.jpg

### Store Metadata Json on Greenfield

It's suggested to store NFT Metadata Json files on Greenfield too. Here's an example of a NFT metadata stored on Greenfield:

https://greenfield-sp.bnbchain.org/view/zealy-rewards/99.json

## NFT Minting using Greenfield

Greenfield Decentralized Storage Network is naturally suited for NFT Storage. To mint NFT on Greenfield, usually it takes 3 steps:

1. Get BNB on Greenfield
2. Upload both NFT metadata and media to Greenfield
3. Mint NFT

### Get BNB on Greenfield

[Greenfield Bridge](https://greenfield.bnbchain.org/en/bridge) or [DCellar ](https://dcellar.io/) can be used to transfer BNB token from BSC to Greenfield, this will automatically create a Greenfield account which shares the same account address as BSC account.

### Upload both NFT metadata and media to Greenfield

For NFT collections of less than 100 files, DCellar WebUI supports uploading multiple files.

Usually, NFT collections might contain thousands NFTs at a time, [gnfd-cmd](https://docs.bnbchain.org/greenfield-docs/docs/tutorials/cli/file-management/overview) can be a better tool to upload multiple files at one time.

!!! info
    Please make sure your `gnfd-cmd` is the newest version.

To begin, follow Greenfield documentation to [Set up Environment](https://docs.bnbchain.org/greenfield-docs/docs/tutorials/cli/file-management/overview#setting-up-the-environment) and [ Import Account and Generating Keystore](https://docs.bnbchain.org/greenfield-docs/docs/tutorials/cli/file-management/overview#impport-account-and-generating-keystore)

**Create a bucket for Your NFT Collection**

It’s suggested that you put all your NFT metadata json files within one bucket. A bucket is a logical container for storing files in Greenfield. Naming your bucket using your NFT collection name is a good choice.

To create a bucket one needs to call the following storage make-bucket command with the desired bucket name.

```shell
./gnfd-cmd bucket create gnfd://nft-collection-01
```

The operation will automatically choose a storage provider and submit a transaction to BNB Greenfield blockchain to write the associated metadata. Alternatively you can provide a storage provider address, that is operator-address, if a specific provider should be used. The result should look something similar to the following:

```shell
choose primary sp: https://greenfield-sp.bnbchain.org:443

create bucket nft-collection-01 succ, txn hash: 0x6c89316c5912cda8b69eac6e96aa644d374c39c635e07fae4297e03496e7726a
```

As you can see, the result returns a transaction hash, which one can inspect using the block explorer, e.g. [https://greenfieldscan.com](https://greenfieldscan.com/)

**Use an existing bucket for Your NFT Collection**

If there is an existing bucket which is available for use, the bucket creation step can be skipped.

**Upload NFT Images/ Metadata JSON**

Prepare your NFT images on your device before you start to upload. Let's say that there is a folder named “nft-collection-01-image” where you store all your NFT images. Images are suggested to be named after their NFT token id.

Here is a example of image naming:

```shell
$ ls

001.jpg 002.jpg 003.jpg
```

To upload all these files into your bucket , you can run the following commands:

```shell
./gnfd-cmd object put --recursive ./nft-collection-01-image gnfd://nft-collection-01
```

Please note that --recursive is used to put all files or objects under the specified directory or prefix in a recursive way. The default value is false

The successful result should be similar to the following:
```shell
sealing...

upload 001.jpg to gnfd://nft-collection-01

sealing...

upload 002.jpg to gnfd://nft-collection-01

sealing...

upload 003.jpg to gnfd://nft-collection-01
```

You can go to [GreenfieldScan](https://testnet.greenfieldscan.com/) to view the change of your bucket.

All your NFT images will be uploaded as public files, and you can get their universal endpoint under a fixed format.
```shell
https://gnfd-testnet-sp-1.bnbchain.org/download/nft-collection/001.jpg

https://gnfd-testnet-sp-1.bnbchain.org/download/nft-collection/002.jpg

https://gnfd-testnet-sp-1.bnbchain.org/download/nft-collection/003.jpg
```

Once you get your image URLs, you can use them to construct your NFT metadata.

Here is an example of NFT metadata.json
```json
{

 "name": "nft-collection-01 #001",

 "description": "This NFT is an example of nft minting using Greenfield",

 "image": "https://gnfd-testnet-sp-1.bnbchain.org/view/nft-collection/001.jpg"

}
```
We suggest you name your NFT metadata json using NFT token id, such as 01.json.

And you can upload all these files into your bucket , you can run the following commands:
```shell
./gnfd-cmd object put --recursive ./nft-collection-01-json gnfd://nft-collection-01
```

**Highlight**:

Please make sure that the payment account of your bucket has not only enough balance to store all the images and metadata json files in a very long time, but also the read/download quota. you can always check your account balance in GreenfieldScan/DCellar. Also DCellar is a good tool to buy /mange quota

### Mint NFT

Now that your NFT images/metadata json files are stored with Greenfield, you can mint tokens using the blockchain platform of your choice.

## NFT Migration

Before you start to conduct NFT migrate, make sure the NFT contract is capable of updating the base URI after minting .

For example, if your NFT contract is ERC721 and you can find a method called set base url in your contract, then it indicates that the NFT base URI can be updated.

Only if the NFT contract is capable of updating the base URI after minting , you can migrate your NFT images/metadata json files to Greenfield.

If you have already minted your NFT and stored your NFT images somewhere, and your NFT is mutable. Now you want to migrate your NFT images to Greenfield, we provide a simple example to help you understand how to migrate your NFT images to Greenfield :

https://github.com/bnb-chain/greenfield-nft-migration

In this example, we assume token ids are continuous, and metadata contains name& image, and image URL is using HTTP protocol. For example,

```json
{

 "name": "",

 "description": "",

 "image": ""

}
```
We can breakdown NFT Migration into 4 steps:

1. Setup Environment
2. Migrate NFT images to Greenfield
3. Update NFT

### Setup Environment

Please refer to https://github.com/bnb-chain/greenfield-nft-migration#readme to Setup the environment to run the example.

### Migrate NFT images to Greenfield

Get your NFT contact , we take *0xA5FDb0822bf82De3315f1766574547115E99016f* as an example. It's an ERC721 contract deployed on BSC Testnet.

Run
```shell
python3 migrate-nft.py --contract=0xA5FDb0822bf82De3315f1766574547115E99016f
```
By running the example, the script will extract NFT image URL after parsing the contract, and then invoke gnfd-cmd to create a bucket and upload those NFt images to Greenfield.And it will print the image urls generated on Greenfield which can be use to update NFTs.

```shell
python3 migrate-nft.py --contract-0xA5FDb0822bf82De3315f1766574547115E99016f
Connected to Ethereum node at https://bsc-dataseed3.binance.org/
OxA5FDb0822bf82De3315f1766574547115E99016f
total supply: 3000
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/0.json token-id 0 Token ID: 0, Name: MetaWarden #0, Image: https://ipfs.io/ipfs/QmQC9KhvoFckcBAtX9A7jKEF7AYmyAG64aXNcdu2y2NADZ
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/1.json token-id 1 Token ID: 1, Name: MetaWarden #1, Image: https://ipfs.io/ipfs/QmYEa7kt5jVJ RkyfQsbYbZtgTrdYKSYWQmvAQntBuwufY7 get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPFxtNX08jjXQeUGB2KgD/2.json token-id 2 Token ID: 2, Name: MetaWarden #2, Image: https://ipfs.io/ipfs/QmVXiYXBiXQv3SCeSz7PXEAG3Vs2NnGUCnbDQ1ZkzbxHKL
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/3.json token-id 3 Token ID: 3, Name: MetaWarden #3, Image: https://ipfs.io/ipfs/QmQDJNsJ1rTd1DWb2E9bGEX2SoGSJXtjHfGvm9hw7MkDth
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/4.json token-id 4 Token ID: 4, Name: MetaWarden #4, Image: https://ipfs.io/ipfs/QmPXTLtvW1LjiAsTE1xZ9PopfnrFRJ ePEh2XjaPQmmUnGE bucket name: metawarden-x54
make_bucket: metawarden-x54
transaction hash:
B41056572E0AB1E8F10BF986FDCD0C2A31EEAEEDF1F04717B571B5F9CB45AE64
object image_2 created on chain
transaction hash: 1EF3BD01B386407269BAB248DA113425789481F29E84E605F0282F19442E8F48 uploading progress: 84.78% [ 5.00M / 5.90M ], rate: 1.02 MB/s
sealing...
upload image_2 to gnfd://metawarden-x54
object image_3 created on chain
transaction hash: C8D5123A77AB4357EC7C45F08391E333060CE8DA0C382670CFD8024F8EE00851 uploading progress: 62.68% [ 5.00M 7.98M ], rate: 2.27 MB/s
sealing...
upload image_3 to gnfd://metawarden-x54
object image_4 created on chain
transaction hash: 056557C121B4F5D9338824E128316EE2413CA7CFE8CDFE792AF8A68E4B6FE181 uploading progress: 76.38% [ 5.00M 6.55M ], rate: 2.28 MB/s
sealing...
upload image_4 to gnfd://metawarden-x54
object image_1 created on chain
transaction hash: 2039CE824DF309A80038C00C06A4627E9EFC21238ACB5108B37F60E022AFDF89 uploading progress: 84.98% [ 7.00M 8.24M ], rate: 2.53 MB/s
sealing...
upload image_1 to gnfd://metawarden-x54
object image_0 created on chain
transaction hash:
044C6EE3B615579171EBD8FDD29DC5E7EE6B6340FEF29E14184160A63D9B1781
uploading progress: 70.58% [ 5.00M / 7.08M ], rate: 1.98 MB/s sealing...
upload image_0 to gnfd://metawarden-x54
generate image url on greenfield: https://greenfield-sp. 4everland.org/view/metawarden-x54/image_2 generate image url on greenfield: https://greenfield-sp. 4everland.org/view/metawarden-x54/image_3 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-x54/image_4 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-x54/image_1 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-x54/image_0
```

download json file and upload images

```shell
% python3 migrate-nft.py --contract=0xA5FDb0822bf82De3315f1766574547115E99016f Connected to Ethereum node at https://bsc-dataseed3.binance.org/
OxA5FDb0822bf82De3315f1766574547115E99016f
total supply: 3000
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNXo8jjXQeUGB2KgD/0.json token-id 0 Token ID: 0, Name: MetaWarden #0, Image: https://ipfs.io/ipfs/QmQC9KhvoFckcBAtX9A7jKEF7AYmyAG64aXNcdu2y2NADz get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNXo8jjXQeUGB2KgD/1.json token-id 1 Token ID: 1, Name: MetaWarden #1, Image: https://ipfs.io/ipfs/QmYEa7kt5jVJRkyfQsbYbZtgTrdYkSYWQmvAQntBuwufY7 get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/2.json token-id 2 Token ID: 2, Name: MetaWarden #2, Image: https://ipfs.io/ipfs/QmVXi YXBiXQv3SCeSz7PxEAG3Vs2NnGUCnbDQ1ZkzbxHKL
get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNX08jjXQeUGB2KgD/3.json token-id 3 Token ID: 3, Name: MetaWarden #3, Image: https://ipfs.io/ipfs/QmQDJNsJ1rTd1DWb2E9bGEX2SoGSJXtjHfGvm9hw7MkDth get the nft token URI: https://metawarden.mypinata.cloud/ipfs/QmUTAUJpChRYetpaxEnbso6MXBPfxtNXo8jjXQeUGB2KgD/4.json token-id 4 Token ID: 4, Name: MetaWarden #4, Image: https://ipfs.io/ipfs/QmPXTLtvW1LjiAsTE1xZ9PopfnrFRJePEh2XjaPQmmUnGE bucket name: metawarden-4mt
make_bucket: metawarden-4mt
transaction hash: 6773039F2D2382CE492E45AC67BD6CB230AD46DF906B4692235D393F066F642B
object image_2 created on chain
transaction hash: 1BAEBD9551F40995E6D4840F1F7A2FBE1AE8A652E23D6175B90F78A027DDB5D9 uploading progress: 100.00% [ 5.90M / 5.90M ], rate: 434.91 KB/s
sealing...
upload image_2 to gnfd://metawarden-4mt
object image_3 created on chain
transaction hash:
2072DD17FAFD1B686D1D351FAC0B83975AEB1CDC6BE3C8165D690DAC89F0F2A5
uploading progress: 87.75% [ 7.00M / 7.98M ], rate: 448.03 KB/s
sealing...
upload image_3 to gnfd://metawarden-4mt
object image_4 created on chain
transaction hash: B59D8879D2072F2640DACBE7BD489C93ABE 117B21BD7C6696A401AAB68F11949 uploading progress: 99.29% [6.50M / 6.55M ], rate: 505.33 KB/s
sealing...
upload image_4 to gnfd://metawarden-4mt
object image_1 created on chain
transaction hash: 8A7B967AF2C186D86C89358D858901AF84E9C90AA8A9D1F60E3A73B3EC6C09D1 uploading progress: 100.00% [ 8.24M / 8.24M ], rate: 497.23 KB/s
sealing...
upload image_1 to gnfd://metawarden-4mt
object image_0 created on chain
transaction hash:
28915108AD4526A71CB87EBDE56BAAB3908C46CE179440B08689C41785E00126
uploading progress: 91.76% [6.50M / 7.08M ], rate: 661.35 KB/s sealing...
upload image_0 to gnfd://metawarden-4mt
generate image url on greenfield: https://greenfield-sp. 4everland.org/view/metawarden-4mt/image_2 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/image_3 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/image_4 generate image url on greenfield: https://greenfield-sp. 4everland.org/view/metawarden-4mt/image_1 generate image url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/image_0
```

update and upload json file


```shell
object 0.json created on chain
transaction hash:
3562D839C2113092E10E3741A007598772FD68D83E1DC1011996A4F51A2D0820
uploading progress: 100.00% [ 942B / 942B ], rate: 495.29 Byte/s
sealing...
upload 0.json to gnfd://metawarden-4mt
object 1.json created on chain
transaction hash:
597513102883DF736673B4BC006E8ECE1F0651C8164006F4B0641E58BCA87864
uploading progress: 100.00% [ 947B / 947B ], rate: 591.53 Byte/s
sealing...
upload 1.json to gnfd://metawarden-4mt
object 2.json created on chain
transaction hash:
AC1365AC817FF16523A13C02D281225967EF6908E6F889C8AE3AD6F1ED4DF47
uploading progress: 100.00% [ 935B / 935B ], rate: 720.80 Byte/s
sealing...
upload 2.json to gnfd://metawarden-4mt
object 3.json created on chain
transaction hash:
8910C142DBDD2FCBD7827373163D5ED3F134E45B53A5FC8F82E62240B84E6CAB
uploading progress: 100.00% [ 943B / 943B ], rate: 716.82 Byte/s
sealing...
upload 3.json to gnfd://metawarden-4mt
object 4.json created on chain
transaction hash:
DCC040FEE2DC4EC60342D078EC0D8C528F6ADCEB2F7D91B198FA4721638176C7
uploading progress: 100.00% [ 941B / 941B ], rate: 678.64 Byte/s sealing...
upload 4.json to gnfd://metawarden-4mt
generate json url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/0.json generate json url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/1.json generate json url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/2.json generate json url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/3.json generate json url on greenfield: https://greenfield-sp.4everland.org/view/metawarden-4mt/4.json
```
### Update NFT

Now that NFT images are stored on Greenfield now, the next step should be update NFT image urls through calling smart contract.

We won't attempt to illustrate the NFT update process here, because the details depend on which chain and development language you're using, as well as the contract and standards you're targeting.