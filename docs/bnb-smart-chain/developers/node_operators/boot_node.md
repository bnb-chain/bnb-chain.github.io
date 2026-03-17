---
title: Boot Node - BSC Develop
---

Through the maintenance release [v1.2.12 4](https://github.com/bnb-chain/bsc/releases/tag/v1.2.12), Boot Nodes were introduced on the BSC mainnet. BSC Boot Nodes are similar to Ethereum Boot Nodes, refer [here](https://ethereum.org/en/developers/docs/nodes-and-clients/bootnodes/) for more details. The main benefit of Boot Nodes is that it would be easier for user to connect to the BSC network. Users would no longer need to setup the `StaticNodes` in `config.toml`, just leave it empty and make sure delete the `BootstrapNodes` field in `config.toml`. 

## Impact To Users

### Static Nodes Could Be Stopped

Previously, BSC provides a list of `StaticNodes` for users to connect to the network, they are working as a full node and also serving the P2P discovery protocol. New BSC nodes connect to the BSC network through these `StaticNodes`. It works, but is not quite stable, since they could have very heavy workload.

These static nodes could be stopped and replaced by Boot Nodes in the future. And the `StaticNodes` list provided before could no longer be available. Like the list provided in [v1.2.11 5](https://github.com/bnb-chain/bsc/releases/tag/v1.2.11):

```
StaticNodes = [
"enode://bac6a548c7884270d53c3694c93ea43fa87ac1c7219f9f25c9d57f6a2fec9d75441bc4bad1e81d78c049a1c4daf3b1404e2bbb5cd9bf60c0f3a723bbaea110bc@3.255.117.110:30311",
"enode://94e56c84a5a32e2ef744af500d0ddd769c317d3c3dd42d50f5ea95f5f3718a5f81bc5ce32a7a3ea127bc0f10d3f88f4526a67f5b06c1d85f9cdfc6eb46b2b375@3.255.231.219:30311",
"enode://5d54b9a5af87c3963cc619fe4ddd2ed7687e98363bfd1854f243b71a2225d33b9c9290e047d738e0c7795b4bc78073f0eb4d9f80f572764e970e23d02b3c2b1f@34.245.16.210:30311",
"enode://41d57b0f00d83016e1bb4eccff0f3034aa49345301b7be96c6bb23a0a852b9b87b9ed11827c188ad409019fb0e578917d722f318665f198340b8a15ae8beff36@34.245.72.231:30311",
"enode://1bb269476f62e99d17da561b1a6b0d0269b10afee029e1e9fdee9ac6a0e342ae562dfa8578d783109b80c0f100a19e03b057f37b2aff22d8a0aceb62020018fe@3.254.51.234:30311",
"enode://16c7e98f78017dafeaa4129647d1ec66b32ee9be5ec753708820b7363091ceb310f575e7abd9603005e0e34d7b3316c1a4b6c8c42d7f074ed2eb4d073f800a03@54.89.153.195:30311",
"enode://ba88d1a8a5e849bec0eb7df9eabf059f8edeae9a9eb1dcf51b7768276d78b10d4ceecf0cde2ef191ced02f66346d96a36ca9da7d73542757d9677af8da3bad3f@35.153.161.166:30311",
"enode://accbc0a5af0af03e1ec3b5e80544bdceea48011a6928cd82d2c1a9c38b65fd48ec970ba17bd8c0b0ec21a28faec9efe1d1ce55134784b9207146e2f62d8932ba@35.173.132.72:30311"
]
```

### To Join The Network With BootNodes

* If you are using BSC release before `v1.2.12`, you can also try BootNodes without upgrading to `v1.2.12`, you can just set up the `BootstrapNodes` field in your `config.toml` and restart. The six `BootstrapNodes` items listed below can be used directly, they are the current default `BootstrapNodes` in `v1.2.12`:

```
...
[Node.P2P]
MaxPeers = 200
NoDiscovery = false
BootstrapNodes = [
"enode://433c8bfdf53a3e2268ccb1b829e47f629793291cbddf0c76ae626da802f90532251fc558e2e0d10d6725e759088439bf1cd4714716b03a259a35d4b2e4acfa7f@52.69.102.73:30311",
"enode://571bee8fb902a625942f10a770ccf727ae2ba1bab2a2b64e121594a99c9437317f6166a395670a00b7d93647eacafe598b6bbcef15b40b6d1a10243865a3e80f@35.73.84.120:30311",
"enode://fac42fb0ba082b7d1eebded216db42161163d42e4f52c9e47716946d64468a62da4ba0b1cac0df5e8bf1e5284861d757339751c33d51dfef318be5168803d0b5@18.203.152.54:30311",
"enode://3063d1c9e1b824cfbb7c7b6abafa34faec6bb4e7e06941d218d760acdd7963b274278c5c3e63914bd6d1b58504c59ec5522c56f883baceb8538674b92da48a96@34.250.32.100:30311",
"enode://ad78c64a4ade83692488aa42e4c94084516e555d3f340d9802c2bf106a3df8868bc46eae083d2de4018f40e8d9a9952c32a0943cd68855a9bc9fd07aac982a6d@34.204.214.24:30311",
"enode://5db798deb67df75d073f8e2953dad283148133acb520625ea804c9c4ad09a35f13592a762d8f89056248f3889f6dcc33490c145774ea4ff2966982294909b37a@107.20.191.97:30311"
]
StaticNodes = []
ListenAddr = ":30311"
...

```

* If you are using BSC release `v1.2.12` or later, you no longer need to setup the `BootstrapNodes ` field, but you can not just leave it empty, make sure you delete it from `config.toml`. It would be preferred to delete it and use the default value in case there could be any update to the boot node list in the future. The `config.toml` would look like as follow:

```
...
[Node.P2P]
MaxPeers = 200
NoDiscovery = false
StaticNodes = []
ListenAddr = ":30311"
..
```

### To Run A Boot Node

Boot nodes are super-lightweight nodes, they can be ran by a very cheap device, like: `2 cores, 2GB memory, 20GB disk`. \
If you want to support the BSC ecosystem by providing new boot nodes, you can follow [this](https://github.com/bnb-chain/bsc#running-a-bootnode) guide to do it.

## Help

Since boot nodes have been introduced recently, if you get any problem in using it, please let us know. You may just create new issue in [BSC GitHub repo](https://github.com/bnb-chain/bsc/issues).
