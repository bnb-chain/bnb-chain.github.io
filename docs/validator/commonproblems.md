---
sidebar_label: Common Problems With Connectivity
hide_table_of_contents: false
sidebar_position: 2
---

# Common Problems With Connectivity

Sometimes you just can’t get synced. The most common reasons are as follows:

* You have started `geth` without the discovery protocol, you can set the `--nodiscover` parameter to `False`. You only want this if you are running full node with fixed nodes.

* Update `BootstrapNodes`

```
BootstrapNodes = ["enode://1cc4534b14cfe351ab740a1418ab944a234ca2f702915eadb7e558a02010cb7c5a8c295a3b56bcefa7701c07752acd5539cb13df2aab8ae2d98934d712611443@52.71.43.172:30311","enode://28b1d16562dac280dacaaf45d54516b85bc6c994252a9825c5cc4e080d3e53446d05f63ba495ea7d44d6c316b54cd92b245c5c328c37da24605c4a93a0d099c4@34.246.65.14:30311","enode://5a7b996048d1b0a07683a949662c87c09b55247ce774aeee10bb886892e586e3c604564393292e38ef43c023ee9981e1f8b335766ec4f0f256e57f8640b079d5@35.73.137.11:30311"]
```

* Add `Static nodes`

Geth also supports a feature called static nodes if you have certain peers you always want to connect to. Static nodes are re-connected on disconnects. You can configure permanent static nodes by putting something like the following into `<datadir>/geth/static-nodes.json`:

```
[
  "enode://pubkey@ip:port",
  "enode://cfc556867894dc84707c2ce6290740d6ba112b279217e6db420f215397492a91ef76bbfe18ebd349a09b37fc8bfef5740d2d2335838e063094d5b63c3fd20d8f@34.197.85.99:30311",
  "enode://7cf68af17a83f925f34eeced2a139b1d11bac03fd2635707e459a821965b5e6016021a43379f24dc428ebcb84b8fb377517dee6ae484cd276a2f9360dac9c183@52.86.7.102:30311",
  "enode://b2ed83944f4c0e18d6b2f5f6c2e86b0320c10b8a96f897a535b43f25dc625ae739f449765ad86f38a393472638fcef69f30d7af53b02c3545722b1dd6f18f606@34.194.252.9:30311",
  "enode://42deadff5ff5d97ea4245128952335969fafea6c4ddd05146b3cac125099e1b2d1ea42c8d02c11ee8b5272a75d4f4b9f51a99244fd6daf1c6a1d5017242a3d43@101.36.120.67:30311",
  "enode://905f585c09b8eed66afdf8a99acdab7487185357f33d5c9fe40332e4aa4a661382b159ffb300b20fbc12e81505505944ac3bfc7e6673b352d01e09f2df8af5bc@152.32.131.34:30311",
  "enode://e585bafb7ab5a187534d69e84531165e5d4b0ee4f76b21641fe778c53770cd72e1850d44b48ad00c08ca4dc860cd5c5afa04b23a5061303f61d2658b1c48b9b2@152.32.132.171:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
]
```

You can also add static nodes at runtime via the js console using admin.addPeer():
```
admin.addPeer( "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
)
```

* Add `Trusted nodes`

Geth supports trusted nodes that are always allowed to reconnect, even if the peer limit is reached. They can be added permanently via a config file < datadir >/geth/trusted-nodes.json or temporary via RPC call.
