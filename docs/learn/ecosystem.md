---
sidebar_label: Tools 
sidebar_position: 2
hide_table_of_contents: false
---

# Development Tools

In order to check the latest updates on the ecosystem of the [official GitHub Page](https://github.com/bnb-chain/bsc-ecosystem).

The goal of this page is to provide the current status of the open-source BNB Smart Chain Tech  Stack and highlight the potential interesting projects that are most demanded by the BSC community and ecosystem.  

## About
BNB Smart Chain is an Ethereum EVM 100% compatible blockchain, and is very good at decentralized application (Dapp) development within many possible verticals including DeFi, NFT, Gaming, and many others.

To get a better understanding of the current BSC landscope, we divide each of the layers into the various components which we feel are most important. We then highlight some of the existing projects as well as **some potentially interesting** projects that we would like to fund by Binance Accelerator Funds. If you see a component with 0 or 1 existing projects then it's likely that we would consider grant support in this area. By describing our areas of priority in detail we do not wish to preclude grant applications that address different areas that we may not have thought of. We would like to fund all projects that bring value to the ecosystem.

>📝 _This is a living document and we are relying on our community to contribute to this and help maintain it. Please feel free to make edits and additions via pull requests._

## Layers of BSC Stack

In the below sections you can find a list of different layers of the BSC Stack.

### Explorer and Wallets

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Desktop Wallets | [Wise Safe](https://smart-binance.portonvictor.org/) (a port of Gnosis Safe), [TokenPocket](https://www.tokenpocket.pro/en/download/pc)
| Browser Extensions | [Binance Wallet](https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp),[MetaMask](https://metamask.io/), [MathWallet](https://mathwallet.xyz/en/), [SafePal](https://www.safepal.io/)  
| Mobile Wallets|  [MathWallet](https://mathwallet.xyz/en/), [TrustWallet](https://trustwallet.com/), [BitKeep](https://bitkeep.com/), [TokenPocket](https://www.tokenpocket.pro/), [SafePal](https://www.safepal.io/), [ONTO Wallet](https://www.onto.app/en)
| Web (burner) Wallets| [Torus](https://toruswallet.io/),[MyEtherWallet](https://www.myetherwallet.com/)
| CLI Wallet | [geth](https://github.com/bnb-chain/bsc), [Seth](https://github.com/dapphub/dapptools/tree/master/src/seth)
| Multisignature Wallets| [MultiSigWallet](https://github.com/gnosis/MultiSigWallet) | gnosis
| Hardware Wallets | [Ledger](https://www.ledger.com/ethereum-wallet), [Trezor](https://trezor.io/), [SafePal](https://safepal.io/)
| Block Explorers | [BSCScan](https://bscscan.com/), [NFTscan](https://bnb.nftscan.com/)
| Validator Dashboards | [BSCScan](https://bscscan.com/validatorset/), [BSC-Staking](https://www.binance.org/en/staking)
| Governance Dashboards | | UI for BSC proposal/vote
| BNBChain List Explorer | [BNBChain List](https://www.bnbchainlist.org/) 

### Infrastructure
| Components | Existing projects | Potentially interesting projects
|-|-|-
|API/Node access| [Ankr](https://www.ankr.com/), [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [NowNodes](https://nownodes.io/blog/binance-smart-chain-an-introduction), [QuickNode](https://www.quicknode.com/), [Nodereal](https://nodereal.io/)
| NFT APIs| [NFTScan](https://bnb.nftscan.com/), [BlockVision](https://blockvision.org/), [Venly](https://www.venly.io/)
|Archive Node Service| [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [InfStones](https://infstones.com/), [QuickNode](https://www.quicknode.com/), [Nodereal’s Meganode](https://docs.nodereal.io/nodereal/meganode/archive-node)
|Public RPC Endpoints| [RPC Endpoints](https://docs.binance.org/smart-chain/developer/rpc.html)| More public nodes are encouraged
|Community Polling Dashboard| |
|Gas Station Network| [opengsn](https://opengsn.org/)
|Faucet| [BSC Test Faucet](https://testnet.binance.org/faucet-smart)


### Tools, APIs and Languages

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Smart Contract Languages | [Solidity](https://solidity.readthedocs.io/en/latest/), [Vyper](https://vyper.readthedocs.io/en/latest/)
| Dev Frameworks | [Truffle](https://trufflesuite.com/),[Embark](https://github.com/embark-framework/embark),[Waffle](https://getwaffle.io/),[Dapp](https://dapp.tools/dapp/),[OpenZeppelin SDK](https://openzeppelin.com/sdk/),[hardhat](https://hardhat.org/)
| IDEs | [BSC Studio](https://github.com/ObsidianLabs/BSC-Studio),[Remix](https://remix.ethereum.org/),[Intellij Solidity Plugin](https://jetbrains.com/idea/), [chainide](https://eth.chainide.com/project/welcome)
| Lint Tools | [Solhint](https://github.com/protofire/solhint), [Ethlint](https://github.com/duaraghav8/Ethlint)
| Testing Tools | [Solidity code coverage](https://github.com/0xProject/0x-monorepo/tree/development/packages/sol-coverage), [Solidity function profiler](https://github.com/EricR/sol-function-profiler), [eth-tester](https://github.com/ethereum/eth-tester)
| Test blockchain networks | [bscnode](https://docs.binance.org/smart-chain/developer/fullnode.html), [Ganache](https://github.com/trufflesuite/ganache)
| Security tools | [MythX](https://mythx.io/), [Mythril](https://github.com/ConsenSys/mythril), [Oyente](https://github.com/melonproject/oyente), [Securify](https://securify.chainsecurity.com/), [Solgraph](https://github.com/raineorshine/solgraph), [solc-verify](https://github.com/SRI-CSL/solidity/)
| ABI (Application Binary Interface) tools | [ABI decoder](https://github.com/ConsenSys/abi-decoder), [ABI-gen](https://github.com/0xProject/0x-monorepo/tree/development/packages/abi-gen), [Ethereum ABI UI](https://github.com/hiddentao/ethereum-abi-ui)
| Monitoring | [Neufund - Smart Contract Watch](https://github.com/Neufund/smart-contract-watch), [BlockScout](https://github.com/poanetwork/blockscout), [Terminal](https://terminal.co/), [Ethereum-watcher](https://github.com/HydroProtocol/ethereum-watcher)
| Frontend BSC APIs | [Web3.js](https://github.com/ethereum/web3.js/), [Eth.js](https://github.com/ethjs), [Ethers.js](https://github.com/ethers-io/ethers.js/), [light.js](https://github.com/paritytech/js-libs/tree/master/packages/light.js)
| Backend BSC APIs | [Web3.py](https://github.com/ethereum/web3.py), [Web3.php](https://github.com/sc0Vu/web3.php), [Java Web3](https://github.com/web3j/web3j), [Net Web3](https://nethereum.com/), [Ruby Web3](https://github.com/EthWorks/ethereum.rb)

Goto [BSC Developer Ecosystem](https://github.com/bnb-chain/bsc-ecosystem/blob/master/BSC_Develop_Ecosystem.md) to navigate the full list.

### Dapps infra
| Components | Existing projects | Potentially interesting projects
|-|-|-
| Data Analytics & Visualization| [The Graph](https://thegraph.com/en/),[DappRadar](https://dappradar.com/rankings/protocol/binance-smart-chain),[dapp.com](https://www.dapp.com/search_product?chain=BSC),[CMC](https://coinmarketcap.com/yield-farming/),[dapp.review](https://dapp.review/explore/bsc),[DefiStation](https://www.defistation.io/),[BitQuery](https://bitquery.io/),[PARSIQ](https://www.parsiq.io/), [CryptoSlam](https://cryptoslam.io/)
| Oracle | [Band Protocol](https://bandprotocol.com/), [ChainLink](https://chain.link/), [Pyth](https://pyth.network/)
| Archive Data |[InfStones](https://infstones.com/)
| File Storage, Cloud | [IPFS](https://ipfs.io/) 
| Cross Chain Bridges | [renVM](https://renproject.io/), [NerveNetwork](https://nerve.network/),[PolyNetwork](https://www.poly.network/), [Orbit Bridge](https://bridge.orbitchain.io/), [Multichain](https://multichain.xyz/), [Celer cbridge](https://cbridge.celer.network/), [ChainHop] (https://chainhop.exchange/)| Decentralized, trustless, Open Access|
| Automation | [Gelato](https://www.gelato.network/)
| Browsers | [Brave](https://brave.com/), [Opera](https://www.opera.com/)
| Identity/DID/Credentials | [Ontology](https://ont.io/), [Galaxy](https://galaxy.eco/), [Space ID](https://space.id/), [CyberConnect](https://cyberconnect.me/)
| Easy Wallet Onboarding	| [Web3auth](https://web3auth.io/), [Venly](https://www.venly.io/), [Sequence](https://sequence.xyz/)
| Social Networking | [Prometeus](https://prometeus.io/), [CyberConnect](https://cyberconnect.me/)
| Governance/DAO | 
| Gaming Related Infrastructure | [Carv (Gaming Credential)](https://carv.io/), [Community Gaming (Tournament)](https://www.communitygaming.io/)
| Security Audit |	[Certik](https://www.certik.com/), [PeckShield](https://peckshield.com/)
| Payment | [SWFT](https://www.swft.pro/zh-pc/#/home), [MultiSender](https://multisender.app/) | [Celer Network](https://www.celer.network/), [Connext](https://connext.network/)
| Payment Gateway | [Bifinity](https://bifinity.com), [MoonPay](https://www.moonpay.com/), [Transak](https://transak.com/)
