## Greenfield Storage Provider Deployment Guide - Alibaba Cloud

### Pre-requisites(Alibaba Cloud ACK Creation)

1 Create an ACK Container Service K8S cluster – Search for Container Service Fpr Kubernetes in the console and click Create Kubernetes Cluster

2 Select the Managed Kubernetes version(Managed ACK), deployment region, billing method, VPC network/virtual switch/pod virtual switch, network plug-in (Terway is recommended) and other network-related configuration

3 Create a node pool name, select node instance specifications, quantity, disk size/performance level and operating system (recommended at least 2* ECS with 12vcpu 48G RAM), and set the corresponding login method and password

4 Select the type and specifications of the Ingress service to create, and then confirm the order and create the cluster

View the created ACK cluster information and connect to ACK based on the connection information provided by Alibaba Cloud.

### Pre-requisites(Connect to the ACK cluster through ECS on the Alibaba Cloud)

1 After ACK is created successfully, go to the Cluster Information – Connection Information – Internal Access

2 Create an ECS (Ubuntu 22 or above is recommended for Linux, and CENTOS7 is not recommended), install kubectl according to the instructions, copy and paste the content in the picture above in \~/.kube/config. After the configuration is completed, you can use kubectl from ECS to access Kubernetes cluster

2.1 Install kubectl:
<https://kubernetes.io/docs/tasks/tools/?spm=5176.2020520152.0.0.782d16ddm5WRG6>

2.2 Reference video (windows version):
<https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/getting-started/getting-started-with-ack-using-kubectl>

2.3 Verify connectivity:

```bash
[root@test ~]# kubectl get node
NAME                    STATUS   ROLES    AGE   VERSION
cn-hongkong.13.0.0.10   Ready    <none>   80d   v1.26.3-aliyun.1
cn-hongkong.13.0.0.8    Ready    <none>   80d   v1.26.3-aliyun.1
```

## Deploy SP by using Alibaba Cloud ACK

1 Install kustomization
Reference Link：<https://kubectl.docs.kubernetes.io/installation/kustomize/>

1.1 Install GO(other methods are acceptable as well)

    [root@test ~]# snap install go --classic

1.2 GO Install Kustomize via Go
<https://kubectl.docs.kubernetes.io/installation/kustomize/source/>

2 Install gnfd

Below reference link to download BNB Greenfield latest releases, we use Linux as an example here, can use cmd or FileZilla and other tools to upload to the test ECS machine
<https://github.com/bnb-chain/greenfield/releases>

```bash
root@ub:~# mv linux gnfd
root@ub:~# chmod a+x gnfd
root@ub:~# ./gnfd version
Version: v0.2.4
Git Commit: dba6afc62009d9e1b424613a437bc284f2ac9a1b
Git Commit Date: 20230829
Architecture: amd64
Go Version: go1.20.7
Operating System: linuxroot@ub:~# 
```

3 Upload and decompress sp.tar.gz
Can use tools such as cmd or FileZilla to upload to the test ECS machine and decompress it (such as installing unzip, etc.)

cd to the directory cd \~/alicloud-sp/base/vendors/alicloud/large

4 Configure ServiceAccount via RRSA

4.1 Alibaba Cloud reference link:
<https://www.alibabacloud.com/help/zh/ack/ack-managed-and-ack-dedicated/user-guide/use-rrsa-to-authorize-pods-to-access-different-cloud-services>

4.2 Complete the installation of the ack-pod-identity-webhook component:

1.  Install the ack-pod-identity-webhook component:

    a.On the cluster Name/ID list page, click the target cluster name, and then select Operations > Add-ons in the left navigation bar.

    b.On the Add-ons page, click the Security tab, find the ack-pod-identitv-webhook component, and click Install on the lower right side of the component.

    c.After confirming the component information in the prompt dialog box, click OK

4.3 Create a RAM role, and configure the ACK namespace and a service account name (others can be based on the default values in the document):

&#x9;Create a RAM role （name: demo-role-for-rrsa）

1.  Log in to [RAM Console](https://ram.console.aliyun.com/) using your Alibaba Cloud account.
2.  In the left navigation bar, select **Identities** > **Roles**, and then on the **Roles** page, click **Create Role**.
3.  In the **Create Role** panel, select the trusted entity type as **IdP**, and then click **Next**.
4.  On the **Configure Role** page, after configuring the following role information, click **Finish**.

Here I created a role named greenfield and configured the oss permissions:

4.4 In the yaml deployment file created later, add tags and comments according to the documentation requirements:



&#x9;In the following YAML example, add the label `pod-identity.alibabacloud.com/injection: 'on'` to the namespace, and add the annotation `pod-identity.alibabacloud.com/role-name: demo-role-for to the service account -rrsa`, enables the automatic injection function of the configuration of the ack-pod-identity-webhook component. For more instructions on ack-pod-identity-webhook component configuration, please see [ack-pod-identity-webhook](https://www.alibabacloud.com/help/zh/ack/product-overview/ack-pod -identity-webhook#task-2295049).

Example: I use the following sp.yaml file as an example. It needs to be modified according to the RAM role you actually created/the ACK namespace you actually used and the service account name. Here I am using
RAM role=greenfield; namespace = default;
service account name = default;

    [root@test large]# cat sp.yaml |more
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      annotations:
        pod-identity.alibabacloud.com/role-name: default
      name: default
      namespace: default
    ---

Example: Use kubectl edit namespace default

Add the label pod-identity.alibabacloud.com/injection: 'on' to the namespace

```
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Namespace","metadata":{"annotations":{},"labels":{"pod-identity.alibabacloud.com/injection":"on"},"name":"default"}}
  creationTimestamp: "2023-06-20T07:53:35Z"
  labels:
    kubernetes.io/metadata.name: default
    pod-identity.alibabacloud.com/injection: "on"
  name: default
  resourceVersion: "8324154"
  uid: a0ac0aa4-0326-4abd-b9f5-a8756bcb5e06
spec:
  finalizers:
  - kubernetes
status:
  phase: Active

```

4.5 Confirm that the information in ServiceAccount has been changed to real information:

    [root@test large]# kubectl get namespace default -o yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      annotations:
        kubectl.kubernetes.io/last-applied-configuration: |
          {"apiVersion":"v1","kind":"Namespace","metadata":{"annotations":{},"labels":{"pod-identity.alibabacloud.com/injection":"on"},"name":"default"}}
      creationTimestamp: "2023-06-20T07:53:35Z"
      labels:
        kubernetes.io/metadata.name: default
        pod-identity.alibabacloud.com/injection: "on"
      name: default
      resourceVersion: "8324154"
      uid: a0ac0aa4-0326-4abd-b9f5-a8756bcb5e06
    spec:
      finalizers:
      - kubernetes
    status:
      phase: Active

4.6 Prepare the domain name, which can be provided by yourself or purchased on Alibaba Cloud (international site domain name registration, Cloud DNS, etc.)

4.7 We will use Alibaba Cloud's ALB. For details, please refer to items 2, 3, and 4 under step 1 in the Alibaba Cloud official website documentation:

<https://www.alibabacloud.com/help/zh/ack/ack-managed-and-ack-dedicated/user-guide/best-practice-for-migrating-from-a-self-managed-nginx-ingress-to-an-alb-ingress-1?spm=a2c63.p38356.0.0.2cbd1b8deaGwt4>

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      annotations:
        alb.ingress.kubernetes.io/cors-allow-credentials: "false"
        alb.ingress.kubernetes.io/cors-allow-headers: DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-MD5,Range,Authorization,X-Gnfd-Content-Sha256,X-Gnfd-Unsigned-Msg,X-Gnfd-Txn-Hash,Date,X-Gnfd-Object-ID,X-Gnfd-Resource,X-Gnfd-Piece-Index,X-Gnfd-Redundancy-Index,Address,X-Gnfd-User-Address,X-Gnfd-App-Domain,X-Gnfd-App-Reg-Nonce,X-Gnfd-Date,X-Gnfd-App-Reg-Public-Key,X-Gnfd-App-Reg-Expiry-Date
        alb.ingress.kubernetes.io/cors-allow-methods: GET,PUT,POST,DELETE,PATCH,OPTIONS
        alb.ingress.kubernetes.io/cors-allow-origin: '*'
        alb.ingress.kubernetes.io/cors-expose-headers: '*'
        alb.ingress.kubernetes.io/cors-max-age: "600"
        alb.ingress.kubernetes.io/enable-cors: "true"
        alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS": 443}]'
        alb.ingress.kubernetes.io/ssl-redirect: "true"
      name: gateway
    spec:
      ingressClassName: gf-sp
      rules:
      - host: yourdomain.com
        http:
          paths:
          - backend:
              service:
                name: gateway
                port:
                  number: 9033
            path: /
            pathType: Prefix
      - host: '*.yourdomain.com'
        http:
          paths:
          - backend:
              service:
                name: gateway
                port:
                  number: 9033
            path: /
            pathType: Prefix

4.8 Modify the corresponding parameters in the config file

```

[root@test large]# vim config/config.toml
Env = "testnet"
Server = []
GRPCAddress = '0.0.0.0:9333'

[SpDB]
User = ''
Passwd = ''
Address = 'rm-xxxxxxxxxxxx.mysql.rds.aliyuncs.com:3306'
Database = 'storage_provider_db'

[BsDB]
User = ''
Passwd = ''
Address = 'rm-xxxxxxxxxxxxxx.mysql.rds.aliyuncs.com:3306'
Database = 'block_syncer'

[PieceStore]
Shards = 0

[PieceStore.Store]
Storage = 'oss'
BucketURL = 'https://xxxxxxxxxxxxxxxx.oss-cn-hongkong.aliyuncs.com'
MaxRetries = 5
MinRetryDelay = 0
TLSInsecureSkipVerify = false
IAMType = 'SA'

[Chain]
ChainID = 'greenfield_5600-1'
ChainAddress = ['https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443']

[SpAccount]
SpOperatorAddress = 'xxxxxxxxxxxxxxxxxxxxxx'

[Gateway]
DomainName = 'xxxxxx.com'
HTTPAddress = '0.0.0.0:9033'

[BlockSyncer]
Modules = ['epoch','bucket','object','payment','group','permission','storage_provider','prefix_tree','virtual_group','sp_exit_events','object_id_map']
BsDBWriteAddress = "rm-xxxxxxxxxxxxxx.mysql.rds.aliyuncs.com:3306"
Workers = 50

```

4.9 Create secret:
Here you can choose to use the Alibaba Cloud KMS service. If you do not choose KMS with secrets, you need to manually create a secret file in secrets and complete the execution. You can refer to our reference secret.yaml file

Modify here to correspond to the real namespace and the name of the secret you want to create

```
[root@test large]# kubectl get secret default -o yaml
apiVersion: v1
data:
  SIGNER_APPROVAL_PRIV_KEY: xxx==
  SIGNER_BLS_PRIV_KEY: xxx==
  SIGNER_GC_PRIV_KEY: xxx==
  SIGNER_OPERATOR_PRIV_KEY: xxx==
  SIGNER_SEAL_PRIV_KEY: xxx==
  SP_DB_PASSWORD: xxx=
  SP_DB_USER: xxx==


```

You can go to the ACK console to see that this secret has been successfully created:



And the corresponding names also appear. Here you need to fill in the corresponding information:

4.10 Secret Key Reference:

    SP_DB_PASSWORD: xxx= 
    SP_DB_USER: xxx== 
    SIGNER_OPERATOR_PRIV_KEY: xxx==
    SIGNER_FUNDING_PRIV_KEY: xxx==
    SIGNER_SEAL_PRIV_KEY: xxx==
    SIGNER_APPROVAL_PRIV_KEY: xxx==
    SIGNER_GC_PRIV_KEY: xxx==
    SIGNER_BLS_PRIV_KEY: xxx==
    P2P_PRIVATE_KEY: xxx==

&#x20;The private key of SIGNER's operator/funding/seal/approval/gc needs to be obtained by executing the gnfd statement. Please keep it properly afterwards. Reference document: <https://github.com/KeefeL/greenfield-docs/blob/update-create -validator/docs/guide/storage-provider/run-book/run-testnet-SP-node.md>

The value of P2P\_PRIVATE\_KEY needs to be obtained by executing the following command:

    ./gnfd-sp p2p.create.key -n 1

4.11
After all configuration modifications are completed, use kustomize to build a new k8s yaml file
Execute in the alicloud-sp/base/vendors/alicloud/large directory:
kustomize build . > sp.yaml

Then execute kubectl apply -f sp.yaml to start the pod

4.12 View Pod status:

    [root@test large]# kubectl get pods
    NAME                            READY   STATUS    RESTARTS   AGE
    approver-859f7d674d-chhlq       1/1     Running   0          18d
    block-syncer-6df857c8fb-h9sh4   1/1     Running   0          18d
    downloader-7d66cf8dfb-4cnll     1/1     Running   0          18d
    gateway-5d7b49b6dd-trdbf        1/1     Running   0          18d
    gateway-5d7b49b6dd-w5464        1/1     Running   0          18d
    manager-54f85f5b96-vq679        1/1     Running   0          18d
    metadata-64ff4ff945-rcmdz       1/1     Running   0          18d
    receiver-7bd6995f4d-c8czn       1/1     Running   0          18d
    signer-6c9dd6686c-sbdmk         1/1     Running   0          18d
    taskexecutor-5d458dc454-f494r   1/1     Running   0          18d
    taskexecutor-5d458dc454-vbtwd   1/1     Running   0          18d
    uploader-f6dfb66d6-54s2d        1/1     Running   0          18d

