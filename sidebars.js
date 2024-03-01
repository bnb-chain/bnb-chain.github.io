/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation


 The sidebars can be generated from the filesystem, or explicitly defined here.


 Create as many sidebars as you want.
 */


// @ts-check


/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
 
  bscSideBar: [
    {
      type: 'category',
      label: 'BNB Chain',
      collapsible: true,
      collapsed: true,
      items: [
         'overview', 'getting-started',
         
          {
            type: 'category',
            collapsible: true,
            collapsed: true,
            label: 'BNB Smart Chain',
            items: ['learn/intro',
                    'bsc-faucet',
                {type: 'doc', label: 'Tutorials', id:'bsc-tutorials'},


                {
                type: 'category',
                collapsed: true,
                label: 'Core Concepts',
                items: ['learn/consensus',
                          {type: 'category',
                          collapsible: true,
                          collapsed: true,
                          label: 'BC and BSC Cross-Chain Mechanism',
                          items: ['learn/cross-chain', 'learn/system-contract',
                                   'learn/bsc-relayer', 'learn/incentives',
                                  'learn/oracle-module','learn/oracle-relayer', 'learn/cross-chain-api']},
                                  'learn/bsc-gov']
                },
     
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: 'Develop',
              items: [
                      {type: 'doc', label: 'Development Tools', id:'learn/ecosystem'},
                      {type:'doc', id:'rpc', label:'RPC Endpoints'},
                      'BSCmainnet', 'BSCtestnet', 'BSCexplorers',
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Running BSC Nodes',
                        items: ['validator/best-practice','validator/fullnode','BSC-fast-node','archivenode','BSC-separate-node','BSC-verify-node', 'boot-nodes', 'validator/node-maintenance', 'validator/upgrade-fullnode', 'validator/docker']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Deploy Smart Contract',
                        items: ['chainide', 'remix-new', 'truffle-new', 'hardhat-new', 'replit', 'verify']
                      },
                      {
                        type: 'category',
                        label: 'Deploy NFTs on BSC',
                        items:['nft-metadata-standard', 'ERC721', 'nft_blackide', 'nft-storage']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'BEP20 Tokens',
                        items: ['BEP20', 'issue-BEP20',
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: 'Bind Tokens',
                                    items: ['tokens-cross-chain', 'bind-tokens', 'mirror',
                                    'circulation-model', 'sync' ]
                                  },
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: 'BEP20 Contracts',
                                    items: ['proxy', 'verify-proxy']
                                  },
                              ]
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Dapp Tutorials',
                        items: ['dapp-dev/Hello-World', 'dapp-dev/web3js-tutorial']
                      },
                      'oracles',
                      {type: 'doc', id: 'dstorages', label: 'dStorages'},
                      {type: 'doc', id: 'learn/cross-chain-bridges', label: 'Cross-Chain Bridges'},
            ]},  
           
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Validator',
              items: ['validator/overview', 'validator/create-val', 'validator/run-val'],
            },
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Staking',
              items: ['stake/Staking', 'stake/cli-commands', 'wallet/staking',
              {
                type: 'category',
                collapsed: true,
                label: 'Slashing',
                items:['validator/Penalty-overview', 'validator/unjail',
                       'validator/slash-fee', 'validator/send-slash-evidence',
                    'validator/monitor-and-query-slash'
                ]
              },
              ]
            },
            {
              type: 'category',
              collapsed: true,
              label: 'Migrating to BNB Chain',
              items: [
                 {
                  type: 'category',
                  collapsed: true,
                  label: 'Solana',
                  items:['migration/non-evm-chains/solana/architecture-comparison',
                         'migration/non-evm-chains/solana/token-migration']
                 },
                 {
                  type: 'category',
                  collapsed: true,
                  label: 'Polygon',
                  items:['migration/evm-chains/chain-comparison',
                         'migration/evm-chains/token-comparison',
                         'migration/evm-chains/token-migration']
                 }
                ]
            },


            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Wallet',
              items: ['Wallet', 'create-wallet',
              {
                type: 'category',
                //collapsible: true,
                collapsed: true,
                label: 'BNB Chain Extension Wallet',
                items: ['bnb-chain-wallet','manual', 'add-account', 'wallet_api','staking-with-ext-wallet']
              },
              {
                type: 'category',
                collapsed: true,
                label: 'Tutorials on Third Party Wallets',
                items:['wallets/wallet-tutorial-overview','wallet/trustwallet', 'wallet/metamask','wallet/arkane', 'wallet/math', 'wallet/myetherwallet',
                  'wallet/infinitywallet', 'wallet/AlphaWallet', 'wallet/coin98wallet',
                  'wallet/ledger', 'wallet/trezor', 'wallets/tutorial/BSCimToken', 'learn/gnosis']
            },
              ]
            },
          ],
          },
                   
          {
            type: 'category',
            label: 'BNB Beacon Chain',
            collapsible: true,
            collapsed: true,
            items: ['learn/beaconIntro',
                      {type: 'doc', label: 'Tutorials', id:'beaconchain/bc-tutorials'},
                      {
                        type:'category',
                        label: 'Learn',
                        collapsed: true,
                        items:[ 'beaconchain/learn/architecture', 'beaconchain/governance', 'beaconchain/learn/accounts', 'beaconchain/learn/escrow-accounts', 'beaconchain/learn/assets',
                            'beaconchain/learn/breathe-block', 'beaconchain/learn/transactions', 'beaconchain/learn/genesis', 'beaconchain/learn/signature', 'beaconchain/learn/BEP8',
                       
                        {
                            type: 'category',
                            label: 'Encoding',
                            collapsed: true,
                            items: [ 'encoding', 'beaconchain/learn/encoding/encoding',
                            'beaconchain/learn/encoding/amino-example']
                        },
                        ]
                      },
                      {
                        type:'category',
                        label:'Develop',
                        items: [
                        {type:'doc', id: 'beaconchain/develop/rpc', label:'RPC'},
                        {
                          type:'category',
                          label:'BNB Beacon Chain Fullnode',
                              items: ['beaconchain/develop/node/install', 'beaconchain/develop/node/join-mainnet',
                                  'beaconchain/develop/node/join-testnet', 'beaconchain/develop/node/synctypes',
                                  'beaconchain/develop/node/extra-info', 'beaconchain/develop/node/nodetypes',
                                  'beaconchain/develop/node/upgrade', 'beaconchain/develop/node/localnetwork',
                                  'beaconchain/develop/node/fullnodeissue'
                              ]
                        },
                        {type:'doc', id: 'beaconchain/develop/api-reference/cli', label:'BNB Beacon Chain CLI'},
                        {type:'doc', id: 'beaconchain/develop/bcsdk', label:'BNB Beacon Chain SDK'},
                        {type:'doc', id: 'beaconchain/develop/testnetandexplorer', label:'BNB Beacon Chain Testnet'},
                        {type:'doc', id: 'beaconchain/light-client', label:'Light Client'},
                        {type:'doc', id: 'beaconchain/tokens', label:'Asset Management'},
                        {
                          type: 'category',
                          label:'BNB Beacon Chain API Reference',
                          items:[
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/block-service', label: 'New Accelerated Node HTTP API Mainnet'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths', label: 'Accelerated Node HTTP API Mainnet - Paths and Models'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths-testnet', label: 'Accelerated Node HTTP API Testnet- Paths and Models'},
                            {type:'link', href:"pathname:///api-swagger/index.html", label: 'Accelerated Node HTTP API Swagger'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/staking', label: 'Staking API'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-connection', label: 'WebSockets - Connecting'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-streams', label: 'WebSockets - Streams'},
                            {type:'doc', id:'beaconchain/develop/api-reference/node-rpc', label: 'Node RPC - Paths and Models'},
                            {type:'link', href:"pathname:///rpc-swagger/index.html", label: 'Node RPC Swagger'}
                          ]
                        },
                       
                        ]
                      },
                      {
                          type: 'category',
                          label:'Validator',
                          items:[
                              {type:'doc', id:'beaconchain/validator/overview', label:'Overview'},
                              {type:'doc', id:'beaconchain/validator/create-val', label:'Create Validator'},
                              {type:'doc', id:'beaconchain/validator/run-val', label:'Run Validator'},
                          ]
                      },
                      {
                        type: 'category',
                        label:'Wallet',
                        items:['beaconchain/wallets',
                          {
                            type: 'category',
                            label:'Tutorials',
                            items:[
                            {type:'doc', id:'beaconchain/wallet/tutorial/how-to-create-a-wallet-on-trustwallet', label:'Trust Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/ledger-nano-s-usage-guide', label:'Ledger Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/trezor-model-t-user-guide', label:'Trezor Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/bep8', label:'How to manage BEP8 token with Web Wallet'},
                          ]
                          }
                        ]
                      }
            ],
          },


          {
            type: 'link',
            label: 'BNB Greenfield',
            href: 'https://docs.bnbchain.org/greenfield-docs/',
          },


          {
            type: 'link',
            label: 'zkBNB',
            href:'https://docs.bnbchain.org/zkBNB-docs/',
          },

         {
            type: 'link',
            label: 'opBNB',
            href:'https://docs.bnbchain.org/opbnb-docs/',
          },

          {
              type: 'category',
              label: '🌅BNB Beacon Chain Sunset',
              collapsible: true,
              collapsed: true,
              items: [
                  {type: 'doc', label: 'Overview', id:'bcfusion/overview'},
                  {
                      type: 'category',
                      label:'For Users',
                      items:[
                          {type:'doc', id:'bcfusion/users/assets', label:'Manange Your Assets'},
                          {type:'doc', id:'bcfusion/users/swaps', label:'Manage Your Atomic Swaps'},
                          {type:'doc', id:'bcfusion/users/timelocks', label:'Manage Your TimeLocks'},
                          {type:'doc', id:'bcfusion/users/delegations', label:'Manage Your Delegations'},
                      ]
                  },
                  {
                      type: 'category',
                      label:'For Token Issuers',
                      items:[
                          {type:'doc', id:'bcfusion/owners/bind', label:'Bind Your Tokens'},
                      ]
                  },
                  {
                      type: 'category',
                      label:'For Validators',
                      items:[
                          {type:'doc', id:'bcfusion/validators/migrations', label:'Migrate Your Validators'},
                          {type:'doc', id:'bcfusion/validators/creation', label:'Create New Validators'},
                      ]
                  },
                  {
                      type: 'category',
                      label:'For Developers',
                      items:[
                          {type:'doc', id:'bcfusion/developers/staking', label:'New Staking'},
                          {type:'doc', id:'bcfusion/developers/gov', label:'New Governance'},
                          {type:'doc', id:'bcfusion/developers/crosschain-redelegation', label:'Cross Chain Redelegation'},
                      ]
                  },
                  {
                      type: 'category',
                      label:'New Staking & Governance',
                      items:[
                          {type:'doc', id:'bcfusion/validators/staking', label:'Staking'},
                          {type:'doc', id:'bcfusion/validators/slash', label:'Slash'},
                          {type:'doc', id:'bcfusion/validators/gov', label:'Governance'},
                      ]
                  },
              ],
          },

      ],
    },
    {
      type: 'link',
      label: 'BSC Roadmap',
      href: 'https://forum.bnbchain.org/t/bnb-chain-upgrades-mainnet/936',
    },


    {
      type: 'category',
      //collapsible: true,
      collapsed: true,
      label: 'FAQs',
      items: [      
        {
          type: 'category',
          collapsed: true,
          label: 'BNB Smart Chain FAQs',
          items: ['BSC-FAQs-general', 'BSC-FAQs-tokens',
                  'BSC-FAQs-validator', 'BSC-FAQs-delegator',
                  'parameters', 'cross'],
        },
        {
          type: 'doc', label: 'BNB Beacon Chain FAQs', id: 'beaconchain/faq/faq',
        },
     ],


    },
   
    {type: 'doc',   id: 'contribute',   label: 'Contribute to BSC'},
    {type: 'doc',   id: 'submit-dapp',   label: 'Join BNBChain Ecosystem'},
    {type: 'doc',   id: 'more-help',   label: 'More Help'},
  ],
   
};


module.exports = sidebars;
