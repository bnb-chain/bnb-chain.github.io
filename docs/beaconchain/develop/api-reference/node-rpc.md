ㅁ# 노드 RPC

RPC 엔드포인트는 HTTP나 웹 소켓을 통해 직접 노드와 상호작용 할 수 있습니다. RPC를 통해 ABCI 쿼리를 하거나, 네트워크/합의 상태를 보거나 트랜잭션을 전파 같은 로우 레벨 작업을 할 수 있습니다.

## 1. 연결하기

노드에 연결하고 RPC 명령를 보내는 데는 크게 두 가지 방법이 있습니다.

### 1.1 로컬 노드를 사용합니다

이 페이지는 자체 노드를 로컬에서 실행했고 있다고 가정하며, 예시로 `localhost:27146`를 사용하여 로컬 노드에서 RPC 명령어 사용하는 것을 표현합니다. 

대안으로, 비컨 체인 네트워크 상에서 운용되는 노드를 사용할 수 있습니다.

### 1.2 네트워크 상 노드를 사용

비컨 체인 인프라 구축에는 접근 가능한 RPC 포트를 갖는 "데이터" 시드 노드가 포함되어 있습니다. 가능한 시드 노드를 찾기 위해 [피어](./dex-api/paths.md#apiv1peers) 엔드포인트를 통해 네트워크 피어의 리스트를 가져올 수 있습니다.

RPC 접근 가능한 노드의 예시입니다. 다음은 `localhost:27147/status`의 결과입니다:

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

따라서, 이 노드를 통해 쿼리를 생성하기 위해 아래의 RPC 명령어를 사용하거나 `bnbcli` 툴을 사용하였습니다:

```bash
$ bnbcli dex show -l NNB-0AB_BNB --chain-id Binance-Chain-Ganges --node data-seed-pre-2-s1.binance.org:80
```

## 2. 프로토콜

다음 RPC 프로토콜이 지원됩니다:

- HTTP 위 URI
- HTTP 위 JSONRPC
- 웹 소켓 위 JSONRPC

RPC is built using Tendermint's RPC library which contains its own set of documentation and tests.
See it here: <a href="https://github.com/tendermint/tendermint/tree/master/rpc/lib">https://github.com/tendermint/tendermint/tree/master/rpc/lib</a>

## 3. 설정(Configuration)

RPC는 `$TMHOME/config/config.toml`파일의 `[rpc]` 테이블 상에서 매개변수를 설정하거나 `--rpc.X` 명령어 플래그를 사용하여 설정할 수 있습니다.

기본 RPC 청취 주소는 `tcp://0.0.0.0:27147`입니다. 다른 주소를 설정하려면, `laddr` 설정 변수를 원하는 값으로 설정해야 합니다.
CORS (Cross-Origin Resource Sharing)는 `cors_allowed_origins`, `cors_allowed_methods`, `cors_allowed_headers` config 변수 설정하여 사용 가능합니다.

## 4. 인수

문자열이나 바이트 배열을 예상하는 인수(Arguments)는 `"abc"`나 `0x616263`같은 `0x`-접미사 형태 문자열 같은 인용 문자열(quoted string)로 전달될 수 있습니다.

나머지와 `broadcast` 함수를 호출하려면, `--dry` 플래그를 명령어에 더하여 트랜잭션 hex 결과를 생성할 수 있습니다. 예를 들어:

```
bnbcli send --from XXX --to bnb1XXXXXXXXXXXXXXXX --amount 1:BNB --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --json --memo "Test transfer" --dry --offline
Password to sign with 'guest':
Transaction hash: 3592BB385569BBFE346907365CFAED9341B85BAD2920B5E0B174484ECA3CD16C, Transaction hex: c701f0625dee0a462a2c87fa0a1f0a1441462c3f2a924f94c4012f4c7bbc3b0ed9213b6b12070a03424e421002121f0a14ade844d9f3a577086211bc93c0c306540b94bb4a12070a03424e421002126a0a26eb5ae987210381a2a87abf9fdd30512b9f40e9ed88516f2ef96a00ed02754a78793bf73f97b81240c926d1d93ea89730836f186a88fbe3b3719d516b8f849d414c38fc9d906ac77b7bb460f2f36564b74317aa0e3e6d9570db07763760effec15a5c600e5fb671041a0d54657374207472616e73666572
```

### 4.1 URI/HTTP

```bash
curl 'localhost:27147/broadcast_tx_sync?tx=0xdb01f0625dee0a63ce6dc0430a14813e4939f1567b219704ffc2ad4df58bde010879122b383133453439333946313536374232313937303446464332414434444635384244453031303837392d34331a0d5a454252412d3136445f424e422002280130c0843d38904e400112700a26eb5ae9872102139bdd95de72c22ac2a2b0f87853b1cca2e8adf9c58a4a689c75d3263013441a1240598c3a74dc08d82d97668ed3523a105a2afb752c5be34d09fb5f3158d55db2f545a2466263cf80f02d1184dd50efc4d8a636a262909a632ebeddeaa426c092b218d2e518202a'
```

> 응답:

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

JSONRPC 요청은 HTTP 통해 루트 RPC 엔트포인트에 POST 될 수 있습니다 (예시. <a href="http://localhost:27147/">http://localhost:27147/</a>).

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

### 4.3 JSONRPC/웹 소켓

JSONRPC 요청은 웹 소켓을 통해 생성될 수 있습니다. 웹 소켓의 엔트포인트는 `/websocket`이며, 예시로는 다음과 같이 표현됩니다 `localhost:27147/websocket`. `subscribe`나 `unsubscribe` 같은 비동기적 RPC 함수 이벤트는 웹 소켓을 통해 가능합니다.

## 5. RPC 엔드포인트 리스트

루트 RPC 엔드포인트에 대한 HTTP Get 요청은 사용 가능한 엔드포인트 목록을 표시합니다.

```bash
curl 'localhost:27147'
```

> 응답:

**인수가 필요 없는 엔드포인트:**

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

**인수가 필요한 엔드포인트:**

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

### 6.1 APIs 쿼리


#### 6.1.1 ABCIInfo 쿼리

어플리케이션에 관한 정보를  반환합니다.

**리턴 타입:**

```
type ResponseInfo struct {
	Data                 string
	Version              string
	AppVersion           uint64
	LastBlockHeight      int64
	LastBlockAppHash     []byte
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.2 ConsensusState 쿼리

ConsensusState는 합의 상태의 간결한 요약을 반환합니다. 이는 단지 합의 상태의 스냅샷이며, 지속되지 않습니다.


**반환 매개 변수**
라운드 상태를 반환합니다

```
type ResultConsensusState struct {
	RoundState json.RawMessage `
}
```

**예시**

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

위의 명령어는 다음과 같이 설계된 JSON을 반환합니다:

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
#### 6.1.3 DumpConsensusState 쿼리

DumpConsensusState 합의 상태를 덤핑합니다. 이는 합의 상태의 스냅샷이며, 지속되지 않을 것입니다.

**반환 매개 변수**
라운드 상태를 반환합니다.

```
type ResultConsensusState struct {
	RoundState json.RawMessage `
}
```

**예시**

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

위의 명령어는 다음과 같이 설계된 JSON을 반환합니다:

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

#### 6.1.4 NetInfo 쿼리

네트워크 정보를 가져옵니다

**반환 매개 변수**

```
// Info about peer connections
type ResultNetInfo struct {
	Listening bool     `json:"listening"`
	Listeners []string `json:"listeners"`
	NPeers    int      `json:"n_peers"`
	Peers     []Peer   `json:"peers"`
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.5 제네시스 파일 쿼리

제네시스 파일을 가져옵니다

**반환 매개 변수**

라운드 상태를 반환합니다

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

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
            "name": "Beacon Chain  Native Token",
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

#### 6.1.6 Health 쿼리

노드 health를 가져옵니다. 성공하면 빈 결과를 가져오고(200 OK), 에러인 경우 응답이 없습니다.

**반환 매개 변수**

```json
ResultHealth{}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```

#### 6.1.7 NumUnconfirmedTxs 쿼리

확인되지 않은 트랜잭션의 수를 반환합니다.

**쿼리 매개 변수**

| 매개 변수 | 타입 | 기본 | 필수 |  설명                          |
| --------- | ---- | ------- | -------- | ------------------------------------ |
| limit     | int  | 30      | 거짓      | 최대 엔트리 넘버 (최대: 100) |

**반환 매개 변수**

```
// List of mempool txs
type ResultUnconfirmedTxs struct {
	N   int
	Txs []types.Tx
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.8 상태 쿼리

노드 정보, 공개키, 최신 블록 해시, 앱 해시, 블록 높이 등을 포함한 텐더민트 상태를 얻습니다.

**반환 매개 변수**

```
// Node Status
type ResultStatus struct {
	NodeInfo      p2p.DefaultNodeInfo
	SyncInfo      SyncInfo
	ValidatorInfo ValidatorInfo
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
어플리케이션에 대한 정보를 쿼리합니다.

**쿼리 매개 변수**

| 매개 변수 | 타입   | 기본 | 필수 |  설명                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| path      | string | 거짓     | 거짓      | 데이터로 경로 ("/a/b/c")                    |
| data      | []byte | 거짓     | 참     | 데이터                                           |
| height    | int64  | 0       | 거짓      | 높이 (0이 최신)                        |
| prove     | bool   | 거짓     | 거짓      | 참이면 증명을 포함합니다                         |

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

**리턴 타입**

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
**예시**

이 예시에서는 `abci_query`로 계정 정보를 쿼리하는 방법을 설명합니다.
1. 쿼리 키 생성
    맞는 키를 생성 하기 위해:
    쿼리 키 : "account:" || 주소는 hex형태입니다. 첫 부분은 ASCII로 되어 있습니다.

   ASCII로 “account:”는 6163636F756E756E 이고 공개키에서 얻은 주소는 743A89F856CB39D25C1BDDAAEC74A381577CA8E2F886입니다. 이 부분들을 더하여 맞는 키를 얻어야 합니다.

2. 쿼리 실행
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

> 위 명령어는 다음과 같은 JSON을 반환합니다:
>
> 참고로 응답이 아미노 인코딩 되어 있습니다.

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

계정 잔액 정보는 다음과 같습니다:
```json
{"type":"bnbchain/Account","value":{"base":{"address":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","coins":[{"denom":"000-0E1","amount":"10530"},{"denom":"AGRI-BD2","amount":"102842693026"},{"denom":"ALIS-95B","amount":"1008261"},{"denom":"ANN-457","amount":"10100000000000"},{"denom":"AVT-B74","amount":"2280343"},{"denom":"BC1-3A1","amount":"1826704"},{"denom":"BNB","amount":"10221947267999"},{"denom":"BNN-411","amount":"10100000000000"},{"denom":"BTC.B-918","amount":"113218800"},{"denom":"BTMGL-C72","amount":"204562981873"},{"denom":"CNN-210","amount":"10100000000000"},{"denom":"COSMOS-587","amount":"50000101983748977"},{"denom":"DC1-4B8","amount":"1826704"},{"denom":"DUIT-31C","amount":"121112394964"},{"denom":"EDU-DD0","amount":"139885964"},{"denom":"FRI-D5F","amount":"11251373129"},{"denom":"IAA-C81","amount":"9448420"},{"denom":"IBB-8DE","amount":"9448420"},{"denom":"ICC-6EF","amount":"9448420"},{"denom":"IDD-516","amount":"9448420"},{"denom":"IEE-DCA","amount":"9448420"},{"denom":"IFF-804","amount":"9448420"},{"denom":"IGG-013","amount":"9448420"},{"denom":"IHH-D4E","amount":"9448420"},{"denom":"III-25C","amount":"9448420"},{"denom":"IJJ-65E","amount":"9448420"},{"denom":"KOGE48-35D","amount":"10000000000"},{"denom":"LC1-7FC","amount":"1826704"},{"denom":"LCQ-AC5","amount":"9133568718"},{"denom":"MFH-9B5","amount":"1258976083286"},{"denom":"NASC-137","amount":"0"},{"denom":"NC1-279","amount":"1826704"},{"denom":"NC2-249","amount":"1411566"},{"denom":"OCB-B95","amount":"10000000000"},{"denom":"PIC-F40","amount":"102842693026"},{"denom":"PPC-00A","amount":"205150260"},{"denom":"RBT-CB7","amount":"1008261"},{"denom":"RC1-943","amount":"1826704"},{"denom":"RC1-A1E","amount":"1826704"},{"denom":"RC1-F49","amount":"1826704"},{"denom":"SVC-A14","amount":"18267042"},{"denom":"TC1-F43","amount":"1826704"},{"denom":"TFA-3B4","amount":"5731324"},{"denom":"TGT-9FC","amount":"33251102828"},{"denom":"UCX-CC8","amount":"1398859649"},{"denom":"UDO-638","amount":"5041308481"},{"denom":"USDT.B-B7C","amount":"138793116268"},{"denom":"WWW76-A8F","amount":"4611856"},{"denom":"XSX-072","amount":"10228149"},{"denom":"YLC-D8B","amount":"210572645"},{"denom":"ZEBRA-16D","amount":"1000"},{"denom":"ZZZ-21E","amount":"13988596"}],"public_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"account_number":"406226","sequence":"52"},"name":"","frozen":null,"locked":[{"denom":"BNB","amount":"800"}]}}
```

`/account/`에서 쿼리할 수도 있습니다. 이는 블록에서 커밋되지 않은 계정 변경 사항도 반영하기 때문에 [go-sdk](https://github.com/binance-chain/go-sdk/blob/master/client/rpc/dex_client.go#L144)잔고 쿼리를 처리할 수 있습니다.

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.10  블록 쿼리
주어진 높이의 블록을 반환합니다.
높이가 주어지지 않으면, 최신 블록을 가져옵니다.

**쿼리 매개 변수**

| 매개 변수 | 타입   | 기본 | 필수 |  설명                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| height      | int64 | 거짓     | 거짓      | 블록체인의 높이 |

**리턴 타입:**

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

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
#### 6.1.11 블록 결과 쿼리
블록 결과(BlockResults) gets 주어진 높이에 ABCI 결과(ABCIResults)를 갖습니다.
높이가 제공되지 않으면, 최신 블록을 가져옵니다.
결과는 트랜잭션을 보유하고 있는 블록의 높이를 위한 것입니다.
Thus response.results[5]는 getBlock(h).Txs[5]을 실행하여 얻은 결과입니다.

**쿼리 매개 변수**

| 매개 변수 | 타입   | 기본 | 필수 |  설명                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| height      | int64 | 거짓     | 거짓      | 블록체인의 높이 |

**리턴 타입:**

```
type ResultBlockResults struct {
	Height  int64
	Results *state.ABCIResponses
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.12 블록체인 정보 쿼리
minHeight <= height <= maxHeight를 위한 블록헤더를 가져옵니다.
블록 헤더는 감소하는 방향으로 반환됩니다 (처음에 최대 높이).

**쿼리 매개 변수**

| 매개 변수 | 타입   | 기본 | 필수 |  설명                                    |
|-----------|--------|---------|----------|------------------------------------------------|
| minHeight      | int64 | 거짓     | 참    | 블록체인의 높이 |
| maxHeight      | int64 | 거짓     | 참    | 블록체인의 높이 |

**리턴 타입:**

블록의 리스트
```
type ResultBlockchainInfo struct {
	LastHeight int64
	BlockMetas []*types.BlockMeta
}
```
**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
#### 6.1.13 Commit 쿼리
주어진 높이에 block 커밋을 받습니다.
높이가 주주지지 않으면, 최신 블록의 커밋을 가져옵니다.

**트랜잭션 변수**

| 매개 변수 | 타입 | 기본 | 필수 | 설명     |
|-----------|------|---------|----------|-----------------|
| Height      | int64 | 거짓     | 참    | 블록체인 높이 |


**반환 매개 변수**

```
type ResultCommit struct {
	types.SignedHeader
	CanonicalCommit    bool
}
```

**예시**
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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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

#### 6.1.14 쿼리 Tx
Tx로 트랜잭션 결과를 쿼리할 수 있습니다. `없음`은 트랜잭션이 mempool에 있거나, 무효가 되었거나, 처음부터 보내지지 않았음을 뜻합니다.

**쿼리 매개 변수**

| 매개 변수 | 타입   | 기본 | 필수 |  설명                                               |
|-----------|--------|---------|----------|--------------------------------------------|
| hash      | []byte | 없음     | 참     | 트랜잭션 해시                                 |
| prove     | bool   | 거짓     | 거짓    | 블록에 트랜잭션 증명을 포함합니다              |

**매개변수 리턴**

주어진 트랜잭션 해시에 대한 트랜잭션을 반환합니다.

```
// 트랜잭션 쿼리를 통해 얻은 결과
type ResultTx struct {
	Hash     cmn.HexBytes          //트랜잭션의 해시
	Height   int64                  //트랜잭션이 존재한 블록의 높이
	Index    uint32                 //트랜잭션의 인덱스
	TxResult abci.ResponseDeliverTx //`abci.Result`의 객체
	Tx       types.Tx               //트랜잭션
	Proof    types.TxProof          //`types.TxProof`의 객체
}
```

**예시**

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
참고로 다음 트랜잭션 정보는 아미노로 인코딩 되어 있습니다. 원 트랜잭션 정보는 디코딩 후 조회 가능합니다:
`Data`필드는:
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
Tx는:
```json
{"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":""}],"memo":"","source":"0","data":null}}
```



#### 6.1.15 쿼리 TxSearch
TxSearch는 여러 트랜잭션 결과를 쿼리할 수 있도록 해줍니다. 이를 통해 인덱스를 통해 트랜잭션을 검색할 수 있습니다. 트랜잭션 리스트와(최대 각 페이지에서 엔트리 수)와 총 개수를 반환합니다.

**인덱서 사용**

`config.tml`에서 인덱서를 사용해야합니다. `tx.height`를 넣기 위해 현재 유일하게 지원하는 `index_tags`를 수정할 수 있습니다. 이를 통해 "tx.height"를 더하여 트랜잭션을 인덱싱 할 수 있습니다.

**쿼리 매개 변수**

| 매개 변수  | 타입   | 기초     | 필수     | 설명                                             |
|-----------|--------|---------|----------|--------------------------------------------------|
| query     | string | ""      | 참       | 쿼리                                              |
| prove     | bool   | 거짓     | 거짓     | 블록에 트랜잭션 증명 포함                          |
| page      | int    | 1       | 거짓     | 페이지 수 (1-기반)                                 |
| per_page  | int    | 30      | 거짓     | 페이지 당 엔트리 (max: 100)                        |

**매개변수 리턴**

- `proof`: `types.TxProof`의 객체
- `tx`: `[]byte` - 트랜잭션
- `tx_result`: `abci.Result`의 객체
- `index`: `int` - 트랜잭션의 인덱스
- `height`: `int` - 트랜잭션이 존재한 블록의 높이
- `hash`: `[]byte` - 트랜잭션의 해시

!!! 팁
	텐더민트 라이브러리의 변화로, `ResponseCheckTx`, `ResponseDeliverTx`, `ResponseBeginBlock`, 와 `ResponseEndBlock`는 **Tags**대신 **Events**를 사용합니다. 각 이벤트는 타입과 속성의 리스트(key-value 쌍의 리스트)를 지니며 각 응답에 여러 개의 개별 이벤트를 포함할 수 있습니다.

**가능한 쿼리 경로**

현재 쿼리는 같은 트랜잭션 높이를 통해서만 구현되어 있으며, you can only query by transaction height: `tx.height`.참고로 비컨 체인 테스트넷에서는 tx 검색을 위해 다음 데이터 시드 노드 만을 사용할 수 있습니다: <https://data-seed-pre-0-s3.binance.org>

**예시**

예를 들어, 높이 10000에서 발생한 모든 트랜잭션을 찾는다면, 

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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

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
이 메서드는 CheckTx나 DeliverTx에서 리턴 값이 없으면 당장 트랜잭션 해시를 반환합니다.

**트랜잭션 변수**

| 매개 변수  | 타입 | 기본 | 필수 | 설명     |
|-----------|------|----------|----------|-----------------|
| tx        | Tx   | 없음     | 참     | 트랜잭션 정보 |

**반환 매개 변수**

CheckTx를 확인합니다

```
type ResultBroadcastTx struct {
	Code uint32
	Data cmn.HexBytes
	Log  string
	Hash cmn.HexBytes
}
```
**REST 호출 예시**

1. 계정 번호와 당신 주소의 시퀸스를 쿼리합니다.
```
tbnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. 트랜잭션 json을 생성하고 그 결과를 json 파일에 저장합니다.
```
tbnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
반환된 값은 서명 없이 보내질 트랜잭션입니다：
```
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. `dry-run`으로 아미노 인코딩된 트랜잭션을 생성합니다
```shell
tbnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
이 트랜잭션은 amino 인코딩에서 서명된 트랜잭션으로 생성됩니다:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. rpc 포트에 트랜잭션을 제출합니다
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

위의 명령어는 다음과 같은 구조로 된 JSON을 반환합니다:

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

참고로 반환된 데이터는 해당 트랜잭션이 커밋 되었는 지 확인하지 않습니다. 트랜잭션 상태를 확인하려면 블록체인에 다음과 같은 쿼리를 통해 발송합니다:
```
tbnbcli tx 721B67C1772EA5FC7E80D70DEAA3C52034204FC60C057FF1117EE45468C1A980  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
커밋된 높이를 반환합니다:
```json
{"hash":"721B67C1772EA5FC7E80D70DEAA3C52034204FC60C057FF1117EE45468C1A980","height":"7731087","tx":{"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-44","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"FemfemhlKcdszC1wtASvgsqI3+4nw2NDm5HqAoBXGycxwDuQIZPWpXk7r2S1S83z+F4NfPZX4aEHf4gUOlpl9Q==","account_number":"406226","sequence":"43"}],"memo":"","source":"0","data":null}},"result":{"data":"eyJvcmRlcl9pZCI6IjgxM0U0OTM5RjE1NjdCMjE5NzA0RkZDMkFENERGNThCREUwMTA4NzktNDQifQ==","log":"Msg 0: ","tags":[{"key":"YWN0aW9u","value":"b3JkZXJOZXc="}]}}
```


#### 6.2.2 BroadcastTxCommit
트랜잭션이 전파되고 CheckTx와 DeliverTx에서의 응답을 반환할 것입니다.

이 메서드는 CheckTx와 DeliverTx를 둘 다 기다리며, RPC에서 전파하기 가능 느린 방법이지만 가장 정확한 방법입니다.

컨트랙트: mempool.CheckTx()에서의 에러나 tx가 커밋할 때까지 기다리다 만료될 때만 에러를 반환합니다.
waiting for tx to commit.

만일 CheckTx이나 DeliverTx가 실패한다면, 에러가 반환되진 않지만 허용되지 않은 ABCI 코드를 포함한 결과를 반환합니다.


**트랜잭션 변수**

| 매개 변수 | 타입 | 기본 | 필수 | 설명     |
|-----------|------|---------|----------|-----------------|
| tx        | Tx   | 없음     | 참     | 트랜잭션 정보 |

**반환 매개 변수**

CheckTx과 DeliverTx의 결과

```
type ResultBroadcastTxCommit struct {
	CheckTx   abci.ResponseCheckTx
	DeliverTx abci.ResponseDeliverTx
	Hash      cmn.HexBytes
	Height    int64
}
```
**REST 호출 예시**

1. 계정 번호와 당신 주소의 시퀸스를 쿼리합니다.
```
tbnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. 트랜잭션 json을 생성하고 그 결과를 json 파일에 저장합니다.
```
tbnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
리턴 값은 서명 없이 보낼 트랜잭션입니다： 
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. `dry-run`으로 amino 인코딩된 트랜잭션을 생성합니다
```shell
tbnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
이 트랜잭션은 amino 인코딩에서 서명된 트랜잭션으로 생성됩니다:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. 트랜잭션을 제출합니다
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

위의 명령어는 다음과 같은 구조의 JSON을 반환합니다. 참고로 반환된 데이터는 CheckTx와 DeliverTx 결과 모두를 갖고 있습니다.

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
결과 데이터를 이해하려면, base64로 인코딩된 데이터 정보를 디코딩할 수 있습니다: "{"order_id":"813E4939F1567B219704FFC2AD4DF58BDE010879-46"}"


#### 6.2.3 BroadcastTxSync
트랜잭션이 전파될 것이고 CheckTx의 응답과 함께 반환될 것입니다.

**트랜잭션 변수**

| 매개 변수  | 타입 |   기본  |  필수     | 설명         |
|-----------|------|---------|----------|--------------|
| tx        | Tx   | 없음     | 참     | 트랜잭션 정보 |

**반환 매개 변수**

CheckTx 결과

```
type ResultBroadcastTx struct {
	Code uint32
	Data cmn.HexBytes
	Log  string
	Hash cmn.HexBytes
}
```
**REST 호출 예시**
1. 계정 번호와 당신 주소의 시퀸스를 쿼리합니다.
```
bnbcli account your-address  --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
2. 트랜잭션 json을 생성하고 그 결과를 json 파일에 저장합니다.
```
bnbcli send --from name --to=to-address --amount=500000000:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --memo "Test transfer" --generate-only
```
서명 없이 보낼 트랜잭션 값이 반환됩니다.
```
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"","account_number":" account-number","sequence":"10"}],"memo":"","source":"0","data":null}}
```
3. `dry-run`로 amino 인코딩 된 트랜잭션을 생성합니다.
```shell
bnbcli dex order  --symbol ABC-16D_BNB  --side 1 --price 1000000 --qty 10000 --from account --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte --dry --account-number account-number
```
다음 트랜잭션은 amino 인코딩에서 서명된 트랜잭션으로 나타냅니다:
```json
 {"type":"auth/StdTx","value":{"msg":[{"type":"dex/NewOrder","value":{"sender":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","id":"813E4939F1567B219704FFC2AD4DF58BDE010879-53","symbol":"ZEBRA-16D_BNB","ordertype":2,"side":1,"price":"1000000","quantity":"10000","timeinforce":1}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"signature":"6qppgKBUp5Fwc77qc1I/U1qX4H4VSBP/fHUWaEPoQDk/visNDIGCts96271+TaflByaRV/toQTulIHOjbT9oJQ==","account_number":" <account-number>","sequence":"10"}],"memo":"","source":"0","data":null}}
```
4. 트랜잭션 제출
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

위 명령어는 다음과 같은 JSON을 반환합니다:

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

결과를 이해하기 위해, hex의 데이터 정보를 디코딩하면 다음과 같습니다: "{"order_id":"813E4939F1567B219704FFC2AD4DF58BDE010879-48"}"


### 6.3 웹 소켓 APIs

#### 6.3.1 구독

웹 소켓을 통해 이벤트를 구독합니다.

이벤트에 원하는 것을 요청하기 위해 쿼리가 필요합니다. 퀴리는 문자열료, 다음과 같은 형태를 지닙니다: "condition 그리고 condition ..." (또는 이 아닌 그리고 형태만 사용). 
조건을 다음과 같은 형태를 지닙니다: "key operation operand". 키는 제한된 기호를 지닌 제한된 형태의 문자열입니다( \t\n\r\\()"'=>< 불가능).
연산자에는 "=", "<", "<=", ">", ">=", "CONTAINS"를 사용할 수 있으며 string(단일 인용으로 탈출), 숫자, 날짜 혹은 시간 형태로 나타납니다.

**쿼리 매개 변수**

| 매개 변수 | 유형   | 기본 | 필수 | 설명 |
| --------- | ------ | ------- | -------- | ----------- |
| query     | string | ""      | 예   | Query       |

**예시:**

```
	tm.event = 'NewBlock'								# new blocks
	tm.event = 'CompleteProposal'				# node got a complete proposal
	tm.event = 'Tx' AND tx.hash = 'XYZ' # single transaction
	tm.event = 'Tx' AND tx.height = 5		# all txs of the fifth block
	tx.height = 5												# all txs of the fifth block
```

텐더민트는 미리 정의된 키를 제공합니다: tm.event, tx.hash and tx.height.
DeliverTx 응답을 통해 tag를 제공하면 추가 키를 만들 수 있습니다.

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

가능한 모든 이벤트를 확인하세요
<a href="https://godoc.org/github.com/tendermint/tendermint/types#pkg-constants">https://godoc.org/github.com/tendermint/tendermint/types#pkg-constants</a>

전체 쿼리 구문을 여기서 확인하세요
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

> 위 명령어는 다음과 같은 JSON을 반환합니다:

```json
{


	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"

}
```

#### 6.3.2 구독 취소

웹 소켓으로 이벤트 구독 취소

**쿼리 매개 변수**

| 매개 변수 | 유형   | 기본 | 필수 | 설명 |
| --------- | ------ | ------- | -------- | ----------- |
| query     | string | ""      | 참     | Query       |

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {
	// handle error
}
defer client.Stop()
err = client.Unsubscribe("test-client", query)
```

> 위 명령어는 다음과 같은 JSON을 반환합니다:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```



#### 6.3.3 전부 구독 취소

웹 소켓으로 모든 이벤트 구독 취소

```go
client := client.NewHTTP("tcp://0.0.0.0:27147", "/websocket")
err := client.Start()
if err != nil {


	// handle error

}
defer client.Stop()
err = client.UnsubscribeAll("test-client")
```

> 위 명령어는 다음과 같은 JSON을 반환합니다:

```json
{
	"error": "",
	"result": {},
	"id": "",
	"jsonrpc": "2.0"
}
```


