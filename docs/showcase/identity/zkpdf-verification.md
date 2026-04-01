---
title: ZK-PDF Document Verification
---

# ZK-PDF Document Verification

## Overview

ZK-PDF (Zero-Knowledge PDF) verification allows document owners to prove the authenticity and integrity of a PDF
document **without revealing its full contents**. This is useful for on-chain verification workflows where privacy is
required — for example, proving that a document contains a valid credential without disclosing personal information.

On BNB Chain, ZK-PDF verification can be integrated with the
[BNB Attestation Service (BAS)](./attestation.md) to create tamper-proof, privacy-preserving attestations for
document-based credentials.

## How It Works

1. **Document Hashing** – A cryptographic hash (e.g., SHA-256) is computed over the PDF content.
2. **ZK Proof Generation** – A zero-knowledge proof is generated that attests specific claims about the document
   (e.g., "this document was issued before date X" or "this document contains field Y with value Z") without
   revealing the underlying data.
3. **On-Chain Attestation** – The ZK proof is submitted to BAS, creating an on-chain attestation record linked to
   the document hash. Verifiers can check the attestation without accessing the document itself.
4. **Verification** – Any party can verify the on-chain attestation against the document hash to confirm its
   authenticity.

```
 Document Owner                   BNB Chain / BAS
      │                                  │
      │── Hash PDF ───────────────────►  │
      │── Generate ZK Proof ──────────►  │
      │── Submit Attestation ──────────► │ ◄── Stored on-chain
      │                                  │
 Verifier                                │
      │── Query attestation ───────────► │
      │◄─ Verify hash + ZK proof ──────  │
```

## Use Cases

| Use Case | Description |
|---|---|
| **KYC / AML** | Prove identity document validity without sharing the document itself. |
| **Academic Credentials** | Universities issue degree certificates as ZK-attested PDFs. |
| **Legal Documents** | Contracts and agreements can be attested on-chain for dispute resolution. |
| **Supply Chain** | Compliance certificates for goods can be verified without full disclosure. |

## Integrating ZK-PDF with BAS

### Step 1 – Define a BAS Schema

Create an attestation schema that captures the document verification fields:

```json
{
  "name": "ZKPDFVerification",
  "fields": [
    { "name": "documentHash",   "type": "bytes32" },
    { "name": "issuer",         "type": "address" },
    { "name": "issuedAt",       "type": "uint64"  },
    { "name": "zkProofCID",     "type": "string"  }
  ]
}
```

- `documentHash` – SHA-256 hash of the PDF, stored as bytes32.
- `issuer` – On-chain address of the document issuer.
- `issuedAt` – Unix timestamp of issuance.
- `zkProofCID` – Content identifier (CID) pointing to the ZK proof stored on BNB Greenfield or IPFS.

Register the schema at [BASCAN](https://bascan.io/).

### Step 2 – Generate the ZK Proof Off-Chain

Use a ZK framework (e.g., [zkPass](https://zkpass.org/), [Reclaim Protocol](https://reclaimprotocol.org/), or a
custom snark circuit) to generate a proof that attests the desired claims about the PDF without revealing the
document contents. Store the resulting proof file on BNB Greenfield for decentralized, access-controlled storage.

```bash
# Example: compute SHA-256 hash of the document
sha256sum my-document.pdf
```

### Step 3 – Create an On-Chain Attestation

Using the BAS SDK or the BASCAN UI, submit an attestation with the schema defined above:

```typescript
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

const schemaEncoder = new SchemaEncoder(
  'bytes32 documentHash, address issuer, uint64 issuedAt, string zkProofCID'
);

const encodedData = schemaEncoder.encodeData([
  { name: 'documentHash', value: '0xabc123...', type: 'bytes32' },
  { name: 'issuer',       value: '0xYourAddress', type: 'address' },
  { name: 'issuedAt',     value: Math.floor(Date.now() / 1000), type: 'uint64' },
  { name: 'zkProofCID',   value: 'greenfield://bucket/proof.json', type: 'string' },
]);
```

### Step 4 – Verification

Any verifier can:

1. Fetch the attestation from BASCAN using the attestation UID.
2. Retrieve the ZK proof from Greenfield using `zkProofCID`.
3. Re-compute the document hash and verify the ZK proof off-chain to confirm authenticity.

## Resources

- [BNB Attestation Service](./attestation.md)
- [Build your Attestation](./attestation-dev.md)
- [BNB Greenfield Storage](../../bnb-greenfield/introduction.md)
- [zkPass Integration](https://bas.zkpass.org/)
- [BASCAN Explorer](https://bascan.io/)
