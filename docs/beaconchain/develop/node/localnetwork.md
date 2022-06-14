# Run a Local Testnet

## Single-node on Local Testnet

This guide helps you create a single validator node that runs a network locally for testing and other development related uses.

### Requirements
* Install [bnbchaind](./install.md)

### Create Genesis File and Start the Network
```
# You can run all of these commands from your home directory
cd $HOME
```

1.  Initialize the config.toml file that will help you to bootstrap the network
```
bnbchaind init --home /Users/huangsuyu/Documents/work/localnet --moniker test
```
2.  Initialize the genesis file that will help you to bootstrap the network
bnbchaind testnet --v 1 --chain-id local-testnet

3. Copy genesis.json and others to $home/config
```
cp ./mynetwork/config/genesis $home/config
```
4. Edit app.toml to set ugrade height
```
FixSignBytesOverflowHeight = 1
```
5. Start our node
```
# Now its safe to start `bnbchaind`
bnbchaind start --home $home
```