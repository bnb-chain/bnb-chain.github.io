# Example for tx response, for different tx types

## NEW_ORDER
```json5
{
    hash: "5C18F10BA750E65CA662D8F5F16E6CCC85EECEAB35B8165FD6091B35B20F2D05",
    blockHeight: 162412419,
    blockTime: 1620722432270,
    type: "NEW_ORDER",
    fee: 0,
    code: 0,
    source: 0,
    sequence: 687800,
    memo: "",
    log: "Msg 0: ",
    data: "{"orderId":"75B7DCA71844FA7F59634C29A793CD881A15787E-687801","orderType":"LIMIT","price":"14534","quantity":"3469000000000","side":"BUY","symbol":"MITH-C76_BNB","timeInForce":"GTE"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1wkmaefccgna87ktrfs560y7d3qdp27r7ak44x9",
    toAddr: null
}
```
Note: ```amount``` field is null - if you want to get the base or quote asset amount, you can parse it from ```data``` field.

## CANCEL_ORDER
```json5
{
    hash: "2E0CB6147B60CBABB8E50AEBDD461295F531E330A7B946229E63D51A967CFEF3",
    blockHeight: 162412424,
    blockTime: 1620722434484,
    type: "CANCEL_ORDER",
    fee: 0,
    code: 0,
    source: 0,
    sequence: 35855681,
    memo: "",
    log: "Msg 0: ",
    data: "{"orderId":"1468EE412C3ADC9CFF3EF31ADC7EDD288F5E208E-35855646","symbol":"BNB_BTCB-1DE"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1z35wusfv8twfele77vddclka9z84ugywug48gn",
    toAddr: null
}
```


## TRANSFER
```json5
{
    hash: "D3AA7448385BFEDFE2434D18645C4729D441633BF8E2E98EF702188366BEC8AC",
    blockHeight: 162412424,
    blockTime: 1620722434484,
    type: "TRANSFER",
    fee: 7500,
    code: 0,
    source: 2,
    sequence: 3,
    memo: "100258987",
    log: "Msg 0: ",
    data: null,
    asset: "ADA-9F4",
    amount: 4379000000,
    fromAddr: "bnb1hu07yp89lncjwcu4775npe3s5s0p5ekne2d97y",
    toAddr: "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23"
}
```


## TRANSFER (multi-send case)
```json5
{
    hash: "1ACF2C07C2B25865A422C6A6EF8256940E813C09F7279430973254F614521980",
    blockHeight: 162635206,
    blockTime: 1620818353134,
    type: "TRANSFER",
    fee: 12000,
    code: 0,
    source: 1,
    sequence: 34520,
    memo: "0",
    log: "Msg 0: ",
    data: "{"outputs":[{"address":"bnb1ffaqy2g92yglhps7vwc3h4dyjf2kq73xlefzkc","amounts":[{"denom":"BNB","amount":50000000}]},{"address":"bnb15qced76xere38hmmpe644u5kd8v4lzl9gsex9w","amounts":[{"denom":"BNB","amount":1}]}],"inputs":[{"address":"bnb1t38ccns9var4ac4yj2ylmu99r9ecmggr8ye5e5","amounts":[{"denom":"BNB","amount":50000000}]},{"address":"bnb15qced76xere38hmmpe644u5kd8v4lzl9gsex9w","amounts":[{"denom":"BNB","amount":1}]}]}",
    asset: null,
    amount: null,
    fromAddr: null,
    toAddr: null
}
```
Note: mutli send transfer is a special kind of TRANSFER. In this case, you can consider this is a bucket, some addresses put tokens into it and other addresses get tokens out of it.


## CROSS_TRANSFER_OUT
```json5
{
    hash: "D4E1B8A31F62065E8894AEC9C3021A19C5D6AC1A0C742589C8446D9E2E533D4A",
    blockHeight: 162412439,
    blockTime: 1620722441110,
    type: "CROSS_TRANSFER_OUT",
    fee: 7500,
    code: 0,
    source: 2,
    sequence: 5,
    memo: "",
    log: "Msg 0: ",
    data: "{"expireTime":1620723042}",
    asset: "BNB",
    amount: 3579779,
    fromAddr: "bnb1v6jqu5lstgwxdc9r6aexdh4mqee70ld7vxrj09",
    toAddr: "0x3c9d8f8fca99bd7b8af284425784e36e45f901ab"
}
```


## MINT
```json5
{
    hash: "8206C5136372D6261E9984728D050E12324679CDBBF6F809B1AD1B8BF936A1E0",
    blockHeight: 161931307,
    blockTime: 1620518810151,
    type: "MINT",
    fee: 200000,
    code: 0,
    source: 1,
    sequence: 339,
    memo: "",
    log: "Msg 0: ",
    data: null,
    asset: "TCT-826",
    amount: 100000000000000,
    fromAddr: "bnb1akey87kt0r8y3fmhu2l8eyzdjvt9ptl5cppz0v",
    toAddr: null
}
```


## BURN_TOKEN
```json5
{
    hash: "D315E9218178FEF2048FFCB64F1E50712F083215451F7A8752755A00550AAB86",
    blockHeight: 160916832,
    blockTime: 1620091937909,
    type: "BURN_TOKEN",
    fee: 200000,
    code: 0,
    source: 1,
    sequence: 3,
    memo: "",
    log: "Msg 0: ",
    data: null,
    asset: "CTHUCOIN-AACM",
    amount: 100000000,
    fromAddr: "bnb1xsaphxcj3d80hmyv8d8z2mkqwz4tekzepdfq73",
    toAddr: null
}
```


## FREEZE_TOKEN
```json5
{
    hash: "529BA70106BCA2BAF741D575015ACC20825C7B15166C7FAF357E2746A07A8F3D",
    blockHeight: 162411486,
    blockTime: 1620722031659,
    type: "FREEZE_TOKEN",
    fee: 100000,
    code: 0,
    source: 0,
    sequence: 39,
    memo: "",
    log: "Msg 0: ",
    data: null,
    asset: "AWC-986",
    amount: 488514694,
    fromAddr: "bnb1xch7xg3t23vl5ugc4ghzpkqv57dzcdtkurr4jc",
    toAddr: null
}
```


## UN_FREEZE_TOKEN
```json5
{
    hash: "10B1784B11E3929BE95BF659C9910E1738E81908473579ABDBBB42C70E288733",
    blockHeight: 162410201,
    blockTime: 1620721488567,
    type: "UN_FREEZE_TOKEN",
    fee: 100000,
    code: 0,
    source: 0,
    sequence: 3,
    memo: "",
    log: "Msg 0: ",
    data: null,
    asset: "AWC-986",
    amount: 15400000000,
    fromAddr: "bnb1ajuxdaxnqd6e5d5vq87le4797xkgr9hgqgt7jp",
    toAddr: null
}
```


## ISSUE_TOKEN
```json5
{
    hash: "509393BA67C1B801D3F407E866A1C71E40D6E20A1EAB6C3AD8C0BFC2E9AA9910",
    blockHeight: 162222677,
    blockTime: 1620641433340,
    type: "ISSUE_TOKEN",
    fee: 1000000000,
    code: 0,
    source: 1,
    sequence: 32,
    memo: "",
    log: "Msg 0: Issued DVDO-509",
    data: "{"mintable":false,"name":"Davido Social Token","totalSupply":1000000000000000}",
    asset: "DVDO-509",
    amount: 1000000000000000,
    fromAddr: "bnb1ujvzeuft0ezf9fu4u0mk52t8mc7t8geyfkevms",
    toAddr: null
}
```


## TINY_TOKEN_ISSUE
```json5
{
    hash: "989F5C9489260F1F89B1C098BA7E6DBCD780DD825CA3E935F823EA0FD3692E62",
    blockHeight: 152840826,
    blockTime: 1616814337995,
    type: "TINY_TOKEN_ISSUE",
    fee: 40000000,
    code: 0,
    source: 1,
    sequence: 0,
    memo: "",
    log: "Msg 0: Issued YFGYM-989M",
    data: "{"mintable":false,"name":"YEAR FINANCE GYM","tokenURI":"https://yfgym.finance/","totalSupply":1000000000000}",
    asset: "YFGYM-989M",
    amount: 1000000000000,
    fromAddr: "bnb19g4d50vev04jlwy6vpqg97etdews6gjld9uz6r",
    toAddr: null
}
```


## MINI_TOKEN_ISSUE
```json5
{
    hash: "0347178CB54E04289D834EA9C05383CAD5DC1A661322F2C91B831FD240792050",
    blockHeight: 161286951,
    blockTime: 1620245763946,
    type: "MINI_TOKEN_ISSUE",
    fee: 60000000,
    code: 0,
    source: 1,
    sequence: 0,
    memo: "",
    log: "Msg 0: Issued BZB-034M",
    data: "{"mintable":false,"name":"One million BZE","tokenURI":"https://bargchain.io","totalSupply":100000000000000}",
    asset: "BZB-034M",
    amount: 100000000000000,
    fromAddr: "bnb1aww88fe99fmvd9s9mnlzu299tuwumsjqvudx4y",
    toAddr: null
}
```


## MINI_TOKEN_LIST
```json5
{
    hash: "96A73849D5A55FC8BAEB677307F8A0790AD0727BBC9CA4BEB1CD1C93087841FF",
    blockHeight: 161289727,
    blockTime: 1620246951722,
    type: "MINI_TOKEN_LIST",
    fee: 100000000,
    code: 0,
    source: 1,
    sequence: 1,
    memo: "",
    log: "Msg 0: ",
    data: "{"baseAsset":"BZB-034M","initPrice":100000000,"quoteAsset":"BNB"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1aww88fe99fmvd9s9mnlzu299tuwumsjqvudx4y",
    toAddr: null
}
```


## LIST_TOKEN
```json5
{
    hash: "1E3A50D7900EAA4BE2785AF312C2CF521C8AE318916D860A8E75C220E2B78F7C",
    blockHeight: 150713320,
    blockTime: 1615976164272,
    type: "LIST_TOKEN",
    fee: 20000000000,
    code: 0,
    source: 0,
    sequence: 108,
    memo: "",
    log: "Msg 0: ",
    data: "{"baseAsset":"BURGER-33A","initPrice":400000000,"proposalId":325,"quoteAsset":"BUSD-BD1"}",
    asset: null,
    amount: null,
    fromAddr: "bnb19v2ayq6k6e5x6ny3jdutdm6kpqn3n6mxheegvj",
    toAddr: null
}
```


## SIDE_PROPOSAL
```json5
{
    hash: "46032C3047BB1B62A149EA1A0C6DC0715656E8B0B7DC29BB1E9DBD2312E40144",
    blockHeight: 151792920,
    blockTime: 1616399780337,
    type: "SIDE_PROPOSAL",
    fee: 100000000,
    code: 0,
    source: 0,
    sequence: 1,
    memo: "",
    log: "Msg 0: ",
    data: "{"description":"{\"key\":\"dynamicExtraIncentiveAmount\",\"value\":\"00000000000000000000000000000000000000000000000000038D7EA4C68000\",\"target\":\"0000000000000000000000000000000000001005\"}","initDeposit":[{"amount":200000000000,"denom":"BNB"}],"proposalId":"7","proposalType":"CrossSideChainParamsChange","proposer":"bnb1mn45vmxzkua7edyr3uzwjcgz4du7fnyaa2r77l","sideChainId":"bsc","title":"set dynamicExtraIncentiveAmount","votingPeriod":1800000000000}",
    asset: "BNB",
    amount: 200000000000,
    fromAddr: "bnb1mn45vmxzkua7edyr3uzwjcgz4du7fnyaa2r77l",
    toAddr: null
}
```


## SIDE_VOTE
```json5
{
    hash: "F33281736A31781D95CA899D5B0FCD315D39460461B98277303C4ACB35C9B3DA",
    blockHeight: 151794873,
    blockTime: 1616400614551,
    type: "SIDE_VOTE",
    fee: 0,
    code: 0,
    source: 0,
    sequence: 3,
    memo: "",
    log: "Msg 0: ",
    data: "{"option":1,"proposalId":7,"sideChainId":"bsc","voter":"bnb1y52k5rfmqv46p8x8jsnppzgkjgzt5m0zg64806"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1y52k5rfmqv46p8x8jsnppzgkjgzt5m0zg64806",
    toAddr: null
}
```


## CREATE_SIDECHAIN_VALIDATOR
```json5
{
    hash: "6CB370013BA91ECC401FF4D6980C8C78C0372A30CE1C6DA7E1FD0ACC493C8124",
    blockHeight: 150275610,
    blockTime: 1615802657229,
    type: "CREATE_SIDECHAIN_VALIDATOR",
    fee: 200000000,
    code: 0,
    source: 0,
    sequence: 0,
    memo: "",
    log: "Msg 0: ",
    data: "{"commission":{"rate":25000000,"maxRate":90000000,"maxChangeRate":5000000,"updateTimeInMs":0},"delegation":{"amount":1000000000000,"denom":"BNB"},"delegatorAddr":"bnb1a7n56r44h4tlgrk3mazxx6cavhgpkrm7amq2k3","description":{"moniker":"InfStones","identity":"xxx","website":"https://infstones.com","details":"Fueling Blockchains, Infinitely"},"sideChainId":"bsc","sideConsAddr":"0xee226379db83cffc681495730c11fdde79ba4c0c","sideFeeAddr":"0xee226379db83cffc681495730c11fdde79ba4c0c","validatorAddr":"bva1a7n56r44h4tlgrk3mazxx6cavhgpkrm7a8p6g4"}",
    asset: "BNB",
    amount: 1000000000000,
    fromAddr: "bnb1a7n56r44h4tlgrk3mazxx6cavhgpkrm7amq2k3",
    toAddr: null
}
```


## EDIT_SIDECHAIN_VALIDATOR
```json5
{
    hash: "A516AE597CD41C56B611A015AF85D2D34EEC38F2CD29344CB33C4E1AD5DCC96F",
    blockHeight: 159272334,
    blockTime: 1619413244112,
    type: "EDIT_SIDECHAIN_VALIDATOR",
    fee: 20000000,
    code: 0,
    source: 0,
    sequence: 5,
    memo: "",
    log: "Msg 0: ",
    data: "{"commissionRate":14500000,"description":{"moniker":"InfStones","identity":"xxx","website":"https://infstones.com","details":"Fueling Blockchains, Infinitely"},"sideChainId":"bsc","sideFeeAddr":null,"validatorAddress":"bva1a7n56r44h4tlgrk3mazxx6cavhgpkrm7a8p6g4"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1a7n56r44h4tlgrk3mazxx6cavhgpkrm7amq2k3",
    toAddr: null
}
```


## CROSS_BIND
```json5
{
    hash: "CDC29B8B81C8468D68C072D7670565EB67E66662F0FCB47C6AFFAA94CE221852",
    blockHeight: 160097869,
    blockTime: 1619754894601,
    type: "CROSS_BIND",
    fee: 100000000,
    code: 0,
    source: 0,
    sequence: 994,
    memo: "",
    log: "Msg 0: ",
    data: "{"contractAddress":"0x5c7e71f46e49cf816f9863461eeb36e3bc8e3b51","contractDecimal":18,"expireTime":1622340046}",
    asset: "EQL-586",
    amount: 0,
    fromAddr: "bnb1uz0s54rzv022dh66l7atwk83wqcet9qstgg358",
    toAddr: null
}
```


## MINI_TOKEN_SET_URI
```json5
{
    hash: "A13FB0491B036BD5EA9FE91A695610B43BC00B719A42AFB78893D2D74C5E6BA5",
    blockHeight: 161047023,
    blockTime: 1620145492229,
    type: "MINI_TOKEN_SET_URI",
    fee: 7500,
    code: 0,
    source: 0,
    sequence: 184,
    memo: "",
    log: "Msg 0: ",
    data: "{"uri":"https://imcoinproject.com/"}",
    asset: "IMC-D5AM",
    amount: null,
    fromAddr: "bnb1xwmcqw4vqm32z08gl0c06ydwxgm4z2gnvh2rc4",
    toAddr: null
}
```



## SIDECHAIN_UNJAIL
```json5
{
    hash: "7B1AA4F71BD591DE470832EF0A5832BDAE8EA05CD174B881AC276734EEF5AC69",
    blockHeight: 162180199,
    blockTime: 1620623537235,
    type: "SIDECHAIN_UNJAIL",
    fee: 50000000,
    code: 0,
    source: 0,
    sequence: 13,
    memo: "",
    log: "Msg 0: ",
    data: "{"sideChainId":"bsc","validatorAddr":"bva1a7n56r44h4tlgrk3mazxx6cavhgpkrm7a8p6g4"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1a7n56r44h4tlgrk3mazxx6cavhgpkrm7amq2k3",
    toAddr: null
}
```


## TIME_LOCK
```json5
{
    hash: "486B93963E8D971AC9B58A803FC5666FFAF5CB81102D70A57CA4A25EBF922008",
    blockHeight: 161218645,
    blockTime: 1620216900755,
    type: "TIME_LOCK",
    fee: 200000,
    code: 0,
    source: 0,
    sequence: 1,
    memo: "",
    log: "Msg 0: ",
    data: "{"amount":[{"amount":20900000000,"denom":"SWINGBY-888"}],"description":"for me","lockId":"2","lockTime":1620507600000}",
    asset: "SWINGBY-888",
    amount: 20900000000,
    fromAddr: "bnb1gnjvszgdt35ysgekxcll3qlfur7l60rat7n8m4",
    toAddr: null
}
```


## TIME_UNLOCK
```json5
{
    hash: "981727753AE33BAC05AFB0678A5DD465FBDE0E1F575C8B187C997EBA1F382725",
    blockHeight: 162201236,
    blockTime: 1620632390767,
    type: "TIME_UNLOCK",
    fee: 200000,
    code: 0,
    source: 0,
    sequence: 16,
    memo: "",
    log: "Msg 0: ",
    data: "{"lockId":2}",
    asset: null,
    amount: null,
    fromAddr: "bnb1gnjvszgdt35ysgekxcll3qlfur7l60rat7n8m4",
    toAddr: null
}
```


## TIME_RELOCK
```json5
{
    hash: "757C44DD729718B578B14C90927DBD929C909756601CC4B9F578457591896813",
    blockHeight: 162210587,
    blockTime: 1620636356636,
    type: "TIME_RELOCK",
    fee: 200000,
    code: 0,
    source: 0,
    sequence: 38,
    memo: "",
    log: "Msg 0: ",
    data: "{"amount":[{"amount":155303853729657,"denom":"SWINGBY-888"}],"description":"e0797af9059f83b013994edc7bc58ca7e1c09aa558f5781898885534f28e06e2,0x4672f76fE968d6A490c0C79E0920e092afa01C73","lockId":10,"lockTime":1624441844000}",
    asset: "SWINGBY-888",
    amount: 155303853729657,
    fromAddr: "bnb17ed0pdy6fq4q40vc5ra78d9yw7sa0mw0k72apq",
    toAddr: null
}
```


## SUBMIT_PROPOSAL
```json5
{
    hash: "95370CAA3A5FEB028ED64B28E500CBC4FE1CC3797EEEB0278223C0BBB52DC2D7",
    blockHeight: 162183625,
    blockTime: 1620624972192,
    type: "PROPOSAL",
    fee: 100000000,
    code: 0,
    source: 0,
    sequence: 24,
    memo: "",
    log: "Msg 0: ",
    data: "{"baseAssetSymbol":"SPARTA-7F3","description":"{\"base_asset_symbol\":\"SPARTA-7F3\",\"quote_asset_symbol\":\"BUSD-BD1\",\"justification\":\"delist SPARTA-7F3 \",\"is_executed\":false}","initDeposit":[{"amount":100000000000,"denom":"BNB"}],"proposalId":"333","proposalType":"DelistTradingPair","proposer":"bnb189jtg9efdgvlj4gwrek8q4wu5jwqlqdpzgmug9","quoteAssetSymbol":"BUSD-BD1","title":"delist SPARTA-7F3","votingPeriod":172800000000000}",
    asset: "BNB",
    amount: 100000000000,
    fromAddr: "bnb189jtg9efdgvlj4gwrek8q4wu5jwqlqdpzgmug9",
    toAddr: null
}
```


## VOTE
```json5
{
    hash: "085B69D6749359F95F1BDF11FAFF9039F9D8615FB418729A379A43C167DED4AD",
    blockHeight: 162362506,
    blockTime: 1620701342872,
    type: "VOTE",
    fee: 0,
    code: 0,
    source: 0,
    sequence: 470981,
    memo: "",
    log: "Msg 0: ",
    data: "{"option":1,"proposalId":333,"voter":"bnb167z5qvur7xu85q885l906dgcwmgsvm3ppdarpf"}",
    asset: null,
    amount: null,
    fromAddr: "bnb167z5qvur7xu85q885l906dgcwmgsvm3ppdarpf",
    toAddr: null
}
```


## DEPOSIT
```json5
{
    hash: "BB674BC9E9E6A399619BBEEFBF45DA639D9F80479558098BDF40D6004B21A660",
    blockHeight: 149029215,
    blockTime: 1615274824770,
    type: "DEPOSIT",
    fee: 12500,
    code: 0,
    source: 0,
    sequence: 3,
    memo: "",
    log: "Msg 0: ",
    data: "{"amount":[{"amount":99900000000,"denom":"BNB"}],"proposalId":315}",
    asset: "BNB",
    amount: 99900000000,
    fromAddr: "bnb189jtg9efdgvlj4gwrek8q4wu5jwqlqdpzgmug9",
    toAddr: null
}
```


## DEPOSIT_HTL
```json5
{
    hash: "26B140338C136A587F9355E96763C641D5B88385A8619B02EEBB7915E3B18C99",
    blockHeight: 41455798,
    blockTime: 1571127824815,
    type: "DEPOSIT_HTL",
    fee: 7500,
    code: 0,
    source: 0,
    sequence: 0,
    memo: "",
    log: "Msg 0: ",
    data: "{"amount":[{"amount":10000000000,"denom":"CBM-4B2"},{"amount":10000000000,"denom":"VRAB-B56"}],"swapId":"3361b6992877abb5e8f9bb9644bea6b4089bd5eb6b113fa64990af0f35b14870"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1vwpx9zyletukt9wvmhqwhr2ahfrvnkt9nraxjs",
    toAddr: null
}
```


## CLAIM_HTL
```json5
{
    hash: "E09D9037782F0CAD9FF0643E6CA9736F56900FCEDF700CC3463A5B39A8982B00",
    blockHeight: 162412011,
    blockTime: 1620722255242,
    type: "CLAIM_HTL",
    fee: 7500,
    code: 0,
    source: 0,
    sequence: 1886,
    memo: "",
    log: "Msg 0: ",
    data: "{"randomNumber":"f31e0a332a52be39492985bf5a651946f68f99e1655f02bf46cff7c08f3737ef","swapId":"979a817aece6392edc1190b3b8901c74c7d0177b4f5c28e6ea546037efa15a15"}",
    asset: null,
    amount: null,
    fromAddr: "bnb14mhpmvnt5e98lc75v8mphqtavxxgsawkx4dsnx",
    toAddr: null
}
```


## REFUND_HTL
```json5
{
    hash: "C3CD313C4BA631BB2919E03D4F2CF13631FE546A58BF55CA329179779046C1F7",
    blockHeight: 162367787,
    blockTime: 1620703589944,
    type: "REFUND_HTL",
    fee: 7500,
    code: 0,
    source: 0,
    sequence: 1877,
    memo: "",
    log: "Msg 0: ",
    data: "{"swapId":"e0b3090b8a8e822c34559a36d48444114d2385d06c380ca07aa116738f0c9328"}",
    asset: null,
    amount: null,
    fromAddr: "bnb14mhpmvnt5e98lc75v8mphqtavxxgsawkx4dsnx",
    toAddr: null
}
```


## HTL_TRANSFER
```json5
{
    hash: "3A5D25924DA14ED085BA61037DBACABB4F8A364A0D61369468E7C2B793245B0A",
    blockHeight: 162411931,
    blockTime: 1620722220728,
    type: "HTL_TRANSFER",
    fee: 7500,
    code: 0,
    source: 0,
    sequence: 1885,
    memo: "",
    log: "Msg 0: swapID: 979a817aece6392edc1190b3b8901c74c7d0177b4f5c28e6ea546037efa15a15",
    data: "{"crossChain":true,"expectedIncome":"300727400BNB","heightSpan":1800,"outAmount":[{"amount":300727400,"denom":"BNB"}],"randomNumberHash":"44d8922418ddc545af63cb5fb4c2a4c07a9c761648d655996aa30c19bec71ee6","recipientOtherChain":"iaa1junhkdhuamtdz3ah6d5mfp6w9sxmlwera7mruz","senderOtherChain":"iaa1f2sgwns3nkqfvq2fafpfvkmr97p2wsrf7rck8z","timestamp":1620722213}",
    asset: "BNB",
    amount: 300727400,
    fromAddr: "bnb14mhpmvnt5e98lc75v8mphqtavxxgsawkx4dsnx",
    toAddr: "bnb1vkjuklnxslahuxka6dkq043u9xhlfu0hge4yqk"
}
```


## SIDECHAIN_REDELEGATE
```json5
{
    hash: "A2E1E723997373D328DF1976134A7098658DD205323A62006D67DBD6FEC9DA43",
    blockHeight: 162412117,
    blockTime: 1620722301263,
    type: "SIDECHAIN_REDELEGATE",
    fee: 60000,
    code: 0,
    source: 2,
    sequence: 7,
    memo: "",
    log: "Msg 0: ",
    data: "{"amount":{"amount":410255325,"denom":"BNB"},"delegatorAddress":"bnb126qv3623uwh57hkwpmfdqzt6yxgvvx9ekwd5sm","dstValidatorAddress":"bva1nwyq37v4f02wu7zkc2rsynn8y7hh97ura39qyf","sideChainId":"bsc","srcValidatorAddress":"bva1ygrhjdjfyn2ffh5ha5llf5g6l3wxjt29hz9q4s"}",
    asset: "BNB",
    amount: 410255325,
    fromAddr: "bnb126qv3623uwh57hkwpmfdqzt6yxgvvx9ekwd5sm",
    toAddr: null
}
```


## SIDECHAIN_DELEGATE
```json5
{
    hash: "9CEC083DDCA3ACF8C68788FF10CC71430289502A709CD8BC3B80B6D5F89306B1",
    blockHeight: 162412416,
    blockTime: 1620722430911,
    type: "SIDECHAIN_DELEGATE",
    fee: 20000,
    code: 0,
    source: 2,
    sequence: 0,
    memo: "",
    log: "Msg 0: ",
    data: "{"delegation":{"amount":113571176,"denom":"BNB"},"delegatorAddr":"bnb1smkcpeh5ku4308q857v002a78qt9hxyalyz8mr","sideChainId":"bsc","validatorAddr":"bva1nwyq37v4f02wu7zkc2rsynn8y7hh97ura39qyf"}",
    asset: "BNB",
    amount: 113571176,
    fromAddr: "bnb1smkcpeh5ku4308q857v002a78qt9hxyalyz8mr",
    toAddr: null
}
```


## ORACLE_CLAIM
```json5
{
    hash: "B8ECC7E200C4874914CEF1D7FB08340B45235D3B884726134E96A89EE38AC64A",
    blockHeight: 162412439,
    blockTime: 1620722441110,
    type: "ORACLE_CLAIM",
    fee: 0,
    code: 0,
    source: 0,
    sequence: 706559,
    memo: "",
    log: "Msg 0: ",
    data: "{"chainId":56,"payload":[{"channelId":3,"sequence":1192912,"payload":{"packageType":0,"crossChainFee":200000,"content":{"symbol":"BNB","contractAddress":"0x0000000000000000000000000000000000000000","amounts":[7100000],"receiverAddresses":["bnb1zwyuzhvm55fxc2w6gjxhwr670gxeuxchdc70w8"],"refundAddresses":["0x1533726cfe64da63b6169d249047d0231739308f"],"expireTime":1620722861}}},{"channelId":3,"sequence":1192913,"payload":{"packageType":0,"crossChainFee":200000,"content":{"symbol":"BNB","contractAddress":"0x0000000000000000000000000000000000000000","amounts":[9860839],"receiverAddresses":["bnb1uctxp6pd67q3eqcm9pd8e7xq60yw0zfg2uctkw"],"refundAddresses":["0x1451bd04f1e849113261072925ea5efdf95a1b53"],"expireTime":1620722888}}},{"channelId":3,"sequence":1192914,"payload":{"packageType":0,"crossChainFee":200000,"content":{"symbol":"BNB","contractAddress":"0x0000000000000000000000000000000000000000","amounts":[10000000],"receiverAddresses":["bnb1e47xrdkz28cerg5fzqyk9w08q68v5qccutty07"],"refundAddresses":["0x95f00d266590d325367f4d38c50eae89df84ef3d"],"expireTime":1620722937}}}],"sequence":829118,"validatorAddress":"bva1h9ymecpakr8p8lhchtah2xxx7x4xq099u8e07c"}",
    asset: null,
    amount: null,
    fromAddr: "bnb1h9ymecpakr8p8lhchtah2xxx7x4xq099umclqu",
    toAddr: null
}
```


## TRANSFER_TOKEN_OWNERSHIP
```json5
{
    hash: "41B51422C1238BA859B16F3731C34E1150122399994557FEC377D3D701E503E3",
    blockHeight: 146158279,
    blockTime: 1614067191757,
    type: "TRANSFER_TOKEN_OWNERSHIP",
    fee: 200000,
    code: 0,
    source: 0,
    sequence: 1,
    memo: "",
    log: "Msg 0: ",
    data: null,
    asset: "QQ-EF5M",
    amount: null,
    fromAddr: "bnb1jae4k7eg8s7th0gn7yaxpwpen79a8jsrvwxufu",
    toAddr: "bnb1jae4k7eg8s7th0gn7yaxpwpen79a8jsrvwxufu"
}
```


## SET_ACCOUNT_FLAG
```json5
{
    hash: "F0B4A6577EB9FCAB3C4733EE955A9E1165280D812B450493B883168EFD594B25",
    blockHeight: 159194287,
    blockTime: 1619380919117,
    type: "SET_ACCOUNT_FLAG",
    fee: 20000000,
    code: 0,
    source: 0,
    sequence: 404,
    memo: "",
    log: "Msg 0: ",
    data: "{"flags":1}",
    asset: null,
    amount: null,
    fromAddr: "bnb1x0t2mwrqg7gwy8wu04q6f4dty2ztcs40cg9exl",
    toAddr: null
}
```


# Example for block response

## Block of height 170155309
```json5
{
    height: 170155309,
    hash: "83EFF62688836D1D5206CDA95F0FC02DF43CDFDB4703C7C00CAEE18FB2D625CB",
    parentHash: "69E12701818A1B1FF6EFFDC22350697E723E1101115175298DA553E9ABDED292",
    time: 1623901978318,
    txCount: 4,
    size: 65536,
    consumeTime: 350,
    proposerAddr: "bnb1jstexazk7zateuwzzwllswu4j3dsllu3dgte4m",
    proposerNode: "Zugspitze",
    fees: [
        {
            blockHeight: 170155309,
            address: "bnb1jstexazk7zateuwzzwllswu4j3dsllu3dgte4m",
            asset: "BNB",
            quantity: 780
        },
        {
            blockHeight: 170155309,
            address: "bnb1jw9xup8arde2jzarzcs2fv49hh28uad92m4ke0",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb1xaef2agzycsww32fqyggnk5xgqxs8780vfv2kh",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb13m056plt2646zse2mwxfft92xawnky4nmncxc3",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb17kfuzeza2kn46yqx4twxxmlw2jk2ywp5x4gze2",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb1tpagqqqx36gq09kzw4f5a3a9sk3tq54dpl5ldn",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb19klje94mnu53wj7pmrk0zmtpwgr0uz8th0fcvw",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb19hunw9ps8n9tkrp2j64jvheezgqmfc2eyrxd7a",
            asset: "BNB",
            quantity: 772
        },
        {
            blockHeight: 170155309,
            address: "bnb15hx3frkdu7vajy2eulu80vl97vehnhyavu927v",
            asset: "BNB",
            quantity: 772
        }
    ]
}
```