# Integrated Approach

This guide outlines the steps for developers to integrate MegaFuel, enabling gas fee sponsorship for their users.   This permissionless solution is open to all wallets/cex/dapp

## Paymaster Endpoint

> 📘 Supported on both BNB Smart Chain and OpBNB.

Endpoint

- BNB Smart Chain (BSC)
  - **Mainnet**: `https://bsc-megafuel.nodereal.io/`
  - **Testnet**: `https://bsc-megafuel-testnet.nodereal.io/`

- opBNB
  - **Mainnet**: `https://opbnb-megafuel.nodereal.io/`
  - **Testnet**: `https://opbnb-megafuel-testnet.nodereal.io/`

## Example Client Code

This [repository](https://github.com/node-real/megafuel-client-example) contains a series of code examples demonstrating MegaFuel integration across multiple scenarios, including wallet integration and payment gateway integration. The codebase is implemented in both Golang and JavaScript.

## Interaction Workflow

![](https://files.readme.io/30618a1-image.png)

Integration requires adapting the transaction flow to work with MegaFuel's paymaster system. For detailed information about the paymaster API interface, please refer to [this document](https://docs.nodereal.io/reference/eth-sendrawtransaction-megafuel).

The main steps are:

1. **Transaction Preparation**:
   - When a user initiates a transaction, first call `pm_sponsorable` to check if it's eligible for sponsorship.
   - If sponsorable, set the transaction's gas price to zero.
2. **User Notification**:
   - Inform the user that the transaction will be gas-free and sponsored by the "sponsor name" returned by the API.
3. **Transaction Signing**:
   - Have the user sign the zero-gas-price transaction.
4. **Submission to MegaFuel**:
   - Send the signed transaction to the MegaFuel through `eth_sendRawTransaction` API.
   - When making the **eth_sendRawTransaction** request, please set the "User-Agent" header to the wallet application's name. This practice helps MegaFuel better understand usage patterns and improve services. For example -H “User-Agent: your-wallet-name/v1.0.0”. [Example code](https://github.com/node-real/megafuel-js-sdk/blob/main/src/paymasterclient.ts#L116) for reference.
5. **Response Handling**:
   - Process the paymaster's response:
     - If successful, inform the user that the transaction is submitted.
     - If failed, consider falling back to normal transaction processing or inform the user of the failure.
6. **Transaction Monitoring**:
   - Monitor the transaction status as usual.

## Best Practice

1. Always check sponsorability before setting gas price to zero.
2. Provide clear information to user about who sponsor the tx.
3. Implement fallback mechanisms for sponsorship failures.
4. Consider fallback mechanisms for non-sponsored transactions.

## Q&A

1. What are the odds of the **eth_sendRawTransaction** call failing after **pm_sponsorable** returns is_sponsorable: true?

   **Answer**: For wallet retail users, the failure probability is minimal.  
   There are two main potential failure scenarios:

   - A timing issue where sponsor funds are available during the **pm_sponsorable** check but depleted when **eth_sendRawTransaction** executes.
   - Nonce mismatch errors, since the **pm_sponsorable** API doesn't include a nonce field, but **eth_sendRawTransaction** API will check nonce. To prevent this, we recommend fetching the correct nonce via [MegaFuel's API ](https://docs.nodereal.io/reference/eth-gettransactioncount-megafuel)endpoint when constructing gasless transactions.

2. Which specific errors or error codes from **pm_sponsorable** and **eth_sendRawTransaction** indicate that we should retry the sponsorable transaction? 

   **Answer**: 

   - The **pm_sponsorable** API serves as a validator for gasless transaction eligibility. Any negative(false) response  or error from this API should trigger an immediate fallback to standard transaction processing.
   - When **eth_sendRawTransaction** returns nonce-related errors ("nonce too high" or "nonce too low"), retries are appropriate as these issues are typically timing-related and may resolve after a brief delay when the correct nonce becomes available. However, all other error types indicate non-recoverable issues that won't be resolved through retries.

3. Is there a recommended practice for handling fallback scenarios when sending a sponsorable transaction fails?

   **Answer**:  It is suggested to show the error msg and automatically retry every subsequent transaction as a non-sponsored transaction without informing the user.  
   There are two cases indicate that the gasless paymaster may not work: 

   - The **eth_sendRawTransaction** API return error; 
   - The **eth_sendRawTransaction** does not return an error, but the tx does not confirm on chain for a long time. A user can consider a gasless transaction failed if it hasn't been mined on BSC network within 120 seconds of submission or 42 seconds on opBNB network. A more precise method to fetch transaction status is to query [MegaFuel API](https://docs.nodereal.io/reference/eth-getgaslesstransactionbyhash).