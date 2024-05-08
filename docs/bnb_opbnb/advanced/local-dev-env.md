# Running a local development environment

Install and start the entire opbnb system locally, including L1 (BNB Smart Chain) and L2 development nodes. Running a local development environment is a great way to test the behavior of your code and contracts.

## How to do it

1. Make sure the following software is installed: golang, node 16+, yarn, make, python2, python3, docker, foundry.  
   Tips:

   Install Foundry by following [the instructions located here](https://getfoundry.sh/).

2. Clone opbnb monorepo:

```shell
    git clone git@github.com:bnb-chain/opbnb.git
    cd opbnb
```

3. Running `yarn` and then running `yarn build`.
4. Running `make devnet-up-deploy` and wait for the docker container to start.(The first run will be relatively slow because it needs to download the image and deploy the contract, and then it will be fast)
5. Through the `docker ps` command, you can see that 5 containers have been started: `ops-bedrock_l1_1`, `ops-bedrock_l2_1`, `ops-bedrock_op-node_1`, `ops-bedrock_op-batcher_1`, `ops-bedrock_op-proposer_1`

Now L1 is accessible at `http://localhost:8545`, and L2 is accessible at `http://localhost:9545`

## Stop or clean

To stop, run (in the root directory of the monorepo) `make devnet-down`.  
To clean everything, run (in the root directory of the monorepo) `make devnet-clean`.
To view logs, run `make devnet-logs`

## Notes

1. If you encounter a ValueError: invalid mode: 'rU' while trying to load binding.gyp error when executing `yarn`, this may be caused by python3 installed on your computer but Npm requires python 2.7. You need to install python 2.7 and configure the environment variable to specify the python version to use: `export npm_config_python=/path/to/executable/python`.
2. When executing for the first time, please be patient if you see the message "wait L1 up...", as the BSC network takes time to initialize.
3. If you encounter an error during the "Deploying contracts" step, please try again as it usually recovers.
4. Do not use the `make devnet-up` command, use the `make devnet-up-deploy` command to start devnet. The `devnet-up` command is not well adapted.

## Additional Information

L1 chain ID is `714`.  
L2 chain ID is `901`.

L1 test account:

- address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private key: `ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

L2 test account:

- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private key: `ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
