---
title: SP Compiling and Dependencies - BNB Greenfield SP
---

## Compile SP

Compilation dependencies:

- [Golang](https://go.dev): SP is written in Golang, you need to install it. Golang version requires `1.20+`.
- [Buf](https://buf.build): A new way of working with Protocol Buffers. SP uses Buf to manage proto files.
- [protoc-gen-gocosmos](https://github.com/cosmos/gogoproto): Protocol Buffers for Go with Gadgets. SP uses this protobuf compiler to generate pb.go files.
- [mockgen](https://github.com/uber-go/mock): A mocking framework for the Go programming language that is used in unit test.
- [jq](https://stedolan.github.io/jq/): Command-line JSON processor. Users should install jq according to your operating system.

```shell
# clone source code
git clone https://github.com/bnb-chain/greenfield-storage-provider.git

cd greenfield-storage-provider/

# install dependent tools: buf, protoc-gen-gocosmos and mockgen
make install-tools

# compile sp
make build

# move to build directory
cd build

# execute gnfd-sp binary file
./gnfd-sp version

# show the gnfd-sp version information
Greenfield Storage Provider
    __                                                       _     __
    _____/ /_____  _________ _____ ____     ____  _________ _   __(_)___/ /__  _____
    / ___/ __/ __ \/ ___/ __  / __  / _ \   / __ \/ ___/ __ \ | / / / __  / _ \/ ___/
    (__  ) /_/ /_/ / /  / /_/ / /_/ /  __/  / /_/ / /  / /_/ / |/ / / /_/ /  __/ /
    /____/\__/\____/_/   \__,_/\__, /\___/  / .___/_/   \____/|___/_/\__,_/\___/_/
    /____/       /_/

Version : v1.0.0
Branch  : master
Commit  : 7e1f56809c5385bf1ea6f41d318ab1419dcb0f86
Build   : go1.20.3 darwin arm64 2023-10-08 10:31

# show the gnfd-sp help info
./gnfd-sp -h
```

### Note

If you've already executed `make install-tools` command in your shell, but you failed to make build and encountered one of the following error messages:

```shell
# error message 1
buf: command not found
# you can execute the following command, assumed that you installed golang in /usr/local/go/bin. Other OS are similar.
GO111MODULE=on GOBIN=/usr/local/go/bin go install github.com/bufbuild/buf/cmd/buf@v1.25.0

# error message 2
Failure: plugin gocosmos: could not find protoc plugin for name gocosmos - please make sure protoc-gen-gocosmos is installed and present on your $PATH
# you can execute the fowllowing command, assumed that you installed golang in /usr/local/go/bin. Other OS are similar.
GO111MODULE=on GOBIN=/usr/local/go/bin go install github.com/cosmos/gogoproto/protoc-gen-gocosmos@latest

# if you want to execute unit test of sp, you should execute the following command, assumed that you installed golang in /usr/local/go/bin. Other OS are similar.
GO111MODULE=on GOBIN=/usr/local/go/bin go install go.uber.org/mock/mockgen@latest
```

Above error messages are due to users don't set go env correctly. More info users can search `GOROOT`, `GOPATH` and `GOBIN`.

## SP Dependencies

If a user wants to start SP in local mode or testnet mode, you must prepare `SPDB`, `BSDB` and `PieceStore` dependencies.

### SPDB and BSDB

SP uses [SPDB](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/spdb.md) and [BSDB](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/bsdb.md) to store some metadata such as object info, object integrity hash, etc. These two DBs now use `RDBMS` to complete corresponding function.

Users now can use `MySQL` or `MariaDB` to store metadata.The following lists the supported RDBMS:

1. [MySQL](https://www.mysql.com/)
2. [MariaDB](https://mariadb.org/)

More types of database such as `PostgreSQL` or NewSQL will be supported in the future.

### PieceStore

Greenfield is a decentralized data storage system which uses object storage as the main data storage system. SP encapsulates data storage as [PieceStore](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/piece-store.md) which provides common interfaces to be compatible with multiple data storage systems. Therefore, if a user wants to join SP or test the function of SP, you must use a data storage system.

The following lists the supported data storage systems:

1. [AWS S3](https://aws.amazon.com/s3/): An object storage can be used in production environment.
2. [Aliyun OSS](https://www.alibabacloud.com/en/product/object-storage-service): Fully managed object storage service to store and access any amount of data from anywhere.
3. [B2](https://www.backblaze.com/cloud-storage): Backblaze B2 provides unlimited data storage in the cloud at 1/5th the cost of Amazon S3.
4. [MinIO](https://min.io/): An object storage can be used in production environment which is compatible with AWS S3.
5. [POSIX Filesystem](https://en.wikipedia.org/wiki/POSIX): Local filesystem is used for experiencing the basic features of SP and understanding how SP works. The piece data created by SP cannot be got within the network and can only be used on a single machine.

Detailed info about `PieceStore`, you can refer this [doc](piece-store.md).

### Install Dependencies

#### Install MySQL in CentOS

1. Install MySQL yum package

```shell
# 1. Download MySQL yum package
wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm

# 2. Install MySQL source
rpm -Uvh mysql57-community-release-el7-10.noarch.rpm

# 3. Install public key
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 4. Install MySQL server
yum install -y mysql-community-server

# 5. Start MySQL
systemctl start mysqld.service

# 6. Check whether the startup is successful
systemctl status mysqld.service

# 7. Get temporary password
grep 'temporary password' /var/log/mysqld.log 

# 8. Login MySQL through temporary password
# After you log in with the temporary password, do not perform any other operations. Otherwise, an error will occur. In this case, you need to change the password
mysql -uroot -p

# 9. change MySQL password rules
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'yourpassword';
```
