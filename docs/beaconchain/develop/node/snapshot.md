# Chain Data Snapshots

A snapshot is a recording of the state of Beacon Chain  at a particular block height.

Latest snapshot of April 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210401.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1643611407&Signature=DNHRq9emOD%2FwBLmBSCU9aHt3ENI%3D)

Size: 588 GB

sha1sum: 397796fe4886a59601f6aa21fcca44b852c057bb

Latest snapshot of March 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210311.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641887091&Signature=djEqBjOX08KjyTexn3BDnELWxeQ%3D)

Size: 565 GB

sha1sum: 0caf6f8df5c9106a8195e29c97feb34ac9498bb9

Latest snapshot of February 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20210204.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1639896473&Signature=2ec7eJtgNH%2BlzidAz3hQi4Z6mP8%3D)

Size: 528 GB

sha256sum: b859f90fd487be0ec9d5d50e6641af659fd199c94ad536eeeeb084d50c32f3a6

Latest snapshot of December 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20201214.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1634008451&Signature=KDW0zfRhaku57b2EL1ojJw%2B6amQ%3D)

Size: 478 GB

sha256sum: 04fc2f6c0dd0e9958d4b4c30cab0fd6eab18e20b612ec018d1917a87994e6732

Latest snapshot of November 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20201102.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1630378354&Signature=j%2BEK4kNBGEzv8PrrG6GeJ3kkKUY%3D)

Size: 444 GB

sha256sum: e1687272467355bee1034b7ab23a6f6ca2249441a6a300e10026a214fc925f57

Latest snapshot of Sep 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200909.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1625569110&Signature=%2BotMZCFW7bRSaK4DdRW6Qe3a4bw%3D)

Size: 409 GB

sha256sum: 194cbad7e1adcaafc16df94576f0a3b4a26245e4019cef93c51a3183bef71d73

Latest snapshot of July 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200717.tgz?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1621148533&Signature=BQCDLF9UwALesZwGiW6mCfK5Kiw%3D)

Size: 353 GB

Snapshot of June 1st: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_back_20200601.zip?AWSAccessKeyId=AKIAYINE6SBQLLLS7OXI&Signature=BQlfX3ATfs%2Fj55qwi5q75feqga4%3D&Expires=1617016400)

Size: 309 GB

sha256sum: c6ba5edbf1b424696eec670f4dad864e09ebbae46c3c127360e1d1f15e27d4df)

This snapshot can be used for jumpstarting a newly setup fullnode to avoid waiting a long time for getting all blocks. In Beacon Chain , the average block time is less than a second. As a result, it will take several weeks to sync from genesis block.


!!! Note
	Ensure there is enough disk space for both the tar file AND its uncompressed contents. Double the space or more.


1. Download Archive
```

nohup curl -s https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/data_20200909.tgz\?AWSAccessKeyId=\AKIAYINE6SBQPUZDDRRO\&Expires=\1625569110\&Signature=\%2BotMZCFW7bRSaK4DdRW6Qe3a4bw%3D > data_20200909.tgz &

```

2. Extract File to replace the contents under data folder of home directory
```
tar -xzf data_20200909.tgz -d $HOME/data
```

3. Start your node
```
bnbchaind start
```
