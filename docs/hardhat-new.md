---
sidebar_label: Using HardHat
hide_table_of_contents: false
sidebar_position: 2
---

# BSC에서 Hardhat을 사용하기 위해 스마트 컨트랙트 배포하기

이 튜토리얼에서는 Hardhat을 사용하여 BSC 테스트넷에서 간단한 스마트 컨트랙트를 생성, 컴파일 및 배포하는 방법을 단계별로 설명합니다.

## Hardhat이란?

Hardhat은 스마트 컨트랙트를 컴파일, 배포, 테스트 및 디버깅하기 위한 개발 환경입니다.

## 개발 환경을 설정

시작하기 전에 몇 가지 기술적 요구사항이 있습니다. 

### 요구사항

시작하기 전에 몇 가지 기술적 요구사항이 있습니다.

- [Node.js v10+ LTS and npm](https://nodejs.org/en/) (노드와 함께 제공)
- [Git](https://git-scm.com/)
- 새 프로젝트 ```npm init --yes```를 생성합니다.
- 프로젝트가 준비되면 ```npm install --save-dev hardhat```을 실행하여 Hardhat 설치합니다.
- Hardhat 툴박스 ```npm install @nomicfoundation/hardhat-toolbox```를 설치합니다.
- 로컬 설치를 사용하려면 `npx`를 통해 실행해야 합니다. (i.e. `npx hardhat`).

## 프로젝트 생성

- Hardhat 프로젝트를 만들려면 프로젝트 폴더에서 ```npx hardhat```을 실행하여 프로젝트를 초기화하십시오. 
- 키보드로 ```Create an empty hardhat.config.js```를 선택하고 Enter 키를 누릅니다.

```
$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.10.1

√ What do you want to do? · Create a JavaScript project
√ Hardhat project root: ·  Project-Directory
√ Do you want to add a .gitignore? (Y/n) · y

You need to install these dependencies to run the sample project:
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
  npm install --save-dev "hardhat@^2.10.1" "@nomicfoundation/hardhat-toolbox@^1.0.1"

Project created

See the README.md file for some example tasks you can run

Give Hardhat a star on Github if you're enjoying it!

     https://github.com/NomicFoundation/hardhat
```

Hardhat을 실행하면 현재 작업 디렉토리에서 가장 가까운 ```hardhat.config.js``` 파일을 검색합니다. 이 파일은 일반적으로 프로젝트의 루트에 저장되며 빈 ```hardhat.config.js```는 hardhat이 작동하기에 충분합니다. 전체 설정이 이 파일에 포함되어 있습니다.


## 스마트 컨트랙트 생성하기

직접 스마트 컨트랙트를 작성하거나 [BEP20 토큰 스마트 계약 템플릿](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/contracts/bep20_template/BEP20Token.template), 프로젝트의 ```contracts``` 디렉터리에 저장하고 ```BEP20Token.sol```으로 이름을 변경하십시오.

## BSC용 Hardhat 설정하기

- ```hardhat.config.js```로 이동합니다.
- bsc-network-credential로 업데이트합니다.

```js
require("@nomicfoundation/hardhat-toolbox");

const { mnemonic } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mainnet",
  networks: {
  	localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  solidity: {
  version: "0.8.9",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

```

:::참고
		Provider에 전달할 니모닉, 즉 여러분이 사용하여 배포를 진행할 계정의 시드 구문이 필요로 합니다. 루트 디렉토리에 새로운 `secrets.json` 파일을 만들고 12 단어 시드 프레이즈를 입력하세요. 메타마스크 지갑에서 12 단어를 받으려면 메타마스크 설정으로 가서, Security and Privacy를 선택하면 reveal seed words라는 버튼이 보입니다.
```
Sample secrets.json

{
    "mnemonic": "Your_12_Word_MetaMask_Seed_Phrase"
}
```
:::

## 스마트 컨트랙트 컴파일하기

Hardhat 프로젝트를 컴파일하기 위해서는 프로젝트가 위치한 디렉토리의 루트를 변경하고, 다음 명령어를 터미널에 입력합니다.

```
npx hardhat compile
```

## BSC 네트워크에 스마트 컨트랙트 배포하기

- ```scripts/deploy.js``` 파일에 다음 내용을 복사해서 붙여 넣습니다.

```js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("BEP20Token");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

- 프로젝트 디렉토리 루트에 다음 명령어를 실행합니다:

```js
$  npx hardhat run --network testnet scripts/deploy.js
```
- 예시 결과

```
$ npx hardhat run --network testnet scripts/deploy.js
Deploying contracts with the account: 0x27cf2CEAcdedce834f1673005Ed1C60efA63c081
Account balance: 100721709119999208161
Token address: 0xbF39886B4F91F5170934191b0d96Dd277147FBB2
```
> 여러분의 실제 주소, 트랜잭션 해시 등 정보는 다를 것입니다. 위는 참고를 위한 예시입니다.

**축하합니다!** BEP20 스마트 컨트랙트를 배포했습니다. 이제 스마트 컨트랙트를 사용할 수 있습니다.

배포 상태는 여기에서 확인할 수 있습니다: <https://bscscan.com/> 또는 <https://testnet.bscscan.com/>

## Hardhat으로 확인하기

Hardhat은 Etherscan 플러그인을 가지고 있습니다: [Hardhat Etherscan 플러그인](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

> 참고: Hardhat은 이전에 Buidler였습니다.

### 플러그인 설치하기

```
npm install --save-dev @nomiclabs/hardhat-etherscan
```

### hardhat.config.js에서 Etherscan 플러그인 설정하기

- 단계 1: ```require("@nomiclabs/hardhat-etherscan");```를 추가합니다
- 단계 2: Bscscan API 키를 추가하세요. <https://bscscan.com/myapikey>에서 API 키를 등록하고 획득하세요.
- 단계 3: 솔리디티 컴파일러 버전을 스마트 컨트랙트를 배포할 때 사용했던 것과 동일하게 유지하세요.

!!! 경고
    API 키는 비밀로 유지하고 버전 관리에 커밋하지 마세요.


```js
// hardhat.config.js
const { mnemonic, bscscanApiKey } = require('./secrets.json');

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  networks: {
    testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: {mnemonic: mnemonic}
    }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: bscscanApiKey 
  },
  solidity: "0.8.9"
};
```
### 명령어 확인하기
!!! 경고
    불필요한 컨트랙트 및 부분들은 제거하세요. 아니면 확인되는 컨트랙트의 일부로 간주됩니다.

다음 명령어를 실행하세요:

```
npx buidler verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```

* Example

```shell
$ npx hardhat  verify --network testnet 0xbF39886B4F91F5170934191b0d96Dd277147FBB2
Nothing to compile
Compiling 1 file with 0.5.16
Successfully submitted source code for contract
contracts/BEP20Token.sol:BEP20Token at 0xbF39886B4F91F5170934191b0d96Dd277147FBB2
for verification on Etherscan. Waiting for verification result...

Successfully verified contract BEP20Token on Etherscan.
https://testnet.bscscan.com/address/0xbF39886B4F91F5170934191b0d96Dd277147FBB2#code
```

## 결론
이 튜토리얼에서는 Hardhat IDE를 사용하여 간단한 스마트 컨트랙트를 만들고 배포하는 기본 사항을 알아봤습니다. 또한 배포된 스마트 컨트랙트를 확인하는 방법에 대한 단계별 가이드도 제공합니다. 이 튜토리얼은 테스트넷을 사용하지만, 메인넷에서도 동일한 명령어와 순서가 작동합니다.
