# 에스크로 계정
순수 코드 제어 에스크로 계정은 비컨 체인 프로토콜에서 하드 코딩된 문자열에서 파생된 계정입니다. 다음과 같은 계정은 자체 개인키가 존재하지 않으며 프로토콜의 코드에 의해 제어됩니다. 에스크로 계정을 연산하기 위한 코드는 코스모스 sdk에서 사용하는 코드와 같습니다.

## 에스크로 계정의 주소

### 거버넌스 모듈
순수 코드 제어 에스크로 계정은 투표 기간에 예치된 금액을 보관하기 위해 생성됩니다.

메인넷 주소: `bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h`

테스트넷 주소: `tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x`
```go
// bnb prefix address: bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h
// tbnb prefix address: tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x
DepositedCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainDepositedCoins")))
```

### 스테이킹 모듈
순수 코드 제어 에스크로 계정은 위임된 금액을 보관하기 위해 생성됩니다.

메인넷 주소: `bnb1j725qk29cv4kwpers4addy9x93ukhw7czfkjaj`

테스트넷 주소: `tbnb1j725qk29cv4kwpers4addy9x93ukhw7cvulkar`
```go
// bnb prefix address: bnb1j725qk29cv4kwpers4addy9x93ukhw7czfkjaj
// tbnb prefix address: tbnb1j725qk29cv4kwpers4addy9x93ukhw7cvulkar
DelegationAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainStakeDelegation")))
```

### 브릿지 모듈
순수 코드 제어 에스크로 계정은 양쪽 체인의 총 공급량을 보존하기 위해 생성됩니다.

메인넷 주소: `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`

테스트넷 주소: `tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr`
```go
// bnb prefix address: bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj
// tbnb prefix address: tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr
PegAccount = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainPegAccount")))
```

### 토큰 모듈
순수 코드 제어 에스크로 계정은 아토믹 스왑을 돕기 위해 생성됩니다.

메인넷 주소: `bnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4f8ge93u`

테스트넷 주소: `tbnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4ffasp3d`
```go
// bnb prefix address: bnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4f8ge93u
// tbnb prefix address: tbnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4ffasp3d
AtomicSwapCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainAtomicSwapCoins")))
```

### 타임 록
또 다른 순수 코드 제어 에스크로 계정은 타임 록을 돕기 위해 생성됩니다.

메인넷 주소: `bnb1hn8ym9xht925jkncjpf7lhjnax6z8nv24fv2yq`

테스트넷 주소: `tbnb1hn8ym9xht925jkncjpf7lhjnax6z8nv2mu9wy3`
```go
// bnb prefix address: bnb1hn8ym9xht925jkncjpf7lhjnax6z8nv24fv2yq
// tbnb prefix address: tbnb1hn8ym9xht925jkncjpf7lhjnax6z8nv2mu9wy3
TimeLockCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainTimeLockCoins")))
```