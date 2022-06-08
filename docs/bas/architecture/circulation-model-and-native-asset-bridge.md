---
sidebar_label: Circulation Model and Native Asset Bridge
sidebar_position: 2
hide_table_of_contents: false
---
# Circulation Model and Native Asset Bridge

The key features of each BAS application are the native token circulation model and cross-chain bridge for native assets. 

Native assets of the BAS chain are located in the BAS application and managed directly by the sidechain. BAS is designed to provide cross-chain functionality for the native assets. Since native assets are fully managed by the developers of a specific BAS, they can compromise the token supply or mint/burn tokens. We leave such a decision to the developers discretion, as manipulating the supply of their tokens they risk their own reputation.

The only thing required for a native cross-chain bridge is block header verification that allows one to keep an active validator set and verify the correctness of cross-chain transactions.
