---
sidebar_label: BSC 스테이킹 매개 변수 FAQs
hide_table_of_contents: true
sidebar_position: 2
---

# BNB 스마트 체인 스테이킹 매개 변수

### 스테이킹 토큰

- **BNB**

### 최대 검증인 계수

- 테스트넷 검증인 : **11**
- 메인넷 검증인 : **21**

### 검증인 후보

#### 메인넷

* **최소 자기 위임 규모 (Self-delegate Amount)**: 메인넷에서 10000BNB.
* **보상 수령 주기 (Claim reward frequency)**: 매일 0:00 UTC
* **본딩 해제 기간 (Unbonding Period)**: 7일

#### 테스트넷

* **최소 자기 위임 규모 (Self-delegate Amount)**: 테스트넷에서 100BNB.
* **보상 수령 주기 (Claim reward frequency)**: 2시간 마다
* **본딩 해제 기간 (Unbonding Period)**: 4시간

### 위임인 (Delegator)

#### 메인넷

* **재위임 주기 (Redelegate frequency)**: 7 days

#### 테스트넷

* **재위임 주기 (Redelegate frequency)**: 4 hours

### 슬래싱

#### 메인넷

* **이중 서명 슬래싱 (Double-Sign Slash)**: 10000BNB
    * **_세부 내용_**: 누구나 BSC에서 발생한 이중 서명의 증거를 BC에 제출할 수 있습니다. 이중 서명은 같은 부모 블록과 같은 높이의 2개의 블록 헤더를 갖는데, 이를 악용하는 검증인이 블록으로 생성했을 때 발생합니다.
* **오프라인 슬래싱 (Offline Slash)**: 50BNB
    * **_세부 내용_**: 검증인이 24시간 사이 50 블록 이상을 놓쳤다면, BC에서 블록 보상을 해당 검증인에게 전달되지 않고 더 나은 검증인들에게 전달합니다. 만일 24시간 내 150블록 이상을 놓쳤다면, BC에 해당 사실이 전달되어 또 다른 슬래싱이 발생합니다.
* **이중 서명 증거 제출 보상 (Rewards for submitting double-sign evidence)**: 1000BNB
* **이중 서명 투옥 기간 (Double-Sign Jail time)**: 2^63-1초
* **오프라인 투옥 기간 (Downtime Jail time)**: 2일
* **자기 위임 부족 투옥 기간 (Too Low self-delegation Jail time)**: 1일

#### 테스트넷

* **이중 서명 슬래싱 (Double-Sign Slash)**: 10000BNB
    * **_세부 내용_**: 누구나 BSC에서 발생한 이중 서명의 증거를 BC에 제출할 수 있습니다. 이중 서명은 같은 부모 블록과 같은 높이의 2개의 블록 헤더를 갖는데, 이를 악용하는 검증인이 블록으로 생성했을 때 발생합니다.
* **오프라인 슬래싱 (Offline Slash)**: 30BNB
    * **_세부 내용_**: 검증인이 24시간 사이 50 블록 이상을 놓쳤다면, BC에서 블록 보상을 해당 검증인에게 전달되지 않고 더 나은 검증인들에게 전달합니다. 만일 24시간 내 150블록 이상을 놓쳤다면, BC에 해당 사실이 전달되어 또 다른 슬래싱이 발생합니다.
* **이중 서명 증거 제출 보상 (Rewards for submitting double-sign evidence)**: 1000BNB
* **이중 서명 투옥 기간 (Double-Sign Jail time)**: 2^63-1초
* **오프라인 투옥 기간 (Downtime Jail time)**: 4시간
* **자기 위임 부족 투옥 기간 (Too Low self-delegation Jail time)**: 4시간


