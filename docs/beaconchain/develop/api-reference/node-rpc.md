# Node RPC

RPC endpoints may be used to interact with a node directly over HTTP or websockets. Using RPC, you may perform low-level operations like executing ABCI queries, viewing network/consensus state or broadcasting a transaction.

## 1. Connecting

There are two main ways to connect to a node to send RPC commands.

### 1.1 Use your own local node

This page assumes that you have your own node running locally, so examples here use `localhost:27146` to represent using RPC commands on a local node.

Alternatively, you are able to use a node that is hosted in the Binance Chain network.

### 1.2 Use an existing node on the network

The Binance Chain infrastructure deployment contains so-called "data seed" nodes, which have their RPC ports available for access. To find a seed node that is available, you can use the [peers](./dex-api/paths.md#apiv1peers) endpoint to get a list of network peers.

Here is an example of a node that is available for RPC access. The following is the output of `localhost:27147/status`:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "7156d461742e2a1e569fd68426009c4194830c93",
      "listen_addr": "aa841c226243a11e9a951063f6065739-eee556e439dc6a3b.elb.ap-northeast-1.amazonaws.com:27146",
      "network": "Binance-Chain-Ganges",
      "version": "0.30.1",
      "channels": "354020212223303800",
      "moniker": "data-seed-2",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:27147"
      }
    },
    "sync_info": {
      "latest_block_hash": "724AD02BE3216B7DD28B60F526C79E43D41C5E0AD6554C3390CA905A736593AE",
      "latest_app_hash": "1A2F316DB23C06FD897B680823145183A2DF9C64D05C0038F37B066567130F70",
      "latest_block_height": "7806468",
      "latest_block_time": "2019-04-12T11:21:50.410854479Z",
      "catching_up": false
    },
    "validator_info": {
      "address": "32B88CEB9CE3EF1EABB840EC1556A5B4A5FD7FDB",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "jAXPwM0xV1iwn7XJz6H0Zk8RxgELUAfjStxzIYKxaEk="
      },
      "voting_power": "0"
    }
  }
}
```

So, using this node, we are able to use raw RPC commands below or the `bnbcli` tool to make a query:

```bash
$ bnbcli dex show -l NNB-0AB_BNB --chain-id Binance-Chain-Ganges --node data-seed-pre-2-s1.binance.org:80
```

## 2. Protocols

The following RPC protocols are supported:

- URI over HTTP
- JSONRPC over HTTP
- JSONRPC over websockets

RPC is built using Tendermint's RPC library which contains its own set of documentation and tests.
See it here: <a href="https://github.com/tendermint/tendermint/tree/master/rpc/lib">https://github.com/tendermint/tendermint/tree/master/rpc/lib</a>

## 3. Configuration

RPC can be configured by tuning parameters under `[rpc]` table in the `$TMHOME/config/config.toml` file or by using the `--rpc.X` command-line flags.

Default rpc listen address is `tcp://0.0.0.0:27147`. To set another address, set the `laddr` config parameter to a desired value.
CORS (Cross-Origin Resource Sharing) can be enabled by setting the `cors_allowed_origins`, `cors_allowed_methods`, `cors_allowed_headers` config parameters.

## 4. Arguments

Arguments which expect strings or byte arrays may be passed as quoted strings, like `"abc"` or as `0x`-prefixed strings, like `0x616263`.

If you plan to call `broadcast` functions with rest, you can generate the transaction hex output by adding a `--dry` flag to your command. For example:

```
bnbcli send --from XXX --to bnb1XXXXXXXXXXXXXXXX --amount 1:BNB --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --json --memo "Test transfer" --dry --offline
Password to sign with 'guest':
Transaction hash: 3592BB385569BBFE346907365CFAED9341B85BAD2920B5E0B174484ECA3CD16C, Transaction hex: c701f0625dee0a462a2c87fa0a1f0a1441462c3f2a924f94c4012f4c7bbc3b0ed9213b6b12070a03424e421002121f0a14ade844d9f3a577086211bc93c0c306540b94bb4a12070a03424e421002126a0a26eb5ae987210381a2a87abf9fdd30512b9f40e9ed88516f2ef96a00ed02754a78793bf73f97b81240c926d1d93ea89730836f186a88fbe3b3719d516b8f849d414c38fc9d906ac77b7bb460f2f36564b74317aa0e3e6d9570db07763760effec15a5c600e5fb671041a0d54657374207472616e73666572
```

### 4.1 URI/HTTP

```bash
curl 'localhost:27147/broadcast_tx_sync?tx=0xdb01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34331a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a1240598c3a74dc08d82d97668ed3523a105a2afb752c5be34d09fb5f3158d55db2f545a2466263cf80f02d1184dd50efc4d8a636a262909a632ebeddeaa426c092b218d2e518202a'
```

> Response:

```json
{
	"jsonrpc": "2.0",
	"id": "",
	"result": {
		"code": 0,
		"data": "7B226F726465725F6964223A22383133453439333946313536374232313937303446464332414434444635384244453031303837392D3433227D",
		"log": "Msg 0: ",
		"hash": "AB1B84C7C0B0B195941DCE9CFE1A54214B72D5DB54AD388D8B146A6B62911E8E"
	}
}
```

### 4.2 JSONRPC/HTTP

JSONRPC requests can be POST'd to the root RPC endpoint via HTTP (e.g. <a href="http://localhost:27147/">http://localhost:27147/</a>).

```json
{
  "method": "broadcast_tx_sync",
  "jsonrpc": "2.0",
  "params": [
    "abc"
  ],
  "id": "dontcare"
}
```

### 4.3 JSONRPC/websockets

JSONRPC requests can be made via websocket. The websocket endpoint is at `/websocket`, e.g. `localhost:27147/websocket`.  Asynchronous RPC functions like event `subscribe` and `unsubscribe` are only available via websockets.

## 5. RPC Endpoint List

An HTTP Get request to the root RPC endpoint shows a list of available endpoints.

```bash
curl 'localhost:27147'
```

> Response:

**Available endpoints that don't require arguments:**

```plain
/abci_info
/consensus_state
/dump_consensus_state
/genesis
/health
/net_info
/num_unconfirmed_txs
/status
```

**Endpoints that require arguments:**

```plain
/abci_query?path=_&data=_&prove=_
/block?height=_
/block_result?height=_
/blockchain?minHeight=_&maxHeight=_
/broadcast_tx_async?tx=_
/broadcast_tx_commit?tx=_
/broadcast_tx_sync?tx=_
/commit?height=_
/consensus_params?height=_
/dial_seeds?seeds=_
/dial_persistent_peers?persistent_peers=_
/subscribe?query=_
/tx?hash=_&prove=_
/tx_search?query=_&prove=_&page=_&per_page=_
/unconfirmed_txs?limit=_
/unsubscribe?query=_
/unsubscribe_all?
/validators?height=_
```



## 6. APIs

### 6.1 Query APIs


#### 6.1.1 Query ABCIInfo

Get some info about the application.
**Return Type:**

```
type ResponseInfo struct {
	Data                 string
	Version              string
	AppVersion           uint64
	LastBlockHeight      int64
	LastBlockAppHash     []byte
}
```

**Example**

```shell
curl 'localhost:27147/abci_info'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {
	// handle error
}
defer client.Stop()
info, err := client.ABCIInfo()
```

> The above command returns JSON structured like this:

```json
{
    "jsonrpc": "2.0",
    "id": "",
    "result": {
        "response": {
            "data": "BNBChain",
            "last_block_height": "7579978",
            "last_block_app_hash": "92HKpxrNKqYkzSRj49FI+PjzVx7oirnYrwhMzG0CRDg="
        }
    }
}
```

#### 6.1.2 Query ConsensusState

ConsensusState returns a concise summary of the consensus state. This is just a snapshot of consensus state, and it will not persist.


**Return Parameters**
return round states

```
type ResultConsensusState struct {
	RoundState json.RawMessage `
}
```

**Example**

```shell
curl 'localhost:27147/consensus_state'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
state, err := client.ConsensusState()
```

The above command returns JSON structured like this:

```json
{
	"jsonrpc": "2.0",
	"id": "",
	"result": {
	  "round_state": {
	    "height/round/step": "9336/0/1",
	    "start_time": "2018-05-14T10:25:45.72595357-04:00",
	    "proposal_block_hash": "",
	    "locked_block_hash": "",
	    "valid_block_hash": "",
	    "height_vote_set": [
	      {
	        "round": "0",
	        "prevotes": [
	          "nil-Vote"
	        ],
	        "prevotes_bit_array": "BA{1:_} 0/10 = 0.00",
	        "precommits": [
	          "nil-Vote"
	        ],
	        "precommits_bit_array": "BA{1:_} 0/10 = 0.00"
	      }
	    ]
	  }
	}
}
```
#### 6.1.3 Query DumpConsensusState

DumpConsensusState dumps consensus state. This is just a snapshot of consensus state, and it will not persist.

**Return Parameters**
return round states

```
type ResultConsensusState struct {
	RoundState json.RawMessage `
}
```

**Example**

```shell
curl 'localhost:27147/dump_consensus_state'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
state, err := client.DumpConsensusState()
```

The above command returns JSON structured like this:

```json
{
	"jsonrpc": "2.0",
	"id": "",
	"result": {
	  "round_state": {
	    "height": "7185",
	    "round": "0",
	    "step": "1",
	    "start_time": "2018-05-12T13:57:28.440293621-07:00",
	    "commit_time": "2018-05-12T13:57:27.440293621-07:00",
	    "validators": {
	      "validators": [
	        {
	          "address": "B5B3D40BE53982AD294EF99FF5A34C0C3E5A3244",
	          "pub_key": {
	            "type": "tendermint/PubKeyEd25519",
	            "value": "SBctdhRBcXtBgdI/8a/alTsUhGXqGs9k5ylV1u5iKHg="
	          },
	          "voting_power": "10",
	          "proposer_priority": "0"
	        }
	      ],
	      "proposer": {
	        "address": "B5B3D40BE53982AD294EF99FF5A34C0C3E5A3244",
	        "pub_key": {
	          "type": "tendermint/PubKeyEd25519",
	          "value": "SBctdhRBcXtBgdI/8a/alTsUhGXqGs9k5ylV1u5iKHg="
	        },
	        "voting_power": "10",
	        "proposer_priority": "0"
	      }
	    },
	    "proposal": null,
	    "proposal_block": null,
	    "proposal_block_parts": null,
	    "locked_round": "0",
	    "locked_block": null,
	    "locked_block_parts": null,
	    "valid_round": "0",
	    "valid_block": null,
	    "valid_block_parts": null,
	    "votes": [
	      {
	        "round": "0",
	        "prevotes": "_",
	        "precommits": "_"
	      }
	    ],
	    "commit_round": "-1",
	    "last_commit": {
	      "votes": [
	        "Vote{0:B5B3D40BE539 7184/00/2(Precommit) 14F946FA7EF0 /702B1B1A602A.../ @ 2018-05-12T20:57:27.342Z}"
	      ],
	      "votes_bit_array": "x",
	      "peer_maj_23s": {}
	    },
	    "last_validators": {
	      "validators": [
	        {
	          "address": "B5B3D40BE53982AD294EF99FF5A34C0C3E5A3244",
	          "pub_key": {
	            "type": "tendermint/PubKeyEd25519",
	            "value": "SBctdhRBcXtBgdI/8a/alTsUhGXqGs9k5ylV1u5iKHg="
	          },
	          "voting_power": "10",
	          "proposer_priority": "0"
	        }
	      ],
	      "proposer": {
	        "address": "B5B3D40BE53982AD294EF99FF5A34C0C3E5A3244",
	        "pub_key": {
	          "type": "tendermint/PubKeyEd25519",
	          "value": "SBctdhRBcXtBgdI/8a/alTsUhGXqGs9k5ylV1u5iKHg="
	        },
	        "voting_power": "10",
	        "proposer_priority": "0"
	      }
	    }
	  },
	  "peers": [
	    {
	      "node_address": "30ad1854af22506383c3f0e57fb3c7f90984c5e8@172.16.63.221:27146",
	      "peer_state": {
	        "round_state": {
	          "height": "7185",
	          "round": "0",
	          "step": "1",
	          "start_time": "2018-05-12T13:57:27.438039872-07:00",
	          "proposal": false,
	          "proposal_block_parts_header": {
	            "total": "0",
	            "hash": ""
	          },
	          "proposal_block_parts": null,
	          "proposal_pol_round": "-1",
	          "proposal_pol": "_",
	          "prevotes": "_",
	          "precommits": "_",
	          "last_commit_round": "0",
	          "last_commit": "x",
	          "catchup_commit_round": "-1",
	          "catchup_commit": "_"
	        },
	        "stats": {
	          "last_vote_height": "7184",
	          "votes": "255",
	          "last_block_part_height": "7184",
	          "block_parts": "255"
	        }
	      }
	    }
	  ]
	}

}
```

#### 6.1.4 Query NetInfo

Get network info.

**Return Parameters**

```
// Info about peer connections
type ResultNetInfo struct {
	Listening bool     `json:"listening"`
	Listeners []string `json:"listeners"`
	NPeers    int      `json:"n_peers"`
	Peers     []Peer   `json:"peers"`
}
```

**Example**

```shell
curl 'localhost:27147/net_info'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
info, err := client.NetInfo()
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "listening": true,
    "listeners": [
      "Listener(@aa841c226243a11e9a951063f6065739-eee556e439dc6a3b.elb.ap-northeast-1.amazonaws.com:27146)"
    ],
    "n_peers": "5",
    "peers": [
      {
        "node_info": {
          "protocol_version": {
            "p2p": "7",
            "block": "10",
            "app": "0"
          },
          "id": "9612b570bffebecca4776cb4512d08e252119005",
          "listen_addr": "a0b88b324243a11e994280efee3352a7-96b6996626c6481d.elb.ap-northeast-1.amazonaws.com:27146",
          "network": "Binance-Chain-Ganges",
          "version": "0.30.1",
          "channels": "354020212223303800",
          "moniker": "data-seed-0",
          "other": {
            "tx_index": "on",
            "rpc_address": "tcp://0.0.0.0:27147"
          }
        },
        "is_outbound": false,
        "connection_status": {
          "Duration": "188759697464282",
          "SendMonitor": {
            "Active": true,
            "Start": "2019-04-10T06:57:12.6Z",
            "Duration": "188759640000000",
            "Idle": "20000000",
            "Bytes": "3117641165",
            "Samples": "1219583",
            "InstRate": "1945",
            "CurRate": "13732",
            "AvgRate": "16516",
            "PeakRate": "111020",
            "BytesRem": "0",
            "TimeRem": "0",
            "Progress": 0
          },
          "RecvMonitor": {
            "Active": true,
            "Start": "2019-04-10T06:57:12.6Z",
            "Duration": "188759640000000",
            "Idle": "0",
            "Bytes": "3009295340",
            "Samples": "1210143",
            "InstRate": "4819",
            "CurRate": "16115",
            "AvgRate": "15942",
            "PeakRate": "142490",
            "BytesRem": "0",
            "TimeRem": "0",
            "Progress": 0
          },
          "Channels": [
            {
              "ID": 48,
              "SendQueueCapacity": "1",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 64,
              "SendQueueCapacity": "1000",
              "SendQueueSize": "0",
              "Priority": "10",
              "RecentlySent": "0"
            },
            {
              "ID": 32,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "16419"
            },
            {
              "ID": 33,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "10",
              "RecentlySent": "45842"
            },
            {
              "ID": 34,
              "SendQueueCapacity": "100",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "70619"
            },
            {
              "ID": 35,
              "SendQueueCapacity": "2",
              "SendQueueSize": "0",
              "Priority": "1",
              "RecentlySent": "19"
            },
            {
              "ID": 56,
              "SendQueueCapacity": "1",
              "SendQueueSize": "0",
              "Priority": "5",
              "RecentlySent": "0"
            },
            {
              "ID": 0,
              "SendQueueCapacity": "10",
              "SendQueueSize": "0",
              "Priority": "1",
              "RecentlySent": "0"
            }
          ]
        },
        "remote_ip": "10.201.41.12"
      }
    ]
  }
}
```

#### 6.1.5 Query Genesis File

Get genesis file.

**Return Parameters**

return round states

```
// Genesis file
type ResultGenesis struct {
	Genesis *types.GenesisDoc
}
// GenesisDoc defines the initial conditions for a tendermint blockchain, in particular its validator set.
type GenesisDoc struct {
	GenesisTime     time.Time
	ChainID         string
	ConsensusParams *ConsensusParams
	Validators      []GenesisValidator
	AppHash         cmn.HexBytes
	AppState        json.RawMessage
}
```

**Example**

```shell
curl 'localhost:27147/genesis'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
genesis, err := client.Genesis()
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "genesis": {
      "genesis_time": "2019-03-07T01:52:07.500913003Z",
      "chain_id": "Binance-Chain-Ganges",
      "consensus_params": {
        "block_size": {
          "max_bytes": "1048576",
          "max_gas": "-1"
        },
        "evidence": {
          "max_age": "100000"
        },
        "validator": {
          "pub_key_types": [
            "ed25519"
          ]
        }
      },
      "app_hash": "",
      "app_state": {
        "tokens": [
          {
            "name": "Binance Chain Native Token",
            "symbol": "BNB",
            "total_supply": "20000000000000000",
            "owner": "tbnb12hlquylu78cjylk5zshxpdj6hf3t0tahwjt3ex",
            "mintable": false
          }
        ],
        "accounts": [
          {
            "name": "Fuji",
            "address": "tbnb12hlquylu78cjylk5zshxpdj6hf3t0tahwjt3ex",
            "valaddr": "7B343E041CA130000A8BC00C35152BD7E7740037"
          },
          {
            "name": "Kita",
            "address": "tbnb167yp9jkv6uaqnyq62gfkx82xmfny0cl9xe04zj",
            "valaddr": "E0DD72609CC106210D1AA13936CB67B93A0AEE21"
          },
          {
            "name": "Everest",
            "address": "tbnb1earfwcjre04hp7phqnkw8ts04tkumdn0cyzun0",
            "valaddr": "FC3108DC3814888F4187452182BC1BAF83B71BC9"
          },
          {
            "name": "Seoraksan",
            "address": "tbnb1hexqyu3m8uuudqdnnpnsnlwe6xg0n3078lx68l",
            "valaddr": "62633D9DB7ED78E951F79913FDC8231AA77EC12B"
          },
          {
            "name": "Elbrus",
            "address": "tbnb135mqtf9gef879nmjlpwz6u2fzqcw4qlzrqwgvw",
            "valaddr": "B6F20C7FAA2B2F6F24518FA02B71CB5F4A09FBA3"
          },
          {
            "name": "Ararat",
            "address": "tbnb1q82g2h9q0kfe7sysnj5w7nlak92csfjztymp39",
            "valaddr": "06FD60078EB4C2356137DD50036597DB267CF616"
          },
          {
            "name": "Carrauntoohil",
            "address": "tbnb183nch8pn3f698vurrqypq3s254slcane2t66aj",
            "valaddr": "37EF19AF29679B368D2B9E9DE3F8769B35786676"
          },
          {
            "name": "Scafell",
            "address": "tbnb1r6l0c0fxu458hlq6m7amkcltj8nufyl9mr2wm5",
            "valaddr": "18E69CC672973992BB5F76D049A5B2C5DDF77436"
          },
          {
            "name": "Aconcagua",
            "address": "tbnb193t8pkhm2sxw5uy5ypesygda8rzsk25ge3e9y7",
            "valaddr": "344C39BB8F4512D6CAB1F6AAFAC1811EF9D8AFDF"
          },
          {
            "name": "Zugspitze",
            "address": "tbnb108drn8exhv72tp40e6lq9z949nnjj54yzqrr2f",
            "valaddr": "91844D296BD8E591448EFC65FD6AD51A888D58FA"
          },
          {
            "name": "Gahinga",
            "address": "tbnb1vehecekrsks5sshcwvxyeyrd469j9wvcqm37yu",
            "valaddr": "B3727172CE6473BC780298A2D66C12F1A14F5B2A"
          }
        ],
        "dex": {},
        "param": {
          "fees": [
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "submit_proposal",
                "fee": "1000000000",
                "fee_for": 1
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "deposit",
                "fee": "125000",
                "fee_for": 1
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "vote",
                "fee": "0",
                "fee_for": 3
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "dexList",
                "fee": "80000000000",
                "fee_for": 2
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "orderNew",
                "fee": "0",
                "fee_for": 3
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "orderCancel",
                "fee": "0",
                "fee_for": 3
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "issueMsg",
                "fee": "40000000000",
                "fee_for": 2
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "mintMsg",
                "fee": "20000000000",
                "fee_for": 2
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "tokensBurn",
                "fee": "100000000",
                "fee_for": 1
              }
            },
            {
              "type": "params/FixedFeeParams",
              "value": {
                "msg_type": "tokensFreeze",
                "fee": "1000000",
                "fee_for": 1
              }
            },
            {
              "type": "params/TransferFeeParams",
              "value": {
                "fixed_fee_params": {
                  "msg_type": "send",
                  "fee": "125000",
                  "fee_for": 1
                },
                "multi_transfer_fee": "100000",
                "lower_limit_as_multi": "2"
              }
            },
            {
              "type": "params/DexFeeParam",
              "value": {
                "dex_fee_fields": [
                  {
                    "fee_name": "ExpireFee",
                    "fee_value": "100000"
                  },
                  {
                    "fee_name": "ExpireFeeNative",
                    "fee_value": "20000"
                  },
                  {
                    "fee_name": "CancelFee",
                    "fee_value": "100000"
                  },
                  {
                    "fee_name": "CancelFeeNative",
                    "fee_value": "20000"
                  },
                  {
                    "fee_name": "FeeRate",
                    "fee_value": "1000"
                  },
                  {
                    "fee_name": "FeeRateNative",
                    "fee_value": "400"
                  },
                  {
                    "fee_name": "IOCExpireFee",
                    "fee_value": "50000"
                  },
                  {
                    "fee_name": "IOCExpireFeeNative",
                    "fee_value": "10000"
                  }
                ]
              }
            }
          ]
        },
        "stake": {
          "pool": {
            "loose_tokens": "4000000000000000",
            "bonded_tokens": "0"
          },
          "params": {
            "unbonding_time": "604800000000000",
            "max_validators": 15,
            "bond_denom": "BNB"
          },
          "validators": null,
          "bonds": null
        },
        "gov": {
          "starting_proposalID": "1",
          "deposit_period": {
            "min_deposit": [
              {
                "denom": "BNB",
                "amount": "200000000000"
              }
            ],
            "max_deposit_period": "1209600000000000"
          },
          "voting_period": {
            "voting_period": "14400000000000"
          },
          "tallying_procedure": {
            "threshold": "50000000",
            "veto": "33400000",
            "governance_penalty": "1000000"
          }
        },
        "gentxs": [
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Fuji",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb12hlquylu78cjylk5zshxpdj6hf3t0tahwjt3ex",
                      "validator_address": "bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "Sl1HU+t5+S6A7+It96yk9mak9Ev4HFNsSgnUucW2VLU="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A+gcCBsoefY1d9TnkIOPV8IX5+/i/BTrMvFU7vG9RXIk"
                  },
                  "signature": "oWWGy2kN9yQDVJ/aLE7N/Si/lTTsce3k8VRsdtzO6doSw2eFL9v8wB3GdTaOBvuJGJti73WPGaEN8fbUjao5hw==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "1bca643058c56f9c20ebaaad1739522ee7d11cd6@172.18.10.204:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Kita",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb167yp9jkv6uaqnyq62gfkx82xmfny0cl9xe04zj",
                      "validator_address": "bva167yp9jkv6uaqnyq62gfkx82xmfny0cl9gs8pu8",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "BCJDOWiPAS5kneSOJBiACS6qj2qg9PFL/Pngx2kXwLY="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Axu55ox7sJ1YsxZsdtUGU7Is5xCzEfs0rT5nQ1JnCkuh"
                  },
                  "signature": "Mnvxh3LIiclOLlIN1N1vrOA7igL6pdo5EwKT/JzwQbNAPLQA9CgArrMaH+GW+m+wjxEezCDC9tDqe3KB0NwI1w==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "7bbe02b44f45fb8f73981c13bb21b19b30e2658d@172.18.10.205:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Everest",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb1earfwcjre04hp7phqnkw8ts04tkumdn0cyzun0",
                      "validator_address": "bva1earfwcjre04hp7phqnkw8ts04tkumdn0kd2gd6",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "QDSzfO2ooL8Tsauu7nqPk4NUIJmlVNIZuT0M5p45cOg="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A7H2pGbdLT9YJQwlqNd3dWfq6fGs5Xk8v7h3Ckp+AU2e"
                  },
                  "signature": "8tLKWXxMc6HmOTovnRGD3i8xhX572wn3Kj8Kkd6ND9I/dOveZxfrvsmE6bXFRcyBvIXxFTSEef4fwuVKjNgWUw==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "0d46d1e6b1103d33765e209a7da0943156291fcb@172.18.10.206:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Seoraksan",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb1hexqyu3m8uuudqdnnpnsnlwe6xg0n3078lx68l",
                      "validator_address": "bva1hexqyu3m8uuudqdnnpnsnlwe6xg0n307fkwwe2",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "j0p0oHNRiV3fNzBXuY+ubfryzSHzegY+GWAQeP5HDVM="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Aygd4/N9zvf/rKnWCMCqbt0O2pad5ZXyiPeBZgbhE7GV"
                  },
                  "signature": "d7g5NIda45dOpTT+k/rVOqXrxilPI1t6E0qT9YbTzVBKNSOb2uAWy2hlMt32bNIFW5W5/d7czFWnmqEaY/BQmg==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "64b29930674c02dd4a45968759173a3c546fb57c@172.18.10.207:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Elbrus",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb135mqtf9gef879nmjlpwz6u2fzqcw4qlzrqwgvw",
                      "validator_address": "bva135mqtf9gef879nmjlpwz6u2fzqcw4qlzdfxujm",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "SbKI5Ou7OigcLVRvwwJT1brwiZO25dKV+3h6WzFKKY4="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A0130hq3qdHzfPUkU/ZQ4s2jynvhy7uOrtWnCpCmjasJ"
                  },
                  "signature": "NYgG1u8fayGSTStgwfioxDemDS+8H16DC7+s/DRD1rBannYUs8cUAn2Lfrqg0leRhhNrWGPgD4qQv9IU2Smh/w==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "7d290fae6845d53f7ffbb2aabc528b29650bee6c@172.18.10.208:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Ararat",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb1q82g2h9q0kfe7sysnj5w7nlak92csfjztymp39",
                      "validator_address": "bva1q82g2h9q0kfe7sysnj5w7nlak92csfjz9dn40s",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "4Xy+nCDNz9+HazsSl40yZKAH/KqnHEzbcB2evAMj9E8="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "AlG4f0se3Ok1EbsvzMtDIQsSGBslR+eqy9uSBIgXQToP"
                  },
                  "signature": "pMLebkHE2hnuHv+AjIdMdnm6G5kzheCFs+V1+NZV12p+yfK3T7UPy/2mDFVkmIUfwWaBtDHD//+G8eyvZDD5Ew==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "7cf465f3c351f9f0873be9a7396a5438208b9546@172.18.10.209:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Carrauntoohil",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb183nch8pn3f698vurrqypq3s254slcane2t66aj",
                      "validator_address": "bva183nch8pn3f698vurrqypq3s254slcaneyzjwr8",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "vQPen4qynigACU4VP6xvaWz6USU2ycL4BNyywsTkrtY="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A6+/HDC0uLx/9Z5N+Gc+qWOIUaRpKsZYoDlRb41EUryy"
                  },
                  "signature": "BRG3lQeEWiamvVHnf30YeFqsK+TIt0qfYhLhSZnyYwh4b3AwsHQcTzFfr/wezfDa7C/OnxinngXXCAy5zLAhPg==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "32769f58a63d25e4a0b9d793ce80626506213727@172.18.10.210:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Scafell",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb1r6l0c0fxu458hlq6m7amkcltj8nufyl9mr2wm5",
                      "validator_address": "bva1r6l0c0fxu458hlq6m7amkcltj8nufyl942z69p",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "GE57ED00xBAD+bhk1fjBrdqb0ENrJTuzyES8c5wed8k="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "ArnjgWSGbDDJmYuIYbE97ZShYNCf0AlVjeNINmmDyYa0"
                  },
                  "signature": "un+GYFlzBtV9lDapslHxwHbsVi0Ng8YzAv8UK4OgSNcRU4FUX69r2ujkx6Zx8EIsgPlxCja9xgGuK9qYJwPZKw==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "c1bcf51e6022010ebb93288bd5d932a3894c999e@172.18.10.211:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Aconcagua",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb193t8pkhm2sxw5uy5ypesygda8rzsk25ge3e9y7",
                      "validator_address": "bva193t8pkhm2sxw5uy5ypesygda8rzsk25ghc336t",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "TUIK6oQ+kqDP5p2JaW3/aCd2n5y1KiSa9TfOib8qS3Q="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Az0wT4xmeI7a7sEIFKcGLkiICkFBS1Fl4/hFMGV1QjL6"
                  },
                  "signature": "T+Jg3b6p0IOd/J0tChygDOnQjKJXl2m6K1zyyLMM2E82woc9eL7nR6j7jr00SuU5dJ/Z+UuYfeinv4R0pbGpmA==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "dd2adba52ad9c830fe16a53fe81dac6880a91218@172.18.10.212:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Zugspitze",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb108drn8exhv72tp40e6lq9z949nnjj54yzqrr2f",
                      "validator_address": "bva108drn8exhv72tp40e6lq9z949nnjj54yvfth5u",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "yA6avvf/Q5wQxo/o8TA97d/FJ3GMOzfYumgHRG48gno="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A28N2eZXepmh+2enXvdAPqbbPf9yFCqYZleFjUMRJe0g"
                  },
                  "signature": "egp4GjM/8PEVeFJiopen35eZzy/5NKjGKmK3MGpfmAFGQvjN6G4HyGX+6eigOuw40qpMdT9HYmvzSoa+jgXURQ==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "c4d94f29e765ecfe81c940e11c2e997321aa8e0f@172.18.10.213:26656",
              "source": "0",
              "data": null
            }
          },
          {
            "type": "auth/StdTx",
            "value": {
              "msg": [
                {
                  "type": "cosmos-sdk/MsgCreateValidatorProposal",
                  "value": {
                    "MsgCreateValidator": {
                      "Description": {
                        "moniker": "Gahinga",
                        "identity": "",
                        "website": "",
                        "details": ""
                      },
                      "Commission": {
                        "rate": "0",
                        "max_rate": "0",
                        "max_change_rate": "0"
                      },
                      "delegator_address": "tbnb1vehecekrsks5sshcwvxyeyrd469j9wvcqm37yu",
                      "validator_address": "bva1vehecekrsks5sshcwvxyeyrd469j9wvcwje26f",
                      "pubkey": {
                        "type": "tendermint/PubKeyEd25519",
                        "value": "kUKvzGkbfMBdJsewvgyLRkGClBcXMOB584T94vpQuvw="
                      },
                      "delegation": {
                        "denom": "BNB",
                        "amount": "100000000000"
                      }
                    },
                    "proposal_id": "0"
                  }
                }
              ],
              "signatures": [
                {
                  "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "AsS8HffgT0IIai/sesaWtW5wurpu7eBDkhu0esmwjsnc"
                  },
                  "signature": "k6LegehVpGnjQ4ePBwJajrbKlPg5tXQMkBtIZ+nbMNAHp4Z2IihYrUGMAoKu0B0LJbbNH/7Gq7b0AK5HfYEByg==",
                  "account_number": "0",
                  "sequence": "0"
                }
              ],
              "memo": "4119f9f689f62734bcf3757f916639bc480bb8ce@172.18.10.214:26656",
              "source": "0",
              "data": null
            }
          }
        ]
      }
    }
  }
}
```

#### 6.1.6 Query Health

Get node health. Returns empty result (200 OK) on success, no response - in
case of an error.

**Return Parameters**

```json
ResultHealth{}
```

**Example**

```shell
curl 'localhost:27147/health'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
result, err := client.Health()
```

> The above command returns JSON structured like this:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```

#### 6.1.7 Query NumUnconfirmedTxs

Get number of unconfirmed transactions.

**Query Parameters**

| Parameter | Type | Default | Required | Description                          |
| --------- | ---- | ------- | -------- | ------------------------------------ |
| limit     | int  | 30      | false    | Maximum number of entries (max: 100) |

**Return Parameters**

```
// List of mempool txs
type ResultUnconfirmedTxs struct {
	N   int
	Txs []types.Tx
}
```

**Example**

```shell
curl 'localhost:27147/num_unconfirmed_txs'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
result, err := client.UnconfirmedTxs()
```

> The above command returns JSON structured like this:

```json
{
	"error": "",
	"result": {
	  "txs": null,
	  "n_txs": "0"
	},
	"id": "",
	"jsonrpc": "2.0"
}
```

#### 6.1.8 Query Status

Get Tendermint status including node info, pubkey, latest block
hash, app hash, block height and time.

**Return Parameters**

```
// Node Status
type ResultStatus struct {
	NodeInfo      p2p.DefaultNodeInfo
	SyncInfo      SyncInfo
	ValidatorInfo ValidatorInfo
}
```

**Example**

```shell
curl 'localhost:27147/status'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
result, err := client.Status()
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "7156d461742e2a1e569fd68426009c4194830c93",
      "listen_addr": "aa841c226243a11e9a951063f6065739-eee556e439dc6a3b.elb.ap-northeast-1.amazonaws.com:27146",
      "network": "Binance-Chain-Ganges",
      "version": "0.30.1",
      "channels": "354020212223303800",
      "moniker": "data-seed-2",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:27147"
      }
    },
    "sync_info": {
      "latest_block_hash": "59D24993B133C9D3B56E75F627815BF2E94A1CFCD3F33BB4F4BB06583D76B8A0",
      "latest_app_hash": "5E4B7F0D9A847BFD6D089142DD1C4B064D97672A6E8F4960B01DE0DF9C583AD0",
      "latest_block_height": "7807330",
      "latest_block_time": "2019-04-12T11:27:39.890570112Z",
      "catching_up": false
    },
    "validator_info": {
      "address": "32B88CEB9CE3EF1EABB840EC1556A5B4A5FD7FDB",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "jAXPwM0xV1iwn7XJz6H0Zk8RxgELUAfjStxzIYKxaEk="
      },
      "voting_power": "0"
    }
  }
}
```



#### 6.1.9 ABCIQuery
Query the application for some information.

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| path      | string | false   | false    | Path to the data ("/a/b/c")                    |
| data      | []byte | false   | true     | Data                                           |
| height    | int64  | 0       | false    | Height (0 means latest)                        |
| prove     | bool   | false   | false    | Includes proof if true                         |

**Available Query Path**

* `/store/acc/key`
*  `/tokens/info`
*  `/tokens/list`
*  `/dex/pairs`
*  `/dex/orderbook`
*  `/param/fees`
*  `/account/`
*  `/dex/openorders`
*  `/custom/gov/proposals`
*  `/custom/gov/proposal`
*  `/mini-tokens/info`
*  `/mini-tokens/list`
*  `/dex-mini/pairs`

**Return Type**

```
type ResponseQuery struct {
	Code                 uint32
	Log                  string
	Info                 string
	Index                int64
	Key                  []byte
	Value                []byte
	Proof                *merkle.Proof
	Height               int64
	Codespace            string
}
```
**Example**

In this example, we will explain how to query account info with `abci_query`.
1. Generate query key
    To get the correct key you need to ：
    The query key is : "account:" || address in hex. The first part is in ASCII.

  “account:” in ASCII is 6163636F756E756E and the address derived from public key is 743A89F856CB39D25C1BDDAAEC74A381577CA8E2F886. You need to add these to part to get the correct key.

2. Run query
```shell
curl 'https://data-seed-pre-0-s3.binance.org/abci_query?path="/store/acc/key"&data=0x6163636F756E743A89F856CB39D25C1BDDAAEC74A381577CA8E2F886'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {
	// handle error
}
defer client.Stop()
result, err := client.ABCIQuery("/store/acc/key", "6163636F756E743A89F856CB39D25C1BDDAAEC74A381577CA8E2F886", true)
```

> The above command returns JSON structured like this:
>
> Please note that the response is amino-encoded.

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "response": {
      "key": "YWNjb3VudDqJ+FbLOdJcG92q7HSjgVd8qOL4hg==",
      "value": "S9xMJwrYEAoUifhWyznSXBvdqux0o4FXfKji+IYSDQoHMDAwLTBFMRCqzAUSEAoHMDAwLUVGNhC4opXaxg4SEAoHMDA3LTc0ORDYlpb09AISDwoHMEtJLTBBRhCAjO6JGhIPCggxMDBLLTlCQxDR+5MLEhIKCzEwS09OTFktMkMxEIqEmAESGAoMMUtWT0xVTUUtRDY1EPClmN+ojJTBNxISCgdBQUEtQjUwEICA+t28oLsMEhAKB0FBQS1FQjgQuO7/36oBEhEKCkFBQUFBQS1CQkEQ/OGPARIQCgdBQUQtRTE4ENDR3N/VBhIQCgdBQVMtMzYxEIDprODVBhIRCghBR1JJLUJEMhCE6q+P/wISDgoIQUxJUy05NUIQ6s5SEhEKB0FOTi00NTcQgJCmt/mlAhISCgdBU0EtREM1EICkjvf/sbwMEhIKCUFTVFJPLUY3QhDk/4D41Q4SEgoHQVRQLTkyMxDPxaTw2cv/AxIRCgdBVlQtQjc0EJLgo8O1xwISDQoHQkMxLTNBMRDw+3YSDgoHQkVZLThDNhCwicYBEg0KA0JOQhDg2ayZy5QZEhEKB0JOTi00MTEQgJCmt/mlAhISCglCVE1HTC1DNzIQ0taxh/oFEhAKB0NBVC1GOUIQsKa8tMMFEhEKCENFTFItNDJCEIiQ/7vZQhIRCgdDTk4tMjEwEICQprf5pQISEwoKQ09TTU9TLTU4NxDSxt/FoQMSEAoHQ1I3LTRDQxDkrtff1QYSFQoMQ1JZUFJJQ0UtMTUwEICA0ZS1dBIPCgdDWkMtRDYzELCviZ53EhQKCkNaQ09JTi0zM0IQndnH3aXYBBISCgdDWlotNjk2EICAgtT6+LYNEg0KB0RDMS00QjgQ8Pt2Eg8KB0RDQy01MkEQ6qjT21USEAoHREVDLTIzNxCowOK9jQESEAoHREdCLTVGQhDQ4c7f1QYSDwoIRExMTS04RTUQgOHrFxIRCghEVUlULTMxQxColvyWwwMSDwoHRTBDLUVGOBCwr4medxIQCgdFRFUtREQwEJT66Ju3GBISCglFVEguQi0yNjEQgNr5ycMBEg8KB0ZCQi1FMDMQnPf/r1USEAoHRkNULUI2MBC95ZTwhgwSDwoHRkxDLUZCMhCwr4medxIPCgdGUkktRDVGEILlifUpEhIKCUdBTkpBLTg4MBCw5ceA6AISDwoHR0NDLThGNhCc9/+vVRIVCgpIQVJVS0EtODAwEICAgr+T7/AIEg8KB0hERC1BOUEQgMivoCUSEQoKSEVJTUE1LUY5NxCAhK9fEg4KB0lBQS1DODEQ8O/EBBIOCgdJQkItOERFEPDvxAQSDgoHSUNDLTZFRhDw78QEEg4KB0lERC01MTYQ8O/EBBIOCgdJRUUtRENBEPDvxAQSDgoHSUZGLTgwNBDw78QEEg4KB0lHRy0wMTMQ8O/EBBIOCgdJSEgtRDRFEPDvxAQSDgoHSUlJLTI1QxDw78QEEg4KB0lKSi02NUUQ8O/EBBISCglKQUdFUi0xNjIQ6PP35dkREhAKCEpEV0stQzgxEKSz1cwBEhIKCktPR0U0OC0zNUQQkc+TtlYSDQoHTEMxLTdGQxDw+3YSDwoHTENRLUFDNRCilb2DIhIOCgdMTEwtOTE1EIDC1y8SEQoITUJOQi0xMTMQ5K7X39UGEg0KB01DMS0zQTgQ4LwHEhAKCE1FTUUtOTNDEOi0lNsdEhIKB01GSC05QjUQgq70zd+o+QgSEAoHTUdULTNGMBC95ZTwhgwSEAoHTUxDLURCMhDkrtff1QYSDQoHTkMxLTI3ORDw+3YSDgoHTkMxLUY2MxDbss01Eg0KB05DMi0yNDkQnMBhEhAKB05GVC03RUUQyMfywM8EEhAKCE5NU0wtMTlEEJz3/69VEhAKB09DQi03NUIQu4qa7KwBEg8KB09DQi1COTUQ5aKp8hESEAoHT0VOLUZEMRCw3KG+2UISEAoHUElDLUY0MBCE6q+P/wISDwoHUE5ELTk0MxC45rGfChIOCgdQUEMtMDBBELPxzAISDQoHUkJULUNCNxDqzlISDQoHUkMxLTk0MxDw+3YSDQoHUkMxLUExRRDw+3YSDQoHUkMxLUY0ORDw+3YSEAoHUlVTLUZBMRCI5pik/0gSFgoLU0FUT1NISS1DOTIQyJDGjuTnrgUSEQoKU0NBUkNFLTk2NxC745oWEg8KB1NDTS1DREYQuOaxnwoSEQoIU0VOVC03MzAQwpvYq6gJEhAKCFNFUFQtMTM3EICU69wDEhAKB1NFWC1EQTMQgKjH4ZwDEhAKB1NMQy02RDEQ4P7Q66wBEg4KB1NWQy1BMTQQju3iCBINCgdUQzEtQTI5EOC8BxINCgdUQzEtRjQzEPD7dhIRCglURVNMQS1BNEYQ/L+P/AkSDgoHVEZBLTNCNBCIzOwCEhAKCFRGRkEtMDQwEOyEg60VEhEKB1RHVC05RkMQ6O+Y/afOSxIRCgdVQ1gtQ0M4EM+ft4DNywESDwoHVURPLTYzOBDimobkEhIQCgdVS1QtNzEwELCmvLTDBRIPCgdXSU4tQUI4EJz3/69VEhEKCVdXVzc2LUE4RhCAzcSZERIOCgdYU1gtMDcyEJqJ8wQSEQoJWFhYNzctRURDEPCOq5cREg8KB1lMQy1EOEIQ7ZaejwESEQoJWVlZNzgtQkNEEPC7uK4iEhEKCVpBTktVLUNDQRDqoOvvBhIRCglaRUJSQS0xNkQQnPf/r1USEAoHWlpaLTIxRRD8o+3huQISEQoJWlpaNzktM0M0EPCOq5cRGibrWumHIQOKveXhJ+HEdW28VUamHPKWy7ymMmjMY82k0ppEyUFK+iAOKPLaAiILCgNCTkIQsK3TqXs=",
      "height": "7775621"
    }
  }
}
```

The account balance information is the following:
```json
{"type":"bnbchain/Account","value":{"base":{"address":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","coins":[{"denom":"000-0E1","amount":"10530"},{"denom":"AGRI-BD2","amount":"102842693026"},{"denom":"ALIS-95B","amount":"1008261"},{"denom":"ANN-457","amount":"10100000000000"},{"denom":"AVT-B74","amount":"2280343"},{"denom":"BC1-3A1","amount":"1826704"},{"denom":"BNB","amount":"10221947267999"},{"denom":"BNN-411","amount":"10100000000000"},{"denom":"BTC.B-918","amount":"113218800"},{"denom":"BTMGL-C72","amount":"204562981873"},{"denom":"CNN-210","amount":"10100000000000"},{"denom":"COSMOS-587","amount":"50000101983748977"},{"denom":"DC1-4B8","amount":"1826704"},{"denom":"DUIT-31C","amount":"121112394964"},{"denom":"EDU-DD0","amount":"139885964"},{"denom":"FRI-D5F","amount":"11251373129"},{"denom":"IAA-C81","amount":"9448420"},{"denom":"IBB-8DE","amount":"9448420"},{"denom":"ICC-6EF","amount":"9448420"},{"denom":"IDD-516","amount":"9448420"},{"denom":"IEE-DCA","amount":"9448420"},{"denom":"IFF-804","amount":"9448420"},{"denom":"IGG-013","amount":"9448420"},{"denom":"IHH-D4E","amount":"9448420"},{"denom":"III-25C","amount":"9448420"},{"denom":"IJJ-65E","amount":"9448420"},{"denom":"KOGE48-35D","amount":"10000000000"},{"denom":"LC1-7FC","amount":"1826704"},{"denom":"LCQ-AC5","amount":"9133568718"},{"denom":"MFH-9B5","amount":"1258976083286"},{"denom":"NASC-137","amount":"0"},{"denom":"NC1-279","amount":"1826704"},{"denom":"NC2-249","amount":"1411566"},{"denom":"OCB-B95","amount":"10000000000"},{"denom":"PIC-F40","amount":"102842693026"},{"denom":"PPC-00A","amount":"205150260"},{"denom":"RBT-CB7","amount":"1008261"},{"denom":"RC1-943","amount":"1826704"},{"denom":"RC1-A1E","amount":"1826704"},{"denom":"RC1-F49","amount":"1826704"},{"denom":"SVC-A14","amount":"18267042"},{"denom":"TC1-F43","amount":"1826704"},{"denom":"TFA-3B4","amount":"5731324"},{"denom":"TGT-9FC","amount":"33251102828"},{"denom":"UCX-CC8","amount":"1398859649"},{"denom":"UDO-638","amount":"5041308481"},{"denom":"USDT.B-B7C","amount":"138793116268"},{"denom":"WWW76-A8F","amount":"4611856"},{"denom":"XSX-072","amount":"10228149"},{"denom":"YLC-D8B","amount":"210572645"},{"denom":"ZEBRA-16D","amount":"1000"},{"denom":"ZZZ-21E","amount":"13988596"}],"public_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"account_number":"406226","sequence":"52"},"name":"","frozen":null,"locked":[{"denom":"BNB","amount":"800"}]}}
```

You can also query from `/account/`. This is how [go-sdk](https://github.com/binance-chain/go-sdk/blob/master/client/rpc/dex_client.go#L144) handles balance query, because it relects account changes which are not committed in a block too.

```shell
curl 'https://data-seed-pre-0-s3.binance.org/abci_query?path="/account/tbnb1hn8ym9xht925jkncjpf7lhjnax6z8nv2mu9wy3"'

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
account, err := client.GetAccount("Your address")
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "response": {
      "value": "S9xMJwq9AQoUvM5NlNdZVUlaeJBT795T6bQjzYoSCwoDQk5CEMTDqYoHEhMKCkNBU0hBQS1DMUQQrPHKsqsaEg8KB0RERC04RTYQgJrmkHASEAoIRVRUMy1GODIQ6pONngISEwoIUUFSSy05QjYQgICS/KPV3AsSDgoHVFNULUQ1NxCAhK9fEg4KB1RTVy02RkQQgMLXLxIVCglUVVNEQi0wMDAQgK7J+qj82+d8EhAKCFpFQkktNjAyEIDkl9ASILC1KQ=="
    }
  }
```

#### 6.1.10  Query Block
Get block at a given height.
If no height is provided, it will fetch the latest block.

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| height      | int64 | false   | false    | height of blockchain|

**Return Type:**

```
type ResultBlock struct {
	BlockMeta *types.BlockMeta
	Block     *types.Block
}
// BlockMeta contains meta information about a block - namely, it's ID and Header.
type BlockMeta struct {
	BlockID BlockID
	Header  Header
}
// Block defines the atomic unit of a Tendermint blockchain.
type Block struct {
	mtx        sync.Mutex
	Header     `json:"header"`
	Data       `json:"data"`
	Evidence   EvidenceData
	LastCommit *Commit
}
```

**Example**

```shell
curl 'localhost:27147/block?height=10'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
info, err := client.Block(10)
```

> The above command returns JSON structured like this:

```json
{
    "jsonrpc": "2.0",
    "id": "",
    "result": {
        "last_height": "7570471",
        "block_metas": [
            {
                "block_id": {
                    "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
                    "parts": {
                        "total": "1",
                        "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
                    }
                },
                "header": {
                    "version": {
                        "block": "10",
                        "app": "0"
                    },
                    "chain_id": "Binance-Chain-Ganges",
                    "height": "10",
                    "time": "2019-03-07T01:57:22.135103158Z",
                    "num_txs": "0",
                    "total_txs": "0",
                    "last_block_id": {
                        "hash": "1AF674F804E277354E8742176ECA74E338F52C237E6DBFF92819D75037E4F651",
                        "parts": {
                            "total": "1",
                            "hash": "BB3C36D5BBDAB441A7339385C071C4E804C4C3DD5C7BC15D60BC658A6B261906"
                        }
                    },
                    "last_commit_hash": "5442553C06521016756796015AF78FCAC752FFA9E94ACAF4DAA5DF4113B4B354",
                    "data_hash": "",
                    "validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
                    "next_validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
                    "consensus_hash": "294D8FBD0B94B767A7EBA9840F299A3586DA7FE6B5DEAD3B7EECBA193C400F93",
                    "app_hash": "E7D96927FD82FD910624AA8034B8A527FCEB1F7AB353DE789A3ECA8D400BDE31",
                    "last_results_hash": "",
                    "evidence_hash": "",
                    "proposer_address": "E0DD72609CC106210D1AA13936CB67B93A0AEE21"
                }
            }
        ]
    }
}
```
#### 6.1.11 Query BlockResults
BlockResults gets ABCIResults at a given height.
If no height is provided, it will fetch results for the latest block.
Results are for the height of the block containing the txs.
Thus response.results[5] is the results of executing getBlock(h).Txs[5]

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| height      | int64 | false   | false    | height of blockchain|

**Return Type:**

```
type ResultBlockResults struct {
	Height  int64
	Results *state.ABCIResponses
}
```

**Example**

```shell
curl 'localhost:27147/block_results?height=10'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
info, err := client.BlockResults(10)
```

> The above command returns JSON structured like this:

```json
{
    "jsonrpc": "2.0",
    "id": "",
    "result": {
        "height": "7570163",
        "results": {
            "DeliverTx": [
                {
                    "data": "eyJvcmRlcl9pZCI6IkI3ODFFNURDREU1NUNGRjY2NkM5QTNGNjMwREZFQUE0RkE5NDBDQkEtMjMzMSJ9",
                    "log": "Msg 0: ",
                    "tags": [
                        {
                            "key": "YWN0aW9u",
                            "value": "b3JkZXJOZXc="
                        }
                    ]
                }
            ],
            "EndBlock": {
                "validator_updates": null
            },
            "BeginBlock": { }
        }
    }
}
```

#### 6.1.12 Query BlockchainInfo
Get block headers for minHeight <= height <= maxHeight.
Block headers are returned in descending order (highest first).

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| minHeight      | int64 | false   | true    | height of blockchain|
| maxHeight      | int64 | false   | true    | height of blockchain|

**Return Type:**

List of blocks
```
type ResultBlockchainInfo struct {
	LastHeight int64
	BlockMetas []*types.BlockMeta
}
```
**Example**

```shell
curl 'localhost:27147/blockchain?minHeight=10&maxHeight=10'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
info, err := client.BlockchainInfo(10, 10)
```

> The above command returns JSON structured like this:

```json
{
   "jsonrpc": "2.0",
   "id": "",
   "result": {
      "last_height": "7570471",
      "block_metas": [
         {
            "block_id": {
               "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
               "parts": {
                  "total": "1",
                  "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
               }
            },
            "header": {
               "version": {
                  "block": "10",
                  "app": "0"
               },
               "chain_id": "Binance-Chain-Ganges",
               "height": "10",
               "time": "2019-03-07T01:57:22.135103158Z",
               "num_txs": "0",
               "total_txs": "0",
               "last_block_id": {
                  "hash": "1AF674F804E277354E8742176ECA74E338F52C237E6DBFF92819D75037E4F651",
                  "parts": {
                     "total": "1",
                     "hash": "BB3C36D5BBDAB441A7339385C071C4E804C4C3DD5C7BC15D60BC658A6B261906"
                  }
               },
               "last_commit_hash": "5442553C06521016756796015AF78FCAC752FFA9E94ACAF4DAA5DF4113B4B354",
               "data_hash": "",
               "validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
               "next_validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
               "consensus_hash": "294D8FBD0B94B767A7EBA9840F299A3586DA7FE6B5DEAD3B7EECBA193C400F93",
               "app_hash": "E7D96927FD82FD910624AA8034B8A527FCEB1F7AB353DE789A3ECA8D400BDE31",
               "last_results_hash": "",
               "evidence_hash": "",
               "proposer_address": "E0DD72609CC106210D1AA13936CB67B93A0AEE21"
            }
         }
      ]
   }
}
```
#### 6.1.13 Query Commit
Get block commit at a given height.
If no height is provided, it will fetch the commit for the latest block.

**Transaction Parameters**

| Parameter | Type | Default | Required | Description     |
|-----------|------|---------|----------|-----------------|
| Height      | int64 | false   | true    | height of blockchain|


**Return Parameters**

```
type ResultCommit struct {
	types.SignedHeader
	CanonicalCommit    bool
}
```

**Example**
```shell
curl 'localhost:27147/commit?height=10'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
info, err := client.Commit(100)
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "signed_header": {
      "header": {
        "version": {
          "block": "10",
          "app": "0"
        },
        "chain_id": "Binance-Chain-Ganges",
        "height": "10",
        "time": "2019-03-07T01:57:22.135103158Z",
        "num_txs": "0",
        "total_txs": "0",
        "last_block_id": {
          "hash": "1AF674F804E277354E8742176ECA74E338F52C237E6DBFF92819D75037E4F651",
          "parts": {
            "total": "1",
            "hash": "BB3C36D5BBDAB441A7339385C071C4E804C4C3DD5C7BC15D60BC658A6B261906"
          }
        },
        "last_commit_hash": "5442553C06521016756796015AF78FCAC752FFA9E94ACAF4DAA5DF4113B4B354",
        "data_hash": "",
        "validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
        "next_validators_hash": "80D9AB0FC10D18CA0E0832D5F4C063C5489EC1443DFB738252D038A82131B27A",
        "consensus_hash": "294D8FBD0B94B767A7EBA9840F299A3586DA7FE6B5DEAD3B7EECBA193C400F93",
        "app_hash": "E7D96927FD82FD910624AA8034B8A527FCEB1F7AB353DE789A3ECA8D400BDE31",
        "last_results_hash": "",
        "evidence_hash": "",
        "proposer_address": "E0DD72609CC106210D1AA13936CB67B93A0AEE21"
      },
      "commit": {
        "block_id": {
          "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
          "parts": {
            "total": "1",
            "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
          }
        },
        "precommits": [
          null,
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.663157746Z",
            "validator_address": "18E69CC672973992BB5F76D049A5B2C5DDF77436",
            "validator_index": "1",
            "signature": "ZrnapmTAiJrhm0DVIoTzRbJG+FDCAxBpfamYxZj2eg0+wY0+KDg48sDPlD+chk97ti01PukuVsftn4U6HXbkCA=="
          },
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.669872809Z",
            "validator_address": "344C39BB8F4512D6CAB1F6AAFAC1811EF9D8AFDF",
            "validator_index": "2",
            "signature": "VRB1MYpxCCA8EnjWSRl4cTMP9P7uBEvkPRtSr7grgpPEERfc6J5/gySD6LKkOe1nNpyeYi1RU/vqAibSEnMNDQ=="
          },
          null,
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.737578359Z",
            "validator_address": "62633D9DB7ED78E951F79913FDC8231AA77EC12B",
            "validator_index": "4",
            "signature": "pP75DGwI23nsph3i5MbNbu1fblj4ZfCLqKkruTLhdTTpOC9WrfM4MPTWJg6WuNJzxNwpjZnOdDPoITydsajvAw=="
          },
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.729696171Z",
            "validator_address": "7B343E041CA130000A8BC00C35152BD7E7740037",
            "validator_index": "5",
            "signature": "VcVUpB6Aj3of7T8eY0ZYpf0QJ/YuB9N93knaO8ZcMye6kEnGQLCItw+V8brHMU/y4SV9Jq0KHz2LfvBBcdcYAQ=="
          },
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.672880876Z",
            "validator_address": "91844D296BD8E591448EFC65FD6AD51A888D58FA",
            "validator_index": "6",
            "signature": "DF9YrPQYMvj6NnXjiDh6feuvh4XVHKYda5MTCj+SUq78h4rTRyQhVv/xDkk2ubbJiTB4F+n/kvM4rHcd2TbsCg=="
          },
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.660610801Z",
            "validator_address": "B3727172CE6473BC780298A2D66C12F1A14F5B2A",
            "validator_index": "7",
            "signature": "yA2O30cMpPoWn1EYzzz1yXKTozwuYvFN1UhKBWK/BNqt5yH+iKovAydGHCVfrypt6tM7tVMB7MZHi+LaIg5iBQ=="
          },
          null,
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.736707757Z",
            "validator_address": "E0DD72609CC106210D1AA13936CB67B93A0AEE21",
            "validator_index": "9",
            "signature": "N57iWLGl39ANFftgAoEoIvjFJWLNxT5vhdo7oG2X76w/hhrduettBTxUUBwR33HcjvSHEvVGXOT0L5oqzW4BCw=="
          },
          {
            "type": 2,
            "height": "10",
            "round": "1",
            "block_id": {
              "hash": "5701A12896315A121303A979ACB707ACC447E20EFACFCB26174E9ED3997E2F5C",
              "parts": {
                "total": "1",
                "hash": "8C63BE3E3A221B984219CFAA1C196DDF0F202D68293311BFA9EE0B7A9155EACD"
              }
            },
            "timestamp": "2019-03-07T01:57:27.738256001Z",
            "validator_address": "FC3108DC3814888F4187452182BC1BAF83B71BC9",
            "validator_index": "10",
            "signature": "Hw1BdfL79cLsTJhb406k+1MvU27zL1pdehLBHqkzF5NNOn/LrL4+u3t2ANwHaxX5OFijgZW5P1T7ECVrvJr0CQ=="
          }
        ]
      }
    },
    "canonical": true
  }
}
```

#### 6.1.14 Query Tx
Tx allows you to query the transaction results. `nil` could mean the
transaction is in the mempool, invalidated, or was not sent in the first
place.

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                               |
|-----------|--------|---------|----------|-----------------------------------------------------------|
| hash      | []byte | nil     | true     | The transaction hash                                      |
| prove     | bool   | false   | false    | Include a proof of the transaction inclusion in the block |

**Returns Parameters**

Returns a transaction matching the given transaction hash.

```
// Result of querying for a tx
type ResultTx struct {
	Hash     cmn.HexBytes          //hash of the transaction
	Height   int64                  //height of the block where this transaction was in
	Index    uint32                 //index of the transaction
	TxResult abci.ResponseDeliverTx //the `abci.Result` object
	Tx       types.Tx               //the transaction
	Proof    types.TxProof          //the `types.TxProof` object
}
```

**Example**

```shell
curl "localhost:27147/tx?hash=0xAB1B84C7C0B0B195941DCE9CFE1A54214B72D5DB54AD388D8B146A6B62911E8E"
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
tx, err := client.Tx([]byte("AB1B84C7C0B0B195941DCE9CFE1A54214B72D5DB54AD388D8B146A6B62911E8E"), true)
```

> The above command returns JSON structured like this:

```json
{
   "jsonrpc": "2.0",
   "id": "",
   "result": {
      "hash": "AB1B84C7C0B0B195941DCE9CFE1A54214B72D5DB54AD388D8B146A6B62911E8E",
      "height": "7560096",
      "index": 0,
      "tx_result": {
         "data": "eyJvcmRlcl9pZCI6IjgxM0U0OTM5RjE1NjdCMjE5NzA0RkZDMkFENERGNThCREUwMTA4NzktNDMifQ==",
         "log": "Msg 0: ",
         "tags": [
            {
               "key": "YWN0aW9u",
               "value": "b3JkZXJOZXc="
            }
         ]
      },
      "tx": "2wHwYl3uCmPObcBDChSBPkk58VZ7IZcE/8KtTfWL3gEIeRIrODEzRTQ5MzlGMTU2N0IyMTk3MDRGRkMyQUQ0REY1OEJERTAxMDg3OS00MxoNWkVCUkEtMTZEX0JOQiACKAEwwIQ9OJBOQAEScAom61rphyECE5vdld5ywirCorD4eFOxzKLorfnFikponHXTJjATRBoSQFmMOnTcCNgtl2aO01I6EFoq+3UsW+NNCftfMVjVXbL1RaJGYmPPgPAtEYTdUO/E2KY2omKQmmMuvt3qpCbAkrIY0uUYICo="
   }
}
```
Please note that this transaction information is amino-encoded. You will see the original transaction information after decoding:
`Data` field is:
```json
{
  "orderData": {
    "symbol": "ZEBRA-16D_BNB",
    "orderType": "limit",
    "side": "buy",
    "price": 0.01,
    "quantity": 0.0001,
    "timeInForce": "GTE",
    "orderId": "813E4939F1567B219704FFC2AD4DF58BDE010879-43"
  }
}
```
Tx filed is:
```json
{"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":""}],"memo":"","source":"0","data":null}}
```



#### 6.1.15 Query TxSearch
TxSearch allows you to query for multiple transactions results.You could search transaction by its index.  It returns a
list of transactions (maximum ?per_page entries) and the total count.

**Enable Indexer**

You need to enable indexer in `config.tml`. You can modify the `index_tags` to include `tx.height`, which is the only tag we support now. In this way, you can index transactions by height by adding "tx.height" tag here.

**Query Parameters**

| Parameter | Type   | Default | Required | Description                                               |
|-----------|--------|---------|----------|-----------------------------------------------------------|
| query     | string | ""      | true     | Query                                                     |
| prove     | bool   | false   | false    | Include proofs of the transactions inclusion in the block |
| page      | int    | 1       | false    | Page number (1-based)                                     |
| per_page  | int    | 30      | false    | Number of entries per page (max: 100)                     |

**Returns Parameters**

- `proof`: the `types.TxProof` object
- `tx`: `[]byte` - the transaction
- `tx_result`: the `abci.Result` object
- `index`: `int` - index of the transaction
- `height`: `int` - height of the block where this transaction was in
- `hash`: `[]byte` - hash of the transaction

!!! Tip
	Due to changes of underling Tendermint library, `ResponseCheckTx`, `ResponseDeliverTx`, `ResponseBeginBlock`, and `ResponseEndBlock` now include **Events** instead of **Tags**. Each Event contains a type and a list of attributes (list of key-value pairs) allowing for inclusion of multiple distinct events in each response.

**Available Query Path**

Right now, you can only query by transaction height: `tx.height`. Please note that on Binance Chain testnet, you can only use this data seed node for tx search: <https://data-seed-pre-0-s3.binance.org>

**Example**

For example, if you want to search all the transactions that happened on height 10000.

```shell
curl "localhost:27147/tx_search?query=\"tx.height=10000\"&prove=true"
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
q, err := tmquery.New("tx.height=10000")
tx, err := client.TxSearch(q, true)
```

> The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "txs": [
      {
        "hash": "1FDE1BF2748AD972F937E3B8C526B9B651853C366E0D335CD1D8DC887AF2DB52",
        "height": "86489220",
        "index": 0,
        "tx_result": {
          "data": "eyJvcmRlcl9pZCI6IjE0NjhFRTQxMkMzQURDOUNGRjNFRjMxQURDN0VERDI4OEY1RTIwOEUtNDkwMzE4OCJ9",
          "log": "Msg 0: ",
          "events": [
            {
              "attributes": [
                {
                  "key": "YWN0aW9u",
                  "value": "b3JkZXJOZXc="
                }
              ]
            }
          ]
        },
        "tx": "6QHwYl3uCm7ObcBDChQUaO5BLDrcnP8+8xrcft0oj14gjhIwMTQ2OEVFNDEyQzNBREM5Q0ZGM0VGMzFBREM3RUREMjg4RjVFMjA4RS00OTAzMTg4Gg9FVEhCRUFSLUIyQl9CTkIgAigCMJiL8wQ4gOTWphlAARJzCibrWumHIQN71QxNe08M6356bk2a6vV44SNkfxQb6DJo5F3sUPjM1RJADS7q9+Hlan0KMFWpd5S4ICALh3JvSo39xL1pGhgkwFwSy46hN8rzh9ZslXgFgv21srx6fPF3P+B87VcFEbn6qBiMwBQgk6KrAg==",
        "proof": {
          "RootHash": "5580E084B92507148E9851F4C03E71A6CAC122973C209C2DE8D28EAE3B8BA620",
          "Data": "6QHwYl3uCm7ObcBDChQUaO5BLDrcnP8+8xrcft0oj14gjhIwMTQ2OEVFNDEyQzNBREM5Q0ZGM0VGMzFBREM3RUREMjg4RjVFMjA4RS00OTAzMTg4Gg9FVEhCRUFSLUIyQl9CTkIgAigCMJiL8wQ4gOTWphlAARJzCibrWumHIQN71QxNe08M6356bk2a6vV44SNkfxQb6DJo5F3sUPjM1RJADS7q9+Hlan0KMFWpd5S4ICALh3JvSo39xL1pGhgkwFwSy46hN8rzh9ZslXgFgv21srx6fPF3P+B87VcFEbn6qBiMwBQgk6KrAg==",
          "Proof": {
            "total": "1",
            "index": "0",
            "leaf_hash": "VYDghLklBxSOmFH0wD5xpsrBIpc8IJwt6NKOrjuLpiA=",
            "aunts": []
          }
        }
      }
    ],
    "total_count": "1"
  }
}
```

### 6.2 Tx APIs
#### 6.2.1 BroadcastTxAsync
This method just return transaction hash right away and there is no return from CheckTx or DeliverTx.

**Transaction Parameters**

| Parameter | Type | Default | Required | Description     |
|-----------|------|---------|----------|-----------------|
| tx        | Tx   | nil     | true     | The transaction info|

**Return Parameters**

CheckTx Result

```
type ResultBroadcastTx struct {
	Code uint32
	Data cmn.HexBytes
	Log  string
	Hash cmn.HexBytes
}
```
**Example of Calling REST**

1. Query the account number and sequence of your address
```
tbnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. Generate your transaction json and save this output to a json file
```
tbnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
The returned value is the transaction to be sent without signature：
```
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. Generate amino-encoded  transaction with `dry-run`
```shell
tbnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
This transaction is generatedas as a signed transaction in amino encoding:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. Submit this transaction to rpc port
```shell
curl 'localhost:27147/broadcast_tx_async?tx="0xdb01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34341a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a124015e99f7a686529c76ccc2d70b404af82ca88dfee27c363439b91ea0280571b2731c03b902193d6a5793baf64b54bcdf3f85e0d7cf657e1a1077f88143a5a65f518d2e518202b"'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
result, err := client.BroadcastTxAsync("db01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34341a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a124015e99f7a686529c76ccc2d70b404af82ca88dfee27c363439b91ea0280571b2731c03b902193d6a5793baf64b54bcdf3f85e0d7cf657e1a1077f88143a5a65f518d2e518202b")
```

The above command returns JSON structured like this:

```json
{
	"error": "",
	"result": {
		"hash": "721B67C1772EA5FC7E80D70DEAA3C52034204FC60C057FF1117EE45468C1A980",
		"log": "",
		"data": "",
		"code": "0"
	},
	"id": "",
	"jsonrpc": "2.0"

}
```
Please note that the returned data contains no confirmation about whether this transaction has been committed or not. You will be able to verify the transaction status on blockchain with the following query:
```
tbnbcli tx 721B67C1772EA5FC7E80D70DEAA3C52034204FC60C057FF1117EE45468C1A980  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
It returns the height which it was committed:
```json
{"hash":"721B67C1772EA5FC7E80D70DEAA3C52034204FC60C057FF1117EE45468C1A980","height":"7731087","tx":{"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-44","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"FemfemhlKcdszC1wtASvgsqI3+4nw2NDm5HqAoBXGycxwDuQIZPWpXk7r2S1S83z+F4NfPZX4aEHf4gUOlpl9Q==","account_number":"406226","sequence":"43"}],"memo":"","source":"0","data":null}},"result":{"data":"eyJvcmRlcl9pZCI6IjgxM0U0OTM5RjE1NjdCMjE5NzA0RkZDMkFENERGNThCREUwMTA4NzktNDQifQ==","log":"Msg 0: ","tags":[{"key":"YWN0aW9u","value":"b3JkZXJOZXc="}]}}
```


#### 6.2.2 BroadcastTxCommit
The transaction will be broadcasted and returns with the response from CheckTx and DeliverTx.

This method will wait for both CheckTx and DeliverTx, so it is the slowest way to broadcast through RPC but offers the most accurate success/failure response.

CONTRACT: only returns error if mempool.CheckTx() errs or if we timeout
waiting for tx to commit.

If CheckTx or DeliverTx fail, no error will be returned, but the returned result
will contain a non-OK ABCI code.

**Transaction Parameters**

| Parameter | Type | Default | Required | Description     |
|-----------|------|---------|----------|-----------------|
| tx        | Tx   | nil     | true     | The transaction info|

**Return Parameters**

CheckTx and DeliverTx results

```
type ResultBroadcastTxCommit struct {
	CheckTx   abci.ResponseCheckTx
	DeliverTx abci.ResponseDeliverTx
	Hash      cmn.HexBytes
	Height    int64
}
```
**Example of Calling REST**

1. Query the account number and sequence of your address
```
tbnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. Generate your transaction json and save this output to a json file
```
tbnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
The returned value is the transaction to be sent without signature：
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. Generate amino-encoded  transaction with `dry-run`
```shell
tbnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
This transaction is generatedas as a signed transaction in amino encoding:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. Submit this transaction
```shell
curl 'localhost:27147/broadcast_tx_commit?tx="0xdb01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34341a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a124015e99f7a686529c76ccc2d70b404af82ca88dfee27c363439b91ea0280571b2731c03b902193d6a5793baf64b54bcdf3f85e0d7cf657e1a1077f88143a5a65f518d2e518202b"'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
result, err := client.BroadcastTxCommit("789")
```

The above command returns JSON structured like this. Please note that the returned data contains both CheckTx and DeliverTx output.

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "check_tx": {
      "data": "eyJvcmRlcl9pZCI6IjgxM0U0OTM5RjE1NjdCMjE5NzA0RkZDMkFENERGNThCREUwMTA4NzktNDYifQ==",
      "log": "Msg 0: ",
      "tags": [
        {
          "key": "YWN0aW9u",
          "value": "b3JkZXJOZXc="
        }
      ]
    },
    "deliver_tx": {
      "data": "eyJvcmRlcl9pZCI6IjgxM0U0OTM5RjE1NjdCMjE5NzA0RkZDMkFENERGNThCREUwMTA4NzktNDYifQ==",
      "log": "Msg 0: ",
      "tags": [
        {
          "key": "YWN0aW9u",
          "value": "b3JkZXJOZXc="
        }
      ]
    },
    "hash": "008EA3C57B15E34B045F69DCEB2A5589B979B2B58BA282C15DF2AEA8B441AB6B",
    "height": "7734637"
  }
}
```
To understand the output data, you could decode these data information of base64 encoding: "{"order_id":"813E4939F1567B219704FFC2AD4DF58BDE010879-46"}"


#### 6.2.3 BroadcastTxSync
The transaction will be broadcasted and returns with the response from CheckTx.

**Transaction Parameters**

| Parameter | Type | Default | Required | Description     |
|-----------|------|---------|----------|-----------------|
| tx        | Tx   | nil     | true     | The transaction info|

**Return Parameters**

CheckTx results

```
type ResultBroadcastTx struct {
	Code uint32
	Data cmn.HexBytes
	Log  string
	Hash cmn.HexBytes
}
```
**Example of Calling REST**
1. Query the account number and sequence of your address
```
bnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. Generate your transaction json and save this output to a json file
```
bnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
The returned value is the transaction to be sent without signature：
```
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. Generate amino-encoded  transaction with `dry-run`
```shell
bnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
This transaction is generatedas as a signed transaction in amino encoding:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. Submit this transaction
```shell
curl 'localhost:27147/broadcast_tx_sync?tx="0xdb01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34381a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a12406032dd568bac76ef8231fdf928f663ab6893124465528cc8ac5232afdceceea41640227501847c95dc5307f9bbcd01c82b33093c0eb11af8aef9c70eeb554f9318d2e518202f"'
```

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
result, err := client.BroadcastTxSync("db01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34381a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a12406032dd568bac76ef8231fdf928f663ab6893124465528cc8ac5232afdceceea41640227501847c95dc5307f9bbcd01c82b33093c0eb11af8aef9c70eeb554f9318d2e518202f")
```

The above command returns JSON structured like this:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "code": 0,
    "data": "7B226F726465725F6964223A22383133453439333946313536374232313937303446464332414434444635384244453031303837392D3438227D",
    "log": "Msg 0: ",
    "hash": "920EA6B3EE38AC9B700AB436DABCA8F3D97F06EA63CBCACA7AD22B2E5CA1DF75"
  }
}
```

To understand the output data, you could decode these data information of hex.: "{"order_id":"813E4939F1567B219704FFC2AD4DF58BDE010879-48"}"


### 6.3 Websocket APIs

#### 6.3.1 Subscribe

Subscribe for events via WebSocket.

To tell which events you want, you need to provide a query. query is a
string, which has a form: "condition AND condition ..." (no OR at the
moment). condition has a form: "key operation operand". key is a string with
a restricted set of possible symbols ( \t\n\r\\()"'=>< are not allowed).
operation can be "=", "<", "<=", ">", ">=", "CONTAINS". operand can be a
string (escaped with single quotes), number, date or time.
**Query Parameters**

| Parameter | Type   | Default | Required | Description |
| --------- | ------ | ------- | -------- | ----------- |
| query     | string | ""      | true     | Query       |

**Examples:**

```
	tm.event = 'NewBlock'								# new blocks
	tm.event = 'CompleteProposal'				# node got a complete proposal
	tm.event = 'Tx' AND tx.hash = 'XYZ' # single transaction
	tm.event = 'Tx' AND tx.height = 5		# all txs of the fifth block
	tx.height = 5												# all txs of the fifth block
```

Tendermint provides a few predefined keys: tm.event, tx.hash and tx.height.
Note for transactions, you can define additional keys by providing tags with
DeliverTx response.

```
		DeliverTx{
			Tags: []*KVPair{
				"agent.name": "K",
			}
	  }

		tm.event = 'Tx' AND agent.name = 'K'
		tm.event = 'Tx' AND account.created_at >= TIME 2013-05-03T14:45:00Z
		tm.event = 'Tx' AND contract.sign_date = DATE 2017-01-01
		tm.event = 'Tx' AND account.owner CONTAINS 'Igor'
```

See list of all possible events here
<a href="https://godoc.org/github.com/tendermint/tendermint/types#pkg-constants">https://godoc.org/github.com/tendermint/tendermint/types#pkg-constants</a>

For complete query syntax, check out
<a href="https://godoc.org/github.com/tendermint/tendermint/libs/pubsub/query">https://godoc.org/github.com/tendermint/tendermint/libs/pubsub/query</a>.

```go
import "github.com/tendermint/tendermint/libs/pubsub/query"
import "github.com/tendermint/tendermint/types"

client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {

	// handle error

}
defer client.Stop()
ctx, cancel := context.WithTimeout(context.Background(), timeout)
defer cancel()
query := query.MustParse("tm.event = 'Tx' AND tx.height = 3")
txs := make(chan interface{})
err = client.Subscribe(ctx, "test-client", query, txs)

go func() {


	  for e := range txs {
	    fmt.Println("got ", e.(types.EventDataTx))
		 }

}()
```

> The above command returns JSON structured like this:

```json
{


	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"

}
```

#### 6.3.2 Unsubscribe

Unsubscribe from events via WebSocket.

**Query Parameters**

| Parameter | Type   | Default | Required | Description |
| --------- | ------ | ------- | -------- | ----------- |
| query     | string | ""      | true     | Query       |

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {
	// handle error
}
defer client.Stop()
err = client.Unsubscribe("test-client", query)
```

> The above command returns JSON structured like this:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```



#### 6.3.3 UnsubscribeAll

Unsubscribe from all events via WebSocket.

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
err = client.UnsubscribeAll("test-client")
```

> The above command returns JSON structured like this:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```


