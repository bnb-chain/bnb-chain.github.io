---
title: Run BSC Nodes using Docker - BSC Develop
---

# How to Run A Fullnode Using BSC Docker Image

## Resources
* Docker image: https://github.com/bnb-chain/bsc/pkgs/container/bsc
* Dockerfile: https://github.com/bnb-chain/bsc/blob/master/Dockerfile

## Supported Platforms

We support running a BSC docker image on **Mac OS X**, **Linux**, and **Windows**.

## Steps to Run a Fullnode in Docker

### Install Docker
* Desktop Users: https://docs.docker.com/get-docker/
* Ubuntu Linux: https://docs.docker.com/engine/install/ubuntu/

#### Post install:

Start docker during boot up:
```
systemctl enable docker.service
systemctl enable containerd.service
```
Add user "ubuntu" to group docker so the user has privileges to run docker commands:
```
usermod -aG docker ubuntu
```

### Pull BSC Node Image

* Get latest version: https://github.com/bnb-chain/bsc/pkgs/container/bsc
```
docker pull ghcr.io/bnb-chain/bsc:latest
```

### Download BSC Node Config Files

Download **genesis.json** and **config.toml** by:

Mainnet
```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```
Testnet
```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

### Running Docker Container
1. Dockers Variables and Config file Location

Important **Environment Variables** to note: 
```
$BSC_HOME = /bsc
$DATA_DIR = /data
```
File location:

* BSC_CONFIG=${BSC_HOME}/config/config.toml
* BSC_GENESIS=${BSC_HOME}/config/genesis.json

2. Docker Volumes to Mount

Essentially we need to bind mount two directories: 

|    Mount        | Local  | Docker                     |
| ----------------- | ------------- | -------------------------------------- |
| Blockchain data | data/node | /bsc/node    |
| Config files | config  | /bsc/config  |

3. Download data on local host
Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

4. Start container

You can also use *ETHEREUM OPTIONS* to overwrite settings in the configuration file:
```
docker run -v $(pwd)/config:/bsc/config -v $(pwd)/data/node:/bsc/node -p 8575:8575 --rm --name bsc -it ghcr.io/bnb-chain/bsc:1.1.18_hr --http.addr 0.0.0.0 --http.port 8575 --http.vhosts '*' --verbosity 5
```
* *-p 8575:8575*: This will map port 8575 from host to container, so it exposes 8575 on host node.
* *--http --http.addr 0.0.0.0*: Extra Geth flags to enable RPC and listen on all network interfaces of the container.

**NOTE**: port **8575** is the default port for the RPC service on TESTNET. If you are using mainnet the default port is **8545**.

5. Start Geth console
```
geth attach http://localhost:8575
```
### How to access the container

Execute bash (shell/terminal) on the container named bsc:

```
docker exec -it bsc bash
```
Once logged in you can perform regular tasks you would do on a node without docker.

### How to Check Node Running Status

#### Check Synchronization

Start Geth Console:
```
geth attach ipc:node/geth.ipc
```
Once started, run:
```
>eth.syncing
```
#### Check Geth Logs
```
tail -f node/bsc.log
```
