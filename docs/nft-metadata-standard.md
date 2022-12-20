---
sidebar_label: NFT 메타데이터 표준
sidebar_position: 1
---
# NFT 메타데이터 표준

## 토큰 URI 구현하기

BSC에 BEP721 자산을 위한 오프체인 메타데이터를 끌어오기 위한 마켓플레이스를 더 쉽게 사용하도록 하기 위해서는 NFT 컨트랙트가 메타데이터가 저장된 장소의 URI를 반환해야 합니다. 이 URI를 찾기 위해 ERC721의 tokenURI 메서드와 ERC1155의 URI 메서드가 NFT 추적에 사용됩니다. 컨트랙트에 다음과 같은 함수를 구현해야 합니다.

```

/**
 * @dev Returns an URI for a given token ID
 */
function tokenURI(uint256 _tokenId) public view returns (string) {
  return Strings.strConcat(
      baseTokenURI(),
      Strings.uint2str(_tokenId)
  );
}

```

컨트랙트의 tokenURI 함수는 HTTP나 IPFS URL을 반환해야 합니다. 조회 시 이 URL은 해당 토큰의 메타 데이터를 포함한 데이터의 JSON을 반환합니다.

## 메타 데이터 구조

BSC의 마켓플레이스는 [공식 ERC721 메타데이터 표준](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)에 따른 메타데이터를 지원합니다. 추가적으로 아이템들의 다양한 속성도 지원하기 때문에 BSC 마켓플레이스에서 분류 및 필터링도 가능해집니다.
BSC 마켓플레이스는 아래의 메타데이터 구조를 통해 여러분의 NFT가 나타내는 자산의 세부사항을 조회하고 공개할 수 있습니다.

```

{
    "name":"NFT Name",
    "description":"NFT Description",
    "image":"https://somedomain.com/pic/xxxx.jpg",
    "external_url":"https://originalsite.io/2",
    "attributes":[...]
}

```

각 프로퍼티 설명은 다음과 같습니다.

| 프로퍼티         | 설명                                                                                                                                                                                  |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     name         | 아이템 이름. 최대 200 글자.                                                                                                                                                        |
| description      | 읽을 수 있는 아이템 이름. 마크다운 지원. 최대 500 글자.                                                                                                         |
| image            | 아이템 이미지의 URL. 모든 타입의 이미지 가능. 350 x 350 이미지 권장.                                                                             |
| animation_url    | 아이템의 멀티미디어 첨부 URL. 파일 확장자 GLTF, GLB, WEBM, MP4, M4V, OGV, OGG 그리고 음성 확장자 MP3, WAV, OGA가 지원됨. |
| animation_type   | animation_url에서 제공된 멀티미디어 첨부 파일.                                                   |
| external_url     | 마켓플레이스에서 자산의 이미지 아래에 나타날 URL로, 사용자들이 마켓플레이스를 빠져나가 여러분의 사이트에서 아이템을 볼 수 있게 해줍니다.                                    |
| attributes       | NFT 세부사항을 묘사하기 위한 아이템의 특성들. (아래의 배열을 확인해주세요)                                                                                                   |

### 속성
NFT 특성 위해 메타데이터의 다음 배열을 추가할 수 있습니다: 

```

{
    "attributes":[
        {
            "trait_type":"Rarity Class",
            "value":"Normal"
        },
        {
            "trait_type":"Type",
            "value":"Male"
        },
        {
            "trait_type":"Face",
            "value":"Mole"
        },
        {
            "trait_type":"Beard",
            "value":"Chinstrap"
        },
        {
            "display_type":"boost_number",
            "trait_type":"Power",
            "value":"Power"
        },
        {
            "display_type":"boost_percentage",
            "trait_type":"Health Increase",
            "value":"20"
        },
        {
            "display_type":"number",
            "trait_type":"Generation",
            "value":"3"
        }
    ]
}

```

`trait_type`은 특성의 이름이며 `value`는 특성의 값입니다. `display_type`는 숫자값이 어떻게 표시되었으면 좋겠는지를 나타내는 필드입니다. 문자열 특성의 경우 `display_type`은 신경쓰지 않아도 됩니다. 속성에 포함된 모든 특성들은 `Attribute`에 보여집니다.
어떤 특성에 `trait_type`을 주고 싶지 않은 경우, 해당 특성에 `value` 값을 입력하면 일반적인 특성으로 설정됩니다.

#### 숫자 특성
`display_type`에는 세 가지 타입이 지원됩니다. `number`는 숫자로 값을 나타내며, `boost_number`는 플러스 또는 마이너스 기호가 붙은 숫자를 나타내도록 해줍니다. `boost_percentage`는 `boost_number`과 비슷하지만 숫자 뒤에 퍼센티지 기호를 보여줍니다.

#### 날짜
마켓플레이스는 또한 `date`와 `display_type`를 통해 날짜 특성을 보여줍니다. Unix 타임스탬프를 전달해야 합니다.

```

   {
      "display_type": "date", 
      "trait_type": "birthday", 
      "value": 1608490000
    }
    
```