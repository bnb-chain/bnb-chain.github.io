# Unjail

`Jailed` validator nodes due to their malicious or bad behavior, may request for release by sending `side-unjail transactions` provided they passed initial validation. After release, to re-join the validator set again, the validator must wait for the following `UTC 0:00`. The `fees to unjail` a smart contract validator is **_1 BNB_**. Whereas, the fee for submitting a byzantine behavior evidence of a validator is **_10 BNB_**.

## Transaction Validation
*   Validator address must not be empty.
*  The side chain id exists.
*  Self-delegation of the validator exists and must be greater than the min-self-delegation setting by **_10,000 BNB_**.
*  Requestor is in 'jailed' state when requesting to be un-jailed.
*  Complete the required jailed term.


## Fee Table

Transaction Type  | Pay in BNB |
-- | -- |
Unjail A Smart Chain Validator | 1 |
Submit Byzaitine Behavior Evidence of A Smart Chain Validator | 10 |

## Command to get Unjailed

```
bnbcli slashing side-unjail 
\--from= {this address has to be the operator address of the validator to be unjailed.
          Name or address of private key with which to sign}
 \--side-chain-id= {chain-id of the side chain the validator belongs to} 
 \--chain-id= {the chain id of binance chain}
```


| **Parameter Name** | **Example**                                | **Explanation**                                                 | **Required** |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX                          | the chain id of binance  chain                               | Yes          |
| --from             | bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd | This address has to be  the operator address of the validator to be unjailed. Name or address of  private key with which to sign. | Yes          |
| --side-chain-id    | BSC-XXX                                    | chain-id of the side  chain the validator belongs to         | Yes          |


### Example

```
bnbcli slashing side-unjail \--from bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd \--side-chain-id=bsc \--chain-id=Binance-Chain-Tigris \--home \~/home\_cli
```