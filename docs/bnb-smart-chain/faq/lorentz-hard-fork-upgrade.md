---
title: Lorentz Hard Fork - BSC FAQs
---

### What is the Lorentz upgrade and what does it aim to improve?

The Lorentz upgrade is a major performance-focused hard fork on BNB Smart Chain (BSC), designed primarily to reduce block times and enhance validator synchronization. It sets the stage for sub-second block intervals and positions BNB Chain for real-time and AI-powered decentralized applications.

---

### How does the Lorentz upgrade affect transaction finality and network security? Are there any trade-offs?

The Lorentz upgrade improves block speed but does not change BNB Chain’s core security model. However, faster block times (1.5s and eventually 0.75s) make the network more sensitive to latency:

- **Trade-off**: If block propagation is delayed and takes a significant portion of the block time, consensus stability can be impacted.
- **Mitigation**: To address this, BNB Chain is optimizing validator communication, messaging protocols, and overall network latency.

---

### How was validator synchronization improved in this upgrade?

Validator synchronization is now more efficient thanks to two key upgrades:

1. **Block Fetching via bsc/2 Protocol**  
   - Nodes can now request a **range of recent blocks** in a single round trip.
   - This replaces the slower, multi-step `eth/68` process, reducing latency.

2. **Enhanced Validator Network**  
   - Validators can now **register public NodeIDs on-chain** via a system contract.
   - This enables validators to form a direct, private communication mesh.
   - Crucial messages like blocks and votes now **bypass slower public hops**.

Together, these upgrades minimize synchronization delays and ensure robust consensus performance even with faster block times.

---

### What metrics are being used to evaluate the success of the Lorentz upgrade?

The core success metrics include:

- **Block time stability** at 1.5 seconds (targeting 0.75s in future)
- **No degradation in network throughput**
- **Stable consensus and validator performance**

These metrics help ensure performance gains do not come at the cost of network reliability.

---

### With block times dropping to 1.5 seconds (and eventually 0.75s), how does BNB Chain compare to Solana?

BNB Chain’s shorter block times and strong time-to-finality will make it competitive with high-performance chains like Solana. However, BNB Chain retains a key advantage:

- **EVM compatibility**, which allows easier migration and development for projects familiar with Ethereum infrastructure.

This combination offers the speed of Solana and the flexibility of EVM.

---

### How do these upgrades support AI-powered and real-time decentralized applications?

Lorentz (and the upcoming Maxwell upgrade) are foundational to BNB Chain’s "AI-First" strategy. Benefits include:

- **Faster confirmations** for AI, gaming, and DeFi applications.
- **Lower latency**, enabling high-frequency interactions and near-instant finality.
- **Improved data throughput**, supporting AI models and real-time computations on-chain.

This positions BNB Chain to be the infrastructure layer for next-gen decentralized applications.

---

### Will BNB Chain open-source more infrastructure changes or benchmarks?

Yes. All execution optimizations and consensus changes are:

- **Open-sourced**
- Publicly discussed in improvement proposals like **BEP-520** and **BEP-524**

BNB Chain encourages transparency and community collaboration in its performance roadmap.

---

### Still Have Questions?

Join the discussion or ask our team directly in the [official BNB Chain Discord](https://discord.com/invite/bnbchain).
