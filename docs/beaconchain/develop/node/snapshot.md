# 체인 데이터 스냅샷

스냅샷은 특정 블록 높이에서의 비컨 체인 상태를 기록한 것입니다.

4월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210401.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1643611407&Signature=DNHRq9emOD%2FwBLmBSCU9aHt3ENI%3D)

크기: 588 GB

sha1sum: 397796fe4886a59601f6aa21fcca44b852c057bb

3월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210311.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641887091&Signature=djEqBjOX08KjyTexn3BDnELWxeQ%3D)

크기: 565 GB

sha1sum: 0caf6f8df5c9106a8195e29c97feb34ac9498bb9

2월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210204.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1639896473&Signature=2ec7eJtgNH%2BlzidAz3hQi4Z6mP8%3D)

크기: 528 GB

sha256sum: b859f90fd487be0ec9d5d50e6641af659fd199c94ad536eeeeb084d50c32f3a6

12월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20201214.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1634008451&Signature=KDW0zfRhaku57b2EL1ojJw%2B6amQ%3D)

크기: 478 GB

sha256sum: 04fc2f6c0dd0e9958d4b4c30cab0fd6eab18e20b612ec018d1917a87994e6732

11월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20201102.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1630378354&Signature=j%2BEK4kNBGEzv8PrrG6GeJ3kkKUY%3D)

크기: 444 GB

sha256sum: e1687272467355bee1034b7ab23a6f6ca2249441a6a300e10026a214fc925f57

9월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200909.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1625569110&Signature=%2BotMZCFW7bRSaK4DdRW6Qe3a4bw%3D)

크기: 409 GB

sha256sum: 194cbad7e1adcaafc16df94576f0a3b4a26245e4019cef93c51a3183bef71d73

7월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200717.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1621148533&Signature=BQCDLF9UwALesZwGiW6mCfK5Kiw%3D)

크기: 353 GB

6월 1일 최신 스냅샷: [다운로드](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_back_20200601.zip?AWSAccessKeyId=AKIAYINE6SBQLLLS7OXI&Signature=BQlfX3ATfs%2Fj55qwi5q75feqga4%3D&Expires=1617016400)

크기: 309 GB

sha256sum: c6ba5edbf1b424696eec670f4dad864e09ebbae46c3c127360e1d1f15e27d4df)

다음 스냅샷을 통해 새롭게 설정된 풀 노드들이 모든 블록을 불러오지 않고 바로 시작할 수 있습니다.비컨 체인에서는 평균 블록 생성 시간이 1초보다 짧기 때문에, 제네시스 블록부터 현재까지 동기화 하려면 몇 주가 걸릴 수도 있습니다.


!!! 참고
	파일 및 압축 해제될 파일에 대해 저장 공간이 충분한 지 확인하세요. 두배 혹은 그 이상의 공간이 남아 있어야 합니다.


1. 아카이브 다운로드
```

nohup curl -s https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200909.tgz\?AWSAccessKeyId=\AKIAYINE6SBQPUZDDRRO\&Expires=\1625569110\&Signature=\%2BotMZCFW7bRSaK4DdRW6Qe3a4bw%3D > data_20200909.tgz &

```

2.  추출해서 홈 디랙토리의 아래 데이터 폴더의 내용을 덮어 씌웁니다
```
tar -xzf data_20200909.tgz -d $HOME/data
```

3. 노드 시작
```
bnbchaind start
```
