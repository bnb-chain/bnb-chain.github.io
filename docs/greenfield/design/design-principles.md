---
sidebar_label: Design Principles
sidebar_position: 2
hide_table_of_contents: false
---

# Design of the BNB Greenfield 

This section of BNB Greenfield documentation describes the general principles and considerations for the design of BNB Greenfield. It covers the architecture and functionality analysis. Although the true model innovation is at the cross-chain with BSC, the unique storage fundamentals are also important to highlight.

## Design Principles

**1.** **Simplicity** - The design prefers this first principle over the other considerations. Simple solutions are not only easy to implement, run, maintain, and extend, but also friendly to software performance, which is a main goal of the design. For example, high computing-intensive proof, like what [Filecoin](https://filecoin.io/filecoin.pdf) adopts, is ruled out according to this principle.

**2.** **Upgradable and continuously evolving** - Perfect system at one go is not the goal of the design. We expect the whole architecture, different components, and even this whitepaper to evolve and get improved based on the community and market feedbacks and future technology development. The infrastructure should have "just enough" establishment to develop and upgrade as time goes on.

**3.** **Open platform** - The biggest lesson learned from the crypto industry and BNB ecosystem is that the community have the most talent and power to build more applications and infrastructure in different self-driven ways. The design should focus on the core platform and technical foundation that provide enough interface, tools, and other facilitation to the developer community to build upon them.

**4.** **Massive adoption** - The economy targets beyond the existing BNB Chain clients, but also traditional Web2 users and developers. The system design should try to be as compatible as possible with popular Web2 and Web3 standards.

**5.** **Decentralization is a journey** - Take the storage system as an example, there are two ends to the decentralization spectrum. On one extreme end, users have to create and store all their data on a single service supplier; on the other end, users can create and store their data on any household's computing terminal (it does not even have to be a desktop). The design will not force itself to be on the latter end right from day one. It picks up the simplest solution that moves the needle toward higher decentralization and will improve as time goes on. From this sense, the first step Greenfield goes ahead with is to provide the freedom to choose among plenty of service suppliers at any time with trivial costs because they own the data.


![img](../../../static/img/assets/greenfield/1-Decentralization-Spectrum.png)
<div align="center"><i>Decentralization Spectrum</i></div>
