# 석방(Unjail)

악성 행위로 `Jailed`된 검증자 노드들은 초기 검증을 거쳤다는 전제 하에 `side-unjail transactions`을 보내 석방을 요청할 수 있습니다. 석방 후에 검증자 집단에 다시 참여하기 위해서는 다음 번 `UTC 0:00`을 기다려야 합니다. 스마트 컨트랙트 검증자의 `fees to unjail`은 **_1 BNB_**입니다. 반면에 검증자의 비잔틴 행위 증거를 제출하는 비용은 **_10 BNB_**입니다.

## 트랜잭션 검증
*  검증자 주소란은 비어서는 안 됩니다.
*  사이드 체인 ID가 존재합니다.
*  검증자의 자기위임 금액이 존재하며, 이는 최소 자기위임 액수인 **_10,000 BNB_** 이상이어야 합니다.
*  석방을 요청할 시 요청자는 'jailed' 상태에 있습니다.
*  요구되는 투옥 조건을 완료합니다.


## 수수료 테이블

트랜잭션 타입  | BNB 요금 |
-- | -- |
스마트 체인 검증자 석방 | 1 |
스마트 체인 검증자의 비잔틴 동작 증거 제출 | 10 |

## 석방을 위한 명령어

```
bnbcli slashing side-unjail 
\--from= {this address has to be the operator address of the validator to be unjailed.
          Name or address of private key with which to sign}
 \--side-chain-id= {chain-id of the side chain the validator belongs to} 
 \--chain-id= {the chain id of binance chain}
```


| **파라미터 이름** | **예시**                                | **설명**                                                 | **필수 여부** |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX                          | 바이낸스 체인의 체인 ID                               | 필수          |
| --from             | bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd | 석방될 검증자의 운영자 주소. 서명할 개인키의 이름 또는 주소. | 필수          |
| --side-chain-id    | BSC-XXX                                    | 검증자가 속한 사이드 체인의 체인 ID        | 필수          |


### 예시

```
bnbcli slashing side-unjail --from bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home\_cli
```