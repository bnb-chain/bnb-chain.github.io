---
sidebar_label: Using Truffle
hide_table_of_contents: false
sidebar_position: 2
---

# Truffle을 사용하여 BSC에서 스마트 컨트랙트 배포하기 
이 튜토리얼에서는 Truffle IDE를 사용하여 BNB 스마트 체인 네트워크에 스마트 컨트랙트를 생성, 컴파일, 배포하는 법을 안내하겠습니다. 

## 개발 환경 설정하기

### 요구사항
시작에 앞서 필요한 기술적 요구사항들이 있습니다. 아래의 항목들을 설치해주세요.

- Windows, Linux 또는 Mac OS X
- [Node.js v8.9.4 LTS or later](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

**Windows를 위한 권장 사항**
Windows에서 Truffle을 사용하는 경우 네이밍 충돌 등에 의해 제대로 동작하지 않을 수 있습니다. [공식 Truffle 문서](https://trufflesuite.com/docs/truffle/reference/configuration/#resolving-naming-conflicts-on-windows)를 참고하여 네이밍 충돌에 대한 해결책을 찾아주세요.

### Truffle 설치하기

위에서 언급한 소프트웨어가 설치되고 나면, Truffle을 설치하기 위해 하나의 명령어만 있으면 됩니다:

```
npm install -g truffle
```
Truffle이 제대로 설치되었는지 확인하려면 터미널에 `**truffle version**`을 입력합니다. 오류가 표시되면 npm 모듈이 경로에 추가되었는지 확인하십시오.

Truffle을 처음 접하시는 분은 [Getting Starting](https://www.trufflesuite.com/docs/truffle/quickstart)을 참고하여 Truffle 환경을 설정하세요.

## 프로젝트 생성, 컴파일 및 구성

대부분의 Truffle 명령어를 사용하려면 기존 Truffle 프로젝트에 대해 실행해야 합니다. 그래서 첫 번째 단계는 Truffle 프로젝트를 만드는 것입니다.

## 생성 

기본 프로젝트를 만들려면 [Truffle 박스](https://trufflesuite.com/boxes)와 BSC 스타터 박스를 샘플 템플릿으로 사용하여 BNB 스마트 체인에서 개발을 시작할 수 있습니다. 

본 튜토리얼에서는 계정 간 이동이 가능한 토큰을 생성하는 [MetaCoin box](https://trufflesuite.com/boxes/metacoin)를 예로 들었습니다. ```truffle unbox metacoin```을 사용하여 메타코인 박스를 언박싱합니다.


> **참고: **  ```truffle unbox <box-name>```을 사용하여 다른 [Truffle 박스](https://trufflesuite.com/boxes)를 다운로드할 수 있습니다. 또 다른 대안은 ```truffle init``` 명령어를 사용하여 스마트 컨트랙트가 포함되지 않은 빈 Truffle 프로젝트를 만드는 것입니다.


이 작업이 완료되면 다음 항목이 포함된 프로젝트 구조를 가지게 됩니다.

* contracts/: 솔리디티 컨트랙트 디렉토리
* migrations/: 스크립팅 가능한 배포 파일의 디렉토리
* test/: 애플리케이션 및 컨트랙트를 테스트하기 위한 테스트 파일 디렉토리
* truffle-config.js: Truffle 구성 파일

### 컨트랙트 생성

직접 스마트 컨트랙트를 작성하거나 [BEP20 토큰 스마트 컨트랙트 템플릿](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/contracts/bep20_template/BEP20Token.template)을 다운로드하여 ``contracts`` 디렉토리로 이동시키면 됩니다.

### Compile Contract

Truffle 프로젝트를 컴파일하려면 프로젝트가 있는 디렉터리의 루트로 변경한 후 터미널에 다음을 입력하십시오.

```
truffle compile
```

### BSC용 Truffle 구성

- truffle-config.js로 이동합니다.
- bsc-network-crendentials로 truffle-config를 업데이트합니다.

```js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // A version or constraint - Ex. "^0.5.0"
    }
  }
}
```

> **참고: ** Provider에 니모닉을 전달해야 합니다. 이것은 배포할 계정의 시드 구문입니다. 루트 디렉토리에 새 .secret 파일을 만들고 12단어 니모닉 시드 구문을 입력하세요. 메타마스크 지갑에서 시드 단어를 가져오려면 메타마스크 설정으로 이동한 다음 메뉴에서 Security and Privacy로 이동하여 reveal seed words라는 버튼을 클릭합니다.  자세한 내용은 [여기](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase)를 참고하세요.

## BSC 네트워크에 배포하기

프로젝트 디렉토리 루트에서 다음 명령어를 실행하세요:
```js
$ truffle migrate --network testnet
```

바이낸스 체인 채플 테스트넷에 컨트랙트가 다음과 같이 배포됩니다.

```js
1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xaf4502198400bde2148eb4274b08d727a17080b685cd2dcd4aee13d8eb954adc
   > Blocks: 3            Seconds: 9
   > contract address:    0x81eCD10b61978D9160428943a0c0Fb31a5460466
   > block number:        3223948
   > block timestamp:     1604049862
   > account:             0x623ac9f6E62A8134bBD5Dc96D9B8b29b4B60e45F
   > balance:             6.24574114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 3223952)
   > confirmation number: 3 (block: 3223953)
   > confirmation number: 4 (block: 3223954)
   > confirmation number: 6 (block: 3223956)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


Summary
=======
> Total deployments:   1
> Final cost:          0.00383886 ETH
```

> **참고** 주소, transaction_hash 및 제공된 기타 세부 정보는 다를 수 있다는 것을 기억해주세요. 위는 구조에 대한 이해를 위해 예시를 제공한 것입니다.

🎉 **축하합니다!** BEP20 스마트 컨트랙트를 성공적으로 배포했습니다. 이제 스마트 컨트랙트를 사용할 수 있습니다.

배포 상태는 여기에서 확인하세요: <https://bscscan.com/> 또는 <https://testnet.bscscan.com/>


# BscScan에서 컨트랙트 확인하기

스마트 컨트랙트를 확인하기 위해 권장되는 방법은 플러그인을 사용하는 것입니다. 읽는 것이 쉬우며, 임포트 및 라이선스가 유지됩니다.

**Truffle로 확인**

예시: <https://testnet.bscscan.com/token/0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf>

GitHub Project: <https://github.com/huangsuyu/verify-example>

## Truffle을 위한 BscScan 플러그인

Truffle은 BscScan 플러그인을 가지고 있습니다: [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify)

Truffle verify 플러그인을 사용하기 위해서는 Truffle로 배포를 해야 합니다.

API 키 받기: https://bscscan.com/myapikey

### 플러그인 설치

```bash
npm install -D truffle-plugin-verify
```

### 플러그인 설정

`truffle-config.js`에서 다음 명령어를 이용해 플러그인을 설정합니다.

```js
const HDWalletProvider = require("@truffle/hdwallet-provider");

// const infuraKey = "fj4jll3k.....";
//
const { mnemonic, BSCSCANAPIKEY} = require('./env.json');

module.exports = {

  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: BSCSCANAPIKEY
  },
  networks: {

    testnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
        network_id: 97,
        timeoutBlocks: 200,
        confirmations: 5,
        production: true    // Treats this network as if it was a public net. (default: false)
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    },
  },
};

```

### 확인 명령어

```
truffle run verify BEP20Token@{contract-address} --network testnet
```
다음과 같은 결과값을 볼 수 있습니다:

```
Verifying BEP20Token@0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf
Pass - Verified: https://testnet.bscscan.com/address/0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf#contracts
Successfully verified 1 contract(s).
```
