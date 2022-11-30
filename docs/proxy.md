---
sidebar_label: Upgradable BEP20 Contracts on BSC
hide_table_of_contents: false
sidebar_position: 2
---
# BSC에서 업그레이드 가능한 BEP20 컨트랙트

## 업그레이드 가능한 컨트랙트란?
EVM의 스마트 컨트랙트는 불변하도록 설계되었습니다. 일단 생성하면 수정할 수 있는 방법이 없으므로, 참가자들 사이에서 깨지지 않는 계약으로 효과적으로 작용합니다. 계약의 기능을 확장하려면 어떻게 해야 합니까? 계약서에 자금 손실로 이어지는 버그가 있으면 어떻게 합니까? 솔리디티 컴파일러에서 취약성이 발견되면 어떻게 합니까?
업그레이드할 수 없는 컨트랙트에서 버그를 수정하려면 다음과 같이 해야 합니다.

- 컨트랙트 새 버전을 배포합니다.
- 이전 컨트랙트에서 새 컨트랙트로 모든 상태를 수동으로 마이그레이션합니다(가스 요금이 매우 비쌀 수 있습니다!).
- 이전 컨트랙트와 상호 작용한 모든 컨트랙트를 새 컨트랙트 주소를 사용하도록 업데이트합니다.
- 모든 사용자에게 연락하여 새로운 배포를 사용하도록 설득합니다(사용자의 마이그레이션 속도가 느리므로 두 컨트랙트를 동시에 사용).

스마트 컨트랙트를 일부 변경할 수 있는 몇 가지 접근 방식이 있습니다.

**로직과 데이터를 구분**

이 접근 방식을 사용하면 지정된 데이터 컨트랙트에서 직접 데이터를 읽을 수 있습니다. 이는 솔리디티 외부에서 사용되는 비교적 일반적인 접근 방식입니다. 이 접근 방식의 주요 단점 중 하나는 전체 시스템 외부의 계약 인터페이스를 변경할 수 없고 기능을 추가하거나 제거할 수 없다는 것입니다.

**Delegatecall 프록시**

`delegatecall` opcode는 [EIP-7](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7.md)에서 구현되었습니다. 실행을 다른 컨트랙트에 위임할 수 있지만 실행 컨텍스트는 동일합니다. delegatecall와 마찬가지로, msg.sender는 프록시 컨트랙트 호출자의 것으로 유지됩니다. 이 접근 방식의 주요 단점 중 하나는 프록시의 컨트랙트 코드가 저장되는 상태를 반영하지 않는다는 것입니다.

## 업그레이드 가능한 BEP20 컨트랙트 작성하기

이러한 제한은 이더리움 VM의 작동 방식에 뿌리를 두고 있으며, OpenZeppelin Upgrades뿐만 아니라 업그레이드 가능한 컨트랙트로 작동하는 모든 프로젝트에 적용됩니다.

### 이니셜라이저

OpenZeppelin Upgrade에서는 생성자를 제외하고 Solidity 계약을 수정하지 않고 사용할 수 있습니다. 다만 프록시 기반의 업그레이드 시스템에서, 업그레이드가 가능하게 설계된 계약은 시스템 요건에 의해 생성자를 사용할 수 없습니다. 이러한 제한의 이유에 대해 알아보려면 [Proxies](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#the-constructor-caveat)를 방문하십시오.

즉, OpenZeppelin Upgrade 컨트랙트를 사용할 경우 생성자를 모든 설정 로직을 실행하는 일반 함수(일반적으로 initialize)로 변경해야 합니다.

```javascript
pragma solidity ^0.6.0;
  import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";
  contract BEP20UpgradeableProxy is TransparentUpgradeableProxy {
    constructor(address logic, address admin, bytes memory data) TransparentUpgradeableProxy(logic, admin, data) public {
    }}

```
OpenZeppelin Upgrades는 컨트랙트가 여러 번 *초기화*되지 않도록 하는 초기화 수식자(modifier)가 있는 초기화 가능한 기본 컨트랙트를 제공합니다.
https://github.com/bnb-chain/canonical-upgradeable-bep20/blob/47ed7a710e6e86bdc85f2118bf63fc892e3b7716/contracts/BEP20TokenImplementation.sol#L37

```javascript
 /**
     * @dev sets initials supply and the owner
     */
function initialize(string memory name, string memory symbol, uint8 decimals, uint256 amount, bool mintable, address owner) public initializer {
        _owner = owner;
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
        _mintable = mintable;
        _mint(owner, amount);
    }

```
BEP20 컨트랙트는 생성자에서 토큰 이름, 기호 및 소수점을 초기화합니다. BEP20 업그레이드 가능 컨트랙트에서 이러한 컨트랙트를 사용하면 안 됩니다. 생성자 대신 이니셜라이저를 사용하도록 수정된 `upgradableBEP20implementation`을 사용해야 합니다.
https://github.com/bnb-chain/bsc-genesis-contract/blob/42922472b43397fbca9d0c84c7f72fbfaf39efc3/contracts/bep20_template/BEP20Token.template#L351

```javascript
constructor() public {
    _name = {{TOKEN_NAME}};
    _symbol = {{TOKEN_SYMBOL}};
    _decimals = {{DECIMALS}};
    _totalSupply = {{TOTAL_SUPPLY}};
    _balances[msg.sender] = _totalSupply;

  }

```

## Truffle 사용하기
### 환경 설정하기

새로운 npm 프로젝트를 생성하겠습니다.
```
mkdir mycontract && cd mycontract
```
그리고,
```
npm init -y
```
### 설치

Truffle을 설치하겠습니다.

```
npm install --save-dev truffle
npm install --save-dev @openzeppelin/contracts
npm install --save-dev zeppelin-solidity
```

Truffle 실행 시 “Create a truffle-config.js”를 만들기 위해 아뢔와 같이 입력해 주세요.
```
npx truffle init
```
### 업그레이드 가능 컨트랙트 생성하기
이 예시 토큰은 고정 공급량으로, 컨트랙트 배포자에게 발행됩니다.

https://github.com/bnb-chain/canonical-upgradeable-bep20/blob/master/contracts/BEP20TokenImplementation.sol

```javascript
const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");const BEP20TokenFactory = artifacts.require("BEP20TokenFactory");
const Web3 = require('web3');const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const fs = require('fs');
module.exports = function(deployer, network, accounts) { deployer.then(async () => {  await deployer.deploy(BEP20TokenImplementation);  await deployer.deploy(BEP20TokenFactory, BEP20TokenImplementation.address); });};
```

### 로컬에서 컨트랙트 테스트해보기
업그레이드 가능한 컨트랙트를 테스트하려면 구현 컨트랙트에 대한 unit 테스트를 생성하고, 프록시를 통한 상호 작용을 테스트하기 위한 더 높은 수준의 테스트를 생성해야 합니다.
```javascript
contract('Upgradeable BEP20 token', (accounts) => {  it('Create Token', async () => {    const BEP20TokenFactoryInstance = await BEP20TokenFactory.deployed();    bep20FactoryOwner = accounts[0];    bep20Owner = accounts[1];    proxyAdmin = accounts[0];
    const tx = await BEP20TokenFactoryInstance.createBEP20Token("ABC Token", "ABC", 18, web3.utils.toBN(1e18), true, bep20Owner, proxyAdmin, {from: bep20FactoryOwner});    truffleAssert.eventEmitted(tx, "TokenCreated",(ev) => {      bep20TokenAddress = ev.token;      return true;    });
  });
```
### 통제 이전
프록시 소유자를 다른 주소로 이전할 수 있습니다.
```js
let event = await bep20proxy.methods.changeAdmin(newAdmin).send({from: proxyAdmin});
bep20proxy.getPastEvents("AdminChanged", {fromBlock: 0, toBlock: "latest"}).then(console.log)

```
### 소유자 이전
BEP20 토큰 소유자를 다른 주소로 변경할 수 있습니다.
```js
    await bep20.methods.transferOwnership(accounts[5]).send({from: accounts[1]});
    const owner = await bep20.methods.getOwner().call({from: accounts[5]});
```
### 테스트넷에 배포하기

`2_bep20.js` 스크립트를 마이그레이션 디렉토리에 생성합니다.
```js
module.exports = function(deployer, network, accounts) { deployer.then(async () => {  await deployer.deploy(BEP20TokenImplementation);  await deployer.deploy(BEP20TokenFactory, BEP20TokenImplementation.address); });};
```
우선 로컬 테스트(ganache-cli 등)에 컨트랙트를 배포하여 수동으로 상호작용할 수 있습니다. 그리고 컨트랙트를 퍼블릭 테스트 네트워크에 배포합니다.
```shell
$ npx truffle console --network ganache
```
Truffle 콘솔을 사용하여 컨트랙트와 상호작용할 수 있습니다.
```shell
truffle(ganache)> BEP20TokenFactoryInstance = await BEP20TokenFactory.deployed();undefinedtruffle(ganache)> await BEP20TokenFactoryInstance.createBEP20Token("ABC Token", "ABC", 18, web3.utils.toBN(1e18), true, {address1}, {address2});
```
> 참고: 니모닉이나 bscscan 키 등의 기밀사항은 버전 관리에 커밋 되어선 안 됩니다.

BSC 테스트넷에 배포를 위해 `truffle migrate`를 실행합니다. 구현 컨트랙트 'BEP20TokenImplementation'과 'BEP20TokenFactory'가 배포되는 것을 볼 수 있습니다.
```
Deploying 'BEP20TokenImplementation'
   ------------------------------------
   > transaction hash:    0xdcd37a388bf9b2f822eff5b816bd4c9db80bc4f6046e3f922cedca12162d46d9
   > Blocks: 3            Seconds: 8
   > contract address:    0xB3fbaf029580145885e915B3CAeEd259Edb9DfE1
   > block number:        5174292
   > block timestamp:     1609990661
   > account:             0x133D144F52705cEb3f5801B63b9EBcCF4102f5Ed
   > balance:             10.648947766
   > gas used:            1147250 (0x118172)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.022945 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 5174294)
   > confirmation number: 3 (block: 5174295)
   > confirmation number: 5 (block: 5174297)

   Deploying 'BEP20TokenFactory'
   -----------------------------
   > transaction hash:    0x821c8355aaecc36a9f7fe50d2b3722c840047883a6bf500343393554d8ce3696
   > Blocks: 3            Seconds: 8
   > contract address:    0xDC1015512AbBC71e57a607A121a4aC9CF05D89BC
   > block number:        5174300
   > block timestamp:     1609990685
   > account:             0x133D144F52705cEb3f5801B63b9EBcCF4102f5Ed
   > balance:             10.629661146
   > gas used:            964331 (0xeb6eb)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01928662 ETH


```

### 구현 새 버전 만들기
일정 기간이 지나면 컨트랙트에 기능을 추가하기로 결정합니다. 이 가이드에서는 `whitelist` 함수를 추가하겠습니다.

다음 솔리디티 코드를 사용하여 컨트랙트 디렉토리에 새 구현인 `BEP2_V2.sol`을 만듭니다.
```js
/**   * @dev sets multiple whitelist address   */
function multiWhitelistAdd(address[] memory addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = true;
        }
    }
 /**
     * @dev remove whitelisted address
     */
    function multiWhitelistRemove(address[] memory addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = false;
        }
    }
 /**
     * @dev check if is a whitelist address
     */
    function isInWhitelist(address a) internal view returns (bool) {
        return whitelist[a];
    }
```

### 로컬에서 업그레이드 테스트하기
업그레이드를 테스트하려면 새 구현 컨트랙트에 대한 unit 테스트를 생성하고, 프록시를 통해 상호 작용을 테스트하기 위한 더 높은 수준의 테스트를 생성하여 업그레이드 후에도 상태가 유지되는지 확인해야 합니다.

새로운 구현 컨트랙트에 대한 unit 테스트를 만들 것입니다. 이미 만든 테스트에 추가하여 높은 적용 범위를 보장할 수 있습니다.

테스트 디렉토리에 upgrade.test.js를 생성 후 다음과 같이 작성하면 됩니다.
```js
let tx = await bep20proxy.methods.upgradeTo(newInstance.address).send({from: proxyAdmin});
 bep20proxy.getPastEvents("Upgraded", {fromBlock: 0, toBlock: "latest"}).then(console.log)
```