# Breathe Blocks

In BNB Beacon Chain, there is one kind of special blocks called **Breathe Block**.
A breathe block is the first block of a day in UTC time, for example, block [288644676](https://explorer.bnbchain.org/block/288644676) is 
a breathe block because it is the first block of 06/01/2023.

In breathe block, some special logics will be executed, for example, validator set update, staking reward allocations, parameter changes, and so on.

## How to get breathe blocks

There are several approaches to find breathe blocks:

- Messages (e.g., kafka messages) can be published to receive breathe blocks, for more information please refer to [breathe block](https://docs.bnbchain.org/docs/beaconchain/get-extra-data-from-fullnode/#11-breatheblock).

- You can also find breathe blocks by accessing local logs if you are running a BNB Beacon Chain node. In `node.log` log file, the heights of breathe blocks will be logged.

- Another option is using [Explorer](https://explorer.bnbchain.org/) by looking at the block time. Please do check the surrounding blocks if you find a potential one (multiple blocks can be mined in the same second).

## What happens in breathe blocks

Breathe blocks can execute any logics as normal blocks. Besides, there are some logics only happened in breathe blocks, 
to unify some handlings or avoid any burden on normal blocks (e.g., for performance).

- Validator set update - In breathe blocks, validator set updates will take effect, i.e., updating validators on BNB Beacon Chain or triggering cross chain communication for side chain's validator set update.

- Staking reward calculation and allocation - the staking rewards will be calculated and allocated in breathe blocks.

- Proposal execution and parameter change - some proposals will be only executed in breathe blocks, for example, fee change proposals, cross chain parameter changes.
