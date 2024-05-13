# Create a SP cluster

Pre-requisite is that AWS resources must first be created. Please see aws section for details.

Then, using `kustomize`, you can create the app in K8S (EKS) very quickly.

## Cluster Size Selection

We currently support a number of cluster modes, depending on the requirements of performance.

1. all-in-one: All services of SP are deployed in a single pod.
2. regular: An arrangement where some services will be combined as a pod.
3. large: Each service is a pod by itself.

## Setting up K8S via kustomize

To set up a primary SP cluster, using `kustomize` we can deploy it with the following YAML. You can
replace the `value`s in the YAML file.

```yaml
resources:
  - https://github.com/node-real/greenfield-sp-k8s/base/cluster/large?ref=v0.2.16

images:
- name: ghcr.io/bnb-chain/greenfield-storage-provider
  newTag: 0.2.0

configMapGenerator:
- name: config
  files:
  - configs/config.toml

patches:
- target:
    kind: Service
    name: p2p-external
  patch: |-
    - op: replace
      path: /metadata/annotations/service.beta.kubernetes.io~1aws-load-balancer-subnets
      value: subnet-a,subnet-b,subnet-c
- target:
    kind: Ingress
    name: gateway
  patch: |-
    - op: replace
      path: /spec/rules/0/host
      value: sp-a.yourdomain.com
    - op: replace
      path: /spec/rules/1/host
      value: *.sp-a.yourdomain.com
- target:
    kind: ServiceAccount
    name: nodereal-default
  patch: |-
    - op: replace
      path: /metadata/annotations/eks.amazonaws.com~1role-arn
      value: arn:aws:iam::111111111111:role/greenfield-sp-a
- target:
    kind: SecretStore
    name: default
  patch: |-
    - op: replace
      path: /spec/provider/aws/region
      value: ap-northeast-1
- target:
    kind: ExternalSecret
    name: default
  patch: |-
    - op: replace
      path: /spec/dataFrom/0/extract/key
      value: /projects/greenfield/sp/a
- target:
    kind: ServiceMonitor
    name: default
  patch: |-
    - op: replace
      path: /spec/namespaceSelector/matchNames/0
      value: gf-sp-a
```

### Config file

Here is the config file used in the above `configMapGenerator`. You will need to obtain and
replace `SpOperatorAddress`, `ChainID`, `GreenfieldAddresses` and `TendermintAddresses` from your env.

```toml
# services list are to be started
Service = ["gateway", "uploader", "downloader", "challenge", "tasknode", "receiver", "manager", "p2p", "auth", "stopserving"]

# sp operator address generate from sp's 'OperatorPublicKey'
SpOperatorAddress = "0x000000000000000000000000000000000000000"

# service name in k8s
# notice: except gateway is SP Domain
[Endpoint]
gateway = "sp-a.your-domain.com"
challenge = "challenge:9333"
downloader = "downloader:9233"
receiver = "receiver:9533"
signer = "signer:9633"
tasknode = "tasknode:9433"
uploader = "uploader:9133"
metadata = "metadata:9833"
p2p = "p2p:9833"
auth = "auth:8933"

# pod listen addr
[ListenAddress]
challenge = "0.0.0.0:9333"
downloader = "0.0.0.0:9233"
gateway = "0.0.0.0:9033"
receiver = "0.0.0.0:9533"
signer = "0.0.0.0:9633"
tasknode = "0.0.0.0:9433"
uploader = "0.0.0.0:9133"
metadata = "0.0.0.0:9833"
p2p = "0.0.0.0:9833"
auth = "0.0.0.0:8933"

# SQL DB configuration
# User, Passwd, Address support ENV vars
[SpDBConfig]
User = ""
Passwd = ""
Address = ""
Database = "storage_provider_db"

[BsDBConfig]
User = ""
Passwd = ""
Address = ""
Database = "block_syncer"

[BsDBSwitchedConfig]
User = ""
Passwd = ""
Address = ""
Database = "block_syncer_backup"

# piece store configuration
# BucketURL, AWSAccessKey, AWSSecretKey, AWSSessionToken support ENV vars
[PieceStoreConfig]
Shards = 0

[PieceStoreConfig.Store]
Storage = "s3"
MaxRetries = 5
IAMType = "SA"

# According to dev/qa greeenfield chain to replace
[ChainConfig]
ChainID = "greenfield_xxxx-x"

[[ChainConfig.NodeAddr]]
GreenfieldAddresses = ["k8s-gnfdvali-gnfdvali-0000000000000000000000000.elb.us-east-1.amazonaws.com:9090"]
TendermintAddresses = ["https://gnfd.chain.your-domain.com"]

# signer service config
[SignerCfg]
WhitelistCIDR = ["0.0.0.0/0"]
GasLimit = 210000

[BlockSyncerCfg]
Modules = ["epoch", "bucket", "object", "payment", "group", "permission","storage_provider"]
Dsn = ""
DsnBackup = ""
RecreateTables = true
Backup = false
Workers = 50

# p2p node configuration
[P2PCfg]
ListenAddress = "0.0.0.0:9933"
# p2p node msg Secp256k1 encryption key, it is different from other SP's addresses
# generate by ./gnfd-sp p2p.create.key -n 14, ref to dev_p2p_list and qa_p2p_list.
# P2PPrivateKey = ""
# p2p node's bootstrap node, format: [node_id1@ip1:port1, node_id2@ip1:port2]
# ip need be the pod real ip
Bootstrap = []

# metrics config
[MetricsCfg]
Enabled = true
HTTPAddress = "0.0.0.0:24036"

# pprof config
[PProfCfg]
Enabled = true
HTTPAddress = "0.0.0.0:25341"

[DiscontinueCfg]
BucketKeepAliveDays = 1

[MetadataCfg]
IsMasterDB = true
BsDBSwitchCheckIntervalSec = 3600

[RateLimiter]
APILimits = []
HostPattern = []
PathPattern = []

[RateLimiter.HTTPLimitCfg]
On = false
RateLimit = 1
RatePeriod = "S"
```

## Setting up secret

The SP app also will fetch secret from AWS (used as external secret in K8S). Please see AWS
doc for creating the secret. The secret JSON content will be like the followings:

```json
{
    "SP_DB_USER":"xxx",
    "SP_DB_PASSWORD":"xxx",
    "SP_DB_ADDRESS":"xxx:3306",
    "SP_DB_DATABASE":"storage_provider_db",
    "BLOCK_SYNCER_DSN":"user:pw@tcp(xxx:3306)/block_syncer?parseTime=true&multiStatements=true&loc=Local",
    "BS_DB_USER":"xxx",
    "BS_DB_PASSWORD":"xxx",
    "BS_DB_ADDRESS":"xxx:3306",
    "BS_DB_DATABASE":"block_syncer",
    "SIGNER_OPERATOR_PRIV_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "SIGNER_FUNDING_PRIV_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "SIGNER_APPROVAL_PRIV_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "SIGNER_SEAL_PRIV_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "BUCKET_URL":"xxx",
    "P2P_PRIVATE_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "SIGNER_GC_PRIV_KEY":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "BS_DB_SWITCHED_USER":"xxx",
    "BS_DB_SWITCHED_PASSWORD":"xxx",
    "BS_DB_SWITCHED_ADDRESS":"xxx:3306",
    "BS_DB_SWITCHED_DATABASE":"block_syncer_backup",
    "BLOCK_SYNCER_DSN_SWITCHED":"user:pw@tcp(xxx:3306)/block_syncer_backup?parseTime=true&multiStatements=true&loc=Local"
}
```

refer to [runbook](https://github.com/bnb-chain/greenfield-docs/blob/718b662489fd862f56c1a0b9748f357b71735bd0/src/guide/storage-provider/run-book/run-testnet-SP-node.md) to check how to get the keys.

build command: `kustomize build . > sp.yaml`
apply command: `kubectl apply -f ./sp.yaml`
