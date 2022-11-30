---
sidebar_label: Local BNB Smart Chain Network
hide_table_of_contents: false
sidebar_position: 2
---

# 로컬 BNB 스마트 체인 네트워크

[https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network) 또한 참고하세요.


## BSC 노드 셋업하기

### 요구사항
#### Geth 설치하기

[여기](validator/fullnode.md)에서 가이드를 확인하세요.

#### /projects Symbolic 링크를 생성하세요

`/projects` symbolic 링크를 생성하세요
*(참고: 이 단계는 "/projects" 가 다른 모든 명령어에서 사용될 수 있도록 하기 위함입니다. 대신 완전한 경로를 사용하거나 환경 변수를 설정할 수도 있습니다)*

```
$ mkdir <my projects folder>
$ sudo ln -s <my projects folder> /projects
```

### local\_ethereum\_blockchain 폴더 생성하기

```
$ mkdir /projects/local_ethereum_blockchain
```

### Genesis Block Config 생성하기

이 파일을 생성하세요:  `/projects/local_ethereum_blockchain/genesis.json`

내용에는 다음을 입력하세요:

```
{
     "config": {
       "chainId": 1000,
       "homesteadBlock": 0,
       "eip155Block": 0,
       "eip158Block": 0
                },
     "nonce": "0x0000000000000061",
     "timestamp": "0x0",
     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
     "gasLimit": "0x8000000",
     "difficulty": "0x100",
     "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
     "coinbase": "0x3333333333333333333333333333333333333333",
     "alloc": {}
}
```
([제네시스 파일 정보](https://ethereum.stackexchange.com/a/2377/2040))

### 이더리움 노드 초기화하기

```
$ geth --datadir /projects/local_ethereum_blockchain/node1 init /projects/local_ethereum_blockchain/genesis.json
```

### 이더리움 노드 시작하기

```
$ geth --datadir /projects/local_ethereum_blockchain/node1 --networkid 1000 console
```

### 또 다른 이더리움 노드 초기화하기

```
$ geth --datadir /projects/local_ethereum_blockchain/node-2 init /projects/local_ethereum_blockchain/genesis.json
```

### 두 번째 이더리움 노드 시작하기

```
$ geth --datadir /projects/local_ethereum_blockchain/node-2 --port 30304 --nodiscover --networkid 1000 console
```

### 한 노드를 다른 노드에 연결하기

한 geth 콘솔:

```
> admin.nodeInfo.enode
```

다른 geth 콘솔:

```
> admin.addPeer( <the enode value from the first console> )
```


## 유용한 geth 명령어

### 노드 정보

```
> admin.nodeInfo
```

### 피어

피어 표시하기

```
> admin.peers
```

피어 개수

```
> admin.peers.length
```

### 계정 생성

채굴 등을 수행하기 위한 계정 생성

```
> personal.newAccount()
```

*꼭 패스워드를 기억하거나 기록하세요!*

### 계정 잠금

특정 명령을 수행하기 전에 요구됩니다.

```
> personal.unlockAccount( eth.accounts[0] )
```

### 마이닝 시작

```
> miner.start(1)
```

첫 블록을 채굴할 때까지 몇 분 걸릴 수 있습니다

### 마이닝 중단

```
> miner.stop()
```

### 현재 블록넘버

```
> eth.blockNumber
```

### 현재 블록 정보

```
> eth.getBlock( eth.blockNumber )
```


### 마지막 블록을 채굴한 노드

```
> eth.getBlock(eth.blockNumber).miner
```

### Ether 계정 잔액

```
> web3.fromWei(eth.getBalance(eth.accounts[0]))
```

### 계정 간 Ether 전송

다음과 같이 계정을 알아냅니다.

`> eth.accounts`

보내는 계정을 언락합니다.

`> personal.unlockAccount( <from account> )`

eg.

`> personal.unlockAccount(eth.accounts[0])`

1 ether를 보냅니다.

```
> eth.sendTransaction({from: "<from account>", to: "<to account>", value: web3.toWei(1, "ether")})
```


### 엑시트

```
> exit
```

(`$ geth attach`가 아닌) `$ geth console`를 통해 노드를 시작한 경우 노드를 중단합니다.)



## 네트워크의 다른 노드와 연결하기

1. 노드의 IP 가져오기: `$ ifconfig|grep netmask|awk '{print $2}'`

2. 노드의 enode 가져오기: `> admin.nodeInfo.enode`

3. enode 문자열에서 REPLACE `[::]`를 `[<ip address>]`로 변경합니다.

4. 콘솔에서 `> admin.addPeer(<ip 주소가 있는 enode 문자열>)`


