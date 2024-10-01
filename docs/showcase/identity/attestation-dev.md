---
title: Get Started - Attestation
---

# Get Started - Attestation

## Creating On-chain Attestations

The `attest` function enables you to confidently create an on-chain attestation for a specific schema. This powerful function accepts an object with the following properties:

* `schema`: The unique identifier (UID) of the schema for which the attestation is being created.
* `data`: An object that contains the following properties:
	* `recipient`: The BNB address of the attestation recipient.
	* `expirationTime`: A Unix timestamp that represents the expiration time of the attestation. You can set it to 0 for no expiration.
	* `revocable`: A boolean value that indicates whether the attestation can be revoked or not.
	* `refUID`: (Optional) The UID of a referenced attestation. If there is no reference, use ZERO_BYTES32.
	* `data`: The encoded data for the attestation, which should be generated using the SchemaEncoder class.

This function gracefully returns a Promise that resolves to the UID of the newly created attestation.

```javascript
import { BAS, SchemaEncoder } from "@bnb-attestation-service/bas-sdk";

const bas = new BAS(BASContractAddress);
bas.connect(signer);

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
const encodedData = schemaEncoder.encodeData([
  { name: "eventId", value: 1, type: "uint256" },
  { name: "voteIndex", value: 1, type: "uint8" },
]);

const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

const tx = await bas.attest({
  schema: schemaUID,
  data: {
    recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
    expirationTime: 0,
    revocable: true,// Be aware that if your schema is not revocable, this MUST be false
    data: encodedData,
  },
});

const newAttestationUID = await tx.wait();

console.log("New attestation UID:", newAttestationUID);
```

## Creating Off-chain Attestations without Saving to GreenField
To generate an off-chain attestation, you can confidently utilize the signOffchainAttestation function offered by the Off-chain class in the BAS SDK. Here’s an example:

```javascript
import { SchemaEncoder } from "@bnb-attestation-service/bas-sdk";

const offchain = await bas.getOffchain();

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
const encodedData = schemaEncoder.encodeData([
  { name: "eventId", value: 1, type: "uint256" },
  { name: "voteIndex", value: 1, type: "uint8" },
]);

// Signer is an ethers.js Signer instance
const signer = new ethers.Wallet(privateKey, provider);

const offchainAttestation = await offchain.signOffchainAttestation({
  recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
// Unix timestamp of when attestation expires. (0 for no expiration)
  expirationTime: 0,
// Unix timestamp of current time
  time: 1671219636,
  revocable: true,// Be aware that if your schema is not revocable, this MUST be false
  version: 1,
  nonce: 0,
  schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
  refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
  data: encodedData,
}, signer);

This function will confidently generate an attestation object off-chain, which will be signed and contain the UID, signature, and attestation data. You can confidently share this object with the intended recipient or confidently store it for future use.
```

## Creating Off-chain Attestation and Saving to GreenField
To generate an off-chain attestation and save the result to GreenField Storage, you can confidently utilize the attestOffChain function offered by the BAS SDK. Here’s an example:

```javascript
  const offchain = await bas.getOffchain();

  // Use wallet or client to ensure the chain is BNB
  // [WARN]: should call an async function
  await shouldSwitchNetwork(chains[1].id); // BNB chainId

  // Attest offchain
  const attestation = await attestOffChain({
    schemaStr: attestParams.schemaStr,
    schemaUID: attestParams.schemaUID,
    data: attestParams.data,
    recipient: attestParams.recipient,
    revocable: attestParams.revocable,
  });

  const attestationUID = attestation.uid;

  // Use wallet or client to ensure the chain is Greenfield Chain
  await shouldSwitchNetwork(chains[0].id);
  const provider = await connector?.getProvider({ chainId: chains[0].id });

  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  // Encode the attestation object into blob to store on the Greenfield Storage
  const str = JSON.stringify(attestation);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });

  let res;
  try {
    // Use GreenField SDK to store the attestation
    res = await gfClient.createObject(
      provider,
      new File([blob], `${attestParams.schemaUID}.${attestationUID}`),
      attestParams.isPrivate || true
    );
  } catch (err: any) {
    console.log(err);
    alert(err.message);
  }
```

This function will generate an attestation object off-chain. The attestation object will be signed and will contain the UID, signature, and attestation data. Similar to the previous function, you can also save it to greenfield storage and set the access according to your preferences.

## More Use Cases

On-chain attestations will enable a powerful new range of web3 applications, including:

* Identity
* Trust Scores
* KYC Services
* Social Networks
* Voting
* Oracles (who can be atomically paid for making attestations inside the protocol)
* Likes/Dislikes
* Portable Trust Layers
* Credit Scores
* Clout
* Land Registries

And many more!

## Resources
* [BAS JS-SDK](https://doc.bascan.io/sdk/js)