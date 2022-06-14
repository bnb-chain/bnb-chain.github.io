
## Introduction

BNB Chain CLI has a sub-command named `keys` to manage private keys.<br/>
It is a key store to manage keys for users.

You can add a new key or import a key from seed.<br/>
Then you can list the keys added and show the detailed info of a specific key.<br/>
You can also delete the given key or update the password used to protect private key.<br/>

BNB Chain CLI use the keys you add to sign transactions for you.<br/>
For example, if you want to transfer tokens to someone else, you just need to specify the name of
the key you want to use, and input the password of the key, then BNB Chain CLI will sign the
transaction for you if the password is right.

## Usage

The usage is the same for `bnbcli` and `tbnbcli`

```bash
$ ./bnbcli keys
Keys allows you to manage your local keystore for tendermint.

  These keys may be in any format supported by go-crypto and can be
  used by light-clients, full nodes, or any other application that
  needs to sign with a private key.

Usage:
  bnbcli keys [command]

Available Commands:
  mnemonic    Compute the bip39 mnemonic for some input entropy
  add         Create a new key, or import from seed
  list        List all keys
  show        Show key info for the given name

  delete      Delete the given key
  update      Change the password used to protect private key

Flags:
  -h, --help   help for keys

Global Flags:
  -e, --encoding string   Binary encoding (hex|b64|btc) (default "hex")
      --home string       directory for config and data (default "/Users/yourname/.bnbcli")
  -o, --output string     Output format (text|json) (default "text")
      --trace             print out full stack trace on errors

Use "bnbcli keys [command] --help" for more information about a command.
```

### mnemonic

`mnemonic` is used to generate bip39 mnemonic.<br/>
You can restore key from the mnemonic generated.

```bash
$ ./bnbcli keys mnemonic
uncle mule squirrel cover theory oven rookie dry intact alert right afraid differ ability mule struggle spray usual must purity social ball flat short
```

### add

You can use `add` to create a new key or import from seed (mnemonic).<br/>
You have to specify the name for the key you want to create.

To import with a mnemonic phrase, you need to include the `--recover` flag in the command.

#### create a new key

```bash
$ ./bnbcli keys add testkey
Enter a passphrase for your key:
Repeat the passphrase:
NAME:	TYPE:	ADDRESS: PUBKEY:
testkey	local	bnc1e8zhj9wmgq4pwzrv264gfru2fk8x2hdvpclx3n	bncp1addwnpepqffepxlkrka9n33vyzmjwkpy05gpm46cn5de3x9v0vqswk7st5lkc7alhjv
**Important** write this seed phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

poverty joke nominee enough harsh elder flush noodle gift one limit tree sponsor sun radio above acid air winter inflict profit there brand water
```

#### import from seed

```bash
$ ./bnbcli keys add testkey --recover
Enter a passphrase for your key:
Repeat the passphrase:
> Enter your recovery seed phrase:
poverty joke nominee enough harsh elder flush noodle gift one limit tree sponsor sun radio above acid air winter inflict profit there brand water
NAME:	TYPE:	ADDRESS:	PUBKEY:
testkey	local	bnc1e8zhj9wmgq4pwzrv264gfru2fk8x2hdvpclx3n	bncp1addwnpepqffepxlkrka9n33vyzmjwkpy05gpm46cn5de3x9v0vqswk7st5lkc7alhjv
```

### list

`list` can list all the keys you have.

```bash
$ ./bnbcli keys list
NAME:	TYPE:	ADDRESS:	PUBKEY:
test	local	bnc16jv838jw8zcgucvrhreen73adwgnue6ujcz2cf	bncp1addwnpepqgxacvpgnvss94zs363lheuh2xldj0hvymftuds8d69u5cau5kz3y23rj6l
testkey	local	bnc1e8zhj9wmgq4pwzrv264gfru2fk8x2hdvpclx3n	bncp1addwnpepqffepxlkrka9n33vyzmjwkpy05gpm46cn5de3x9v0vqswk7st5lkc7alhjv
```

### show

`show` is used to show the detail of the key by the name.

```bash
$ ./bnbcli keys show testkey
NAME:	TYPE:	ADDRESS:	PUBKEY:
testkey	local	bnc1e8zhj9wmgq4pwzrv264gfru2fk8x2hdvpclx3n	bncp1addwnpepqffepxlkrka9n33vyzmjwkpy05gpm46cn5de3x9v0vqswk7st5lkc7alhjv
```

### delete

`delete` is used to delete the key.

```bash
$ ./bnbcli keys delete testkey
DANGER - enter password to permanently delete key:
Password deleted forever (uh oh!)
```

### update

`update` is used to update the password that is currently used to protect the private key.

```bash
$ ./bnbcli keys update test
Enter the current passphrase:
Enter the new passphrase:
Repeat the new passphrase:
Password successfully updated!
```
