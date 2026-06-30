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
      <span class="dk-featured-card__name">BNB Agent SDK</span>
      <span class="dk-featured-card__desc">Give autonomous agents on-chain identity, automated payments, and persistent memory.</span>
      <span class="install-cmd" data-copy="pip install bnbagent-sdk">
        <code>pip install bnbagent-sdk</code>
        <button class="copy-btn" type="button" data-copy="pip install bnbagent-sdk" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

    <a class="dk-featured-card" href="bnbchain-studio/">
      <span class="dk-featured-card__name">BNB Agent Studio</span>
      <span class="dk-featured-card__desc">AI-native workspace for writing, testing, and deploying smart contracts faster.</span>
      <span class="install-cmd" data-copy="npx bnbchain-studio">
        <code>npx bnbchain-studio</code>
        <button class="copy-btn" type="button" data-copy="npx bnbchain-studio" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

    <a class="dk-featured-card" href="greenfield-sdk/">
      <span class="dk-featured-card__name">Greenfield SDK</span>
      <span class="dk-featured-card__desc">Programmable, S3-compatible decentralized storage with on-chain access control.</span>
      <span class="install-cmd" data-copy="go get github.com/bnb-chain/greenfield-go-sdk">
        <code>go get github.com/bnb-chain/greenfield-go-sdk</code>
        <button class="copy-btn" type="button" data-copy="go get github.com/bnb-chain/greenfield-go-sdk" aria-label="Copy install command">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg>
        </button>
      </span>
    </a>

  </div>
</section>

<section class="dk-block">
  <h2 class="dk-block__title">All developer tools</h2>
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
          <td><a href="bnbagent-sdk/">BNB Agent SDK</a></td>
          <td><span class="dk-chip">BSC</span> <span class="dk-chip">opBNB</span></td>
          <td>
            <span class="install-cmd" data-copy="pip install bnbagent-sdk">
              <code>pip install bnbagent-sdk</code>
              <button class="copy-btn" type="button" data-copy="pip install bnbagent-sdk" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="bnbagent-sdk/" aria-label="Open BNB Agent SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="bnbchain-studio/">BNB Agent Studio</a></td>
          <td><span class="dk-chip">BSC</span></td>
          <td>
            <span class="install-cmd" data-copy="npx bnbchain-studio">
              <code>npx bnbchain-studio</code>
              <button class="copy-btn" type="button" data-copy="npx bnbchain-studio" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="bnbchain-studio/" aria-label="Open BNB Agent Studio">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="greenfield-sdk/">Greenfield SDK</a></td>
          <td><span class="dk-chip">Greenfield</span></td>
          <td>
            <span class="install-cmd" data-copy="go get github.com/bnb-chain/greenfield-go-sdk">
              <code>go get github.com/bnb-chain/greenfield-go-sdk</code>
              <button class="copy-btn" type="button" data-copy="go get github.com/bnb-chain/greenfield-go-sdk" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="greenfield-sdk/" aria-label="Open Greenfield SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="mcp/">MCP &amp; Ask AI</a></td>
          <td><span class="dk-chip">BSC</span> <span class="dk-chip">opBNB</span> <span class="dk-chip">Greenfield</span></td>
          <td>
            <span class="install-cmd" data-copy="npx @bnb-chain/mcp">
              <code>npx @bnb-chain/mcp</code>
              <button class="copy-btn" type="button" data-copy="npx @bnb-chain/mcp" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="mcp/" aria-label="Open MCP and Ask AI">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="mpp-sdk/">MPP SDK</a></td>
          <td><span class="dk-chip">BSC</span> <span class="dk-chip">opBNB</span></td>
          <td>
            <span class="install-cmd" data-copy="pip install bnb-mpp-sdk">
              <code>pip install bnb-mpp-sdk</code>
              <button class="copy-btn" type="button" data-copy="pip install bnb-mpp-sdk" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="mpp-sdk/" aria-label="Open MPP SDK">&rarr;</a></td>
        </tr>
        <tr>
          <td><a href="privacy-at-scale/">Privacy at Scale</a></td>
          <td><span class="dk-chip">BSC</span></td>
          <td>
            <span class="install-cmd" data-copy="pip install bnb-privacy">
              <code>pip install bnb-privacy</code>
              <button class="copy-btn" type="button" data-copy="pip install bnb-privacy" aria-label="Copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/></svg></button>
            </span>
          </td>
          <td class="dk-table__action"><a href="privacy-at-scale/" aria-label="Open Privacy at Scale">&rarr;</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

</div>
