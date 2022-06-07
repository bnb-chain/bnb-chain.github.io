# User Guide of Threshold Signature Scheme (TSS) in Beacon Chain 

## Introduction

**Threshold Signature Scheme (TSS)** is a cryptographic protocol for distributed key generation and signing. TSS allows constructing a signature that is distributed among different parties (for example three users), and each user receives a share of the private signing key. To sign a transaction, at least two of these three users need to join. For individuals, threshold signatures allow for two-factor security or splitting the ability to sign between two devices so that a single compromised device won’t put the money at risk. For businesses, threshold signatures allow for the realization of access control policies that prevent both insiders and outsiders from stealing corporate funds. TSS technology allows us to replace all signing commands with distributed computations.The private key is no longer a single point of failure.

## Motivation
A physical key must fit exactly into a keyhole to unlock a physical vault. But if this key is compromised or lost, the funds locked in the vault may no longer be safe. This simple approach of key management may make sense when a small sum is at stake. However, when the amount stored in the vault is large, it is wise to consider spreading the responsibility of key ownership between several trusted parties.

Traditional **MultiSig (multi-signature)** is a more refined unlocking system that requires *multiple* independent keys to unlock the vault. MultiSig requires generating a larger private key and the vault has multiple locks - one for each key . More processing power is needed as participants have to sign additional signatures, which must then be checked individually by the network. This is not ideal, because a participant must leave traces showing exactly who signed and multiple parties must be online at the same time.

With **Threshold Signatures**, all of the parties must forge the vault’s lock together, in a modular way, where each party owns a share of the key. A TSS vault is indistinguishable from a regular vault and is hence universal, and it has the same privacy and verification cost of a regular vault. Even if only a subset of the keys is available, the vault may still be unlocked (this is known as meeting a threshold of participation).

Combining TSS feature  with Beacon Chain  client will help users manage their funds in a much safer way. TSS will be offered in an independent binary, but it will have some impact on the existing functions of *bnbcli/tbnbcli*.

## Implementation

Many development resources have been poured into implementing TSS, a cryptographic protocol for distributed key generation and signing. TSS is now compatible and reusable for ECDSA-based blockchains, including Beacon Chain , Bitcoin, and Ethereum networks. We expect that members of the Binance ecosystem and partner community can integrate this TSS library with their applications, such as wallets and custodians, and further develop this exciting new technology.

With the support of the Beacon Chain  community, we are happy to share the open-source code at https://github.com/bnb-chain/tss-lib.

## Security Audit


The implementation of a multi-party threshold ECDSA [library](https://github.com/bnb-chain/tss-lib) is open source so it can be publicly audited by anyone. An independent third party auditors from [Kudelski Security](https://www.kudelskisecurity.com/)  are hired to validate the security of the cryptography in TSS solution. The latest report in October by can be found [here](./assets/audit-binance-tss-lib-final.pdf).

Security checks are routinely and continuously planned for all parts of TSS lib implementations and future audits  will be reported to Beacon Chain  community.

## Workflow
Let’s take a look at the major steps in TSS:

* **Vault Initialization**: the first step is for setting up tss parameters of each party. This will initialize the node's p2p listen address and setup a directory to save key. It's recommended that you should save your tss key in a different folder other than normal key info.

* **Key Generation**: the second step is also the most complex. We need to define the quorum policy: count of total parties (n) that holds secret shares and threshold (t) which means at least t + 1 parties need to take part in the signing process. We need to generate a key which will be public and used to verify future signatures. However, we also have to generate an individual secret for each party, which is called a secret share. The functions guarantee the same public key to all parties and a different secret share for each. In this way, we achieve: (1) privacy: no secret shares data is leaked between any parties, and (2) correctness: the public key is intact with secret share. They need to agree on the channel which they want to use for sending messages between each other. The channel will have its corresponding password. Both ID and password needs to be shared offline.

* **Signing**: this step involves a signature generation function. The input of each party will be its own secret share, created as output of the distributed key generation in the previous step. There is also public input known to all, which is the message to be signed. The output will be a digital signature, and the property of privacy ensures that no leakage of secret shares occurred during the computation.

* **Verification**: the verification algorithm remains as it is in the classical setting. To be compatible with single key signatures, Beacon Chain  validator nodes can be able to verify the signature with the public key. The transaction will be no different from others.

* **Vault Regroup**:  Regroup will reset secret share and configs between all parties.It's recommend to switch the configuration periodically, say once a month. If some party lost his key, it's also necessory to reset the distribution once some party lost their key. Regroup will generate new_n secret share with new_t threshold. At least old_t + 1 should participant


##  Where can I download the Binance TSS CLI?

You can download tss client and Beacon Chain  Commandline here:

* Mainnet: <https://github.com/bnb-chain/node-binary/tree/master/cli/prod/0.6.2-TSS-0.1.2>

* Testnet: <https://github.com/bnb-chain/node-binary/tree/master/cli/testnet/0.6.2-TSS-0.1.2>

## How to Use
* **Warning**: Please test your TSS setup before use this on mainnet.

> Please backup your bnbcli home before use this tool:

```
cp -r ~/.bnbcli ~/.bnbcli_backup_tss (replace ~/.bnbcli with their bnbcli home)
```
Please refer to this [Example](#example) to help you understand the whole process

### Init

`tss init` will create home directory of a new tss setup, generate p2p key pair.

* Here are the global transaction flags:

| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
| vault_name | string | name of the vault of this party                              |                                                   |
| password   | string | the password of the vault                                    | must be 32 bytes or more, the default value is 48 |
| home       | string | Path to config/route_table/node_key/tss_key files, configs in config file can be overridden by command line argument | the default value is "~/.tss"                     |

* Here are the flags for `tss init`:

| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
|kdf.iterations	|uint32	| The number of iterations (or passes) over the memory.|	the default value is 13|
|kdf.key_length|	uint32|	 Length of the generated key (or password hash)	"must be 32 bytes or more, |the default value is 48"|
|kdf.memory	|uint32|	The amount of memory used by the algorithm (in kibibytes) 	|the default value is 65536|
|kdf.parallelism	|uint8	|The number of threads (or lanes) used by the algorithm.|	the default value is 4|
|kdf.salt_length	|uint32|	Length of the random salt. 16 bytes is recommended for password hashing.	|the default value is 16|
|moniker	|string	|moniker of current party	||
|p2p.listen	|string	 |Adds a multiaddress to the listen list	||


### Describe

`tss describe` will show config and address of a tss vault

* Here are the flags for `tss describe`:


| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
|address_prefix|string |bech32 prefix of address (default "bnb")||

* Example
```
./tss describe

> please set vault of this party:
[input vault name]
> Password to sign with this vault:
[input password]
address of this vault: bnb1
config of this vault:
{
        "p2p": {
                "listen": "/ip4/0.0.0.0/tcp/59968",
                "bootstraps": null,
                "relays": null,
                "peer_addrs": [
                        "/ip4/127.0.0.1/tcp/59748",
                        "/ip4/127.0.0.1/tcp/60022"
                ],
                "peers": [
                        "test3",
                        "test2"
                ],
                "DefaultBootstap": false
        },
        "Id": "",
        "Moniker": "tss1",
        "vault_name": "vault1",
        "Threshold": 1,
        "Parties": 3,
        "log_level": "info",
        "profile_addr": "",
        "Home": "~/.tss"
}
```

### Channel

`tss channel` will generate a channel ID for bootstrapping. One party can generate a channel, then share the generated channel ID with others offline.

* Here are the flags for `tss channel`:

| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
|channel_expire|int|expire time in minutes of this channel|Default value is 30mins|

It's advised to refresh the channels regularly.

### Keygen

This command will generate the private key and share the secret. Everyone needs to agree on the password of this private key. The password length must be larger than **eight**.

Note: you need to make sure that all the parties are online.

* Here are the flags for `tss keygen`:

| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
|address_prefix|string|prefix of bech32 address|the default value is `bnb`|
|channel_id|string|channel id for this session||
|channel_password|string|password to this channel|This password has to be set offline. And its length should be more than **eight**.|
|p2p.peer_addrs|[]sting|peer's multiplex addresses||
|parties|int|total parities of this scheme||
|threshold|int|threshold of this scheme, at least threshold + 1 parties need participant signing||


if you want to add the generated key files in the bnbcli home, you can copy it to the home folder:
```
bnbcli keys add --tss -t tss --tss-home ~/.test1 --tss-vault third test1_third
```

### Regroup
This command will generate new_n secret from the same private key, and it will be shared with new_t threshold. At least old_t + 1 should participante in signing

* Here are the flags for `tss regroup`:

| Name       | Type   | Description                                                  | Note                                              |
| ---------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- |
|channel_password|string|channel password of this session||
|channel_id|string|channel id of this session||
|is_old|string|whether this party is old committee. If it is set to true, it will participant signing in regroup. There should be only t+1 parties set this to true for one regroup||
|is_new_member|string|whether this party is new committee, for new party it will changed to true automatically. if an old party set this to true, its share will be replaced by one generated one||
|new_parties|int|new total parties of regrouped scheme||
|new_threshold|int|new threshold of regrouped scheme||
|p2p.new_peer_addrs|[]sting|unknown peer's multiple addresses||
|parties|int|total parities of this scheme||
|threshold|int|threshold of this scheme, at least threshold + 1 parties  need participant signing||


## Changes to `bnbcli/tbnbcli`
We added a new key type “tss” (just like the existing types: “local”, “offline”, “ledger”) to bnbcli which stands for tss secret share.

To add a tss key into bnbcli’s keystore:
1. Tss keygen command will automatically add generated secret share into default keystore (~/.bnbcli) with name `tss_<moniker>_<vault_name>`
2. User can manually specify tss’s home, vault_name and a customized bnbcli home like:
```
bnbcli keys add --home ~/.customized_cli --tss -t tss --tss-home ~/.test1 --tss-vault “default” my_name
```
All other commands (i.e. send token, place order, delete key etc.) of bnbcli should support tss type key.

## Example

In this example, A, B and C are the parties who decided to share a private key together. They decided that any two of them can sign a transaction. To complete a TSS signing process, they need to follow the following steps:

### Step 1: Init TSS

During this step, all parties from different machines have to initialite their P2P settings before generate the shared key.


|                            | A                                                            | B                                                            | C                                                            |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| command                    | ./tss init                                                   | ./tss init                                                   | ./tss init                                                   |
| Interactive input          | > please set moniker of this party: <br/> tss1<br/>> please set vault of this party:<br/>vault1<br/>> please set password of thisvault:<br/>[input password]<br/>> please input again:<br/>[input password] | > please set moniker of this party: <br/>tss2<br/>> please set vault of this party:<br/>vault1<br/>> please set password of this vault:<br/>[input password]<br/>>please input again:<br/>[input password] | > please set moniker of this party:<br/>tss3<br/>> please set vault of this party:vault1<br/>> please set password of this vault:<br/>[input password]<br/>> please input again:<br/>[input password] |
| output                     | Local party has been initialized under: <br/>~/.tss/vault1   | Local party has been initialized under: <br/>~/.tss/vault1   | Local party has been initialized under: <br/>~/.tss/vault1   |
| Files touched or generated | ~/.tss/vault1/config.json      <br/>  ~/.tss/vault1/node_key | ~/.tss/vault1/config.json <br/>  ~/.tss/vault1/node_key      | ~/.tss/vault1/config.json <br/>   ~/.tss/vault1/node_key     |


### Step 2: Generate Channel ID for bootstraping

In this step, the parties will create a secrect communication channel between them. One of then will generate the channel ID and share with others. In this example, A will generate the channel ID. B and C will not have to do anything. A can also specify the length for this channel session and the default time is 30 mins.

|                   | A                                                            | B    | C    |
| ----------------- | ------------------------------------------------------------ | ---- | ---- |
| command           | ./tss channel                                                | N/A  | N/A  |
| Interactive input | > please set expire time in minutes, (default: 30):<br/>[input time] | N/A  | N/A  |
| output            | channel id: **5185D3EF597**                                  | N/A  | N/A  |


### Step 3: Generate and Share Secret

In this step, the private key will be generated and shared between these three parties. All the parties have to be online at the sme time.

|                            | A                                                            | B                                                            | C                                                            |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| command                    | ./tss keygen --vault_name vault1                             | ./tss keygen --vault_name vault1                             | ./tss keygen --vault_name vault1                             |
| Interactive input          | > Password to sign with this vault:<br/>[enter password]<br/>> please set total parties(n): <br/>3<br/>> please set threshold(t), at least t + 1 parties  need participant signing: <br/>1<br/>> please set channel id of this session<br/>[enter ID]<br/>> please input password (AGREED offline with peers) of this session:<br/>[enter password]<br/>> please input password of this tss vault: <br/>[enter password] | >please input> Password to sign with this vault:<br/>[enter password]<br/>> please set total parties(n): <br/>3<br/>> please set threshold(t), at least t + 1 parties need participant signing: <br/>1<br/>> please set channel id of this session<br/>[enter ID]<br/>>please input password (AGREED offline with peers) of this session: <br/>[enter password]<br/>>please input password of this tss vault:<br/> [enter password] | > Password to sign with this vault:<br/>[enter password]<br/>> please set total parties(n):<br/> 3<br/>> please set threshold(t), at least t + 1 parties need participant signing: <br/>1<br/>> please set channel id of this session<br/>3085D3EC76D<br/>> please input password (AGREED offline with peers) of this session: [enter password]<br/>Password of this tss vault:<br/> [enter password] |
| output                     | 18:00:09.777  INFO    tss-lib: party {0,tss1}: keygen finished! party.go:11318:00:09.777  INFO        tss: [tss1] received save data client.go:30418:00:09.777  INFO        tss: [tss1] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp client.go:309Password of this tss vault:NAME:   TYPE:   ADDRESS:                                                PUBKEY:tss_tss1_vault1        tss     tbnb19277gzv934ayctxeg5k9zdwnx3j48u6tydjv9p     bnbp1addwnpepqwazk6d3f6e3f5rjev6z0ufqxk8znq8z89ax2tgnwmzreaq8nu7sx2u4jcc | 18:00:09.777  INFO
: party {1,tss2}: keygen finished! party.go:11318:00:09.777  INFO        tss: [tss2] received save data client.go:30418:00:09.777  INFO        tss: [tss2] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp client.go:309Password of this tss vault:NAME:   TYPE:   ADDRESS:                                                PUBKEY:tss_tss2_vault1       tss     tbnb19277gzv934ayctxeg5k9zdwnx3j48u6tydjv9p     bnbp1addwnpepqwazk6d3f6e3f5rjev6z0ufqxk8znq8z89ax2tgnwmzreaq8nu7sx2u4jcc | 18:00:09.773  INFO    tss-lib: party {2,tss3}: keygen finished! party.go:11318:00:09.773  INFO        tss: [tss3] received save data client.go:30418:00:09.773  INFO        tss: [tss3] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp client.go:309Password of this tss vault:NAME:   TYPE:   ADDRESS:                                                PUBKEY:tss_tss3_vault1        tss     tbnb19277gzv934ayctxeg5k9zdwnx3j48u6tydjv9p     bnbp1addwnpepqwazk6d3f6e3f5rjev6z0ufqxk8znq8z89ax2tgnwmzreaq8nu7sx2u4jcc |
| Files touched or generated | ~/.tss/vault1/pk.json <br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/config.json | ~/.tss/vault1/pk.json<br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/config.json | ~/.tss/vault1/pk.json<br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/config.json |

### Step 4: Sign Transaction

In this steo, A and B decided to sign a transaction together. Both A and B will try to broadcast the transaction and only one of them will succeed.

|                            | A                                                            | B                                                            | C    |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| command                    | tbnbcli send --amount 1000000:BNB --to tbnb1mh3w2kxmdmnvctt7t5nu7hhz9jnp422edqdw2d --from tss_tss1_vault1 --chain-id Binance-Chain-Ganges --node https://data-seed-pre-0-s1.binance.org:443 --trust-node | tbnbcli send --amount 1000000:BNB --to tbnb1mh3w2kxmdmnvctt7t5nu7hhz9jnp422edqdw2d --from tss_tss2_vault1 --chain-id Binance-Chain-Ganges --node https://data-seed-pre-0-s1.binance.org:443 --trust-node | NA   |
| Interactive input          | Password to sign with tss_tss1_vault1:<br/>[Enter password]<br/>> Channel id:<br/>5185D3EF597<br/>please input password (AGREED offline with peers) of this session: <br/>[Enter password] | Password to sign with tss_tss2_vault1:<br/>[Enter password]<br/>> Channel id:<br/>5185D3EF597<br/>please input password (AGREED offline with peers) of this session: <br/>[Enter password] | N/A  |
| output                     | Committed at block 33600477 (tx hash: 4FB8096A93D545612A3B5DCE520622608C299C7742103A6BE34C444829BD83A5 | ERROR: broadcast_tx_commit: Response error: RPC error -32603 - Internal error: Error on broadcastTxCommit: Tx already exists in cache | N/A  |
| Files touched or generated | N/A                                                          | N/A                                                          | N/A  |



### Step 5: Regroup Vault

First, please generate a new channel for messaging:

|                   | A                                                            | B    | C    |
| ----------------- | ------------------------------------------------------------ | ---- | ---- |
| command           | ./tss channel                                                | N/A  | N/A  |
| Interactive input | > please set expire time in minutes, (default: 30):<br/>[input time] | N/A  | N/A  |
| output            | channel id: **3415D3FBE00**                                  | N/A  | N/A  |

Then, we can switch to the new channel for sending messages to each others.



|                            | A                                                            | B                                                            | C                                                            |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| command                    | ./tss regroup                                                | ./tss regroup                                                | ./tss regroup                                                |
| Interactive input          | > please set vault of this party:<br/>vault1<br/>> Password to sign with this vault:<br/>Password to sign with tss_tss1_vault1:<br/>[Enter password]<br/>> Participant as an old committee? [Y/n]:<br/>Y<br/>> Participant as a new committee? [Y/n]:<br/>Y<br/>> please set new total parties(n): <br/>3<br/>> please set new threshold(t), at least t + 1 parties   participant signing: <br/>1<br/>> Channel id:<br/>3415D3FBE00<br/>please input password (AGREED offline with peers) of this session: <br/>Password to sign with tss_tss1_vault1:<br/>[Enter password] | > please set vault of this party:<br/>vault1<br/>> Password to sign with this vault:<br/>Password to sign with tss_tss1_vault1:<br/>[Enter password]<br/>> Participant as an old committee? [Y/n]:<br/>Y<br/>> Participant as a new committee? [Y/n]:<br/>Y<br/>> please set new total parties(n): <br/>3<br/>> please set new threshold(t), at least t + 1 parties   participant signing: <br/>1<br/>> Channel id:<br/>3415D3FBE00<br/>please input password (AGREED offline with peers) of this session: <br/>Password to sign with tss_tss1_vault1:<br/>[Enter password] | > please set vault of this party:<br/>vault1<br/>> Password to sign with this vault:<br/>Password to sign with tss_tss1_vault1:<br/>[Enter password]<br/>> Participant as an old committee? [Y/n]:<br/>Y<br/>> Participant as a new committee? [Y/n]:<br/>Y<br/>> please set new total parties(n): <br/>3<br/>> please set new threshold(t), at least t + 1 parties   participant signing: <br/>1<br/>> Channel id:<br/>3415D3FBE00<br/>please input password (AGREED offline with peers) of this session: <br/>Password to sign with tss_tss1_vault1:<br/>[Enter password] |
| output                     | INFO        tss: [tss1] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp | INFO        tss: [tss1] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp | INFO        tss: [tss1] bech32 address is: tbnb1mcn0tl9rtf03ke7g2a6nedqtrd470e8l8035jp |
| Files touched or generated | ~/.tss/vault1/config.json<br/> ~/.tss/vault1/pk.json<br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/node_key | ~/.tss/vault1/config.json<br/> ~/.tss/vault1/pk.json<br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/node_key | ~/.tss/vault1/config.json<br/> ~/.tss/vault1/pk.json<br/> ~/.tss/vault1/sk.json<br/> ~/.tss/vault1/node_key |

* New committee having different t-n from old committee
1. Change 1-3 into 2-4 scheme.
2. old parties (A, B) join new committee
3. new parties (D, E) are newly-joined

|         | D                               | E                               |
| ------- | ------------------------------- | ------------------------------- |
| command | ./tss init  --vault_name vault1 | ./tss init  --vault_name vault1 |
|Interactive input|> please set moniker of this party:<br/> tss4<br/>> please set password for key share:<br/>[Enter password]<br/>> please intput again: <br/>[Enter password]|> please set moniker of this party:<br/> tss4<br/>> please set password for key share:<br/>[Enter password]<br/>> please intput again:<br/>[Enter password]|
|output|Local party has been initialized under: ~/.tss/vault1|Local party has been initialized under: ~/.tss/vault1|

* Regroup from 1-3 to 2-4, with 2 old parties (A and B) and 2 new parties (D and E)

|                            | A (old&new committee)                                        | B (old&new committee)                                        | D (new committee)                                            | E (new committee)                                            |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| command                    | ./tss regroup/ --vault_name vault1                           | ./tss regroup  --vault_name vault1                           | ./tss regroup  --vault_name vault1                           | ./tss regroup  --vault_name vault1                           |
| Interactive input          | > please input password:<br/> [Enter password] <br/>> Participant as an old committee? [Y/n]: <br/>Y<br/> > Participant as a new committee? [Y/n]: <br/>Y <br/>> please set NEW total parties(n):<br/> 4<br/> > please set NEW threshold(t), at least t + 1 parties   participant signing: <br/>2 <br/>> Channel id:<br/> 3415D3FBE00<br/> > please input password (AGREED offline with peers) of this session: <br/>[Enter password] | > please input password: <br/>[Enter password]<br/> > Participant as an old committee? [Y/n]:<br/> Y <br/>> Participant as a new committee? [Y/n]:<br/> Y <br/>> please set NEW total parties(n):<br/> 4<br/> > please set NEW threshold(t), at least t + 1 parties need participant signing:<br/> 2 <br/>> Channel id: 3415D3FBE00 <br/>> please input password (AGREED offline with peers) of this session: <br/>[Enter password] | > please input password: <br/>[Enter password] <br/>> please set Old total parties(n): <br/>3 <br/>> please set Old threshold(t), at least t + 1 parties need participant signing: <br/>1 <br/>> please set NEW total parties(n): <br/>4 <br/>> please set NEW threshold(t), at least t + 1 parties need participant signing: <br/>2<br/> > Channel id: <br/>3415D3FBE00 <br/>> please input password (AGREED offline with peers) of this session: <br/>[Enter password] | > please input password:<br/>[Enter password] <br/>> please set Old total parties(n): <br/>3 <br/>> please set Old threshold(t), at least t + 1 parties need participant signing: <br/>1 <br/>> please set NEW total parties(n): <br/>4<br/> > please set NEW threshold(t), at least t + 1 parties need participant signing: <br/>2<br/> > Channel id: <br/>3415D3FBE00<br/> > please input password (AGREED offline with peers) of this session: <br/>[Enter password] |
| output                     |                                                              |                                                              |                                                              |                                                              |
| Files touched or generated | ~/.tss/vault1/config.json<br/>  ~/.tss/vault1/pk.json <br/> ~/.tss/vault1/sk.json | ~/.tss/vault1/config.json<br/>  ~/.tss/vault1/pk.json <br/> ~/.tss/vault1/sk.json | ~/.tss/vault1/config.json<br/>  ~/.tss/vault1/pk.json <br/> ~/.tss/vault1/sk.json | ~/.tss/payment/config.json<br/>  ~/.tss/payment/pk.json <br/> ~/.tss/vault1/sk.json |
