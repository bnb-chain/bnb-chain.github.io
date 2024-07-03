---
title: Contract as Bucket Owner - BNB Greenfield Demo
---

#  Greenfield Demo: Contract as Bucket Owner
BNB Greenfield provides the ability for a contract to manage buckets through greenfield cross-chain transactions, 
and we'll use a demo to briefly demonstrate the process.

## Source Code
1. Greenfield Demo App Contract: [GreenfieldDemo](https://github.com/bnb-chain/greenfield-contracts/blob/develop/contracts/example/GreenfieldDemo.sol)
2. Script to Interact with Demo: [Demo Script](https://github.com/bnb-chain/greenfield-contracts/blob/develop/scripts/11-demo-contract-approve-eoa-upload.ts) 

## Greenfield Demo Contract
The Demo includes the following parts:
1. greenfield contracts constant:
```solidity
    // BSC testnet
    address public constant TOKEN_HUB = 0xED8e5C546F84442219A5a987EE1D820698528E04;
    address public constant CROSS_CHAIN = 0xa5B2c9194131A4E0BFaCbF9E5D6722c873159cb7;
    address public constant BUCKET_HUB = 0x5BB17A87D03620b313C39C24029C94cB5714814A;
    address public constant PERMISSION_HUB = 0x25E1eeDb5CaBf288210B132321FBB2d90b4174ad;
    address public constant SP_ADDRESS_TESTNET = 0x5FFf5A6c94b182fB965B40C7B9F30199b969eD2f;
    address public constant GREENFIELD_EXECUTOR = 0x3E3180883308e8B4946C9a485F8d91F8b15dC48e;
```
The version of greenfield contracts deployed on BSC testnet is configured here.

2. create bucket and set bucket flow rate limit
```solidity
    function createBucket(string memory bucketName, uint256 transferOutAmount, bytes memory _executorData) external payable;
```
Provides the bucket name, initial BNB amount transferred to the demo contract on Greenfield and the executor data 
to set bucket flow rate limit.

3. create policy to allow eoa account to upload files to the bucket
```solidity
    function createPolicy(bytes memory createPolicyData) external payable;
```

## Interact Script
### Installation
```shell
git clone https://github.com/bnb-chain/greenfield-contracts.git
cd greenfield-contracts && git checkout develop
npm install
npx hardhat compile

cp .env.example .env
# set `DeployerPrivateKey` on .env
# make sure the tBNB balance of the account >= 0.5 BNB on BSC Testnet
npx hardhat run scripts/11-demo-contract-approve-eoa-upload.ts  --network bsc-testnet
```

### Workflow

The interact script includes 4 steps as follows: 
1. deploy demo contract
```typescript
    const demo = (await deployContract(operator, 'GreenfieldDemo')) as GreenfieldDemo;
```

2. create bucket whose owner is the demo contract 
set bucket flow rate limit and cross-chain transfer 0.1 BNB to demo contract
```typescript
const bucketName = 'test-' + demo.address.substring(2, 6).toLowerCase();
// - transferOutAmt: 0.1 BNB to demo contract on Greenfield
// - set bucket flow rate limit to this bucket
// - create bucket: 'test-approve-eoa-upload', its owner is demo contract
const dataSetBucketFlowRateLimit = ExecutorMsg.getSetBucketFlowRateLimitParams({
    bucketName,
    bucketOwner: demo.address,
    operator: demo.address,
    paymentAddress: demo.address,
    flowRateLimit: '1000000000000000000',
});
const executorData = dataSetBucketFlowRateLimit[1];
const transferOutAmt = ethers.utils.parseEther('0.1');
const value = transferOutAmt.add(relayFee.mul(3).add(ackRelayFee.mul(2)));

log('- transfer out to demo contract on greenfield', toHuman(transferOutAmt));
log('- create bucket', bucketName);
log('send crosschain tx!');
const receipt = await waitTx(
    demo.createBucket(bucketName, transferOutAmt, executorData, { value })
);
log(`https://testnet.bscscan.com/tx/${receipt.transactionHash}`);
```

3. get bucket id by name after bucket created
```typescript
const bucketInfo = await client.bucket.getBucketMeta({ bucketName });
const bucketId = bucketInfo.body!.GfSpGetBucketMetaResponse.Bucket.BucketInfo.Id;
log('bucket created, bucket id', bucketId);
const hexBucketId = `0x000000000000000000000000000000000000000000000000000000000000${BigInt(
    bucketId
).toString(16)}`;
log(`https://testnet.greenfieldscan.com/bucket/${hexBucketId}`);
```

4. create policy to allow EOA account upload files to the bucket through cross-chain transaction
```typescript
const uploaderEoaAccount = operator.address; // TODO set your eoa account to upload files
log('try to set uploader(eoa account) is', uploaderEoaAccount);

const policyDataToAllowUserOperateBucket = Policy.encode({
    id: '0',
    resourceId: bucketId, // bucket id
    resourceType: ResourceType.RESOURCE_TYPE_BUCKET,
    statements: [
        {
            effect: Effect.EFFECT_ALLOW,
            actions: [ActionType.ACTION_CREATE_OBJECT], // allow upload file to the bucket
            resources: [],
        },
    ],
    principal: {
        type: PrincipalType.PRINCIPAL_TYPE_GNFD_ACCOUNT,
        value: uploaderEoaAccount,
    },
}).finish();

await waitTx(
    demo.createPolicy(policyDataToAllowUserOperateBucket, { value: relayFee.add(ackRelayFee) })
);
```

Now the deployer account can upload files to the bucket on Greenfield.

