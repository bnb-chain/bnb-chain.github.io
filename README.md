# Welcome to BNB Chain Knowledge Base

This is the BNB Chain Knowledge Base documentation for BNB Chain developers. It is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Prerequisites

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Or install packages individually:

* `pip install mkdocs-material` – MkDocs Material theme.
* `pip install mkdocs-video` – MkDocs video plugin.
* `pip install mkdocs-redirects` – MkDocs redirects plugin.

## Commands

* `mkdocs new [dir-name]` – Create a new project.
* `mkdocs serve` – Start the live-reloading docs server.
* `mkdocs build` – Build the documentation site.
* `mkdocs -h` – Print help message and exit.

## Project Layout

    mkdocs.yml        # The configuration file.
    requirements.txt  # Pinned Python dependencies.
    docs/
        index.md      # The documentation homepage.
        ...           # Other markdown pages, images and other files.

## CI / CD

Documentation is automatically built and deployed via [GitHub Actions](.github/workflows/deploy-mkdocs.yml) on every push to `main`.  
Pull requests against `main` trigger a build-only check (no deployment).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit changes.

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability disclosure policy.

## 📜 License

Copyright (c) 2024 BNB Chain

