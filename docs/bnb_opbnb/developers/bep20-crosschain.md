# Arbitrary BEP20 Cross-chain

You can use the [opBNB bridge](https://opbnb-bridge.bnbchain.org/deposit) or third-party bridges like [zkBridge](https://zkbridge.com/opbnb) and [rhino.fi](https://app.rhino.fi/bridge?token=BNB&chainOut=OPBNB&chain=BINANCE) to easily deposit and withdraw most mainstream BEP20 tokens on BSC.

If a token is not supported by these bridges, you have the option to deploy your own L2 mirror token contract on opBNB.
This allows for permissionless cross-chain transfer of these tokens.

This guide will help you deploy your L2 mirror token contract on opBNB and demonstrate how to use it for transferring tokens between BSC and opBNB.

## Deploying a L2 Mirror Token Contract

There is a pre-deployed [OptimismMintableERC20Factory contract](https://github.com/bnb-chain/opbnb/blob/develop/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) on opBNB that allows you to deploy a L2 token by calling a function of the factory contract.
The address of the contract is `0x4200000000000000000000000000000000000012`.

The function signature and the emitted event are as follows:

```
/**
    * @notice Emitted whenever a new OptimismMintableERC20 is created.
    *
    * @param localToken  Address of the created token on the local chain.
    * @param remoteToken Address of the corresponding token on the remote chain.
    * @param deployer    Address of the account that deployed the token.
    */
event OptimismMintableERC20Created(
    address indexed localToken,
    address indexed remoteToken,
    address deployer
);

/**
    * @notice Creates an instance of the OptimismMintableERC20 contract.
    *
    * @param _remoteToken Address of the token on the remote chain.
    * @param _name        ERC20 name.
    * @param _symbol      ERC20 symbol.
    *
    * @return Address of the newly created token.
    */
function createOptimismMintableERC20(
    address _remoteToken,
    string memory _name,
    string memory _symbol
) public returns (address) {}
```

`_remoteToken` is the address of the token on the remote chain, which is BSC in this case.
`_name` and `_symbol` should be the same with the name and symbol of the token on BSC.
The decimal of the token on opBNB is always 18.

Here is the [transaction](https://opbnbscan.com/tx/0x4e3da7329cdf0ad67fb82a2a02978518f988125221229747afe90886f7e6512b) that generates the [FDUSD token](https://opbnbscan.com/address/0x50c5725949a6f0c72e6c4a641f24049a917db0cb) on opBNB.

**Warning**: It does not support certain BEP20 configurations:
- [Fee on transfer tokens](https://github.com/d-xo/weird-erc20#fee-on-transfer)
- [Tokens that modify balances without emitting a Transfer event](https://github.com/d-xo/weird-erc20#balance-modifications-outside-of-transfers-rebasingairdrops)

## Cross-chain Transfer with JS SDK

Once you have deployed your own L2 mirror token contract, you can use the JS SDK to transfer tokens between BSC and opBNB.

The following script is a TypeScript demo script.
It uses `ethers.js` and `@eth-optimism/sdk` to transfer tokens between BSC and opBNB.

You can save the script as `erc20CrosschainTransfer.ts` and run it with the following command(ensure that you have installed [deno](https://docs.deno.com/runtime/manual#install-deno)):

```bash
deno run -A erc20CrosschainTransfer.ts
```

Feel free to modify the script to suit your needs.

```typescript
import { Contract, ethers, Signer, Wallet } from "npm:ethers@^5";
import "https://deno.land/x/dotenv/load.ts";
import { CrossChainMessenger, ETHBridgeAdapter } from "npm:@eth-optimism/sdk";
import * as optimismSDK from "npm:@eth-optimism/sdk";

const gwei = BigInt(1e9);
const BridgeConfigTestnet = {
  l1URL: "https://bsc-testnet.bnbchain.org",
  l2URL: "https://opbnb-testnet-rpc.bnbchain.org",
  l1ChainID: 97,
  l2ChainID: 5611,
  contracts: {
    AddressManager: "0x0000000000000000000000000000000000000000",
    StateCommitmentChain: "0x0000000000000000000000000000000000000000",
    CanonicalTransactionChain: "0x0000000000000000000000000000000000000000",
    BondManager: "0x0000000000000000000000000000000000000000",
    L1CrossDomainMessenger: "0xD506952e78eeCd5d4424B1990a0c99B1568E7c2C",
    L1StandardBridge: "0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840",
    OptimismPortal: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31",
    L2OutputOracle: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810",
  },
  l1GasPrice: 5n * gwei,
  l1Explorer: "https://testnet.bscscan.com",
  l2Explorer: "https://testnet.opbnbscan.com",
};

const BridgeConfigMainnet = {
  l1URL: "https://bsc-dataseed.bnbchain.org",
  l2URL: "https://opbnb-mainnet-rpc.bnbchain.org",
  l1ChainID: 56,
  l2ChainID: 204,
  contracts: {
    AddressManager: "0x0000000000000000000000000000000000000000",
    StateCommitmentChain: "0x0000000000000000000000000000000000000000",
    CanonicalTransactionChain: "0x0000000000000000000000000000000000000000",
    BondManager: "0x0000000000000000000000000000000000000000",
    L1CrossDomainMessenger: "0xd95D508f13f7029CCF0fb61984d5dfD11b879c4f",
    L1StandardBridge: "0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea",
    OptimismPortal: "0x7e2419F79c9546B9A0E292Fd36aC5005ffed5495",
    L2OutputOracle: "0x0d61A015BAeF63f6740afF8294dAc278A494f6fA",
  },
  l1GasPrice: 3n * gwei,
  l1Explorer: "https://bscscan.com",
  l2Explorer: "https://opbnbscan.com",
};

const BridgeConfig = BridgeConfigTestnet;

const privateKey = Deno.env.get("PRIVATE_KEY")!;
const l1RpcProvider = new ethers.providers.JsonRpcProvider(BridgeConfig.l1URL);
const l2RpcProvider = new ethers.providers.JsonRpcProvider(BridgeConfig.l2URL);
const wallet = new Wallet(privateKey);
const l1Signer = wallet.connect(l1RpcProvider);
const l2Signer = wallet.connect(l2RpcProvider);
let crossChainMessenger: CrossChainMessenger;

const l1BUSDAddr = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
const l2BUSDAddr = "0xa9aD1484D9Bfb27adbc2bf50A6E495777CC8cFf2";

function setup() {
  crossChainMessenger = new CrossChainMessenger({
    l1ChainId: BridgeConfig.l1ChainID,
    l2ChainId: BridgeConfig.l2ChainID,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer,
    bedrock: true,
    contracts: {
      l1: BridgeConfig.contracts,
      l2: optimismSDK.DEFAULT_L2_CONTRACT_ADDRESSES,
    },
  });
  const ethBridgeAdapter = new ETHBridgeAdapter(
    {
      messenger: crossChainMessenger,
      l1Bridge: BridgeConfig.contracts.L1StandardBridge,
      l2Bridge: "0x4200000000000000000000000000000000000010",
    },
  );
  crossChainMessenger.bridges.ETH = ethBridgeAdapter;
}

async function depositERC20() {
  const tx = await crossChainMessenger.depositERC20(l1BUSDAddr, l2BUSDAddr, 1, {
    overrides: {
      gasPrice: BridgeConfig.l1GasPrice,
    },
  });
  await tx.wait();
  console.log(
    `depositBNB Transaction hash (on L1): ${BridgeConfig.l1Explorer}/tx/${tx.hash}`,
  );
  console.log(
    `please check ${BridgeConfig.l2Explorer}/address/${l1Signer.address}?tab=deposit&p=1 for the deposit txn on L2`,
  );
}

async function withdrawERC20(): Promise<string> {
  const tx = await crossChainMessenger.withdrawERC20(
    l1BUSDAddr,
    l2BUSDAddr,
    1,
    {
      overrides: {
        maxPriorityFeePerGas: 1,
        maxFeePerGas: 10000,
      },
    },
  );
  await tx.wait();
  console.log(
    `withdrawBNB Transaction hash (on L2): ${BridgeConfig.l2Explorer}/tx/${tx.hash}`,
  );
  return tx.hash;
}

async function proveWithdrawal(hash: string, wait: boolean = true) {
  while (true) {
    try {
      const tx = await crossChainMessenger.proveMessage(hash, {
        overrides: {
          gasPrice: BridgeConfig.l1GasPrice,
        },
      });
      await tx.wait();
      console.log(
        `proveWithdrawal Transaction hash (on L1): ${BridgeConfig.l1Explorer}/tx/${tx.hash}`,
      );
      break;
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("state root for message not yet published")) {
        if (wait) {
          console.log(
            `Waiting for status to be READY_TO_PROVE, current time: ${new Date()}`,
          );
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}

async function finalizeWithdrawal(hash: string, wait: boolean = true) {
  while (true) {
    try {
      const tx = await crossChainMessenger.finalizeMessage(hash, {
        overrides: {
          gasPrice: BridgeConfig.l1GasPrice,
        },
      });
      await tx.wait();
      console.log(
        `finalizeWithdrawal Transaction hash (on L1): ${BridgeConfig.l1Explorer}/tx/${tx.hash}`,
      );
      break;
    } catch (error) {
      if (
        error.message.includes(
          "proven withdrawal finalization period has not elapsed",
        )
      ) {
        if (wait) {
          console.log(
            `Waiting for status to be READY_TO_FINALIZE, current time: ${new Date()}`,
          );
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}

async function main() {
  console.log("opbnbBridge demo");

  setup();
  // deposit ERC20
  await depositERC20()

  // withdraw ERC20
  const hash = await withdrawERC20();
  await proveWithdrawal(hash);
  await finalizeWithdrawal(hash);
}

await main();
```
