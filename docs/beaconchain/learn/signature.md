# Signatures

Signature is the evidence to prove the sender owns the transaction. It will be created from the actions outlined below:

1. Compose a data structure. please note `msgs`, `memo`, `source`, `data` are the same as in the above `payload`.

    - `chain_id`: a string, unique ID for the Chain, it stays the same for most time, but may vary as Beacon Chain  evolves;
    - `account_number`: a string for a 64-bit integer, an identifier number associated with the signing address
    - `sequence`: a string for a a 64-bit integer, please check [accounts](accounts.md)
    - `memo`: a string, a short sentence of remark for the transaction
    - `msgs`: a byte array, **json encoded** transaction messages, please check the [encoding](encoding/encoding.md) doc.
    - `source`: a string for a 64 bits integer, which is an identifier for transaction incoming tools
    - `data`: byte array, reserved for future use

 Here is an example in [go-sdk](https://github.com/bnb-chain/go-sdk/blob/master/types/tx/stdsign.go#L22):
 ```golang
 // StdSignMsg def
type StdSignMsg struct {
	ChainID       string    `json:"chain_id"`
	AccountNumber int64     `json:"account_number"`
	Sequence      int64     `json:"sequence"`
	Msgs          []msg.Msg `json:"msgs"`
	Memo          string    `json:"memo"`
	Source        int64     `json:"source"`
	Data          []byte    `json:"data"`
}
 ```

2. Encode the above data structure in json, with ordered key, Specifically:

    - Maps have their keys sorted lexicographically
    - Structs keys are marshalled in the order defined in the struct


3. Sign SHA256 of the encoded byte array, to create an ECDSA signature on curve Secp256k1 and serialize the `R` and `S` result into a 64-byte array. (both `R` and `S` are encoded into 32-byte big endian integers, and then `R` is put into the first 32 bytes and `S` are put into the last 32 bytes of the byte array. In order to break `S` 's malleability, `S` set to `curve.Order() - S` if `S > curnve.Order()/2`.)

The `signature` will be encoded together with transaction message and sent as `payload` to Beacon Chain  node via RPC or http REST API, as described in the above section.
