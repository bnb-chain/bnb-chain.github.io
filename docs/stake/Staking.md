---
sidebar_label: Overview
sidebar_position: 2
hide_table_of_contents: false
---

# 스테이킹

[BNB 스마트 체인](https://community.binance.org/topic/2686)은 비콘 체인(Beacon Chain)에 프로그램성과 상호운용성을 도입하기 위한 혁신적인 솔루션입니다. BNB 스마트 체인은 21명의 검증인과 [Staked Authority (PoSA) 합의](./learn/consensus.md) 시스템을 기반으로 하고 있어 짧은 블록타임과 낮은 수수료를 구현할 수 있습니다. 가장 많이 스테이킹한 검증인 후보들이 검증인이 되어 블록을 생성합니다. 이중서명 식별과 슬래싱 로직으로 보안, 안전성, 체인 완결성이 보장됩니다.

이상적으로는 BNB 스마트 체인이 블록체인에 스테이킹 및 보상 로직을 포함시키고 블록 생성 시 자동으로 보상을 배분해야 할 것입니다. 비콘 체인과 같은 텐더민트 컨센서스에 개발하는 [Cosmos Hub](https://hub.cosmos.network/) 또한 이런 방식으로 동작합니다.

하지만 BSC는 최대한 이더리움과의 호환성을 유지시키고자 합니다. 다른 한편으로 비콘 체인은 이미 스테이킹 모델을 갖추고 있으며, BC와 BSC 모두를 지지하도록 연장될 수 있습니다. 이러한 방식으로 모든 스테이킹 관련 작업들은 BC에 기록됩니다. BSC의 검증인 집단이나 투표 권한에 대한 변경 사항이 있는 경우, 크로스 체인 커뮤니케이션을 통해 새로운 메시지가 BSC로 전송됩니다.

## 스테이킹 경제학

1. 스테이킹 토큰은 양 블록체인의 네이티브 토큰인 **[BNB](https://www.binance.com/cn/trade/BNB_USDT)** 입니다.
2. 스테이킹, 예를 들면 BSC를 위핸 토큰 본드와 위임 행위들은 BC 상에서 발생합니다.
3. BSC 검증인 집단은 BC 상에 개발된 BSC를 위한 스테이킹 모듈 스테이킹과 위임 로직에 의해 결정되며, 매일 UTC 00:00시 BC에서 BSC로 크로스체인 커뮤니케이션을 통해 전파됩니다.
4. 보상 배분은 매일 BC 상에서 UTC 00:00 이후 이루어집니다.

## 랭킹 알고리즘

검증인들은 파워와 운영 주소를 기반으로 순위가 매겨집니다. 위임 토큰이 많을 수록 순위도 높습니다. 두 검증인들이 동일한 양의 위임 토큰을 획득한다면, 더 작은 주소 바이트를 지닌 검증인이 순위가 더 높습니다.

## 보상 배분

BSC는 합의 엔진으로 PoSA를 사용하기 때문에 검증인들의 모든 위임인들은 자신의 검증인의 보상을 일부 취할 수 있습니다. 하지만 스테이킹 정보는 BC에 기록될 때, 보상(수수료)은 BSC에서 징수됩니다. 따라서 핵심은 모든 보상을 매일 BSC에서 BC로 전송하고 BC에서의 배분을 실행하는 것입니다.

### 주요 워크 플로우
1. ValidatorSet은 하루에 한 번 BreatheBlock에 업데이트됩니다. 그것이 N일에 발생한다고 해봅시다.
2. N일에 변경되는 검증인 집단의 정보는 체인간 커뮤니케이션으로 BSC에 전달됩니다.
3. BSC 상 검증인 집단 컨트랙트는 새로운 검증인 집단을 수신하고 업데이트합니다. 그 이후, 모든 **이전의 검증인**이 이 기간 징수한 수수료를 BC의 주소로 전송하기 위해 몇 건의 인터체인 전송을 일으킵니다. 수수료들은 N-1일의 검증인들의 것임을 볼 수 있습니다.
4. 에러 핸들링을 감안하여 우리는 N-1일의 수수료를 다음 breathe block(N+1일)에 분배합니다.

### 세부사항

1. 검증인 집단이나 이들의 표결권한이 당일 변경되지 않더라도 검증인 정보를 BSC로 전송합니다.
2. 검증인 집단 컨트랙트는 이전 기간(**기간**은 검증인 집합이 변경되는 두 컨트랙트 호출 사이의 시간으로 정의합니다) 이후 모든 검증인들이 징수한 수수료의 내역을 담고 있습니다. 실제 수수료들은 컨트랙트 주소에 징수됩니다.
3. 컨트랙트 주소에서 BC 상 각 검증인의 배분 주소로 수수료를 보내기 위한 인터체인 전송이 이뤄집니다. 배분 주소는 BC에서 create-validator 트랜잭션을 처리할 때 **자동 생성**되기 때문에 이 주소에는 아무런 개인키도 대응하지 않으며, 배분 모듈을 제외한 그 누구도 해당 주소의 토큰을 이동시킬 수 없음에 주의해주세요. 이 주소는 검증인 정보에 **Distribution Addr**로 표시됩니다.
```bash
Validator
Fee Address: tbnb15mgzha93ny878kuvjl0pnqmjygwccdadpw5dxf
Operator Address: bva15mgzha93ny878kuvjl0pnqmjygwccdad08uecu
Validator Consensus Pubkey:
Jailed: false
Status: Bonded
Tokens: 5000000000000
Delegator Shares: 5000000000000
Description: {Elbrus "" www.binance.org This is Elbrus org on chapel network.}
Bond Height: 74158
Unbonding Height: 0
Minimum Unbonding Time: 1970-01-01 00:00:00 +0000 UTC
Commission: {rate: 75000000, maxRate: 90000000, maxChangeRate: 3000000, updateTime: 2020-05-22 12:24:19.478568234 +0000 UTC}
Distribution Addr: tbnb1srkkfjk8qctvvy4s3cllhpnkz9679jphr30t2c
Side Chain Id: chapel
Consensus Addr on Side Chain: 0xF474Cf03ccEfF28aBc65C9cbaE594F725c80e12d
Fee Addr on Side Chain: 0xe61a183325A18a173319dD8E19c8d069459E2175
```

4. 인터체인 전송값에는 적어도 전송비는 커버할 수 있는 최저선이 있습니다. 인터체인 전송은 최대 8 decimal까지만 허용합니다. 나머지 액수는 컨트랙트에 보관되거나 시스템 보상 풀에 포함됩니다.
5. 보상: (totalfees \* (1-commissionRate))가 위임액에 따라 분배되고, 잔여분은 검증인 수수료 주소로 전송됩니다.

### 에러 핸들링:

1. 크로스체인 전송 실패 시, 토큰들은 지정된 주소로 반환됩니다(store 섹션의  `SideFeeAddr`에서 검증인들은 EditValidator 트랜잭션을 통해 이 주소를 바꿀 수 있습니다). 그 다음, 검증인들은 수동으로 토큰을 Transfer 트랜잭션을 통해 BC 상 자신의 `DistributionAddr`에 토큰을 예치할 수 있습니다. 검증인들에게 이를 강요하지는 않지만, 이는 위임인들이 검증인을 선택하는 데 지표가 될 수 있습니다.

## 수수료 테이블

트랜잭션 타입  | BNB |
-- | -- |
새로운 스마트 체인 검증인 생성 | 10 |
스마트 체인 검증인 정보 수정 | 1 |
스마트 체인 검증인 위임 | 0.001 |
스마트 체인 검증인 재위임 | 0.003 |
스마트 체인 검증인 위임 취소 | 0.002 |
