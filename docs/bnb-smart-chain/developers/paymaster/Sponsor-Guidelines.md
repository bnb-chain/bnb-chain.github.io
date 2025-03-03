# Sponsor Guidelines

## Introduction

Any registered user of Nodereal can become a gas sponsor on the MegaFuel. It empowers users to create and manage their own gas sponsorship, known as sponsor policies. This guide outlines the sponsor registration process and provides instructions for effective utilization of  MegaFuel.

_Note: At present, during the beta phase, policies can only be created by the system after a sponsor initiates an application._

## Registration Process

### Become a MegaNode User

1. Go to <https://nodereal.io/meganode>
2. Navigate to the login page and select the "Login with GitHub" option.
<div align="center">
  <img src="https://files.readme.io/2bb4318-Screenshot_2024-08-14_at_12.34.56.png" width="400">
  <br>
</div>


3. Choose to create an API key, input a key name and notes, then click "save".
<div align="center">
  <img src="https://files.readme.io/b67fe92-cc_2024-08-14T04_29_51.856Z.png" width="400">
  <br>
</div>

4. Now you have your first API key, which will be used later to manage policy.
<div align="center">
  <img src="https://files.readme.io/70cd000-image.png" width="400">
  <br>
</div>


5. Click the API Key row to access the key details.

<div align="center">
  <img src="https://files.readme.io/6c04347-image_1.png" width="400">
  <br>
</div>


Never share the API key to others and keep it secret. If the API key is leaked, others might be able to manage the paymaster policies.

### Applying to Become a Sponsor

1. Visit the [google form](https://forms.gle/WKb6vnnqvTFYERPE7)
2. Complete the application form, ensuring you enter the email address associated with your Meganode account.

### Review Process

1. The team will review application within 2-3 business days.
2. Upon approval, your sponsorship policies will be created and you'll receive a confirmation email with further instructions.

## Testing Your Policy on Testnet

Upon approval, you will receive **two sponsor policies**:

- **Testnet Policy:** Pre-funded with **10 BNB** for system integration testing.
- **Mainnet Policy:** Requires sponsor funding before being actually used.

## Funding Process

After completing system integration testing, fund your **Mainnet policy** by following these steps:

### 1. Send Sponsorship Funds

- **MegaFuel Receiver Address:**  
  `bnb:0x855bcfFbDcD35c52EAD99609f5e7ABE211EB4e88`
- **Sending Address:**  
  - Provide your sending wallet address in above [application form](https://forms.gle/WKb6vnnqvTFYERPE7).
  - This will be used to verify deposits and set the maximum gas limit for your policy.

### 2. Notify Us

Once funds are transferred, send the **transaction hash (TX hash)** for verification.

**Contact Information:**  

- **Telegram:** [@ruojunm](https://t.me/ruojunm) or [@constbh](https://t.me/constbh)  
- **Email:** [support@nodereal.io](mailto:support@nodereal.io)    

## Managing Your Sponsor Policy

Once the sponsor policy is created, sponsor will received a sponsor policy UUID. Sponsor can manage the policy through API according to the UUID.

### Add account to the policy whitelists

See API Reference [pm\_addToWhitelist](https://docs.nodereal.io/reference/pm-addtowhitelist)

Here are some example:

- Add "From addresses" into whitelist, only transactions originating from addresses included in this predefined whitelist will be eligible for gas fee sponsorship.

```plain
curl --location 'https://open-platform-ap.nodereal.io/{$apikey}/megafuel' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pm_addToWhitelist",
    "params": [
        {
            "policyUuid": "a2bb7201-a665-4d85-9d6b-860ca5e40e5b",
            "whitelistType": "FromAccountWhitelist",
            "values": ["0xBbE8831B3355cDca061B9491f48D39481449991d", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"]
        }
    ]
}'
```
```
curl --location 'https://open-platform-ap.nodereal.io/{$apikey}/megafuel' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pm_addToWhitelist",
    "params": [
        {
            "policyUuid": "a2bb7201-a665-4d85-9d6b-860ca5e40e5b",
            "whitelistType": "FromAccountWhitelist",
            "values": ["0xBbE8831B3355cDca061B9491f48D39481449991d", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"]
        }
    ]
}'
```

- Add "To addresses" into whitelist, this whitelist restricts the smart contract addresses that sponsored transactions can interact with.

```plain
curl --location 'https://open-platform-ap.nodereal.io/{$apikey}/megafuel' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pm_addToWhitelist",
    "params": [
        {
            "policyUuid": "a2bb7201-a665-4d85-9d6b-860ca5e40e5b",
            "whitelistType": "ToAccountWhitelist",
            "values": ["0xBbE8831B3355cDca061B9491f48D39481449991d", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"]
        }
    ]
}'
```

- Add "ContractMethodSig" into whitelist, this whitelist restricts the contract methods that sponsored transactions can call.

```plain
curl --location 'https://open-platform-ap.nodereal.io/{$apikey}/megafuel' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pm_addToWhitelist",
    "params": [
        {
            "policyUuid": "a2bb7201-a665-4d85-9d6b-860ca5e40e5b",
            "whitelistType": "ContractMethodSigWhitelist",
            "values": ["0xa9059cbb"]     // method signatures, e.g. 0xa9059cbb means "transfer"
        }
    ]
}'
```

- Add "BEP20Receivers" into whitelist, this whitelist restricts the token receiver addresses for sponsored transactions when the contract is ERC20 transfer.

```plain
curl --location 'https://open-platform-ap.nodereal.io/{$apikey}/megafuel' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pm_addToWhitelist",
    "params": [
        {
            "policyUuid": "a2bb7201-a665-4d85-9d6b-860ca5e40e5b",
            "whitelistType": "BEP20ReceiverWhiteList",
            "values": ["0xBbE8831B3355cDca061B9491f48D39481449991d", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"]
        }
    ]
}'
```

### Remove items from  policy whitelists

See API Reference [pm\_rmFromWhitelist](https://docs.nodereal.io/reference/pm-rmfromwhitelist)

### Empty the policy whitelists

See API Reference [pm\_emptyWhitelist](https://docs.nodereal.io/reference/pm-emptywhitelist)

### List policy whitelists

See API Reference [pm\_getWhitelist](https://docs.nodereal.io/reference/pm-getwhitelist)

### Upcoming Features...

- Accessing the Console
- Viewing Existing Policies
- Modifying Policy Rules
- Monitoring Sponsorship Activity