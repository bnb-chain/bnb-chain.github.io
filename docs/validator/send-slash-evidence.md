---
sidebar_label: Submit Slash Evidence
hide_table_of_contents: false
sidebar_position: 2
---

# How to send BSC Slash Evidence

## Double Sign

To submit BSC slash evidence, download the [bnbcli](https://github.com/bnb-chain/node/releases) binary.

### Command for submitting evidence
```
bnbcli slashing bsc-submit-evidence 
 \--from={Name or address of private key with which to sign}
 \--evidence={Evidence details, including two bsc block headers with json format} 
 \--evidence-file={File of evidence details} 
 \--chain-id={the chain id of BNB Chain}
```
#### Parameters for  slashing bsc-submit-evidence

| **Parameter Name** | **Example**                                                  | **Explanation**                                                 | **Required** |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-Tigris                                          | the chain id of binance  chain                               | Yes          |
| --from             | bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd                   | Name or address of  private key with which to sign           | Yes          |
| --evidence         | [{"difficulty":"0x2","extraData":"0xd98301...},{"difficulty":"0x3","extraData":"0xd64372...}] | Evidence details,  including two bsc block headers with json format | Option       |
| --evidence-file    | /user/evidence.json                                          | File of evidence details,  if evidence-file is not empty, --evidence will be ignored | Option       |


In the above command, \--evidence and \--evidence-file are optional parameters. If \--evidence-file is not empty, \--evidence will be ignored. \--from and \--chain-id are mandatory parameters.

#### Example

```
bnbcli slashing bsc-submit-evidence --from= bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd --chain-id=Binance-Chain-Tigris --home  ~/home_cli
```

#### Example
```bash
bnbcli slashing bsc-submit-evidence --from=bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd --evidence=[{"parentHash":"0x6116de25352c93149542e950162c7305f207bbc17b0eb725136b78c80aed79cc","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x0000000000000000000000000000000000000000","stateRoot":"0xe7cb9d2fd449f7bd11126bff55266e7b74936f2f230e21d44d75c04b7780dfeb","transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x20000","number":"0x1","gasLimit":"0x47e7c4","gasUsed":"0x0","timestamp":"0x5eb2a363","extraData":"0x0000000000000000000000000000000000000000000000000000000000000000a2852203a9da8bb555ec98a78c66365437bb1dde6707a08032e9eb916a8a454e37a1fffeab272bcffc2fc1d82aee6f3124bbdc8ed884efcbadfb6ff862cf4c3801","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0xd977f1acfd035cf717193a9c3a2351cdccdc2ea0719aff871dade0e8daf8069d"},{"parentHash":"0x6116de25352c93149542e950162c7305f207bbc17b0eb725136b78c80aed79cc","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x0000000000000000000000000000000000000000","stateRoot":"0xe7cb9d2fd449f7bd11126bff55266e7b74936f2f230e21d44d75c04b7780dfeb","transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x20000","number":"0x1","gasLimit":"0x47e7c4","gasUsed":"0x64","timestamp":"0x5eb2a363","extraData":"0x00000000000000000000000000000000000000000000000000000000000000005eab7a9bf40635d056ccab45ac0d8b4e99be4b4ed859e4246f651b95c0adaacc050760a0afc2d9383f821baab7f995cde07271f286c4805095b413e7ad69d9f401","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x917c38a507c9807426fc9e3e9e8ded2db07c7f61070bd1c7b57b9df287e8f7b2"}]     --chain-id=test-chain-8d7sJz --home ~/home_cli
```

## Malicious Vote
If you run bsc with flag `monitor.maliciousvote`, evidence will be output into logs when votes violating rules are detected, then the tool `maliciousvote-submit` can be used to submit the evidence.
#### Example
```bash
maliciousvote-submit --chainId 714 --sender 59ba8068eb256d520179e903f43dacf6d8d57d72bd306e1bd603fdb812345678 --node ws://localhost:8545 --evidence "{\"VoteA\":{\"SrcNum\":6948,\"SrcHash\":\"dc58ff5dca8deefb7b03904ef2837e5f8b0e84ec147f021d4ff08343635540d3\",\"TarNum\":6949,\"TarHash\":\"24726f05534dc55c36ecc364951025abada0defa6d1b53bcb6b637f583b59996\",\"Sig\":\"9379a0626f962b828ed21fb34a6b6de034a23651c2e0c12b907293cf8f21d4fdd559e6f9c7f450a4243d33ad7aa5783d0e51e70979631d82819c254dfb130dfe924f057f7e2b4e64195fc7562f1cb0c45486c9cc3e6cc5679b4c0b5744bf33b5\"},\"VoteB\":{\"SrcNum\":6947,\"SrcHash\":\"24726f05534dc55c36ecc364951025abada0defa6d1b53bcb6b637f583b59996\",\"TarNum\":6950,\"TarHash\":\"6257f70ea6439b84d910595064a6e44e55ba0f2abc0c887346c420a60a5ef119\",\"Sig\":\"af9b500877d64277e80eea7c42b8d6ae5744d715625344ef6ddc66fa4e1dcb3e94568c79e018239641b724bacaa93046052d13f87b655d58b7afecf4e31036d5eca911e8c7436deea68c1e64ef7ed527ed25416039e4e7352f9b089cfb86481f\"},\"VoteAddr\":\"98b94137e4e2d4e628dcbc4a05d554f44950a7498040d3276d49c265708229127cd20e48c773cdc7a898b3bb572a17bf\"}"
```