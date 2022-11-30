---
sidebar_label: 스테이킹
hide_table_of_contents: true
sidebar_position: 2
---
# 스테이킹 API

**버전:** 1.0

**이용 약관:**

* Base URL: api.binance.org/


**라이센스:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

### /v1/staking/accounts/{address}/balance
---
##### ***GET***
**요약:** getBalance

**파라미터**

| 이름 | 장소| 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| 주소 | 경로 | 주소 | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BalanceVo](#balancevo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/allowed-dst-validators
---
##### ***GET***
**요약:** getAllowedDstValidators

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |
| src-validator | 쿼리 | src-validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [AllowedDstValidatorsVO](#alloweddstvalidatorsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/delegations
---
##### ***GET***
**요약:** getDelegationsValByDelegator

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예| 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [DelegationValsVO](#delegationvalsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/operations
---
##### ***GET***
**요약:** getOperationsByDelegator

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OperationsVO](#operationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/reds
---
##### ***GET***
**요약:** getDelREDs

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| isCompleted | 쿼리 | isCompleted | 아니오 | 정수형 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [RedsVO](#redsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/rewards
---
##### ***GET***
**요약:** getDelRewards

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| endTime | 쿼리 | endTime | 아니오 | long |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |
| startTime | 쿼리 | startTime | 아니오 | long |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [RewardsDetailVO](#rewardsdetailvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/ubds
---
##### ***GET***
**요약:** getDelUBDs

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| delegator | 경로 | delegator | 예 | 문자열 |
| isCompleted | 쿼리 | isCompleted | 아니오 | 정수형 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |
| validator | 쿼리 | validator | 아니오 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [UbdsVO](#ubdsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/next-reward-time
---
##### ***GET***
**요약:** getNextRewardTime

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | 객체 |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/summary
---
##### ***GET***
**요약:** getSum

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [StakingSumVO](#stakingsumvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators
---
##### ***GET***
**요약:** getValidators

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| consensus-address | 쿼리 | consensus-address | 아니오 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ValidatorsVO](#validatorsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}
---
##### ***GET***
**요약:** getValidator

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| validator | 경로 | validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ValidatorDetailVO](#validatordetailvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/delegations
---
##### ***GET***
**요약:** getDelegationsByValidator

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |
| validator | 경로 | validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [DelegationsVO](#delegationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/operations
---
##### ***GET***
**요약:** getOperationsByValidator

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| limit | 쿼리 | limit | 예 | 정수형 |
| offset | 쿼리 | offset | 예 | 정수형 |
| validator | 경로 | validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OperationsVO](#operationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/powers
---
##### ***GET***
**요약:** getVotingPower

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| endTime | 쿼리 | endTime | 예 | long |
| startTime | 쿼리 | startTime | 예 | long |
| validator | 경로 | validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [VotingPowerVO](#votingpowervo) ] |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/rewards
---
##### ***GET***
**요약:** getValRewards

**파라미터**

| 이름 | 장소 | 내용 | 필수 | 스키마(Schema) |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | 경로 | chain-id | 예 | 문자열 |
| endTime | 쿼리 | endTime | 예 | long |
| startTime | 쿼리 | startTime | 예 | long |
| validator | 경로 | validator | 예 | 문자열 |

**응답**

| 코드 | 내용 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [RewardVO](#rewardvo) ] |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### Models
---

### AllowedDstValidatorsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| earliestCompleteTime | dateTime |  |  |
| total | long |  |  |
| validators | [ [ValidatorVO](#validatorvo) ] |  |  |

### BalanceVo

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| asset | 문자열 |  |  |
| delegated | 숫자 |  |  |
| unbonding | 숫자 |  |  |

### DelegationVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | 숫자 |  |  |
| delegator | 문자열 |  |  |
| initialTime | dateTime |  |  |
| validator | 문자열 |  |  |

### DelegationValVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | 숫자 |  |  |
| delegator | 문자열 |  |  |
| initialTime | dateTime |  |  |
| validator | 문자열 |  |  |
| validatorName | 문자열 |  |  |
| validatorStatus | 정수형 | 0: active 1: inactive 2: inJail |  |

### DelegationValsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| delegations | [ [DelegationValVO](#delegationvalvo) ] |  |  |
| total | long |  |  |

### DelegationsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| delegations | [ [DelegationVO](#delegationvo) ] |  |  |
| total | long |  |  |

### Link

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| href | 문자열 |  |  |
| templated | boolean |  |  |

### Map«string,Link»

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| Map«string,Link» | 객체 |  |  |

### ModelAndView

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| empty | boolean |  |  |
| model | 객체 |  |  |
| modelMap | 객체 |  |  |
| reference | boolean |  |  |
| status | 문자열 |  |  |
| view | [View](#view) |  |  |
| viewName | 문자열 |  |  |

### OperationVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | 숫자 |  |  |
| delegator | 문자열 |  |  |
| operationType | 정수형 | 0: delegate; 1: undelegate; 2: redelegate |  |
| srcValidator | 문자열 |  |  |
| time | dateTime |  |  |
| txHash | 문자열 |  |  |
| valName | 문자열 |  |  |
| validator | 문자열 |  |  |

### OperationsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| operations | [ [OperationVO](#operationvo) ] |  |  |
| total | long |  |  |

### RedVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| balance | 숫자 |  |  |
| completeHeight | long |  |  |
| completeTime | dateTime |  |  |
| creationHeight | long |  |  |
| delegator | 문자열 |  |  |
| denom | 문자열 |  |  |
| dstShares | long |  |  |
| dstValidator | 문자열 |  |  |
| initialBalance | 숫자 |  |  |
| srcShares | long |  |  |
| srcValidator | 문자열 |  |  |

### RedsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| redelegations | [ [RedVO](#redvo) ] |  |  |
| total | long |  |  |

### RewardDetailVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| chainId | 문자열 |  |  |
| delegator | 문자열 |  |  |
| height | long |  |  |
| reward | 숫자 |  |  |
| rewardTime | dateTime |  |  |
| valName | 문자열 |  |  |
| validator | 문자열 |  |  |

### RewardVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| chainId | 문자열 |  |  |
| commission | 숫자 |  |  |
| height | long |  |  |
| rewardTime | dateTime |  |  |
| selfDelegator | 문자열 |  |  |
| totalReward | 숫자 |  |  |
| valTokens | 숫자 |  |  |
| validator | 문자열 |  |  |

### RewardWithDistributionAddrVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| chainId | 문자열 |  |  |
| commission | 숫자 |  |  |
| distributionAddr | 문자열 |  |  |
| height | long |  |  |
| rewardTime | dateTime |  |  |
| selfDelegator | 문자열 |  |  |
| totalReward | 숫자 |  |  |
| valTokens | 숫자 |  |  |
| validator | 문자열 |  |  |

### RewardsDetailVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| rewardDetails | [ [RewardDetailVO](#rewarddetailvo) ] |  |  |
| total | long |  |  |

### RewardsWithDistributionAddrVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| rewards | [ [RewardWithDistributionAddrVO](#rewardwithdistributionaddrvo) ] |  |  |
| total | long |  |  |

### StakingSumVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| reward | 숫자 |  |  |
| votingPower | 숫자 |  |  |

### UbdVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| balance | 숫자 |  |  |
| completeHeight | long |  |  |
| completeTime | dateTime |  |  |
| creationHeight | long |  |  |
| delegator | 문자열 |  |  |
| denom | 문자열 |  |  |
| initialBalance | 숫자 |  |  |
| validator | 문자열 |  |  |

### UbdsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| unbondingDelegations | [ [UbdVO](#ubdvo) ] |  |  |

### ValidatorDetailVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| apr | 숫자 |  |  |
| commissionMaxChangeRate | 숫자 |  |  |
| commissionMaxRate | 숫자 |  |  |
| commissionRate | 숫자 |  |  |
| detail | 문자열 |  |  |
| distributionAddr | 문자열 |  |  |
| identity | 문자열 |  |  |
| selfDelegator | 문자열 |  |  |
| selfStake | 숫자 |  |  |
| sideConsAddr | 문자열 |  |  |
| sideFeeAddr | 문자열 |  |  |
| status | 정수형 |  |  |
| valName | 문자열 |  |  |
| validator | 문자열 |  |  |
| votingPower | 숫자 |  |  |
| votingPowerProportion | 숫자 |  |  |
| website | 문자열 |  |  |

### ValidatorVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| apr | 숫자 |  |  |
| commissionRate | 숫자 |  |  |
| status | 정수형 |  |  |
| valName | 문자열 |  |  |
| validator | 문자열 |  |  |
| votingPower | 숫자 |  |  |
| votingPowerProportion | 숫자 |  |  |

### ValidatorsVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| validators | [ [ValidatorVO](#validatorvo) ] |  |  |

### View

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| contentType | 문자열 |  |  |

### VotingPowerVO

| 이름 | 타입 | 내용 | 예시 |
| ---- | ---- | ----------- | ------- |
| snapshotTime | dateTime |  |  |
| votingPower | 숫자 |  |  |