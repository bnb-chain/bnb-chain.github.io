# BNB Beacon Chain Token Recovery Tool: Phase 3 — Self-Service Recovery

<div class="doc-announce-info">
    <span class="version-tag">Notice</span>
</div>

**Effective Date:** 1 July 2026

**Tool:** [https://github.com/bnb-chain/token-recover-self-service-tools](https://github.com/bnb-chain/token-recover-self-service-tools)

## Important Notice

Effective **1 July 2026**, BNB Chain's hosted [Token Recovery Tool](https://www.bnbchain.org/en/token-recovery) has been **discontinued**. Users who still need to recover BEP2 or BEP8 tokens from the BNB Beacon Chain to BNB Smart Chain (BSC) must now use the self-service tool published at the GitHub repository above.

This guide covers everything you need to complete the recovery successfully.

## What Is This Tool?

The Token Recover Self-Service Tool is an open-source, locally-run web application that lets you recover BEP2 and BEP8 tokens stranded on the BNB Beacon Chain and move them to your BNB Smart Chain (BSC) address — without relying on any third-party custodial service.

Because the tool runs entirely in your browser from your own machine, your private keys and signatures never leave your device.

## What You Will Need Before You Start

Before beginning, make sure you have the following:

- **Node.js** version 24.0.0 or higher installed on your computer.
- A package manager: npm, yarn, pnpm, or bun.
- Your **BNB Beacon Chain address** (starts with `bnb1...`) — the address holding the tokens you want to recover.
- **Trust Wallet** (or another Beacon Chain-compatible wallet) installed as a browser extension, with access to your Beacon Chain account.
- A **BNB Smart Chain (BSC) wallet address** to receive the recovered tokens.
- A small amount of **BNB** in that BSC wallet to pay for the on-chain transaction gas fee.

## Setup: Install and Run the Tool Locally

### Step 1 — Clone the repository

Open your terminal and run:

```shell
git clone https://github.com/bnb-chain/token-recover-self-service-tools.git
cd token-recover-self-service-tools
```

### Step 2 — Install dependencies

```shell
npm install
```

### Step 3 — (Optional) Configure the API endpoint

By default the tool points to BNB Smart Chain Mainnet. If you want to test on Testnet first, copy the example environment file and edit it:

```shell
cp .env.example .env.local
```

Then open `.env.local` and set:

```
NEXT_PUBLIC_APPROVAL_API=https://testnet-token-recover-api.bnbchain.org
```

The BSC explorer links in the UI will automatically switch to testnet.bscscan.com when this is set.

### Step 4 — Start the application

```shell
npm run dev
```

### Step 5 — Open in your browser

Navigate to: [http://localhost:3000](http://localhost:3000)

You will see a four-step guided recovery flow. Follow the steps below exactly.

## Recovery Walkthrough: The 4 Steps

### Step 1 — Get Recoverable Tokens

Enter your BNB Beacon Chain address (the `bnb1...` address) in the input field and click to fetch.

The tool will display a list of all tokens eligible for recovery on that address. Identify the token you want to recover and note its symbol.

If no tokens appear, your address either has no recoverable balance or has already been processed.

### Step 2 — Generate and Sign the Message (Beacon Chain Wallet)

Fill in the following fields:

- **Token Symbol** — select or enter the token symbol from Step 1
- **Amount** — enter the amount in human-readable units (e.g. `0.00001000`). The tool automatically converts this to the correct on-chain base units internally.
- **To BSC Address** — the BNB Smart Chain address where you want the recovered tokens sent. This must be the address whose private key you control, as it will be required to sign the final on-chain transaction in Step 4.
- **Network** — select Beacon Chain Mainnet (or Testnet if testing)

Click **Generate Sign Message**. The tool will produce a structured JSON message.

Next, click **Sign with Wallet**. Your Trust Wallet (or compatible wallet) browser extension will prompt you to sign the message.

Approve the signing request in your wallet. The tool receives back two values:

- `signature` — a long hex string starting with `0x`
- `publicKey` — your Beacon Chain public key

!!! warning "Security"
    Only sign this message in a browser where you trust all installed extensions. Do not sign on shared computers or when multiple wallet extensions are active simultaneously. The tool does not broadcast anything at this stage — no transaction occurs here.

If the signature returned by your wallet does not start with `0x`, add the `0x` prefix manually before proceeding.

### Step 3 — Submit for Approval (Get Merkle Proof)

With the signature and public key from Step 2 in hand, click **Get Approval**.

The tool submits your signed data to the BNB Chain approval server, which validates your ownership and returns:

- `proofs` — a list of Merkle proof hashes
- `approval_signature` — the server's countersignature authorising the recovery

These values are automatically populated in the tool. You do not need to copy or store them manually — they carry through to Step 4 automatically.

If this step returns an error, double-check that the token symbol and BSC address match exactly what you entered in Step 2. Symbol casing matters.

### Step 4 — Build the Recover Payload and Submit On-Chain (BNB Smart Chain Wallet)

This is the final step. Click **Build Recover Payload**.

The tool assembles a complete payload containing:

- The token symbol (encoded as bytes32)
- The amount (encoded as a hex integer in base units)
- Your Beacon Chain owner signature and public key
- The server's approval signature
- The full Merkle proof array

!!! important
    The tool generates this payload locally only. **No transaction is broadcast automatically.**

You must now call the `recover` function on the BNB Smart Chain recovery contract yourself using your BSC wallet (the same address you specified as "To BSC Address" in Step 2).

**Recovery contract address:** `0x0000000000000000000000000000000000003000` ([view on BscScan](https://bscscan.com/address/0x0000000000000000000000000000000000003000))

To submit:

1. Connect your BSC wallet (MetaMask or equivalent) to BNB Smart Chain Mainnet.
2. Navigate to the contract on BscScan, go to **Write Contract**, and connect your wallet.
3. Call the `recover` function with the parameters shown in the payload.
4. Set the gas limit to at least **1,000,000**.
5. Confirm the transaction in your wallet.

Once the transaction is confirmed on-chain, your tokens will appear in your BSC wallet.

Both the owner signature and the approval signature must start with `0x`. If either is missing the prefix, add it before submitting.

## Two Wallets Are Involved — Key Distinction

| Step | Wallet Used | Purpose | Gas Required? |
| ---- | ----------- | ------- | ------------- |
| Step 2 | Beacon Chain wallet (Trust Wallet) | Sign the recovery message | No |
| Step 4 | BNB Smart Chain wallet (MetaMask etc.) | Broadcast the on-chain recovery transaction | Yes — BNB required |

Make sure both wallets are available before you start. The BSC address you enter in Step 2 must match the wallet you use in Step 4.

## Testnet Practice Run

If you want to test the process before using Mainnet assets:

1. Set `NEXT_PUBLIC_APPROVAL_API=https://testnet-token-recover-api.bnbchain.org` in your `.env.local` file.
2. Restart the dev server (`npm run dev`).
3. Use your Beacon Chain Testnet address and a BSC Testnet wallet.

The UI will automatically link to testnet.bscscan.com for transaction verification.

## Troubleshooting

**No tokens shown in Step 1**
Verify you have entered the correct Beacon Chain address. Ensure the address format begins with `bnb1`. The address is case-sensitive.

**Wallet does not respond in Step 2**
Ensure Trust Wallet (or your Beacon Chain-compatible wallet) extension is active and unlocked in the same browser. Disable or remove other wallet extensions that may conflict.

**Approval fails in Step 3**
Check that the token symbol matches exactly (including hyphen and number suffix). Check that your BSC address is a valid `0x`-prefixed EVM address.

**Transaction reverts in Step 4**
Confirm your gas limit is set to 1,000,000 or higher. Ensure your BSC wallet has sufficient BNB for gas. Confirm both signatures are `0x`-prefixed.

**Signature missing 0x prefix**
Some wallet implementations omit the `0x` prefix. Prepend `0x` to the signature string before using it in Step 3 or Step 4.

## Security Reminders

- This tool runs entirely in your local browser. Your private key is never transmitted.
- Always clone the repository directly from [https://github.com/bnb-chain/token-recover-self-service-tools](https://github.com/bnb-chain/token-recover-self-service-tools) — do not use third-party mirrors or modified copies.
- BNB Chain will never ask you to share your private key or seed phrase to complete a recovery.
- Report any security vulnerabilities via the repository's Security Policy — do not open a public GitHub issue.

## Quick Reference

| Item | Value |
| ---- | ----- |
| Tool repository | [https://github.com/bnb-chain/token-recover-self-service-tools](https://github.com/bnb-chain/token-recover-self-service-tools) |
| Local app URL | [http://localhost:3000](http://localhost:3000) |
| Mainnet API | `https://token-recover-api.bnbchain.org` (default) |
| Testnet API | `https://testnet-token-recover-api.bnbchain.org` |
| Recovery contract | `0x0000000000000000000000000000000000003000` |
| Min. Node.js version | 24.0.0 |
| Recommended gas limit | 1,000,000 |

## Summary: Recovery at a Glance

1. Clone and run the tool locally at [http://localhost:3000](http://localhost:3000)
2. Enter your Beacon Chain address → view recoverable tokens
3. Select token, enter amount and BSC destination address → sign message with Beacon Chain wallet
4. Submit signed data → receive Merkle proof and approval signature from server
5. Build payload → call the `recover` function on the BSC contract with your BSC wallet
6. Confirm transaction on-chain → tokens arrive in your BSC wallet

For the latest updates and known issues, refer to the [GitHub repository](https://github.com/bnb-chain/token-recover-self-service-tools).

For the complete sunset timeline, refer to the [Token Recovery Tool Sunset Plan](./token-recovery-sunset-plan.md).
