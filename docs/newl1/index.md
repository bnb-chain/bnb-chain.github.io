---
hide:
- toc

title: New L1 - High-Performance EVM L1
---

<style>
   .md-source-file, .md-content__button.md-icon {
      display: none;
   }

   .section-body .faq-card {
      border: 1px solid var(--doc-border-3);
      background: var(--doc-layer-2);
      padding: 16px;
      border-radius: 8px;
      flex: 32%;
      width: 32%;
   }

   .section-body .faq-card h2 {
      color: var(--doc-text-primary);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      margin: 0 0 12px;
   }

   .section-body .faq-card p {
      color: var(--doc-text-secondary);
      font-size: 14px;
      line-height: 20px;
      margin: 0;
   }

   .section-body .faq-card p + p {
      margin-top: 12px;
   }

   .section-body .faq-card a {
      border: 0;
      background: none;
      padding: 0;
      border-radius: 0;
      flex: initial;
      width: auto;
   }

   @media (max-width: 767px) {
      .section-body .faq-card {
         flex: 100%;
         width: 100%;
      }
   }
</style>

<div class="section-head">
    <div class="left">
        <h1>New L1</h1>
        <p>New L1 is a high-performance, EVM-compatible Layer 1 built for latency-sensitive on-chain activity: sub-second finality, native account abstraction, transaction pre-confirmation, Multi-Lane reserved capacity, and an on-chain shielded (privacy) pool.</p>
    </div>
</div>

!!! note "Status"
    New L1 is currently in devnet. The network is highly unstable and subject to breaking changes.

<div class="section-body">
    <a href="./overview">
        <div>Overview</div>
        <p>What New L1 is and how it's built</p>
    </a>
    <a href="./get-started/network-info">
        <div>Get Started</div>
        <p>Connect to the devnet and explore blocks and transactions</p>
    </a>
    <a href="./core-concepts/consensus">
        <div>Consensus</div>
        <p>Parlia PoSA with BLS fast finality</p>
    </a>
    <a href="./core-concepts/account-abstraction">
        <div>Native Account Abstraction</div>
        <p>Batched calls, session keys, and sponsored gas, with no bundler required</p>
    </a>
    <a href="./core-concepts/tx-preconfirmation">
        <div>Transaction Pre-confirmation</div>
        <p>Sub-second, best-effort inclusion signals ahead of finality</p>
    </a>
    <a href="./core-concepts/multi-lane">
        <div>Multi-Lane</div>
        <p>Reserved gas capacity for latency-sensitive transaction classes</p>
    </a>
    <a href="./core-concepts/privacy">
        <div>Shielded Pool (Privacy)</div>
        <p>Native, opt-in private transfers via zk proofs</p>
    </a>
    <a href="./governance/overview">
        <div>Governance</div>
        <p>On-chain, token-weighted parameter and validator-set governance</p>
    </a>
    <a href="./developers/json_rpc/json-rpc-endpoint">
        <div>JSON-RPC Reference</div>
        <p>Standard eth_* methods plus New L1 extensions</p>
    </a>
    <section class="faq-card" aria-labelledby="faq-card-title">
        <h2 id="faq-card-title">FAQ</h2>
        <p><a href="./faq/">General FAQ</a><br>Chain basics, network status, BNB, and privacy</p>
        <p><a href="./partner-faq/">Integration FAQ</a><br>Onboarding, tooling, fees, lanes, and settlement</p>
    </section>
</div>
