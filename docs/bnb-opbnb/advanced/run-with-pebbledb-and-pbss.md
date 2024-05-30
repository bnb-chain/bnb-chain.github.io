# How to Run op-geth with PBSS and PebbleDB

To start op-geth with PBSS and PebbleDB, include the following flags:

```bash
--state.scheme path --db.engine pebble
```

!!!info
    We recommend using version v0.3.1-alpha or later to activate this feature.

Upon successful startup, the logs will confirm the initiation of PBSS and PebbleDB:

```bash
INFO [03-21|07:00:25.684] Using pebble as the backing database
INFO [03-21|07:00:47.039] State scheme set by user                 scheme=path
```

## PBSS (Path-Based Scheme Storage)

PBSS stores trie nodes on disk using the encoded path and a specific key prefix as the key. This approach allows PBSS's
Merkle Patricia Trie (MPT) to overwrite older data due to the shared key between the account trie and storage trie. This
feature not only enables **online pruning** but also significantly **reduces data redundancy**.

PBSS architecture comprises 128 difflayers (in memory) and one disk layer, as depicted below. Difflayers store only the
state data changes.

```plaintext
+-------------------------------------------+
| Block X+128 State                         |
+-------------------------------------------+
| Block X+127 State                         |
+-------------------------------------------+
|              .......                      |
+-------------------------------------------+
| Block X+1 State, Bottom-most diff layer   |
+-------------------------------------------+
| Block X State, Disk layer (singleton trie)|
+-------------------------------------------+
```

**PBSS offers superior read performance**, with faster trie access and iteration. It maintains a single version of the
state trie on disk and keeps new tries (changes to the state/storage/account trie) only in memory.

### Restrictions

* **Supports queries for only the last 129 blocks' state data**

  RPC requests requiring data beyond this range will return an error: `missing trie node ${hash} (path ${path})`.
  Only RPC methods that need to query trie data, such as `eth_getProof`, will be impacted by this limitation, while
  others will remain unaffected.

* **The withdrawal function of opBNB might not be supported**

  This function might require querying state data from an hour earlier to obtain a withdrawal proof, which is not
  supported yet. Future versions will address this limitation.

## PebbleDB

PebbleDB, now the default database for the community, has been integrated into go-ethereum. It replaces LevelDB, which
lacks a throttle mechanism for flushes and compactions, leading to latency spikes during intense read and write
operations.

Conversely, PebbleDB features separate rate limiters for flushes and compactions, conducting operations as needed and 
**reducing unnecessary disk bandwidth consumption**.

## FAQ

### Can I change the `state.scheme` or `db.engine` for an existing node?

No, you cannot change the `state.scheme` or `db.engine` for an existing node. You must start a new node with the desired
configuration.
