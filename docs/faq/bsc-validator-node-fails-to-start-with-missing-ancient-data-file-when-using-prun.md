---
title: "BSC validator node fails to start with \"Missing ancient data file\" when using pruned PBSS snapshot - BSC FAQs"
---

### BSC validator node fails to start with "Missing ancient data file" when using pruned PBSS snapshot

## Issue
When starting a BSC node (such as a validator) after extracting a pruned PBSS (Path-Based Storage Scheme) snapshot, the process fails with an error indicating a missing ancient data file or an inability to locate the freezer directory.

## Solution
This issue typically occurs because the node cannot find the ancient block data or because the directory structure of the extracted snapshot does not match Geth's default expectations.

### 1. Download All Required Files
Pruned PBSS snapshots often come in multiple parts. Ensure you have downloaded both the main snapshot and the corresponding `pruneancient` file. If using the official `fetch-snapshot.sh` script, ensure it has completed successfully for all components.

### 2. Explicitly Specify the Ancient Directory
Use the `--datadir.ancient` flag to point Geth directly to the ancient data location. Note that newer versions of BSC Geth often expect a `chain` sub-directory within the `ancient` folder.

**Example Startup Configuration:**
```bash
geth --config ./config.toml \
  --datadir ./node \
  --datadir.ancient ./node/geth/chaindata/ancient/chain \
  --pruneancient=true \
  --history.blocks 600000 \
  ...
```
*Note: If your extracted `ancient` folder does not contain a `chain` sub-folder (i.e., data files are directly inside `ancient/`), point the path to `.../ancient`.*

### 3. Required Parameters for Pruned Snapshots
When using pruned snapshots, the following flags are critical:
- `--pruneancient=true`: Enables the use of pruned ancient data.
- `--history.blocks 600000`: For validators, it is recommended to retain approximately 3 days of block history (600,000 blocks) to ensure stability and avoid missing blocks during minor network fluctuations or switches.

### 4. Verify Directory Structure
Ensure that the path provided to `--datadir.ancient` contains the actual freezer data files. If the node fails to find them, verify that the extraction process completed without errors and that the files are not located in a different subdirectory.

---

Applies to: BSC Geth v1.7.2+
