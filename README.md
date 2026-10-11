# Welcome to BNB Chain Knowledge Base

<!-- Deployment timestamp: 2026-08-13T17:33:46+08:00 -->

This is the BNB Chain Knowledge Base documentation for the BNB Chain developers. It is based on the Mkdocs Material theme. 

## Prerequisite  

* `pip install mkdocs-material` - install mkdocs-material.
* `pip install mkdocs-video` - install mkdocs-video.
* `pip install mkdocs-redirects` - install mkdocs-redirects plugin.
* `pip install mkdocs-git-revision-date-localized-plugin mkdocs-awesome-pages-plugin==2.10.1` - install metadata and navigation plugins.
* `pip install markdownify==1.2.3` - install the Markdown export dependency.
* `pip install mkdocs-awesome-pages-plugin==2.10.1` - install mkdocs-awesome-pages plugin.

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

## 📜 License

Copyright (c) 2024 BNB Chain 


## Markdown access for agents

`mkdocs build` exports each page as Markdown alongside its HTML, using the rendered
content body so code blocks, tables, and all tab panels are included. For example,
`/bnb-smart-chain/overview/` is available at `/bnb-smart-chain/overview.md`.
The homepage is `/index.md`; directory index pages also support `/topic/index.md`.
Links and image URLs are absolute so exports remain usable outside their original page.
Each export points to `/llms.txt`. Run `python -m unittest discover -s tests -v`
to check the export behavior.

GitHub Pages serves these static files but cannot negotiate Markdown responses using
the `Accept` header. That requires a separate HTTP routing layer.

The same build generates `llms.txt`, `llms-full.txt`, and the BSC-only
`llms-full-bnb-smart-chain.txt` from every published page, including pages outside
the navigation. Do not edit generated snapshots. The index uses Markdown links
and stays below 50,000 characters. Full snapshots use absolute links and omit
front matter, navigation, and theme scripts.

## Agent discovery

The build publishes `agent-resources/SKILL.md` at `/skill.md`, `/SKILL.md`,
and the conventional skills discovery paths under `/.well-known/`. Edit the source
file to update these copies; the discovery index includes its SHA-256 digest.
`/.well-known/mcp` and `/.well-known/mcp.json` point to the existing public, read-only
Ask AI MCP endpoint. The local blockchain MCP is described separately in the skill.
HTML pages advertise the index and Markdown alternate before the site navigation.
Merge the Markdown-export PR before deploying these alternate links.
