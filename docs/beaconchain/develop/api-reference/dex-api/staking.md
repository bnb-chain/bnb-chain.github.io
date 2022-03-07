---
sidebar_label: Staking
hide_table_of_contents: true
sidebar_position: 2
---
# Staking API

**Version:** 1.0

**Terms of service:**

* Base URL: api.binance.org/


**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

### /v1/staking/accounts/{address}/balance
---
##### ***GET***
**Summary:** getBalance

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | address | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BalanceVo](#balancevo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/allowed-dst-validators
---
##### ***GET***
**Summary:** getAllowedDstValidators

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |
| src-validator | query | src-validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [AllowedDstValidatorsVO](#alloweddstvalidatorsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/delegations
---
##### ***GET***
**Summary:** getDelegationsValByDelegator

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [DelegationValsVO](#delegationvalsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/operations
---
##### ***GET***
**Summary:** getOperationsByDelegator

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OperationsVO](#operationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/reds
---
##### ***GET***
**Summary:** getDelREDs

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| isCompleted | query | isCompleted | No | integer |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [RedsVO](#redsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/rewards
---
##### ***GET***
**Summary:** getDelRewards

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| endTime | query | endTime | No | long |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |
| startTime | query | startTime | No | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [RewardsDetailVO](#rewardsdetailvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/delegators/{delegator}/ubds
---
##### ***GET***
**Summary:** getDelUBDs

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| delegator | path | delegator | Yes | string |
| isCompleted | query | isCompleted | No | integer |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |
| validator | query | validator | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [UbdsVO](#ubdsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/next-reward-time
---
##### ***GET***
**Summary:** getNextRewardTime

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/summary
---
##### ***GET***
**Summary:** getSum

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [StakingSumVO](#stakingsumvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators
---
##### ***GET***
**Summary:** getValidators

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| consensus-address | query | consensus-address | No | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ValidatorsVO](#validatorsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}
---
##### ***GET***
**Summary:** getValidator

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| validator | path | validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ValidatorDetailVO](#validatordetailvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/delegations
---
##### ***GET***
**Summary:** getDelegationsByValidator

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |
| validator | path | validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [DelegationsVO](#delegationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/operations
---
##### ***GET***
**Summary:** getOperationsByValidator

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| limit | query | limit | Yes | integer |
| offset | query | offset | Yes | integer |
| validator | path | validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OperationsVO](#operationsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/powers
---
##### ***GET***
**Summary:** getVotingPower

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| endTime | query | endTime | Yes | long |
| startTime | query | startTime | Yes | long |
| validator | path | validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [VotingPowerVO](#votingpowervo) ] |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /v1/staking/chains/{chain-id}/validators/{validator}/rewards
---
##### ***GET***
**Summary:** getValRewards

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chain-id | path | chain-id | Yes | string |
| endTime | query | endTime | Yes | long |
| startTime | query | startTime | Yes | long |
| validator | path | validator | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [RewardVO](#rewardvo) ] |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### Models
---

### AllowedDstValidatorsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| earliestCompleteTime | dateTime |  |  |
| total | long |  |  |
| validators | [ [ValidatorVO](#validatorvo) ] |  |  |

### BalanceVo

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asset | string |  |  |
| delegated | number |  |  |
| unbonding | number |  |  |

### DelegationVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| delegator | string |  |  |
| initialTime | dateTime |  |  |
| validator | string |  |  |

### DelegationValVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| delegator | string |  |  |
| initialTime | dateTime |  |  |
| validator | string |  |  |
| validatorName | string |  |  |
| validatorStatus | integer | 0: active 1: inactive 2: inJail |  |

### DelegationValsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| delegations | [ [DelegationValVO](#delegationvalvo) ] |  |  |
| total | long |  |  |

### DelegationsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| delegations | [ [DelegationVO](#delegationvo) ] |  |  |
| total | long |  |  |

### Link

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| href | string |  |  |
| templated | boolean |  |  |

### Map«string,Link»

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| Map«string,Link» | object |  |  |

### ModelAndView

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| empty | boolean |  |  |
| model | object |  |  |
| modelMap | object |  |  |
| reference | boolean |  |  |
| status | string |  |  |
| view | [View](#view) |  |  |
| viewName | string |  |  |

### OperationVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| delegator | string |  |  |
| operationType | integer | 0: delegate; 1: undelegate; 2: redelegate |  |
| srcValidator | string |  |  |
| time | dateTime |  |  |
| txHash | string |  |  |
| valName | string |  |  |
| validator | string |  |  |

### OperationsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| operations | [ [OperationVO](#operationvo) ] |  |  |
| total | long |  |  |

### RedVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| balance | number |  |  |
| completeHeight | long |  |  |
| completeTime | dateTime |  |  |
| creationHeight | long |  |  |
| delegator | string |  |  |
| denom | string |  |  |
| dstShares | long |  |  |
| dstValidator | string |  |  |
| initialBalance | number |  |  |
| srcShares | long |  |  |
| srcValidator | string |  |  |

### RedsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| redelegations | [ [RedVO](#redvo) ] |  |  |
| total | long |  |  |

### RewardDetailVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| chainId | string |  |  |
| delegator | string |  |  |
| height | long |  |  |
| reward | number |  |  |
| rewardTime | dateTime |  |  |
| valName | string |  |  |
| validator | string |  |  |

### RewardVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| chainId | string |  |  |
| commission | number |  |  |
| height | long |  |  |
| rewardTime | dateTime |  |  |
| selfDelegator | string |  |  |
| totalReward | number |  |  |
| valTokens | number |  |  |
| validator | string |  |  |

### RewardWithDistributionAddrVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| chainId | string |  |  |
| commission | number |  |  |
| distributionAddr | string |  |  |
| height | long |  |  |
| rewardTime | dateTime |  |  |
| selfDelegator | string |  |  |
| totalReward | number |  |  |
| valTokens | number |  |  |
| validator | string |  |  |

### RewardsDetailVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| rewardDetails | [ [RewardDetailVO](#rewarddetailvo) ] |  |  |
| total | long |  |  |

### RewardsWithDistributionAddrVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| rewards | [ [RewardWithDistributionAddrVO](#rewardwithdistributionaddrvo) ] |  |  |
| total | long |  |  |

### StakingSumVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| reward | number |  |  |
| votingPower | number |  |  |

### UbdVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| balance | number |  |  |
| completeHeight | long |  |  |
| completeTime | dateTime |  |  |
| creationHeight | long |  |  |
| delegator | string |  |  |
| denom | string |  |  |
| initialBalance | number |  |  |
| validator | string |  |  |

### UbdsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| unbondingDelegations | [ [UbdVO](#ubdvo) ] |  |  |

### ValidatorDetailVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| apr | number |  |  |
| commissionMaxChangeRate | number |  |  |
| commissionMaxRate | number |  |  |
| commissionRate | number |  |  |
| detail | string |  |  |
| distributionAddr | string |  |  |
| identity | string |  |  |
| selfDelegator | string |  |  |
| selfStake | number |  |  |
| sideConsAddr | string |  |  |
| sideFeeAddr | string |  |  |
| status | integer |  |  |
| valName | string |  |  |
| validator | string |  |  |
| votingPower | number |  |  |
| votingPowerProportion | number |  |  |
| website | string |  |  |

### ValidatorVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| apr | number |  |  |
| commissionRate | number |  |  |
| status | integer |  |  |
| valName | string |  |  |
| validator | string |  |  |
| votingPower | number |  |  |
| votingPowerProportion | number |  |  |

### ValidatorsVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| validators | [ [ValidatorVO](#validatorvo) ] |  |  |

### View

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| contentType | string |  |  |

### VotingPowerVO

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| snapshotTime | dateTime |  |  |
| votingPower | number |  |  |