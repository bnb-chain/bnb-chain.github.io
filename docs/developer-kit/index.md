---
title: BNB Chain Developer Kit
hide:
  - toc
---

<div class="dk-page">

<section class="dk-hero">
  <h1 class="dk-hero__title">BNB Chain Developer Kit</h1>
  <p class="dk-hero__subtitle">The official collection of SDKs, MCP servers, and developer tools for building on BSC, opBNB, and Greenfield. Pick a tool, follow the quickstart, and ship.</p>
</section>

<section class="dk-block">
  <h2 class="dk-block__title">Featured tools</h2>
  <div class="dk-featured">

    <a class="dk-featured-card" href="bnbagent-sdk/">
      <span class="dk-featured-card__name">BNBAgent SDK</span>
      <span class="dk-featured-card__desc">Give autonomous agents on-chain identity, automated payments, and persistent memory.</span>
      <span class="install-cmd">
        <span class="install-cmd__prompt">$</span>
        <code>pip install bnbagent</code>
        <button class="copy-btn" type="button" data-copy="pip install bnbagent" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

    <a class="dk-featured-card" href="bnbchain-studio/">
      <span class="dk-featured-card__name">BNBChain Studio</span>
      <span class="dk-featured-card__desc">AI-native workspace for writing, testing, and deploying smart contracts faster.</span>
      <span class="install-cmd">
        <span class="install-cmd__prompt">$</span>
        <code>pip install bnbagent-studio</code>
        <button class="copy-btn" type="button" data-copy="pip install bnbagent-studio" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

    <a class="dk-featured-card" href="greenfield-sdk/">
      <span class="dk-featured-card__name">Greenfield SDK</span>
      <span class="dk-featured-card__desc">Programmable, S3-compatible decentralized storage with on-chain access control.</span>
      <span class="install-cmd">
        <span class="install-cmd__prompt">$</span>
        <code>go get github.com/bnb-chain/greenfield-go-sdk</code>
        <button class="copy-btn" type="button" data-copy="go get github.com/bnb-chain/greenfield-go-sdk" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

  </div>
</section>

<section class="dk-block">
  <div class="dk-block__header">
    <h2 class="dk-block__title">All developer tools</h2>
    <span class="dk-block__count">6 tools</span>
  </div>
  <div class="dk-table-wrap">
    <table class="dk-table">
      <thead>
        <tr>
          <th>Tool</th>
          <th>Chains</th>
          <th>Install</th>
          <th class="dk-table__action-col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="bnbagent-sdk/">BNBAgent SDK</a></td>
          <td><span class="dk-chip" data-chain="bsc">BSC</span> <span class="dk-chip" data-chain="opbnb">opBNB</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>pip install bnbagent</code>
              <button class="copy-btn" type="button" data-copy="pip install bnbagent" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="bnbagent-sdk/" aria-label="Open BNBAgent SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="bnbchain-studio/">BNBChain Studio</a></td>
          <td><span class="dk-chip" data-chain="bsc">BSC</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>pip install bnbagent-studio</code>
              <button class="copy-btn" type="button" data-copy="pip install bnbagent-studio" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="bnbchain-studio/" aria-label="Open BNBChain Studio">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="greenfield-sdk/">Greenfield SDK</a></td>
          <td><span class="dk-chip" data-chain="greenfield">Greenfield</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>go get github.com/bnb-chain/greenfield-go-sdk</code>
              <button class="copy-btn" type="button" data-copy="go get github.com/bnb-chain/greenfield-go-sdk" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="greenfield-sdk/" aria-label="Open Greenfield SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="mcp/">MCP &amp; Ask AI</a></td>
          <td><span class="dk-chip" data-chain="bsc">BSC</span> <span class="dk-chip" data-chain="opbnb">opBNB</span> <span class="dk-chip" data-chain="greenfield">Greenfield</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>npx @bnb-chain/mcp@latest</code>
              <button class="copy-btn" type="button" data-copy="npx @bnb-chain/mcp@latest" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="mcp/" aria-label="Open MCP and Ask AI">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="mpp-sdk/">MPP SDK</a></td>
          <td><span class="dk-chip" data-chain="bsc">BSC</span> <span class="dk-chip" data-chain="opbnb">opBNB</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>https://api.superintern.ai/agent/async/mcp/mcp</code>
              <button class="copy-btn" type="button" data-copy="https://api.superintern.ai/agent/async/mcp/mcp" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="mpp-sdk/" aria-label="Open MPP SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="privacy-at-scale/">Privacy at Scale</a></td>
          <td><span class="dk-chip" data-chain="bsc">BSC</span></td>
          <td>
            <span class="install-cmd">
              <span class="install-cmd__prompt">$</span>
              <code>pnpm add @bnb-chain/mpp viem</code>
              <button class="copy-btn" type="button" data-copy="pnpm add @bnb-chain/mpp viem" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="privacy-at-scale/" aria-label="Open Privacy at Scale">&rarr;</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

</div>
