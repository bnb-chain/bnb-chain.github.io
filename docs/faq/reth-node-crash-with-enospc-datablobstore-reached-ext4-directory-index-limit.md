---
title: "Reth node crash with ENOSPC: /data/blobstore reached ext4 directory-index limit - BSC FAQs"
---

### Reth node crash with ENOSPC: /data/blobstore reached ext4 directory-index limit

### Problem
A Reth-BSC node can report `ENOSPC` (No space left on device) while writing to `/data/blobstore`, even when the filesystem still has free disk space. An ext4 directory-size or directory-index limit is one possible cause; confirm it from the node and kernel logs before choosing a workaround.

### Checks and next steps
1. Check free disk space and inodes on the filesystem containing the blobstore, for example with `df -h /data/blobstore` and `df -i /data/blobstore`. Review kernel logs for an ext4 directory-limit error.
2. If an ext4 directory limit is confirmed, follow a filesystem- and client-version-specific remediation plan. Increasing `ulimit -n` or `fs.file-max` does not increase the ext4 directory limit.
3. File-descriptor exhaustion is a separate problem, normally reported as `EMFILE` or `ENFILE`. Investigate process and system open-file limits only when the logs indicate that problem.
4. Do not delete blobstore files indiscriminately. Confirm the client version, required blob retention and a supported cleanup or migration procedure with the client maintainers before changing stored data. A node restart alone does not establish that the underlying limit has been resolved.

### References
- [Linux ext4 documentation](https://www.kernel.org/doc/html/latest/admin-guide/ext4.html)
- [Linux open(2) error definitions](https://man7.org/linux/man-pages/man2/open.2.html)

---

Applies to: Reth-BSC deployments using an ext4 blobstore
