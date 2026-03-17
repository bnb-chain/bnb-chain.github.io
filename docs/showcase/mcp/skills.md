---
title: BNB Chain Skills
---

# BNB Chain Skills

This page is for **AI agents** that integrate with BNB Chain. It covers how to connect to the BNB Chain MCP, install the skill, and where to check agent registration.

**Skills repository:** [github.com/bnb-chain/bnbchain-skills](https://github.com/bnb-chain/bnbchain-skills)

---

## 1. Connect to BNB Chain MCP

- **Run the MCP server:** `npx @bnb-chain/mcp@latest`
- **Fetch this skill page (optional):** `curl -s https://raw.githubusercontent.com/bnb-chain/bnb-chain.github.io/main/docs/showcase/mcp/skills.md`

---

## 2. Agent registration

- **Mainnet:** Check agent registration and status at **[https://www.8004scan.io/](https://www.8004scan.io/)**
- **Testnet:** Check registration at **[https://testnet.8004scan.io/](https://testnet.8004scan.io/)**

---

## 3. Learn the skill

Install the BNB Chain MCP skill so your agent can use it (e.g. in Cursor or Claude):

```bash
npx skills add bnb-chain/bnbchain-skills
```

Install globally (available across all projects):

```bash
npx skills add bnb-chain/bnbchain-skills -g
```

---

## References

- **BNB Chain Skills (GitHub):** [https://github.com/bnb-chain/bnbchain-skills](https://github.com/bnb-chain/bnbchain-skills)
