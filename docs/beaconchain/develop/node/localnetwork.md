# 로컬 테스트넷 실행하기

## 로컬 테스트넷 개별 노드

다음 가이드는 로컬 네트워크에서 테스트 및 개발용 개별 검증인 노드를 생성하는 법을 다룹니다.

### 요구 사항
* [bnbchaind](./install.md)를 설치하세요

### 제네시스 파일 생성 및 네트워크 시작
```
# 다음 명령어를 홈 디렉토리에서 실행할 수 있습니다
cd $HOME
```

1.  네트워크를 구축하는데 필요한 config.toml 파일을 초기화합니다
```
bnbchaind init --home /Users/huangsuyu/Documents/work/localnet --moniker test
```
2. 네트워크를 구축하는데 필요한 제네시스 파일을 초기화합니다
```
bnbchaind testnet --v 1 --chain-id local-testnet
```
3. $home/config에 genesis.json 및 다른 파일들을 복사합니다
```
cp ./mynetwork/config/genesis $home/config
```
4. app.toml를 수정하여 업그레이드 높이를 설정합니다
```
FixSignBytesOverflowHeight = 1
```
5. 노드를 시작합니다
```
# 이제 안전하게 `bnbchaind`를 실행할 수 있습니다
bnbchaind start --home $home
```