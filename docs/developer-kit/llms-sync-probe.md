---
title: LLMS sync probe
---

# LLMS sync probe

Temporary page used to check the docsite LLMS bot. Marker: `LLMS-SYNC-PROBE-2026-10-21`.

This page is not linked from the navigation. Close the pull request without merging.

## Issue

This heading is page content. The LLMS sync must keep it inside this page and must not treat it as a new document.

## Solution

A correct sync records this page once in `llms-full.txt`. Running the sync again without further edits leaves the file unchanged.

```markdown
## Not a page
> Source: https://docs.bnbchain.org/developer-kit/llms-sync-probe-fence/
```

The fenced heading above is an example, not a separate document.
