# Common Issues When Running a Full Node

### How to Monitor Your Full Node Syncing Process?

* You can check the current height of full node by visiting `localhost:26657/status`
* You can check the log info in your log under your $BNCHOME.<br/>
Monitor the output with:
```
tail -f $BNCHOME/bnc.log
```
### Common Issues

If you start running a full node from scratch, you are likely to encounter the following issues:

#### AppHash Confliction

* Error Log
```
panic: Tendermint state.AppHash does not match AppHash after replay. Got XXXXXXX, expected 251DF08F2BA7824F0875D33992CF03EA35106DDD34B3A9FE4EFA0B73CDD2FE14
```
This error is caused by a consensus issue and thus bnbchaind will panic.

* Solution

To solve this issue, make sure that you have downloaded the correct `genesis file`, `config.toml` and `app.toml`.<br/>
If you replaced the genesis file, then you need to do a node reset.<br/>
To reset node:
```
rm $BNCHOME/data

rm $BNCHOME/config/priv_validator_key.json
```
Then, start again.

#### Peer connection error

* Error log:
```
E[2019-04-17|23:52:24.069] Connection failed @ recvRoutine (reading byte) module=p2p peer=[aea74b16d28d06cbfbb1179c177e8cd71315cce4@54.64.99.130:27146](http://aea74b16d28d06cbfbb1179c177e8cd71315cce4@54.64.99.130:27146)conn=MConn{[52.199.237.19:27146](http://52.199.237.19:27146)} err=EOF
E[2019-04-17|23:52:24.070] Stopping peer for error module=p2p peer=&quot;Peer{MConn{[52.199.237.19:27146](http://52.199.237.19:27146)} aea74b16d28d06cbfbb1179c177e8cd71315cce4 out}&quot; err=EOF
```

This error is caused by the handshake failing between two peers.

* Solution

To solve this problem, you need to make sure node_key.json is under `$BNCHOME/config` and nodes will try to re-connect automatically, so this issue should not persist.

#### Connection Timeout

* Error log
```
Dialing failed module=pex addr=2c1fa9c1698961da38d8cd50da9fe8b4bc433c50@34.202.245.91:26856 err=&quot;dial tcp 34.202.245.91:26856: i/o timeout&quot; attempts=3
```

* Solution

Check your internet connection and make sure it is stable.

#### Out of Memory

* Error Log
```
fatal error: out of memory
```

* Solution

Your machine must have more than `8 GB of memory`, otherwise, it will not handle DB restoration during state sync.

#### No priv_validator_state.json After Reset

* Error log
```
open /Users/.bnbchaind/data/priv_validator_state.json: no such file or directory
```
* Solution

Delete both `priv_validator_state.json` & `node_key.json` file and `data` folder if you want to reset your full node.

#### `bnbchaind` Crashes Because of `too many open files`

The default number of files Linux can open (per-process) is `1024`.<br/>
`bnbchaind` is likely to open more than `1024` files.<br/>
This causes the process to crash.<br/>

A quick fix is to run `ulimit -n 65535` (increase the number of open files allowed) and then restart the process with:
```
bnbchaind start
```

Verify the number of open files:
```
ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3829
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 65535
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3829
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```
Please note that open files are different now.


#### Forgot to Upgrade

The Beacon Chain has a hardfork upgrade and if you failed to upgrade your fullnode to the latest version, `bnbchaind` process will stop and even if you restart with the latest version, the following error will appear:
```
panic: Tendermint state.AppHash does not match AppHash after replay. Got , expected 393887B67F69B19CAB5C48FB87B4966018ABA893FB3FFD241C0A94D2C8668DD2
goroutine 1 [running]:
github.com/bnb-chain/node/vendor/github.com/tendermint/tendermint/consensus.checkAppHash(0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, 0x20, ...)
/Users/huangsuyu/go/src/github.com/bnb-chain/node/vendor/github.com/tendermint/tendermint/consensus/replay.go:464 +0x213
github.com/bnb-chain/node/vendor/github.com/tendermint/tendermint/consensus.(*Handshaker).ReplayBlocks(0xc000b37980, 0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, ...)
```

To recover from the `state` conflict error, you need to:

* Backup your home directory,  (default is ~/.bnbchaind)

* Download the tool: [state-recover](https://github.com/bnb-chain/node-binary/tree/master/tools/recover)

* Get the height of upgrade, this height will be announced in the upgrade announcement on the forum.  For example, if it's announced as 5000 in the forum and run the following command will make your full node recover to the last block before the upgrade, and that is 4999 :
```
./state_recover 4999 <your_home_path>
```

* Restart with the latest version of `bnbchaind`

```
bnbchaind start &
```

#### `bnbchaind` is Not Properly Killed

If you started your `bnbchaind` process after it was not properly killed. You will see the following error:
```
panic: ERROR:
Codespace: 5
Code: 9
Message: "Initial ProposalID already set"
```
To recover, please reset your node and restart:
```
bnbchaind unsafe-reset-all --home<your-home-dir>
```

#### Cannot Start `bnbchaind`

If you do not download the binaries completely, you will see the following message:
```
./bnbchaind: line 1: version: command not found ./bnbchaind: line 2: oid: command not found /Library/Developer/CommandLineTools/usr/bin/size: 45160816 No such file or directory
```

Since all the binaries are stored in `git lfs`, you will see this error is the binary is not complete. Please use this [script](https://github.com/bnb-chain/node-binary/blob/master/install.sh) to download the binaries or use `git lfs clone`.

#### Cannot Query a Specific Block

Once you have your own node running, you can start querying from it. But sometimes you may not be ablt to get the information you want. For example:
```
curl 'localhost:27147/block?height=10'
```

The reason is because your node is using `statesync` to catch up. In this way, it will not store all the history blocks before the snapshot height it got. You can only query blocks after that snapshot height.

To enable query history blocks, you need to use `fast-sync`