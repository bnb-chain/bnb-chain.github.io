---
sidebar_label: Ecosystem
sidebar_position: 2
hide_table_of_contents: false
---

# Tools and Ecosystem of BNB Smart Chain

In order to check te latest updates on the ecosystem of the [official GitHub Page](https://github.com/binance-chain/bsc-ecosystem).

The goal of this page is to provide the current status of the open-source BNB Smart Chain Tech  Stack and highlight the potential interesting projects that are most demanded by the BSC community and ecosystem.  

## About
BNB Smart Chain is an Ethereum EVM 100% compatible blockchain, and is very good at decentralized application (Dapp) development within many possible verticals including DeFi, NFT, Gaming, and many others.

To get a better understanding of the current BSC landscope, we divide each of the layers into the various components which we feel are most important. We then highlight some of the existing projects as well as **some potentially interesting** projects that we would like to fund by Binance Accelerator Funds. If you see a component with 0 or 1 existing projects then it's likely that we would consider grant support in this area. By describing our areas of priority in detail we do not wish to preclude grant applications that address different areas that we may not have thought of. We would like to fund all projects that bring value to the ecosystem.

This is a living document and we are relying on our community to contribute to this and help maintain it. Please feel free to make edits and additions via pull requests.

## Layers of BSC Stack

In the below sections you can find a list of different layers of the BSC Stack.

### Explorer and Wallets

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Desktop Wallets | [Wise Safe](https://smart-binance.portonvictor.org/) (a port of Gnosis Safe), [Mycrypto](https://download.mycrypto.com/), [Tokenpocket](https://www.tokenpocket.pro/en/download/pc)
| Browser Extensions | [Binance Wallet](https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp),[MetaMask](https://metamask.io/), [MathWallet](https://mathwallet.xyz/en/), [SafePal](https://www.safepal.io/)  
| Mobile Wallets|  [MathWallet](https://mathwallet.xyz/en/), [TrustWallet](https://trustwallet.com/), [BitKeep](https://bitkeep.com/), [TokenPocket](https://www.tokenpocket.pro/), [SafePal](https://www.safepal.io/), [ONTO Wallet](https://www.onto.app/en), [Hyperpay](https://hyperpay.tech/), [AlphaWallet](https://alphawallet.com/), [Cobo](https://cobo.com/), [Bridge Wallet](https://www.mtpelerin.com/bridge-wallet)
| Web (burner) Wallets| [Torus](https://toruswallet.io/),[MyEtherWallet](https://www.myetherwallet.com/)
| CLI Wallet | [geth](https://github.com/binance-chain/bsc), [Seth](https://github.com/dapphub/dapptools/tree/master/src/seth)
| Multisignature Wallets| [MultiSigWallet](https://github.com/gnosis/MultiSigWallet) | gnosis
| Hardware Wallets | [Ledger](https://www.ledger.com/ethereum-wallet), [trezor](https://trezor.io/)
| Block Explorers | [BSCScan](https://bscscan.com/), [BitQuery](https://explorer.bitquery.io/bsc)
| Validator Dashboards | [BSCScan](https://bscscan.com/validatorset/), [BSC-Staking](https://www.binance.org/en/staking)
| Governance Dashboards | | UI for BSC proposal/vote

### Infrastructure
| Components | Existing projects | Potentially interesting projects
|-|-|-
|API/Node access| [Ankr](https://www.ankr.com/), [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [NowNodes](https://nownodes.io/blog/binance-smart-chain-an-introduction), [QuickNode](https://www.quicknode.com/)
|Archive Node Service| [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [InfStones](https://infstones.com/), [QuickNode](https://www.quicknode.com/)
|Public RPC Endpoints| [RPC Endpoints](https://docs.binance.org/smart-chain/developer/rpc.html)| More public nodes are encouraged
|Community Polling Dashboard| [snapshot](https://snapshot.page/)
|Gas Station Network| [opengsn](https://opengsn.org/)
|Faucet| [faucet](https://testnet.binance.org/faucet-smart)


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

Goto [BSC Developer Ecosystem](https://github.com/binance-chain/bsc-ecosystem/blob/master/BSC_Develop_Ecosystem.md) to navigate the full list.

### Dapps infra
| Components | Existing projects | Potentially interesting projects
|-|-|-
| Data Analytics && Visualization| [BSC.NEWS](https://www.bsc.news/),[DappRadar](https://dappradar.com/rankings/protocol/binance-smart-chain),[dapp.com](https://www.dapp.com/search_product?chain=BSC),[CMC](https://coinmarketcap.com/yield-farming/),[dapp.review](https://dapp.review/explore/bsc),[DefiStation](https://www.defistation.io/),[BitQuery](https://bitquery.io/),[PARSIQ](https://www.parsiq.io/)
| Oracle | [Band Protocol](https://bandprotocol.com/), [ChainLink](https://chain.link/), [Sphinx](https://m.sphinx.finance/)
| Archive Data |[InfStones](https://infstones.com/)
| File Storage, Cloud | |
| Cross Chain Bridges | [Binance Bridge](https://www.binance.org/en/bridge), [AnySwap](https://anyswap.exchange/dashboard), [renVM](https://renproject.io/), [NerveNetwork](https://nerve.network/), [JellySwap](https://jelly.market/), [PolyNetwork](https://www.poly.network/), [Orbit Bridge](https://bridge.orbitchain.io/) | Decentralized, trustless, Open Access|
| Randomness | | Trusless, Decentralized Randomness solution
| Licensing |
| Computation |
| IoT | |

### Dapps

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Scalable Transactions | | roll-ups, DAG-based consensus mechanisms, side chains |
| ZKP |  | [zkswap](https://zks.org/), [loopring](https://loopring.org/#/)
| Identity/DID | [Ontology](https://ont.io/) | [Blockpass](https://blockpass.org/), [Bloom](https://bloom.co/), [Civic](https://www.civic.com/)
| Social Networking | [prometeus](https://prometeus.io/)|
| Governance/DAO| [snapshot](https://snapshot.page/) [KOGE](https://www.bnb48.club)| [Aragon](https://aragon.org/), [DaoStack](https://daostack.io/)
| Gaming | [RocketGame](https://rocketgame.vip/), [BambooSwap](https://bambooswap.org/), [Blink](https://blink.wink.org/), [Battle Pets](https://www.battlepets.finance/), [Arkane](https://arkane.network/), Curvegrid
| NFT/Collectibles| [Alpaca.City](https://alpaca.city/), [Juggernaut JGN](https://jgndefi.com/), [Thugs.Fi](http://thugs.fi/), [Dego](https://dego.finance/), [NFTForGood.org](https://www.NFTForGood.org), [Bounce](https://bounce.finance/), [Arkane](https://arkane.network/), Curvegrid, ATTN, [XWorld Games](https://xwg.games/)| [Knownorigin](https://knownorigin.io/), [Rarible](https://rarible.com/), [Opensea](https://opensea.io/)
| Community & Fans | Realy, [Chilz](https://cryptologos.cc/chiliz)
| BTC | Binance BTC, [renBTC](https://renproject.io/), [anyBTC](https://anyswap.exchange/dashboard)|
| Stablecoins | BUSD, [VAI](https://venus.io/), [QIAN](https://bsc.qian.finance/qian/home), [Ditto](https://ditto.money/), [bDollar](https://www.bdollar.fi)
| Credit & Lending | [7up.finance](https://7up.finance/), [Cream.finance](https://app.cream.finance/), [ForTube](https://bsc.for.tube/), [Venus](https://venus.io/), [CokeFinance](https://cokefinance.com/)
| Exchange & Liquidity | [BakerySwap](https://www.bakeryswap.org/), [Bounce.Finance](https://bsc.bounce.finance/), [BurgerSwap](https://burgerswap.org/), [DODO](https://app-bsc.dodoex.io/), [Equator.Finance](https://equator.finance/), [PancakeSwap](https://pancakeswap.finance/), [Spartan Protocol](https://spartanswap.com/), [bStable.finance](https://bstable.finance), [StableXSwap](https://stablexswap.com/), [Thugs.Fi](https://thugs.fi/), [Unisave](https://info.y3d.finance/home), [BestSwap](https://bsc.bestswap.com/swap/swap), [UniFi](https://www.unifiprotocol.com/), [Tenet](https://bsc.tenet.farm/), [UniTrade](https://unitrade.app/), [Rubic](https://rubic.exchange/), [Jetfuel](https://jetfuel.finance/), [Belt.fi](https://belt.fi/), [Yogi](https://yogi.fi/)
| Earn & Aggregators | [Defi.money(YFII)](https://bsc.dfi.money/),[Dego](http://bsc.dego.finance/),[fry.World](https://fry.world/),[Xend Finance](https://xend.finance/),[OpenOcean](https://openocean.finance/network/bsc),[BeefyFinance](https://beefy.finance/),[dForce](https://staking.dforce.network/),[Pancakebunny](https://pancakebunny.finance/),[Reef.finance](https://reef.finance/),[Bearn.fi](https://bearn.fi/),[ACryptoS](https://acryptos.com/), [Dexguru](https://dex.guru/),[Cross Pool](https://crosspool.hotcross.com/)
| Insurance | [Certik](https://www.certik.foundation/),[Helmet](https://app.helmet.insure/),[Soteria](https://soteria.finance/) | [Cover Protocol](https://www.coverprotocol.com/)
| Derivatives | [Hedget](https://www.hedget.com/), [Mettalex](https://mettalex.com/), [Injective Protocol](https://injectiveprotocol.com/)| [Hegic](https://www.hegic.co/), [FinNexus Options](https://options.finnexus.io/)
| Payment | [SWFT](https://www.swft.pro/zh-pc/#/home), [MultiSender](https://multisender.app/) | [Celer Network](https://www.celer.network/), [Connext](https://connext.network/)
| Asset Tokenization | [Bridge Protocol](https://www.mtpelerin.com/bridge-protocol) | [Harbor](https://harbor.com/), [Neufund](https://neufund.org/)
| Tools | [Unrekt](https://unrekt.net/) |


### Host

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Rust |
| Go | [BSC](https://github.com/binance-chain/bsc)


### Signatures

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Easy multisig scheme |
| Validator HSMs| |
| Validator HSM-like solutions|