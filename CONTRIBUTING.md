# Contributing to BNB Chain Documentation

Thank you for contributing to the BNB Chain Knowledge Base! This guide explains how to get started and submit changes.

## Prerequisites

- Python 3.8+
- `pip install -r requirements.txt`

## Getting Started

```bash
# Clone the repository
git clone https://github.com/bnb-chain/bnb-chain.github.io.git
cd bnb-chain.github.io

# Install dependencies
pip install -r requirements.txt

# Start the live-reloading dev server
mkdocs serve
```

Open [http://localhost:8000](http://localhost:8000) to preview the docs.

## Making Changes

1. **Fork** this repository and create a new branch from `main`.
2. Make your changes under the `docs/` directory.
3. Run `mkdocs build` locally to ensure the site builds without errors.
4. Open a Pull Request with a clear description of your changes.

## Naming Conventions

- Use kebab-case for file and directory names (e.g., `validator-guide.md`).
- Each markdown file should begin with a front-matter block:

  ```yaml
  ---
  title: Page Title
  ---
  ```

## Linting

JavaScript files under `docs/assets/js/` are linted with ESLint as part of CI.  
Run the linter locally:

```bash
npm install --save-dev eslint@9
npx eslint docs/assets/js/ --ext .js
```

## Code of Conduct

By participating, you agree to follow the [BNB Chain Community Guidelines](https://www.bnbchain.org/en/terms) and treat all contributors with respect.

## License

Copyright (c) 2024 BNB Chain. All rights reserved.
