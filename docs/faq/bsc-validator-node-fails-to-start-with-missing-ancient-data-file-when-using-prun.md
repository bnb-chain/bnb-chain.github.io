---
title: "BSC validator node fails to start with \"Missing ancient data file\" when using pruned PBSS snapshot - BSC FAQs"
---

### BSC validator node fails to start with "Missing ancient data file" when using pruned PBSS snapshot

## Issue
When starting a BSC node (such as a validator) after extracting a pruned PBSS (Path-Based Storage Scheme) snapshot, the process fails with an error indicating a missing ancient data file or an inability to locate the freezer directory.

## Solution
This issue typically occurs because the node cannot find the ancient block data or because the directory structure of the extracted snapshot does not match Geth's default expectations.

### 1. Download All Required Files
Choose either the Full Snapshot or the Pruned Snapshot for the required network and supported client version. They are alternative snapshot sets; do not combine the full set with the `-pruneancient` set. Download and extract every required part of the chosen set.

Use the latest official `fetch-snapshot.sh` script and verify the checksums. To select a pruned snapshot, use `-p` with the base snapshot name; do not also append `-pruneancient` to that name. Extract into the node datadir with `-E` so the data is placed under `<datadir>/geth/chaindata/`.

### 2. Explicitly Specify the Ancient Directory
Use the `--datadir.ancient` flag to point Geth directly to the ancient data location. Note that newer versions of BSC Geth often expect a `chain` sub-directory within the `ancient` folder.

**Example Startup Configuration:**
```bash
geth --config ./config.toml \
  --datadir ./node \
  --datadir.ancient ./node/geth/chaindata/ancient/chain \
  --syncmode=full \
  --history.transactions=600000 \
  --history.blocks=600000 \
  --history.logs=600000 \
  --tries-verify-mode=local
# Add your existing network, validator, and other node-specific options.
```
*Note: If your extracted `ancient` folder does not contain a `chain` sub-folder (i.e., data files are directly inside `ancient/`), point the path to `.../ancient`.*

### 3. Required Parameters for Pruned Snapshots
The current official snapshot guide uses `--history.blocks` for block-history retention, together with the transaction/log history and local verification settings shown above. The old `--pruneancient` flag is deprecated and is not required to use these snapshots.

`600000` is a block count, not a fixed duration; the time covered depends on the block interval. Keep the other options required for your node role and consult the guide for the selected snapshot and client version.

### 4. Verify Directory Structure
Ensure that the path provided to `--datadir.ancient` contains the actual freezer data files. If the node fails to find them, verify that the extraction process completed without errors and that the files are not located in a different subdirectory.

## Reference
[Official BSC snapshots: download, extraction, and pruned-snapshot startup settings](https://github.com/bnb-chain/bsc-snapshots#starting-from-a-pruned-snapshot)

---

Applies to: BSC Geth v1.7.2+
